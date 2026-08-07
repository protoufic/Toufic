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

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
};

type HardwareNavigator = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

type ChapterProps = {
  id: string;
  chapter: string;
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

type Geometry = {
  top: number;
  height: number;
};

function ScrollFrameChapter({
  id,
  chapter,
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const renderedRef = useRef(0);
  const geometryRef = useRef<Geometry>({ top: 0, height: 1 });
  const headerHeightRef = useRef(76);
  const updateRafRef = useRef<number | null>(null);
  const renderRafRef = useRef<number | null>(null);
  const lastRenderTimeRef = useRef(performance.now());
  const renderVisibleRef = useRef(priority);
  const seekPendingRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mobileViewport, setMobileViewport] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches);
  const [lightweightMedia, setLightweightMedia] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    const nav = navigator as HardwareNavigator;
    const effectiveType = nav.connection?.effectiveType || '';
    return Boolean(
      nav.connection?.saveData ||
      effectiveType === 'slow-2g' ||
      effectiveType === '2g' ||
      (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4)
    );
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const nav = navigator as HardwareNavigator;
    const connection = nav.connection;
    const sync = () => {
      const effectiveType = connection?.effectiveType || '';
      setReducedMotion(motionQuery.matches);
      setMobileViewport(mobileQuery.matches);
      setLightweightMedia(Boolean(
        connection?.saveData ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) ||
        (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4)
      ));
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

  const videoSource = useMemo(
    () => (mobileViewport || lightweightMedia ? mobileVideo : desktopVideo),
    [desktopVideo, lightweightMedia, mobileVideo, mobileViewport],
  );

  const measure = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const styles = getComputedStyle(document.documentElement);
    headerHeightRef.current = Number.parseFloat(styles.getPropertyValue('--header')) || 76;
    const rect = section.getBoundingClientRect();
    geometryRef.current = {
      top: rect.top + window.scrollY,
      height: section.offsetHeight,
    };
  }, []);

  const desiredVideoTime = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return 0;
    return progress * Math.max(0, video.duration - 1 / 30);
  }, []);

  const isBuffered = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return false;
    for (let index = 0; index < video.buffered.length; index += 1) {
      if (time >= video.buffered.start(index) - 0.08 && time <= video.buffered.end(index) + 0.08) return true;
    }
    return false;
  }, []);

  const renderVideo = useCallback((now: number) => {
    renderRafRef.current = null;
    if (reducedMotion || !renderVisibleRef.current) return;

    const dt = Math.min(0.05, Math.max(0.001, (now - lastRenderTimeRef.current) / 1000));
    lastRenderTimeRef.current = now;
    const delta = targetRef.current - renderedRef.current;
    const response = 20 + Math.min(42, Math.abs(delta) * 130);
    const alpha = 1 - Math.exp(-response * dt);
    renderedRef.current += delta * alpha;
    if (Math.abs(delta) < 0.00015) renderedRef.current = targetRef.current;

    const video = videoRef.current;
    if (video && videoReady && !seekPendingRef.current) {
      const desired = desiredVideoTime(renderedRef.current);
      if (Math.abs(video.currentTime - desired) > 1 / 50) {
        // Avoid repeated network-range seeks while a weak connection is still buffering.
        // Once the file is buffered, seeks stay local and scroll scrubbing remains fluid.
        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || isBuffered(desired)) {
          seekPendingRef.current = true;
          try {
            video.currentTime = desired;
          } catch {
            seekPendingRef.current = false;
          }
        }
      }
    }

    if (Math.abs(targetRef.current - renderedRef.current) > 0.00015 || seekPendingRef.current) {
      renderRafRef.current = requestAnimationFrame(renderVideo);
    }
  }, [desiredVideoTime, isBuffered, reducedMotion, videoReady]);

  const scheduleRender = useCallback(() => {
    if (renderRafRef.current !== null || reducedMotion || !renderVisibleRef.current) return;
    lastRenderTimeRef.current = performance.now();
    renderRafRef.current = requestAnimationFrame(renderVideo);
  }, [reducedMotion, renderVideo]);

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { top, height } = geometryRef.current;
    const header = headerHeightRef.current;
    const viewportHeight = window.innerHeight;
    const availableHeight = Math.max(1, viewportHeight - header);
    const stickyStart = header;
    const rectTop = top - window.scrollY;
    const rectBottom = rectTop + height;
    const entryStart = viewportHeight * 1.06;
    const slowMotionEnd = stickyStart + availableHeight * 0.54;
    const travel = Math.max(1, height - availableHeight);

    let progress = 0;
    let copyReveal = priority ? 1 : 0;

    if (rectTop > stickyStart) {
      const entering = clamp((entryStart - rectTop) / Math.max(1, entryStart - slowMotionEnd));
      progress = preRoll * smootherStep(entering);
      copyReveal = clamp((entering - 0.2) / 0.58);
    } else {
      const main = clamp((stickyStart - rectTop) / travel);
      progress = preRoll + (1 - preRoll) * smootherStep(main);
      copyReveal = 1;
    }

    if (rectBottom <= stickyStart + availableHeight * 0.02) progress = 1;
    targetRef.current = clamp(progress);
    section.style.setProperty('--film-progress', `${targetRef.current}`);
    section.style.setProperty('--copy-reveal', `${copyReveal}`);
    section.style.setProperty('--copy-shift', `${(1 - copyReveal) * 18}px`);
    scheduleRender();
  }, [preRoll, priority, scheduleRender]);

  const scheduleUpdate = useCallback(() => {
    if (updateRafRef.current !== null) return;
    updateRafRef.current = requestAnimationFrame(() => {
      updateRafRef.current = null;
      update();
    });
  }, [update]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Start loading chapters several screens before they are needed. This gives the
    // browser time to cache a single compact MP4 instead of requesting dozens of images mid-scroll.
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true);
    }, { rootMargin: '650% 0px 650% 0px', threshold: 0 });

    const renderObserver = new IntersectionObserver(([entry]) => {
      renderVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) scheduleRender();
      else if (renderRafRef.current !== null) {
        cancelAnimationFrame(renderRafRef.current);
        renderRafRef.current = null;
      }
    }, { rootMargin: '55% 0px 55% 0px', threshold: 0 });

    preloadObserver.observe(section);
    renderObserver.observe(section);
    return () => {
      preloadObserver.disconnect();
      renderObserver.disconnect();
    };
  }, [scheduleRender]);

  useEffect(() => {
    measure();
    update();
    const section = sectionRef.current;
    const observer = section && 'ResizeObserver' in window ? new ResizeObserver(() => {
      measure();
      scheduleUpdate();
    }) : null;
    if (section && observer) observer.observe(section);

    const handleResize = () => {
      measure();
      scheduleUpdate();
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (updateRafRef.current !== null) cancelAnimationFrame(updateRafRef.current);
      if (renderRafRef.current !== null) cancelAnimationFrame(renderRafRef.current);
    };
  }, [measure, scheduleUpdate, update]);

  useEffect(() => {
    setVideoReady(false);
    seekPendingRef.current = false;
    renderedRef.current = targetRef.current;
    const video = videoRef.current;
    if (!video || !shouldLoad || reducedMotion) return;
    video.load();
  }, [reducedMotion, shouldLoad, videoSource]);

  const handleMediaReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setVideoReady(true);
    const desired = desiredVideoTime(targetRef.current);
    if (Number.isFinite(desired)) {
      try { video.currentTime = desired; } catch { /* first frame remains visible */ }
    }
    scheduleRender();
  }, [desiredVideoTime, scheduleRender]);

  const handleSeekComplete = useCallback(() => {
    seekPendingRef.current = false;
    scheduleRender();
  }, [scheduleRender]);

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
      className={`film-chapter ${priority ? 'film-chapter-priority' : ''} ${reducedMotion ? 'film-chapter-static' : ''}`}
      style={style}
      aria-label={`${chapter} mission film chapter`}
      data-media-ready={reducedMotion || videoReady}
    >
      <div className="film-chapter-sticky">
        <div className="film-chapter-media" aria-hidden="true">
          <img src={poster} alt="" className="film-chapter-poster" fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding="async" />
          {!reducedMotion && shouldLoad && (
            <video
              ref={videoRef}
              src={videoSource}
              muted
              playsInline
              preload="auto"
              poster={poster}
              className={`film-chapter-video ${videoReady ? 'ready' : ''}`}
              disablePictureInPicture
              onLoadedMetadata={handleMediaReady}
              onCanPlay={handleMediaReady}
              onSeeked={handleSeekComplete}
              onProgress={scheduleRender}
              onError={() => setVideoReady(false)}
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
        <p className="film-eyebrow">SIX CONTINENTS WORLD RECORD · TOUFIC ABOU ALI</p>
        <h1>6 full IRONMAN races.<br />6 continents.<br /><em>1 Guinness World Records attempt.</em></h1>
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
        desktopVideo={media.sceneTwo.desktop}
        mobileVideo={media.sceneTwo.mobile}
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
        desktopVideo={media.sceneThree.desktop}
        mobileVideo={media.sceneThree.mobile}
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
