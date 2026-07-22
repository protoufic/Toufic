import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smootherStep(value: number) {
  const x = clamp(value);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

type FrameRecord = { image: HTMLImageElement; usedAt: number };

type ChapterProps = {
  id: string;
  chapter: string;
  desktopFrames: string;
  mobileFrames: string;
  frameCount: number;
  desktopVideo: string;
  mobileVideo: string;
  poster: string;
  heightVh: number;
  children: ReactNode;
  copyClassName: string;
  priority?: boolean;
  preRoll?: number;
  layer?: number;
};

function ScrollFrameChapter({
  id,
  chapter,
  desktopFrames,
  mobileFrames,
  frameCount,
  desktopVideo,
  mobileVideo,
  poster,
  heightVh,
  children,
  copyClassName,
  priority = false,
  preRoll = 0.12,
  layer = 1,
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const renderedRef = useRef(0);
  const decodedRef = useRef(new Map<number, FrameRecord>());
  const inflightRef = useRef(new Set<number>());
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(performance.now());
  const shouldRenderRef = useRef(priority);
  const failedFramesRef = useRef(0);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [canvasReady, setCanvasReady] = useState(false);
  const [fallbackReady, setFallbackReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobileViewport, setMobileViewport] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setMobileViewport(mobileQuery.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    sync();
    motionQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
    };
  }, []);

  const frameBase = useMemo(() => mobileViewport ? mobileFrames : desktopFrames, [desktopFrames, mobileFrames, mobileViewport]);
  const fallbackSource = useMemo(() => mobileViewport ? mobileVideo : desktopVideo, [desktopVideo, mobileVideo, mobileViewport]);
  const fallbackMode = useFallback || saveData;
  const decodedLimit = mobileViewport ? 24 : 34;

  const frameUrl = useCallback((index: number) => `${frameBase}/frame-${String(index + 1).padStart(4, '0')}.webp`, [frameBase]);

  const trimDecoded = useCallback((center: number) => {
    const decoded = decodedRef.current;
    if (decoded.size <= decodedLimit) return;
    const protectedIndexes = new Set<number>();
    for (let offset = -4; offset <= 4; offset += 1) {
      protectedIndexes.add(Math.max(0, Math.min(frameCount - 1, center + offset)));
    }
    const candidates = [...decoded.entries()]
      .filter(([index]) => !protectedIndexes.has(index))
      .sort((a, b) => a[1].usedAt - b[1].usedAt);
    while (decoded.size > decodedLimit && candidates.length) {
      const [index, record] = candidates.shift()!;
      record.image.src = '';
      decoded.delete(index);
    }
  }, [decodedLimit, frameCount]);

  const ensureFrame = useCallback((index: number) => {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
    if (decodedRef.current.has(safeIndex) || inflightRef.current.has(safeIndex)) return;
    inflightRef.current.add(safeIndex);
    const image = new Image();
    image.decoding = 'async';
    image.src = frameUrl(safeIndex);
    image.onload = () => {
      inflightRef.current.delete(safeIndex);
      decodedRef.current.set(safeIndex, { image, usedAt: performance.now() });
      failedFramesRef.current = 0;
      if (safeIndex === 0) setCanvasReady(true);
      trimDecoded(Math.round(targetRef.current * (frameCount - 1)));
    };
    image.onerror = () => {
      inflightRef.current.delete(safeIndex);
      failedFramesRef.current += 1;
      if (safeIndex === 0 || failedFramesRef.current >= 8) setUseFallback(true);
    };
  }, [frameCount, frameUrl, trimDecoded]);

  const loadWindow = useCallback((center: number) => {
    const radius = mobileViewport ? 10 : 14;
    ensureFrame(center);
    for (let distance = 1; distance <= radius; distance += 1) {
      ensureFrame(center + distance);
      ensureFrame(center - distance);
    }
    ensureFrame(0);
    ensureFrame(frameCount - 1);
  }, [ensureFrame, frameCount, mobileViewport]);

  useEffect(() => {
    decodedRef.current.forEach(({ image }) => { image.src = ''; });
    decodedRef.current.clear();
    inflightRef.current.clear();
    setCanvasReady(false);
    setUseFallback(false);
    failedFramesRef.current = 0;
    ensureFrame(0);
    ensureFrame(frameCount - 1);
  }, [ensureFrame, frameBase, frameCount]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true);
    }, { rootMargin: '220% 0px 220% 0px', threshold: 0 });
    const renderObserver = new IntersectionObserver(([entry]) => {
      shouldRenderRef.current = entry.isIntersecting;
    }, { rootMargin: '80% 0px 80% 0px', threshold: 0 });
    preloadObserver.observe(section);
    renderObserver.observe(section);
    return () => {
      preloadObserver.disconnect();
      renderObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || reducedMotion || fallbackMode) return;
    const saveConnection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    loadWindow(Math.round(targetRef.current * (frameCount - 1)));
    if (saveConnection) return;

    let cancelled = false;
    const order = Array.from({ length: frameCount }, (_, index) => index);
    let cursor = 0;
    const worker = async () => {
      while (!cancelled && cursor < order.length) {
        const index = order[cursor++];
        try {
          const response = await fetch(frameUrl(index), { cache: 'force-cache', priority: priority ? 'high' : 'low' } as RequestInit);
          if (response.ok) await response.arrayBuffer();
        } catch {
          // The decoded sliding window still works even when background warming is interrupted.
        }
      }
    };
    const workers = Array.from({ length: priority ? 5 : 3 }, () => worker());
    void Promise.all(workers);
    return () => { cancelled = true; };
  }, [fallbackMode, frameCount, frameUrl, loadWindow, priority, reducedMotion, shouldLoad]);

  useEffect(() => {
    if (!fallbackMode || reducedMotion || !shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    setFallbackReady(false);
    video.src = fallbackSource;
    video.load();
  }, [fallbackMode, fallbackSource, reducedMotion, shouldLoad]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, mobileViewport ? 1.25 : 1.6);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [mobileViewport]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const styles = getComputedStyle(document.documentElement);
      const header = Number.parseFloat(styles.getPropertyValue('--header')) || 76;
      const viewportHeight = window.innerHeight;
      const availableHeight = Math.max(1, viewportHeight - header);
      const stickyStart = header;
      const entryStart = viewportHeight * 1.06;
      const slowMotionEnd = stickyStart + availableHeight * 0.54;
      const travel = Math.max(1, section.offsetHeight - availableHeight);

      let progress = 0;
      let copyReveal = priority ? 1 : 0;

      if (rect.top > stickyStart) {
        const entering = clamp((entryStart - rect.top) / Math.max(1, entryStart - slowMotionEnd));
        progress = preRoll * smootherStep(entering);
        copyReveal = clamp((entering - 0.2) / 0.58);
      } else {
        const main = clamp((stickyStart - rect.top) / travel);
        progress = preRoll + (1 - preRoll) * smootherStep(main);
        copyReveal = 1;
      }

      if (rect.bottom <= stickyStart + availableHeight * 0.02) progress = 1;
      targetRef.current = clamp(progress);
      section.style.setProperty('--film-progress', `${targetRef.current}`);
      section.style.setProperty('--copy-reveal', `${copyReveal}`);
      section.style.setProperty('--copy-shift', `${(1 - copyReveal) * 18}px`);
      if (shouldLoad && !fallbackMode) loadWindow(Math.round(targetRef.current * (frameCount - 1)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [fallbackMode, frameCount, loadWindow, preRoll, priority, shouldLoad]);

  const drawImageContained = useCallback((context: CanvasRenderingContext2D, image: HTMLImageElement, alpha = 1) => {
    const canvas = context.canvas;
    const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    context.globalAlpha = alpha;
    context.drawImage(image, x, y, width, height);
    context.globalAlpha = 1;
  }, []);

  const nearestDecoded = useCallback((index: number) => {
    const decoded = decodedRef.current;
    if (decoded.has(index)) return decoded.get(index)!;
    for (let distance = 1; distance < frameCount; distance += 1) {
      const before = decoded.get(index - distance);
      if (before) return before;
      const after = decoded.get(index + distance);
      if (after) return after;
    }
    return undefined;
  }, [frameCount]);

  useEffect(() => {
    if (reducedMotion) return;
    const render = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameRef.current) / 1000));
      lastFrameRef.current = now;
      if (shouldRenderRef.current) {
        const delta = targetRef.current - renderedRef.current;
        const response = 11 + Math.min(28, Math.abs(delta) * 95);
        const alpha = 1 - Math.exp(-response * dt);
        renderedRef.current += delta * alpha;
        if (Math.abs(delta) < 0.0002) renderedRef.current = targetRef.current;

        if (fallbackMode) {
          const video = videoRef.current;
          if (video && fallbackReady && Number.isFinite(video.duration) && video.duration > 0 && !video.seeking) {
            const desired = renderedRef.current * Math.max(0, video.duration - 1 / 30);
            if (Math.abs(video.currentTime - desired) > 1 / 45) {
              try { video.currentTime = desired; } catch { /* retry on next frame */ }
            }
          }
        } else {
          const canvas = canvasRef.current;
          const context = canvas?.getContext('2d', { alpha: false });
          if (canvas && context) {
            resizeCanvas();
            const frameFloat = renderedRef.current * (frameCount - 1);
            const lowerIndex = Math.floor(frameFloat);
            const upperIndex = Math.min(frameCount - 1, lowerIndex + 1);
            loadWindow(Math.round(frameFloat));
            const lower = nearestDecoded(lowerIndex);
            const upper = decodedRef.current.get(upperIndex);
            if (lower) {
              lower.usedAt = now;
              context.fillStyle = '#000';
              context.fillRect(0, 0, canvas.width, canvas.height);
              drawImageContained(context, lower.image, 1);
              const blend = frameFloat - lowerIndex;
              if (upper && upper !== lower && blend > 0.06) {
                upper.usedAt = now;
                drawImageContained(context, upper.image, Math.min(0.78, blend));
              }
              trimDecoded(Math.round(frameFloat));
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };
    lastFrameRef.current = performance.now();
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawImageContained, fallbackMode, fallbackReady, frameCount, loadWindow, nearestDecoded, reducedMotion, resizeCanvas, trimDecoded]);

  const style = {
    '--chapter-height': `${heightVh}vh`,
    '--chapter-layer': layer,
    '--copy-reveal': priority ? 1 : 0,
    '--copy-shift': priority ? '0px' : '18px',
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`film-chapter ${priority ? 'film-chapter-priority' : ''}`}
      style={style}
      aria-label={`${chapter} mission film chapter`}
      data-media-ready={fallbackMode ? fallbackReady : canvasReady}
    >
      <div className="film-chapter-sticky">
        <div className="film-chapter-media" aria-hidden="true">
          <img src={poster} alt="" className="film-chapter-poster" fetchPriority={priority ? 'high' : 'auto'} />
          {!reducedMotion && !fallbackMode && <canvas ref={canvasRef} className={`film-chapter-canvas ${canvasReady ? 'ready' : ''}`} />}
          {!reducedMotion && fallbackMode && shouldLoad && (
            <video
              ref={videoRef}
              muted
              playsInline
              preload={priority ? 'auto' : 'metadata'}
              poster={poster}
              className={`film-chapter-video ${fallbackReady ? 'ready' : ''}`}
              onLoadedMetadata={() => {
                setFallbackReady(true);
                const video = videoRef.current;
                if (video && Number.isFinite(video.duration)) {
                  try { video.currentTime = targetRef.current * Math.max(0, video.duration - 1 / 30); } catch { /* no-op */ }
                }
              }}
            />
          )}
          <div className="film-chapter-depth" />
          <div className="film-chapter-vignette" />
          <div className="film-chapter-grain" />
        </div>

        <div className="film-chapter-ui site-shell">
          <div className={`film-step active ${copyClassName}`}>
            <div className="film-copy-panel">{children}</div>
          </div>
        </div>

        <div className="film-chapter-index" aria-hidden="true">
          <span>{chapter}</span>
          <i><b /></i>
        </div>
        {priority && <div className="film-scroll-cue"><ChevronDown size={19} /><span>Scroll to move</span></div>}
      </div>
    </section>
  );
}

