import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function sceneFor(progress: number) {
  if (progress < 0.19) return 0;
  if (progress < 0.37) return 1;
  if (progress < 0.58) return 2;
  if (progress < 0.79) return 3;
  return 4;
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const currentRef = useRef(0);
  const [scene, setScene] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setMobile(mobileQuery.matches);
    };
    sync();
    motionQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
    };
  }, []);

  const source = useMemo(() => mobile ? media.heroVideoMobile : media.heroVideoDesktop, [mobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setReady(false);
    video.src = source;
    video.load();

    // Safari and iOS can delay accurate seeking until the media element has
    // been activated by a user gesture. A silent play/pause on the first
    // interaction primes the decoder without changing the visible frame.
    let primed = false;
    const prime = async () => {
      if (primed || reducedMotion) return;
      primed = true;
      try {
        await video.play();
        video.pause();
      } catch {
        // The poster remains visible and normal metadata seeking still works.
      }
    };
    window.addEventListener('pointerdown', prime, { once: true, passive: true });
    window.addEventListener('touchstart', prime, { once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', prime);
      window.removeEventListener('touchstart', prime);
    };
  }, [source, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const updateTarget = () => {
      const section = sectionRef.current;
      if (!section) return;
      const start = section.offsetTop;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const next = clamp((window.scrollY - start) / distance);
      progressRef.current = next;
      const nextScene = sceneFor(next);
      setScene((current) => current === nextScene ? current : nextScene);
    };

    const render = () => {
      const video = videoRef.current;
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const target = progressRef.current * Math.max(0, video.duration - 0.035);
        const delta = target - currentRef.current;
        currentRef.current += delta * 0.22;
        if (Math.abs(delta) > 0.001 && Math.abs(video.currentTime - currentRef.current) > 0.018) {
          try { video.currentTime = currentRef.current; } catch { /* metadata not ready yet */ }
        }
      }
      frameRef.current = requestAnimationFrame(render);
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="scroll-film" aria-label="Six Continents mission introduction">
      <div className="scroll-film-sticky">
        <div className="scroll-film-media" aria-hidden="true">
          <img src={media.heroPoster} alt="" className="scroll-film-poster" />
          {!reducedMotion && (
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster={media.heroPoster}
              className={`scroll-film-video ${ready ? 'ready' : ''}`}
              onLoadedMetadata={() => {
                setReady(true);
                const video = videoRef.current;
                if (video) {
                  currentRef.current = progressRef.current * Math.max(0, video.duration - 0.035);
                  video.currentTime = currentRef.current;
                }
              }}
              onError={() => setReady(false)}
            />
          )}
          <div className="scroll-film-vignette" />
          <div className="scroll-film-grid" />
        </div>

        <div className="scroll-film-ui">
          <div className={`film-copy film-copy-hero ${scene === 0 ? 'active' : ''}`}>
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
          </div>

          <div className={`film-copy film-copy-right ${scene === 1 ? 'active' : ''}`}>
            <p className="film-eyebrow">ONE FULL IRONMAN</p>
            <h2>3.8 km swim.<br />180 km bike.<br />42.2 km run.</h2>
            <strong>226 km total.</strong>
            <p>A marathon is the final part, not the whole race.</p>
          </div>

          <div className={`film-copy film-copy-left ${scene === 2 ? 'active' : ''}`}>
            <p className="film-eyebrow">WHERE IT STARTED</p>
            <h2>IRONMAN 70.3 Warsaw showed the gap.</h2>
            <p>Toufic finished at 19. The race also showed exactly what had to change.</p>
            <Link className="inline-link" to="/warsaw">View the Warsaw story <ArrowRight size={15} /></Link>
          </div>

          <div className={`film-copy film-copy-right ${scene === 3 ? 'active' : ''}`}>
            <p className="film-eyebrow">LEBANON ACROSS THE WORLD</p>
            <h2>Six races become one global campaign.</h2>
            <p>Six chapters. Six markets. One Lebanese founder-athlete carrying the same mission forward.</p>
          </div>

          <div className={`film-copy film-copy-final ${scene === 4 ? 'active' : ''}`}>
            <p className="film-eyebrow">THE ROUTE MUST BE SECURED NOW</p>
            <h2>The founding partner enters before the first full race is locked.</h2>
            <p>Race entries, visas, training, equipment, and production move before the first start line.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Help secure the first chapter <ArrowRight size={16} /></button>
          </div>
        </div>

        <div className="film-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${[0.08, 0.28, 0.49, 0.71, 1][scene]})` }} />
        </div>
        {scene === 0 && <div className="film-scroll-cue"><ChevronDown size={19} /><span>Scroll</span></div>}
      </div>
    </section>
  );
}
