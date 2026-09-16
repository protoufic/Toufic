import { motion } from 'framer-motion';
import { ArrowRight, Building2, ChevronDown, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../data/mission';

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
            <div className="home-record-status"><ShieldCheck size={16} /><span><strong>GUINNESS WORLD RECORDS ATTEMPT</strong><small>Application accepted · Official guidelines issued</small></span></div>
            <p className="film-eyebrow">A LEBANESE MISSION ACROSS SIX CONTINENTS</p>
            <h1 className="hero-record-title">
              <span>6 full IRONMAN races.</span>
              <span>6 continents.</span>
              <em>1 official record attempt.</em>
            </h1>
            <p className="film-subcopy"><strong>I am Toufic Abou Ali.</strong> I am preparing to complete six full distance IRONMAN races across six continents as part of an official Guinness World Records attempt.</p>
            <p className="film-proof-line">The first starting line is San Juan, Argentina, on 1 November 2026. No record is claimed. Final recognition depends on completing the attempt and evidence review.</p>
            <div className="film-actions home-hero-actions">
              <Link className="button-primary" to="/support">Fund the Mission <Heart size={16} fill="currentColor" /></Link>
              <Link className="button-quiet" to="/partners">Partner as a Company <Building2 size={16} /></Link>
            </div>
            <Link className="home-mission-link" to="/mission">Understand the mission <ArrowRight size={15} /></Link>
            <small className="hero-mark-note">Guinness World Records and IRONMAN names identify the attempt and race context only. No sponsorship or endorsement is implied.</small>
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
            <p className="film-proof-line">Four race entries are secured. Every next line still needs travel, equipment, health, evidence and funding to work together.</p>
            <div className="film-actions">
              <Link className="button-primary" to="/support">Help Reach the Next Line <Heart size={16} fill="currentColor" /></Link>
              <Link className="button-quiet" to="/partners">Company Partnership <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
        <div className="cinematic-index"><span>03 / 03</span><i /></div>
      </section>
    </div>
  );
}
