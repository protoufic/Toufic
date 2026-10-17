import { motion } from 'framer-motion';
import { ArrowRight, Building2, ExternalLink, Heart, ShieldCheck, TimerReset, Globe2, Camera, Users, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ScrollHero } from '../components/ScrollHero';
import { WorldMap } from '../components/WorldMap';
import { media, quotes, siraMetrics, site, warsawRace } from '../data/mission';
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
          <h2>A full distance IRONMAN ends with a marathon.</h2>
          <p>The 42.19 km run starts only after a 3.85 km swim and a 180 km bike ride.</p>
        </motion.div>

        <div className="distance-equation">
          <motion.div {...reveal} className="distance-discipline distance-swim">
            <span>SWIM</span><strong>3.85</strong><small>KM</small>
          </motion.div>
          <div className="distance-plus">+</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .08 }} className="distance-discipline distance-bike">
            <span>BIKE</span><strong>180</strong><small>KM</small>
          </motion.div>
          <div className="distance-plus">+</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .16 }} className="distance-discipline distance-run">
            <span>RUN</span><strong>42.19</strong><small>KM</small>
          </motion.div>
          <div className="distance-equals">=</div>
          <motion.div {...reveal} transition={{ duration: .62, delay: .22 }} className="distance-total">
            <strong>226</strong><span>KM</span><small>ONE FULL IRONMAN</small>
          </motion.div>
        </div>

        <div className="six-scale">
          <div className="six-scale-copy">
            <p className="eyebrow">MULTIPLY IT BY SIX</p>
            <h3>About 1,356 km across six continents.</h3>
            <p>Distance is only the visible part. Every chapter also needs entry, visas, travel, equipment, recovery, evidence, and production.</p>
          </div>
          <div className="six-scale-numbers">
            <div><strong>23.1</strong><span>km swimming</span></div>
            <div><strong>1,080</strong><span>km cycling</span></div>
            <div><strong>253.14</strong><span>km running</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyNowSection() {
  const items = [
    { icon: TimerReset, title: 'Race 1 is 1 November 2026', copy: 'San Juan starts the first full distance chapter of a six-continent race calendar.' },
    { icon: ShieldCheck, title: 'Evidence starts before every race', copy: 'Witnesses, travel proof, photos, and video must be planned before each start.' },
    { icon: Globe2, title: 'Five entries are secured', copy: 'Argentina, Oman, New Zealand, South Africa, and Austria are secured. Jacksonville remains to be secured.' },
  ];
  return (
    <section className="section urgency-section visual-backdrop-section">
      <div className="section-backdrop" aria-hidden="true"><img src={media.warsaw.bikeCourse} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell urgency-grid">
        <motion.div {...reveal} className="urgency-lead">
          <p className="eyebrow">WHY THE ATTEMPT STARTS NOW</p>
          <h2>The mission is no longer an idea. It is now a calendar.</h2>
          <p>Five entries are secured. The races, travel, bicycle, health, funding, witnesses, and evidence must now work as one system.</p>
          <div className="home-section-actions"><Link className="button-primary" to="/support">Help Reach the Next Line <Heart size={16} fill="currentColor" /></Link><Link className="button-quiet" to="/partners">Company Partnership <ArrowRight size={16} /></Link></div>
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
            <p className="eyebrow">RECORD STATUS</p>
            <h2>Official attempt in progress.</h2>
            <p>The Guinness World Records application was accepted and official guidelines were issued. No record is claimed. Final recognition remains subject to completion of the attempt and Guinness World Records evidence review.</p>
            <a className="inline-link" href={site.recordSource} target="_blank" rel="noreferrer">View the current listed benchmark <ExternalLink size={15} /></a>
          </div>
          <div className="home-record-checks" aria-label="Guinness World Records attempt status">
            <span><strong>01</strong><small>APPLICATION</small><b>Accepted</b></span>
            <span><strong>02</strong><small>GUIDELINES</small><b>Issued</b></span>
            <span><strong>03</strong><small>RECORD</small><b>Not claimed</b></span>
          </div>
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
          <p>Toufic completed his first IRONMAN 70.3 at 19. The Lebanese Triathlon Federation featured him as the youngest Lebanese athlete to complete an IRONMAN 70.3. The race also showed exactly what must improve for the full distance mission.</p>
          <a className="inline-link" href={site.federationFeature} target="_blank" rel="noreferrer">View the Federation feature <ExternalLink size={15} /></a>
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
          <p className="eyebrow">THE SIX REQUIRED REGIONS</p>
          <h2>Six qualifying races. Six required regions.</h2>
          <p>Argentina, Oman, New Zealand, South Africa, and Austria are secured. Jacksonville is the remaining planned entry, with Austria–Kärnten as the final race on 13 June 2027.</p>
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
    { value: `${raceMetrics.totalEntries}+`, label: 'races locally and internationally' },
    { value: `${raceMetrics.verifiedPodiums}+`, label: 'podium finishes' },
    { value: '2', label: 'full marathons completed' },
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
          <p>Toufic is Co Founder and Co CEO of Sira while studying abroad and building as an endurance athlete. The same work behind teams, systems, deadlines, and partnerships now has to carry a global race campaign.</p>
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
          <h2>Do not sponsor a logo. Own the part that makes the mission possible.</h2>
          <p>Travel. Insurance. Accommodation. Bicycle support. Health. Final race access. Story and evidence. Your company solves a visible problem and receives a role people can understand.</p>
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
    <section className="final-cta home-final-support visual-backdrop-section">
      <div className="section-backdrop section-backdrop-final" aria-hidden="true"><img src={media.warsaw.postFlag} alt="" loading="lazy" decoding="async" /></div>
      <div className="site-shell home-final-support-grid">
        <div>
          <p className="eyebrow">TWO WAYS TO STAND BEHIND THE MISSION</p>
          <h2>Support personally.<br />Or build a company role.</h2>
          <p className="home-final-support-intro">Individuals can fund the next starting line in seconds. Companies can own a real part of the mission with clear value and deliverables.</p>
        </div>
        <div className="home-final-choice-grid">
          <Link to="/support"><Heart size={24} fill="currentColor" /><span><small>FOR PEOPLE</small><strong>Fund the Mission</strong><em>International or Lebanon. Two clicks.</em></span><ArrowRight size={18} /></Link>
          <Link to="/partners"><Building2 size={24} /><span><small>FOR COMPANIES</small><strong>Become a Partner</strong><em>Own a real problem the mission needs solved.</em></span><ArrowRight size={18} /></Link>
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
