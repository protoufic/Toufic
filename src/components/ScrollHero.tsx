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
type FetchInitWithPriority = RequestInit & { priority?: 'high' | 'low' | 'auto' };

type ChapterProps = {
  id: string;
  chapter: string;
  desktopFrames: string;
  mobileFrames: string;
  frameCount: number;
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
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const targetRef = useRef(0);
  const renderedRef = useRef(0);
  const lastTargetRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const lastDrawnIndexRef = useRef(-1);
  const decodedRef = useRef(new Map<number, FrameRecord>());
  const compressedRef = useRef(new Map<string, Blob>());
  const fetchPromisesRef = useRef(new Map<string, Promise<Blob>>());
  const generationRef = useRef(0);
  const decodePromisesRef = useRef(new Set<number>());
  const renderRafRef = useRef<number | null>(null);
  const updateRafRef = useRef<number | null>(null);
  const lastRenderTimeRef = useRef(performance.now());
  const headerHeightRef = useRef(76);
  const renderVisibleRef = useRef(priority);
  const mountedRef = useRef(true);
  const scheduleRenderRef = useRef<() => void>(() => undefined);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [canvasReady, setCanvasReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mobileViewport, setMobileViewport] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches);
  const [saveData, setSaveData] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  });

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (type: 'change', listener: () => void) => void; removeEventListener?: (type: 'change', listener: () => void) => void } }).connection;
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setMobileViewport(mobileQuery.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    sync();
    motionQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);
    connection?.addEventListener?.('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
      connection?.removeEventListener?.('change', sync);
    };
  }, []);

  const frameBase = useMemo(() => mobileViewport ? mobileFrames : desktopFrames, [desktopFrames, mobileFrames, mobileViewport]);
  const staticMedia = reducedMotion || saveData;
  const decodedLimit = mobileViewport ? 18 : 22;
  const preloadMargin = priority ? '100% 0px 100% 0px' : '420% 0px 420% 0px';

  const frameUrl = useCallback((index: number) => `${frameBase}/frame-${String(index + 1).padStart(4, '0')}.webp`, [frameBase]);

  const fetchFrame = useCallback((index: number, highPriority = false) => {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
    const url = frameUrl(safeIndex);
    const cached = compressedRef.current.get(url);
    if (cached) return Promise.resolve(cached);
    const existing = fetchPromisesRef.current.get(url);
    if (existing) return existing;

    const init: FetchInitWithPriority = {
      cache: 'force-cache',
      priority: highPriority ? 'high' : 'low',
    };
    const promise = fetch(url, init)
      .then((response) => {
        if (!response.ok) throw new Error(`Frame ${safeIndex + 1} failed with ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        if (mountedRef.current) compressedRef.current.set(url, blob);
        return blob;
      })
      .finally(() => {
        if (fetchPromisesRef.current.get(url) === promise) fetchPromisesRef.current.delete(url);
      });
    fetchPromisesRef.current.set(url, promise);
    return promise;
  }, [frameCount, frameUrl]);

  const trimDecoded = useCallback((center: number) => {
    const decoded = decodedRef.current;
    if (decoded.size <= decodedLimit) return;

    const protectedIndexes = new Set<number>();
    for (let offset = -4; offset <= 5; offset += 1) {
      protectedIndexes.add(Math.max(0, Math.min(frameCount - 1, center + offset)));
    }
    protectedIndexes.add(lastDrawnIndexRef.current);

    const candidates = [...decoded.entries()]
      .filter(([index]) => !protectedIndexes.has(index))
      .sort((a, b) => a[1].usedAt - b[1].usedAt);

    while (decoded.size > decodedLimit && candidates.length) {
      const [index] = candidates.shift()!;
      decoded.delete(index);
    }
  }, [decodedLimit, frameCount]);

  const ensureFrame = useCallback((index: number, highPriority = false) => {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
    if (decodedRef.current.has(safeIndex) || decodePromisesRef.current.has(safeIndex)) return;
    const generation = generationRef.current;
    decodePromisesRef.current.add(safeIndex);

    fetchFrame(safeIndex, highPriority)
      .then((blob) => {
        if (!mountedRef.current || generation !== generationRef.current) return;
        return new Promise<void>((resolve, reject) => {
          const objectUrl = URL.createObjectURL(blob);
          const image = new Image();
          image.decoding = 'async';
          image.onload = async () => {
            try { await image.decode(); } catch { /* onload already confirms a decoded image can be drawn */ }
            URL.revokeObjectURL(objectUrl);
            if (mountedRef.current && generation === generationRef.current) {
              decodedRef.current.set(safeIndex, { image, usedAt: performance.now() });
              if (safeIndex === 0) setCanvasReady(true);
              trimDecoded(Math.round(renderedRef.current * (frameCount - 1)));
              scheduleRenderRef.current();
            }
            resolve();
          };
          image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error(`Unable to decode frame ${safeIndex + 1}`));
          };
          image.src = objectUrl;
        });
      })
      .catch(() => {
        // Keep the last clean canvas frame visible. Never substitute an unrelated frame.
      })
      .finally(() => {
        decodePromisesRef.current.delete(safeIndex);
      });
  }, [fetchFrame, frameCount, trimDecoded]);

  const loadWindow = useCallback((center: number) => {
    const direction = directionRef.current;
    const behind = mobileViewport ? 4 : 5;
    const ahead = mobileViewport ? 11 : 14;
    const start = direction > 0 ? -behind : -ahead;
    const end = direction > 0 ? ahead : behind;

    ensureFrame(center, true);
    for (let offset = start; offset <= end; offset += 1) {
      if (offset === 0) continue;
      ensureFrame(center + offset, Math.abs(offset) <= 3);
    }
  }, [ensureFrame, mobileViewport]);

  useEffect(() => {
    generationRef.current += 1;
    decodedRef.current.clear();
    decodePromisesRef.current.clear();
    lastDrawnIndexRef.current = -1;
    setCanvasReady(false);
    if (staticMedia) return;

    // Decode the opening neighborhood immediately only for the visible first chapter.
    // Later chapters are fetched at low priority before they are reached and decoded on demand.
    if (priority) {
      ensureFrame(0, true);
      const initialCount = mobileViewport ? 12 : 15;
      for (let index = 1; index <= Math.min(frameCount - 1, initialCount); index += 1) {
        ensureFrame(index, index <= 5);
      }
    }
  }, [ensureFrame, frameBase, frameCount, mobileViewport, priority, staticMedia]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true);
    }, { rootMargin: preloadMargin, threshold: 0 });

    const renderObserver = new IntersectionObserver(([entry]) => {
      renderVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) scheduleRenderRef.current();
    }, { rootMargin: '55% 0px 55% 0px', threshold: 0 });

    preloadObserver.observe(section);
    renderObserver.observe(section);
    return () => {
      preloadObserver.disconnect();
      renderObserver.disconnect();
    };
  }, [preloadMargin]);

  useEffect(() => {
    if (!shouldLoad || staticMedia) return;
    let cancelled = false;

    // Warm the browser with the full compressed sequence before the chapter is reached.
    // Only a small rolling window is decoded, keeping memory controlled while removing
    // network requests from the actual scroll path.
    const order = Array.from({ length: frameCount }, (_, index) => index);
    const workers = Array.from({ length: priority ? (mobileViewport ? 3 : 4) : 2 }, async () => {
      while (!cancelled) {
        const next = order.shift();
        if (next === undefined) return;
        try { await fetchFrame(next, false); } catch { /* the on-demand loader will retry if necessary */ }
      }
    });

    void Promise.all(workers);
    loadWindow(Math.round(targetRef.current * (frameCount - 1)));
    return () => { cancelled = true; };
  }, [fetchFrame, frameCount, loadWindow, mobileViewport, priority, shouldLoad, staticMedia]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const mediaWidth = mobileViewport ? 960 : 1600;
    const mediaHeight = mobileViewport ? 540 : 900;
    const desiredDpr = Math.min(window.devicePixelRatio || 1, mobileViewport ? 1.1 : 1.15);
    const sourceNativeScale = Math.min(mediaWidth / rect.width, mediaHeight / rect.height);
    const renderScale = Math.max(0.58, Math.min(desiredDpr, sourceNativeScale));
    const width = Math.max(1, Math.round(rect.width * renderScale));
    const height = Math.max(1, Math.round(rect.height * renderScale));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      contextRef.current = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (contextRef.current) {
        contextRef.current.imageSmoothingEnabled = true;
        contextRef.current.imageSmoothingQuality = 'high';
      }
      lastDrawnIndexRef.current = -1;
      scheduleRenderRef.current();
    } else if (!contextRef.current) {
      contextRef.current = canvas.getContext('2d', { alpha: false, desynchronized: true });
    }
  }, [mobileViewport]);

  useEffect(() => {
    resizeCanvas();
    const canvas = canvasRef.current;
    const observer = canvas && 'ResizeObserver' in window ? new ResizeObserver(resizeCanvas) : null;
    if (canvas && observer) observer.observe(canvas);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const drawFrame = useCallback((record: FrameRecord, index: number, now: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !record.image.naturalWidth || !record.image.naturalHeight) return;

    const scale = Math.min(canvas.width / record.image.naturalWidth, canvas.height / record.image.naturalHeight);
    const width = record.image.naturalWidth * scale;
    const height = record.image.naturalHeight * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.drawImage(record.image, x, y, width, height);
    record.usedAt = now;
    lastDrawnIndexRef.current = index;
  }, []);

  const renderTick = useCallback((now: number) => {
    renderRafRef.current = null;
    if (staticMedia || !renderVisibleRef.current) return;

    const dt = Math.min(0.045, Math.max(0.001, (now - lastRenderTimeRef.current) / 1000));
    lastRenderTimeRef.current = now;
    const delta = targetRef.current - renderedRef.current;
    const response = 22 + Math.min(44, Math.abs(delta) * 145);
    const alpha = 1 - Math.exp(-response * dt);
    renderedRef.current += delta * alpha;
    if (Math.abs(delta) < 0.00018) renderedRef.current = targetRef.current;

    const frameIndex = Math.round(renderedRef.current * (frameCount - 1));
    loadWindow(frameIndex);
    const exactFrame = decodedRef.current.get(frameIndex);
    if (exactFrame && lastDrawnIndexRef.current !== frameIndex) {
      drawFrame(exactFrame, frameIndex, now);
      trimDecoded(frameIndex);
    } else if (!exactFrame) {
      ensureFrame(frameIndex, true);
    }

    const targetIndex = Math.round(targetRef.current * (frameCount - 1));
    const settled = Math.abs(targetRef.current - renderedRef.current) <= 0.00018;
    const targetReady = decodedRef.current.has(targetIndex);
    if (!settled || !targetReady) {
      renderRafRef.current = requestAnimationFrame(renderTick);
    }
  }, [drawFrame, ensureFrame, frameCount, loadWindow, staticMedia, trimDecoded]);

  const scheduleRender = useCallback(() => {
    if (staticMedia || !renderVisibleRef.current || renderRafRef.current !== null) return;
    lastRenderTimeRef.current = performance.now();
    renderRafRef.current = requestAnimationFrame(renderTick);
  }, [renderTick, staticMedia]);

  useEffect(() => {
    scheduleRenderRef.current = scheduleRender;
    return () => { scheduleRenderRef.current = () => undefined; };
  }, [scheduleRender]);

  useEffect(() => {
    const readHeaderHeight = () => {
      const styles = getComputedStyle(document.documentElement);
      headerHeightRef.current = Number.parseFloat(styles.getPropertyValue('--header')) || 76;
    };

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const header = headerHeightRef.current;
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
      const nextTarget = clamp(progress);
      const movement = nextTarget - lastTargetRef.current;
      if (Math.abs(movement) > 0.00005) directionRef.current = movement >= 0 ? 1 : -1;
      lastTargetRef.current = nextTarget;
      targetRef.current = nextTarget;
      section.style.setProperty('--film-progress', `${nextTarget}`);
      section.style.setProperty('--copy-reveal', `${copyReveal}`);
      section.style.setProperty('--copy-shift', `${(1 - copyReveal) * 18}px`);

      if (!staticMedia) {
        const center = Math.round(nextTarget * (frameCount - 1));
        loadWindow(center);
        scheduleRender();
      }
    };

    const scheduleUpdate = () => {
      if (updateRafRef.current !== null) return;
      updateRafRef.current = requestAnimationFrame(() => {
        updateRafRef.current = null;
        update();
      });
    };

    const handleResize = () => {
      readHeaderHeight();
      scheduleUpdate();
    };

    readHeaderHeight();
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      if (updateRafRef.current !== null) cancelAnimationFrame(updateRafRef.current);
      if (renderRafRef.current !== null) cancelAnimationFrame(renderRafRef.current);
    };
  }, [frameCount, loadWindow, preRoll, priority, scheduleRender, staticMedia]);

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
      className={`film-chapter ${priority ? 'film-chapter-priority' : ''} ${staticMedia ? 'film-chapter-static' : ''}`}
      style={style}
      aria-label={`${chapter} mission film chapter`}
      data-media-ready={staticMedia ? true : canvasReady}
    >
      <div className="film-chapter-sticky">
        <div className="film-chapter-media" aria-hidden="true">
          <img src={poster} alt="" className="film-chapter-poster" fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding="async" />
          {!staticMedia && <canvas ref={canvasRef} className={`film-chapter-canvas ${canvasReady ? 'ready' : ''}`} />}
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
        <p className="film-eyebrow">SIX CONTINENTS WORLD RECORD · TOUFIC ABOU ALI</p>
        <h1 className="hero-record-title">
          <span>6 full IRONMAN races.</span>
          <span>6 continents.</span>
          <em>1 Guinness World Records attempt.</em>
        </h1>
        <p className="film-subcopy"><strong>Approved Application.</strong> Official rules issued on 5 August 2026.</p>
        <p className="film-proof-line">All 6 races must be completed and the evidence approved by Guinness World Records.</p>
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
        poster={media.sceneTwo.poster}
        heightVh={235}
        copyClassName="film-step-right film-step-scale"
        preRoll={0.18}
        layer={2}
      >
        <p className="film-eyebrow">ONE FULL IRONMAN</p>
        <h2>3.85 km swim.<br />180 km bike.<br />42.19 km run.</h2>
        <strong className="film-total">226 km total.</strong>
        <p>A marathon is the final part, not the whole race.</p>
      </ScrollFrameChapter>

      <ScrollFrameChapter
        id="mission-film-three"
        chapter="03 / 03"
        desktopFrames={media.sceneThree.framesDesktop}
        mobileFrames={media.sceneThree.framesMobile}
        frameCount={media.sceneThree.frameCount}
        poster={media.sceneThree.poster}
        heightVh={410}
        copyClassName="film-step-left film-step-final"
        preRoll={0.13}
        layer={3}
      >
        <p className="film-eyebrow">BORN IN LEBANON · BUILT FOR SIX CONTINENTS</p>
        <h2>Do it six times across <em>six required regions</em>.</h2>
        <p>North America. South America. Europe. Africa. Asia. Australasia.</p>
        <p className="film-proof-line">The first partner roles are open before the first qualifying race is locked.</p>
        <div className="film-actions">
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
          <Link className="button-quiet" to="/partners">View Partner Value</Link>
        </div>
      </ScrollFrameChapter>
    </div>
  );
}
