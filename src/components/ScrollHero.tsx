import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28 },
  transition: { duration: 0.68, ease: 'easeOut' as const },
};

export function ScrollHero() {
  return (
    <div className="cinematic-sequence">
      <section className="cinematic-chapter cinematic-chapter-hero">
        <motion.img {...reveal} src={media.sceneOne.poster} alt="Toufic Abou Ali and the Six Continents mission" fetchPriority="high" />
        <div className="cinematic-shade" />
        <div className="site-shell cinematic-content cinematic-content-left">
          <motion.div {...reveal} className="film-copy-panel cinematic-copy">
            <div className="hero-brand-lockup">
              <img src={media.guinness} alt="Guinness World Records" />
              <span aria-hidden="true" />
              <div className="ironman-wordmark" aria-label="IRONMAN">IRONMAN<sup>®</sup></div>
            </div>
            <p className="film-eyebrow">A LEBANESE MISSION ACROSS SIX CONTINENTS</p>
            <h1 className="hero-record-title">
              <span>6 full IRONMAN races.</span>
              <span>6 continents.</span>
              <em>Before I turn 21.</em>
            </h1>
            <p className="film-subcopy"><strong>I am Toufic Abou Ali.</strong> A Lebanese founder and athlete turning one clear target into six international race chapters.</p>
            <p className="film-proof-line">Application accepted. Guidelines issued. Four of six race entries secured. The record is not yet achieved.</p>
            <div className="film-actions">
              <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
              <Link className="button-quiet" to="/mission">Understand the Mission</Link>
            </div>
            <small className="hero-mark-note">Names and marks identify the application and race format. No endorsement or official partnership is implied.</small>
          </motion.div>
        </div>
        <div className="cinematic-index"><span>01 / 03</span><i /></div>
        <div className="film-scroll-cue"><ChevronDown size={19} /><span>Scroll to move</span></div>
      </section>

      <section className="cinematic-chapter cinematic-chapter-scale">
        <img src={media.sceneTwo.poster} alt="The swim, bike, and run distance of one full IRONMAN race" loading="lazy" />
        <div className="cinematic-shade" />
        <div className="site-shell cinematic-content cinematic-content-right">
          <motion.div {...reveal} className="film-copy-panel cinematic-copy">
            <p className="film-eyebrow">ONE FULL IRONMAN</p>
            <h2>3.85 km swim.<br />180 km bike.<br />42.19 km run.</h2>
            <strong className="film-total">226 km total.</strong>
            <p>A marathon is the final part, not the whole race.</p>
          </motion.div>
        </div>
        <div className="cinematic-index"><span>02 / 03</span><i /></div>
      </section>

      <section className="cinematic-chapter cinematic-chapter-route">
        <img src={media.sceneThree.final} alt="World map showing the six required race regions" loading="lazy" />
        <div className="cinematic-shade" />
        <div className="site-shell cinematic-content cinematic-content-left cinematic-content-bottom">
          <motion.div {...reveal} className="film-copy-panel cinematic-copy">
            <p className="film-eyebrow">BORN IN LEBANON · BUILT FOR SIX CONTINENTS</p>
            <h2>Do it six times across <em>six required regions</em>.</h2>
            <p>North America. South America. Europe. Africa. Asia. Australasia.</p>
            <p className="film-proof-line">Four entries are secured. The right partners can now own the real parts that make all six possible.</p>
            <div className="film-actions">
              <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
              <Link className="button-quiet" to="/partners">Find Your Company Role</Link>
            </div>
          </motion.div>
        </div>
        <div className="cinematic-index"><span>03 / 03</span><i /></div>
      </section>
    </div>
  );
}
