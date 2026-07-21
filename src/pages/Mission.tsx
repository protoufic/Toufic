import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock3, FileCheck2, Plane, Stethoscope, WalletCards } from 'lucide-react';
import { Layout } from '../components/Layout';
import { DualCountdown } from '../components/Countdown';
import { WorldMap } from '../components/WorldMap';
import { media, mission, site } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

const chapterSteps = [
  'Preparation',
  'Travel',
  'Race week',
  'Race day',
  'Result',
  'Lesson',
  'Partner activation',
  'Report',
];

const gates = [
  { icon: FileCheck2, label: 'Record rules and qualifying race confirmed' },
  { icon: Check, label: 'Entry secured' },
  { icon: Plane, label: 'Visa and travel viable' },
  { icon: Stethoscope, label: 'Medical and recovery spacing approved' },
  { icon: WalletCards, label: 'Funding and technical support controlled' },
  { icon: Clock3, label: 'Evidence, content, and reporting system ready' },
];

export function MissionPage() {
  return (
    <Layout>
      <section className="page-hero mission-page-hero">
        <img src={media.missionWide} alt="Toufic Abou Ali in front of the Six Continents map" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">THE MISSION</p>
          <h1>Six full IRONMAN races.<br />Six continents.<br /><em>One world-record attempt.</em></h1>
          <p>1,356 km built as one global campaign from Lebanon to the world.</p>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss the Mission <ArrowRight size={16} /></button>
        </div>
      </section>

      <section className="section mission-summary-section">
        <div className="site-shell mission-summary-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE TARGET</p>
            <h2>Become the youngest male to complete official full IRONMAN races on six continents.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>Toufic is a 20-year-old Lebanese founder-athlete. The current listed benchmark is {mission.benchmark.age}. The main target is November 27, 2027. The extreme target is to complete all six before turning 21.</p>
            <p>Application and final rules remain pending. The record and every finish must be earned.</p>
          </motion.div>
        </div>
      </section>

      <section className="section mission-distance-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">THE DISTANCE</p>
            <h2>One race is 226 km. Six races are 1,356 km.</h2>
          </motion.div>
          <div className="mission-distance-grid">
            <div><strong>3.8</strong><span>km swim per race</span><small>22.8 km total</small></div>
            <div><strong>180</strong><span>km bike per race</span><small>1,080 km total</small></div>
            <div><strong>42.2</strong><span>km run per race</span><small>253.2 km total</small></div>
            <div className="mission-distance-total"><strong>1,356</strong><span>kilometres across six continents</span></div>
          </div>
        </div>
      </section>

      <section className="section mission-deadline-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">TWO TARGETS</p>
            <h2>The main deadline is the record target. The extreme deadline raises the standard.</h2>
          </motion.div>
          <DualCountdown />
          <div className="source-note">Current listed record: <a href={site.recordSource} target="_blank" rel="noreferrer">{mission.benchmark.holder}, {mission.benchmark.age}</a>. Guinness World Records notes that records can change before online pages are updated.</div>
        </div>
      </section>

      <section className="section campaign-system-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">ONE CAMPAIGN. SIX CHAPTERS.</p>
            <h2>This is not six random races.</h2>
            <p>Every continent follows the same clear structure, giving the mission continuity and giving a partner repeatable value.</p>
          </motion.div>
          <div className="chapter-track">
            {chapterSteps.map((step, index) => (
              <motion.div key={step} {...reveal} transition={{ duration: .45, delay: index * .045 }}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section readiness-section">
        <div className="site-shell readiness-grid">
          <motion.div {...reveal} className="readiness-copy">
            <p className="eyebrow">NO RACE IS ANNOUNCED BEFORE IT IS CONTROLLED</p>
            <h2>The route is built through gates, not guesses.</h2>
            <p>Every event must work for the record, athlete, passport, calendar, recovery plan, budget, and evidence system.</p>
          </motion.div>
          <div className="readiness-list">
            {gates.map((gate, index) => (
              <motion.div key={gate.label} {...reveal} transition={{ duration: .5, delay: index * .06 }}>
                <gate.icon size={21} /><span>{gate.label}</span><small>0{index + 1}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mission-map-page">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">THE GLOBAL ROUTE</p>
            <h2>Six continents. Final races announced only when secured.</h2>
          </motion.div>
          <WorldMap />
        </div>
      </section>

      <section className="section early-partner-section">
        <div className="site-shell early-partner-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">WHY EARLY MATTERS</p>
            <h2>The origin can only be owned once.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>A founding partner joins before the first full-race chapter is secured. That creates more room to shape the platform, integrate the brand, build the launch, and own the beginning of the story.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Founding Position <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
