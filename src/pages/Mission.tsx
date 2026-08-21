import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock3, FileCheck2, Plane, Stethoscope, WalletCards } from 'lucide-react';
import { Layout } from '../components/Layout';
import { DualCountdown } from '../components/Countdown';
import { WorldMap } from '../components/WorldMap';
import { RoutePlans } from '../components/RoutePlans';
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
  'Official result',
  'Evidence',
  'Partner activation',
  'Report',
];

const gates = [
  { icon: FileCheck2, label: 'Official sanction, full distance, and correct region confirmed' },
  { icon: Check, label: 'Entry secured' },
  { icon: Plane, label: 'Visa and travel viable' },
  { icon: Stethoscope, label: 'Medical and recovery spacing approved' },
  { icon: WalletCards, label: 'Funding and technical support controlled' },
  { icon: Clock3, label: 'Organiser, witnesses, travel proof, photos, and video ready' },
];

export function MissionPage() {
  return (
    <Layout>
      <section className="page-hero mission-page-hero">
        <img src={media.missionWide} alt="Toufic Abou Ali in front of the Six Continents map" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">SIX CONTINENTS WORLD RECORD</p>
          <h1>Six full distance IRONMAN races.<br />Six continents.<br /><em>One world record attempt.</em></h1>
          <p>Application accepted. Official guidelines issued 5 August 2026. Status: Pending Evidence.</p>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partner Role <ArrowRight size={16} /></button>
        </div>
      </section>

      <section className="section mission-summary-section">
        <div className="site-shell mission-summary-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE ACCEPTED APPLICATION TITLE</p>
            <h2>Youngest person to complete an IRONMAN® triathlon on six continents (male).</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>Guinness World Records accepted Toufic’s application and issued the official guidelines on 5 August 2026. He must complete one qualifying full distance race in North America, South America, Europe, Africa, Asia, and Australasia.</p>
            <p>No record is claimed. The result will only be determined after all six races are completed and the full evidence is reviewed. Toufic’s personal target is to finish before turning 21.</p>
          </motion.div>
        </div>
      </section>

      <section className="section mission-distance-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">THE DISTANCE</p>
            <h2>One race is about 226 km. Six races are about 1,356 km.</h2>
          </motion.div>
          <div className="mission-distance-grid">
            <div><strong>3.85</strong><span>km swim per race</span><small>23.1 km total</small></div>
            <div><strong>180</strong><span>km bike per race</span><small>1,080 km total</small></div>
            <div><strong>42.19</strong><span>km run per race</span><small>253.14 km total</small></div>
            <div className="mission-distance-total"><strong>≈1,356</strong><span>kilometres across six continents</span></div>
          </div>
        </div>
      </section>

      <section className="section mission-deadline-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">THE AGE TARGET</p>
            <h2>Beat the current listed age. Personal target: finish all six before 21.</h2>
          </motion.div>
          <DualCountdown />
          <div className="source-note">Current listed record: <a href={site.recordSource} target="_blank" rel="noreferrer">{mission.benchmark.holder}, {mission.benchmark.age}</a>. Guinness World Records notes that records can change before online pages are updated.</div>
        </div>
      </section>

      <section className="section campaign-system-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">SIX RACES. ONE EVIDENCE SYSTEM.</p>
            <h2>Every race must be finished and proved.</h2>
            <p>Every race needs an official result, organiser confirmation, independent verification, travel proof, photographs, and video.</p>
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
            <p className="eyebrow">A PLANNED RACE STILL HAS TO PASS EVERY EXECUTION CHECK</p>
            <h2>A route is only useful if every chapter can actually be executed and proved.</h2>
            <p>Every event still has to pass the official rules, entry, visa, travel, medical, recovery, funding, organiser, witness, and evidence checks.</p>
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

      <section className="section mission-route-plan-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">THE OPERATING ROUTE</p>
            <h2>Route B is preferred. Route A stays live as the backup.</h2>
            <p>Both routes cover all six required regions. The difference is the final North America and Europe combination, and the recovery risk created by that sequence.</p>
          </motion.div>
          <RoutePlans />
        </div>
      </section>

      <section className="section mission-map-page">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">THE GLOBAL VIEW</p>
            <h2>Six required regions. Two live route plans.</h2>
            <p>Explore each continent to see the preferred Route B chapter and the Route A backup where the plans differ.</p>
          </motion.div>
          <WorldMap />
        </div>
      </section>

      <section className="section early-partner-section">
        <div className="site-shell early-partner-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">WHY EARLY MATTERS</p>
            <h2>The first chapter can only be built once.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>The first partners join while the route is being secured. Each partner removes one real risk and becomes part of the documented beginning, not only the final result.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partner Role <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
