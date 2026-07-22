import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

type CopyStep = {
  at: number;
  className: string;
  content: ReactNode;
};

type ChapterProps = {
  id: string;
  chapter: string;
  desktop: string;
  mobile: string;
  poster: string;
  heightVh: number;
  steps: CopyStep[];
  objectPosition?: string;
  priority?: boolean;
};

function ScrollVideoChapter({
  id,
  chapter,
  desktop,
  mobile,
  poster,
  heightVh,
  steps,
  objectPosition = '50% 50%',
  priority = false,
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobileViewport, setMobileViewport] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setMobileViewport(mobileQuery.matches);
    };
    sync();
    motionQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
    };
  }, []);

  const source = useMemo(() => mobileViewport ? mobile : desktop, [desktop, mobile, mobileViewport]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      activeRef.current = entry.isIntersecting || entry.intersectionRatio > 0;
    }, { rootMargin: '120% 0px 120% 0px', threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    setReady(false);
    setFailed(false);
    video.src = source;
    video.load();

    const prime = async () => {
      if (!video.paused) return;
      try {
        await video.play();
        video.pause();
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = targetRef.current * Math.max(0, video.duration - 0.034);
        }
      } catch {
        // The poster remains visible. A later touch or pointer gesture retries.
      }
    };

    const primeOnGesture = () => { void prime(); };
    window.addEventListener('pointerdown', primeOnGesture, { passive: true });
    window.addEventListener('touchstart', primeOnGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', primeOnGesture);
      window.removeEventListener('touchstart', primeOnGesture);
    };
  }, [reducedMotion, source]);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      targetRef.current = progress;

      let nextStep = 0;
      steps.forEach((step, index) => {
        if (progress >= step.at) nextStep = index;
      });
      setActiveStep((current) => current === nextStep ? current : nextStep);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [steps]);

  useEffect(() => {
    if (reducedMotion) return;

    const render = () => {
      const video = videoRef.current;
      if (video && activeRef.current && ready && !failed && Number.isFinite(video.duration) && video.duration > 0) {
        const desired = targetRef.current * Math.max(0, video.duration - 0.034);
        if (Math.abs(video.currentTime - desired) > 0.012) {
          try {
            video.currentTime = desired;
          } catch {
            // Metadata or decoder may still be warming. The next frame retries.
          }
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [failed, ready, reducedMotion]);

  const style = {
    '--chapter-height': `${heightVh}vh`,
    '--video-position': objectPosition,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`film-chapter ${priority ? 'film-chapter-priority' : ''}`}
      style={style}
      aria-label={`${chapter} mission film chapter`}
      data-video-ready={ready && !failed ? 'true' : 'false'}
    >
      <div className="film-chapter-sticky">
        <div className="film-chapter-media" aria-hidden="true">
          <img src={poster} alt="" className="film-chapter-poster" fetchPriority={priority ? 'high' : 'auto'} />
          {!reducedMotion && !failed && (
            <video
              ref={videoRef}
              muted
              playsInline
              preload={priority ? 'auto' : 'metadata'}
              poster={poster}
              className={`film-chapter-video ${ready ? 'ready' : ''}`}
              onLoadedData={() => {
                const video = videoRef.current;
                setReady(true);
                if (video && Number.isFinite(video.duration)) {
                  try { video.currentTime = targetRef.current * Math.max(0, video.duration - 0.034); } catch { /* retry in RAF */ }
                }
              }}
              onCanPlay={() => {
                const video = videoRef.current;
                if (!video) return;
                void video.play().then(() => {
                  video.pause();
                  try { video.currentTime = targetRef.current * Math.max(0, video.duration - 0.034); } catch { /* no-op */ }
                }).catch(() => undefined);
              }}
              onError={() => {
                setFailed(true);
                setReady(false);
              }}
            />
          )}
          <div className="film-chapter-depth" />
          <div className="film-chapter-vignette" />
          <div className="film-chapter-grain" />
        </div>

        <div className="film-chapter-ui site-shell">
          {steps.map((step, index) => (
            <div key={`${id}-${index}`} className={`film-step ${step.className} ${activeStep === index ? 'active' : ''}`}>
              {step.content}
            </div>
          ))}
        </div>

        <div className="film-chapter-index" aria-hidden="true">
          <span>{chapter}</span>
          <i />
        </div>
        {priority && activeStep === 0 && <div className="film-scroll-cue"><ChevronDown size={19} /><span>Scroll to move</span></div>}
      </div>
    </section>
  );
}

export function ScrollHero() {
  const firstSteps: CopyStep[] = [
    {
      at: 0,
      className: 'film-step-left film-step-hero',
      content: (
        <>
          <div className="hero-brand-lockup">
            <img src={media.guinness} alt="Guinness World Records" />
            <span aria-hidden="true" />
            <div className="ironman-wordmark" aria-label="IRONMAN">IRONMAN<sup>®</sup></div>
          </div>
          <p className="film-eyebrow">TOUFIC ABOU ALI · LEBANESE FOUNDER-ATHLETE</p>
          <h1>6 continents.<br />6 full IRONMAN races.<br /><em>1 world-record attempt.</em></h1>
          <p className="film-subcopy">1,356 km. Main target: November 27, 2027. Extreme target: complete all six before turning 21.</p>
          <div className="film-actions">
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
            <Link className="button-quiet" to="/mission">View the Mission</Link>
          </div>
        </>
      ),
    },
    {
      at: 0.72,
      className: 'film-step-left film-step-compact',
      content: (
        <>
          <p className="film-eyebrow">THE CLOCK STARTS BEFORE THE FIRST RACE</p>
          <h2>The route, training, equipment, travel, and proof system must move now.</h2>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Help secure the first chapter <ArrowRight size={16} /></button>
        </>
      ),
    },
  ];

  const secondSteps: CopyStep[] = [
    {
      at: 0,
      className: 'film-step-right film-step-scale',
      content: (
        <>
          <p className="film-eyebrow">ONE FULL IRONMAN</p>
          <h2>3.8 km swim.<br />180 km bike.<br />42.2 km run.</h2>
          <strong>226 km total.</strong>
          <p>A marathon is the final part, not the whole race.</p>
        </>
      ),
    },
  ];

  const thirdSteps: CopyStep[] = [
    {
      at: 0,
      className: 'film-step-left film-step-compact',
      content: (
        <>
          <p className="film-eyebrow">BORN IN LEBANON</p>
          <h2>One flag. One mission. Six global chapters.</h2>
          <p>The campaign carries Lebanese ambition through every preparation block, race week, start line, and finish.</p>
        </>
      ),
    },
    {
      at: 0.42,
      className: 'film-step-right film-step-compact',
      content: (
        <>
          <p className="film-eyebrow">THE GLOBAL SCALE</p>
          <h2>Six races become 1,356 km across six continents.</h2>
          <p>North America. South America. Europe. Africa. Asia. Oceania.</p>
        </>
      ),
    },
    {
      at: 0.78,
      className: 'film-step-left film-step-final',
      content: (
        <>
          <p className="film-eyebrow">THE FOUNDING POSITION EXISTS NOW</p>
          <h2>The first partner enters before the first full race is secured.</h2>
          <p>Early partners become part of the origin, not only the final result.</p>
          <div className="film-actions">
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
            <Link className="button-quiet" to="/partners">View Partner Value</Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="mission-film-sequence">
      <ScrollVideoChapter
        id="mission-film-one"
        chapter="01 / 03"
        desktop={media.sceneOne.desktop}
        mobile={media.sceneOne.mobile}
        poster={media.sceneOne.poster}
        heightVh={285}
        steps={firstSteps}
        objectPosition="50% 50%"
        priority
      />
      <ScrollVideoChapter
        id="mission-film-two"
        chapter="02 / 03"
        desktop={media.sceneTwo.desktop}
        mobile={media.sceneTwo.mobile}
        poster={media.sceneTwo.poster}
        heightVh={205}
        steps={secondSteps}
        objectPosition="50% 50%"
      />
      <ScrollVideoChapter
        id="mission-film-three"
        chapter="03 / 03"
        desktop={media.sceneThree.desktop}
        mobile={media.sceneThree.mobile}
        poster={media.sceneThree.poster}
        heightVh={430}
        steps={thirdSteps}
        objectPosition="50% 50%"
      />
    </div>
  );
}