export function ScrollHero() {
  return (
    <div className="mission-film-sequence">
      <ScrollFrameChapter
        id="mission-film-one"
        chapter="01 / 03"
        desktopFrames={media.sceneOne.framesDesktop}
        mobileFrames={media.sceneOne.framesMobile}
        frameCount={media.sceneOne.frameCount}
        desktopVideo={media.sceneOne.desktop}
        mobileVideo={media.sceneOne.mobile}
        poster={media.sceneOne.poster}
        heightVh={285}
        copyClassName="film-step-left film-step-hero"
        priority
        preRoll={0}
        layer={1}
      >
        <div className="hero-brand-lockup">
          <img src={media.guinness} alt="Guinness World Records" />
          <span aria-hidden="true" />
          <div className="ironman-wordmark" aria-label="IRONMAN">IRONMAN<sup>®</sup></div>
        </div>
        <p className="film-eyebrow">TOUFIC ABOU ALI · LEBANESE FOUNDER-ATHLETE</p>
        <h1>6 continents.<br />6 full IRONMAN races.<br /><em>1 world-record attempt.</em></h1>
        <p className="film-subcopy"><strong>1,356 km.</strong> Main target: November 27, 2027. Extreme target: complete all six before turning 21.</p>
        <p className="film-proof-line">The route, training, equipment, travel, and proof system must move before the first start line.</p>
        <div className="film-actions">
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
          <Link className="button-quiet" to="/mission">View the Mission</Link>
        </div>
      </ScrollFrameChapter>

      <ScrollFrameChapter
        id="mission-film-two"
        chapter="02 / 03"
        desktopFrames={media.sceneTwo.framesDesktop}
        mobileFrames={media.sceneTwo.framesMobile}
        frameCount={media.sceneTwo.frameCount}
        desktopVideo={media.sceneTwo.desktop}
        mobileVideo={media.sceneTwo.mobile}
        poster={media.sceneTwo.poster}
        heightVh={235}
        copyClassName="film-step-right film-step-scale"
        preRoll={0.18}
        layer={2}
      >
        <p className="film-eyebrow">ONE FULL IRONMAN</p>
        <h2>3.8 km swim.<br />180 km bike.<br />42.2 km run.</h2>
        <strong className="film-total">226 km total.</strong>
        <p>A marathon is the final part, not the whole race.</p>
      </ScrollFrameChapter>

      <ScrollFrameChapter
        id="mission-film-three"
        chapter="03 / 03"
        desktopFrames={media.sceneThree.framesDesktop}
        mobileFrames={media.sceneThree.framesMobile}
        frameCount={media.sceneThree.frameCount}
        desktopVideo={media.sceneThree.desktop}
        mobileVideo={media.sceneThree.mobile}
        poster={media.sceneThree.poster}
        heightVh={410}
        copyClassName="film-step-left film-step-final"
        preRoll={0.13}
        layer={3}
      >
        <p className="film-eyebrow">BORN IN LEBANON · BUILT FOR SIX CONTINENTS</p>
        <h2>Six full races become <em>1,356 km</em> across the world.</h2>
        <p>North America. South America. Europe. Africa. Asia. Oceania.</p>
        <p className="film-proof-line">The founding position exists before the first full race is secured.</p>
        <div className="film-actions">
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
          <Link className="button-quiet" to="/partners">View Partner Value</Link>
        </div>
      </ScrollFrameChapter>
    </div>
  );
}
