import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ShieldCheck, TimerReset, Globe2, Camera, Users, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ScrollHero } from '../components/ScrollHero';
import { DualCountdown } from '../components/Countdown';
import { WorldMap } from '../components/WorldMap';
import { mission, media, quotes, siraMetrics, site, warsawRace } from '../data/mission';
import { personalBests, raceMetrics } from '../data/metrics';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.62 },
};

function ScaleSection() {
  return (
    <section className="section scale-section">
      <div className="site-shell">
        <motion.div {...reveal} className="section-heading section-heading-wide">
          <p className="eyebrow">UNDERSTAND THE SCALE</p>
          <h2>One IRONMAN already ends with a marathon.</h2>
          <p>The 42.2 km run starts only after a 3.8 km swim and a 180 km bike ride.</p>
        </motion.div>

        <div className="distance-equation">
          <motion.div {...reveal} className="distance-discipline distance-swim">
            <span>SWIM</span><strong>3.8</strong><small>KM</small>
          </motion.div>
          <div className="distance-plus">+</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .08 }} className="distance-discipline distance-bike">
            <span>BIKE</span><strong>180</strong><small>KM</small>
          </motion.div>
          <div className="distance-plus">+</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .16 }} className="distance-discipline distance-run">
            <span>RUN</span><strong>42.2</strong><small>KM</small>
          </motion.div>
          <div className="distance-equals">=</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .22 }} className="distance-total">
            <strong>226</strong><span>KM</span><small>ONE FULL IRONMAN</small>
          </motion.div>
        </div>

        <div className="six-scale">
          <div className="six-scale-copy">
            <p className="eyebrow">MULTIPLY IT BY SIX</p>
            <h3>1,356 km across six continents.</h3>
            <p>Distance is only the visible part. Every chapter also needs entry, visas, travel, equipment, recovery, evidence, and production.</p>
          </div>
          <div className="six-scale-numbers">
            <div><strong>22.8</strong><span>km swimming</span></div>
            <div><strong>1,080</strong><span>km cycling</span></div>
            <div><strong>253.2</strong><span>km running</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyNowSection() {
  const items = [
    { icon: TimerReset, title: 'Race windows move early', copy: 'The route cannot be secured after entries, travel windows, and preparation time disappear.' },
    { icon: ShieldCheck, title: 'Readiness starts before registration', copy: 'Coaching, medical checks, bike fit, open water, fueling, and evidence systems must be built first.' },
    { icon: Globe2, title: 'The founding position exists now', copy: 'A partner joining before the first full race is secured becomes part of the origin, not only the result.' },
  ];
  return (
    <section className="section urgency-section visual-backdrop-section">
      <div className="section-backdrop" aria-hidden="true"><img src={media.warsaw.bikeCourse} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell urgency-grid">
        <motion.div {...reveal} className="urgency-lead">
          <p className="eyebrow">WHY THE MISSION MUST LAUNCH NOW</p>
          <h2>The first finish line is not the first deadline.</h2>
          <p>The campaign has to begin before the route is locked. The preparation, entries, travel, equipment, and proof system move first.</p>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Help secure the first chapter <ArrowRight size={16} /></button>
        </motion.div>
        <div className="urgency-list">
          {items.map((item, index) => (
            <motion.article key={item.title} {...reveal} transition={{ duration: .55, delay: index * .08 }}>
              <item.icon size={22} />
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              <span>0{index + 1}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecordSection() {
  return (
    <section className="section record-section visual-backdrop-section">
      <div className="section-backdrop section-backdrop-map" aria-hidden="true"><img src={media.missionWide} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell">
        <motion.div {...reveal} className="record-panel">
          <div className="record-copy">
            <p className="eyebrow">THE WORLD-RECORD TARGET</p>
            <h2>The main target is November 27, 2027.</h2>
            <p>The current listed benchmark is {mission.benchmark.age}. The extreme target is harder: complete all six before Toufic turns 21.</p>
            <a className="inline-link" href={site.recordSource} target="_blank" rel="noreferrer">View the current listed record <ExternalLink size={15} /></a>
          </div>
          <DualCountdown />
        </motion.div>
      </div>
    </section>
  );
}

function WarsawSection() {
  return (
    <section className="section warsaw-origin">
      <div className="site-shell warsaw-origin-grid">
        <motion.figure {...reveal} className="warsaw-origin-media">
          <img src={media.warsaw.finishLebanon} alt="Toufic Abou Ali crossing the IRONMAN 70.3 Warsaw finish with the Lebanese flag" loading="lazy" />
          <figcaption><span>IRONMAN 70.3 WARSAW</span><strong>{warsawRace.total}</strong><small>OFFICIAL FINISH</small></figcaption>
        </motion.figure>
        <motion.div {...reveal} className="warsaw-origin-copy">
          <p className="eyebrow">WHERE THE MISSION STARTED</p>
          <h2>IRONMAN 70.3 Warsaw showed the gap.</h2>
          <p>Toufic completed his first IRONMAN 70.3 at 19. He finished. The race also showed exactly what was missing: outdoor cycling, open-water preparation, brick training, race simulation, transitions, fueling, and technical execution.</p>
          <blockquote>“{quotes[3]}”</blockquote>
          <div className="split-strip" aria-label="Warsaw race splits">
            <span><small>Swim</small><strong>{warsawRace.splits.swim}</strong></span>
            <span><small>Bike</small><strong>{warsawRace.splits.bike}</strong></span>
            <span><small>Run</small><strong>{warsawRace.splits.run}</strong></span>
          </div>
          <Link className="button-quiet" to="/warsaw">View the full Warsaw story <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="section map-section">
      <div className="site-shell">
        <motion.div {...reveal} className="section-heading">
          <p className="eyebrow">THE SIX CHAPTERS</p>
          <h2>The mission is public. The final route is being secured.</h2>
          <p>No race is presented as confirmed until the entry, rules, travel, recovery, funding, and evidence requirements are controlled.</p>
        </motion.div>
        <WorldMap />
      </div>
    </section>
  );
}

function ProofSection() {
  const proof = [
    { value: warsawRace.total, label: 'IRONMAN 70.3 Warsaw at 19' },
    { value: personalBests.halfMarathon.time, label: 'Half-marathon best' },
    { value: personalBests.tenK.time, label: '10 km best' },
    { value: '2', label: 'Marathons before 20' },
    { value: `${raceMetrics.verifiedPodiums}+`, label: 'Documented podium results' },
  ];
  return (
    <section className="section proof-section">
      <div className="site-shell">
        <div className="proof-heading-row">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">THE PROOF BEFORE THE MISSION</p>
            <h2>The story already has results behind it.</h2>
          </motion.div>
          <Link className="button-quiet" to="/proof">View the full proof archive <ArrowRight size={16} /></Link>
        </div>
        <div className="proof-number-grid">
          {proof.map((item, index) => (
            <motion.div key={item.label} {...reveal} transition={{ duration: .52, delay: index * .05 }}>
              <strong>{item.value}</strong><span>{item.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="proof-image-rail">
          <figure><img src="/assets/img/races/2025-beirut-wide.webp" alt="Toufic at the Beirut Marathon" loading="lazy" /><figcaption>MARATHON</figcaption></figure>
          <figure><img src="/assets/img/races/2023-isf.webp" alt="Toufic on the ISF Half Marathon podium" loading="lazy" /><figcaption>PODIUMS</figcaption></figure>
          <figure><img src={media.warsaw.run} alt="Toufic running at IRONMAN 70.3 Warsaw" loading="lazy" /><figcaption>IRONMAN 70.3</figcaption></figure>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="section founder-home-section">
      <div className="site-shell founder-home-grid">
        <motion.div {...reveal} className="founder-portrait-frame">
          <img src={media.founder} alt="Toufic Abou Ali" loading="lazy" />
          <div><span>FOUNDER & CEO</span><strong>SIRA</strong></div>
        </motion.div>
        <motion.div {...reveal} className="founder-home-copy">
          <p className="eyebrow">WHY TOUFIC CAN BUILD THE CAMPAIGN</p>
          <h2>The mission is athletic. The execution is operational.</h2>
          <p>Toufic is Founder & CEO of Sira while studying abroad and building as an endurance athlete. The same work behind teams, systems, deadlines, and partnerships now has to carry a global race campaign.</p>
          <div className="sira-metrics-mini">
            {siraMetrics.slice(0, 4).map((item) => <span key={item.label}><strong>{item.value}</strong><small>{item.label}</small></span>)}
          </div>
          <Link className="button-quiet" to="/founder">Meet Toufic <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const value = [
    { icon: Camera, title: 'Global content', copy: 'Preparation, travel, race week, race day, result, and recap across six chapters.' },
    { icon: PackageCheck, title: 'Real use', copy: 'Products and services used in difficult, documented conditions.' },
    { icon: Users, title: 'People activation', copy: 'Employees, customers, universities, and communities can take part.' },
    { icon: Globe2, title: 'Brand position', copy: 'Endurance, execution, Lebanon, and international ambition in one campaign.' },
  ];
  return (
    <section className="section partners-home-section visual-backdrop-section">
      <div className="section-backdrop section-backdrop-partners" aria-hidden="true"><img src={media.warsaw.finishWide} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell partners-home-grid">
        <motion.div {...reveal} className="partners-home-copy">
          <p className="eyebrow">THE PARTNERSHIP OPPORTUNITY</p>
          <h2>This is a campaign a partner can use.</h2>
          <p>A partner is not buying a logo placement. The company receives a campaign built around its objective, with agreed content, activation, rights, and reporting.</p>
          <div className="partners-home-actions">
            <Link className="button-primary" to="/partners">View Partnership Opportunities <ArrowRight size={16} /></Link>
            <button className="button-quiet" onClick={() => openContactPanel('partnership')}>Talk directly to Toufic</button>
          </div>
        </motion.div>
        <div className="partner-value-grid">
          {value.map((item, index) => (
            <motion.article key={item.title} {...reveal} transition={{ duration: .5, delay: index * .06 }}>
              <item.icon size={21} /><h3>{item.title}</h3><p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta visual-backdrop-section">
      <div className="section-backdrop section-backdrop-final" aria-hidden="true"><img src={media.warsaw.postFlag} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell final-cta-inner">
        <div>
          <p className="eyebrow">START WITH THE COMPANY GOAL</p>
          <h2>Tell me your goal.<br />I will build the right proposal.</h2>
        </div>
        <div>
          <p>Brand awareness. Product proof. Employee engagement. Customer activation. Lebanese positioning. Technical support.</p>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partnership <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <Layout>
      <ScrollHero />
      <ScaleSection />
      <WhyNowSection />
      <RecordSection />
      <WarsawSection />
      <MapSection />
      <ProofSection />
      <FounderSection />
      <PartnersSection />
      <FinalCta />
    </Layout>
  );
}
