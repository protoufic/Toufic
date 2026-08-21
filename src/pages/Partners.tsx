import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bike,
  Building2,
  Camera,
  Check,
  Clock3,
  FileCheck2,
  Globe2,
  HeartPulse,
  Landmark,
  Plane,
  PlayCircle,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { RoutePlans } from '../components/RoutePlans';
import { media, mission, site } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.17 },
  transition: { duration: 0.58 },
};

const callNav = [
  ['01', 'Mission', 'partner-mission'],
  ['02', 'Proof', 'partner-proof'],
  ['03', 'Route', 'partner-route'],
  ['04', 'Needs', 'partner-needs'],
  ['05', 'Fit', 'partner-fit'],
  ['06', 'Value', 'partner-value'],
  ['07', 'Next step', 'partner-next'],
];

const beliefs = [
  { number: '01', title: 'Why Toufic?', copy: 'The story already has proof behind it: an official IRONMAN 70.3 finish at 19, years of race history, and a company built while studying abroad.' },
  { number: '02', title: 'Why now?', copy: 'The application is accepted, the rules are issued, Race 1 is scheduled for 1 November 2026, and the deadline cannot move.' },
  { number: '03', title: 'Why it matters?', copy: 'The mission turns one idea into visible proof: where you start should not decide how far you can go.' },
  { number: '04', title: 'Why your company?', copy: 'Because the mission has real problems to solve. A partner can own one of them instead of sitting beside the story as a logo.' },
];

const proof = [
  { value: '6:08:15', label: 'IRONMAN 70.3 Warsaw at 19', detail: 'Official finish' },
  { value: '25+', label: 'Sira team', detail: 'Founder and CEO' },
  { value: '~60K', label: 'Sira community', detail: 'Built while studying' },
  { value: '8,400+', label: 'LinkedIn followers', detail: 'Current owned audience' },
];

const needs = [
  { icon: Plane, title: 'Global mobility', copy: 'Move the athlete and bicycle safely between continents.', detail: 'Flights · bike transport · travel logistics' },
  { icon: ShieldCheck, title: 'Protection', copy: 'Stop one medical, travel, or equipment issue from ending the attempt.', detail: 'Travel · health · equipment cover' },
  { icon: Building2, title: 'Race week base', copy: 'Create a reliable place to recover, prepare, and perform.', detail: 'Accommodation · race week support' },
  { icon: Bike, title: 'Bike system', copy: 'Build one race ready system that can survive six continents.', detail: 'Bike · fit · service · case · spares' },
  { icon: HeartPulse, title: 'Health and performance', copy: 'Make sure the body can safely restart after each race.', detail: 'Screening · medical oversight · physio · recovery' },
  { icon: Camera, title: 'Story and evidence', copy: 'Capture the journey properly from preparation to final result.', detail: 'Photography · video · production · evidence' },
];

const fits = [
  { type: 'Airline', role: 'Global Mobility Partner', solve: 'Athlete and bike transport', story: 'The journey across six continents' },
  { type: 'Insurance', role: 'Insurance and Risk Partner', solve: 'Health, travel, and equipment cover', story: 'Keeping the attempt moving when risk appears' },
  { type: 'Hotel Group', role: 'Accommodation Partner', solve: 'Race week rooms and recovery base', story: 'Rest, destination, and recovery' },
  { type: 'Bike / Sports', role: 'Bicycle and Technical Partner', solve: 'Bike, fit, service, case, equipment', story: 'Product tested in real conditions' },
  { type: 'Hospital / Clinic', role: 'Health and Performance Partner', solve: 'Screening, oversight, and recovery', story: 'Responsible performance' },
  { type: 'Bank / Telecom / Payment', role: 'Founding Mission Partner', solve: 'Unlock a mission or race chapter', story: 'Youth, ambition, and execution' },
  { type: 'Media / Production', role: 'Content and Media Partner', solve: 'Story capture and distribution', story: 'A six chapter international story' },
];

const partnerValue = [
  { icon: Target, title: 'Named role', copy: 'A clear partner position with category protection where agreed.' },
  { icon: Check, title: 'Real use', copy: 'The product or service is shown doing the job it was built to do.' },
  { icon: Camera, title: 'Content', copy: 'Preparation, travel, race week, race day, recovery, and the next chapter.' },
  { icon: FileCheck2, title: 'Partner assets', copy: 'Approved photography, video, interviews, and campaign material for partner channels.' },
  { icon: Users, title: 'Activation', copy: 'Employee, customer, youth, university, and community moments can be built around the mission.' },
  { icon: Globe2, title: 'Reporting and proof', copy: 'Clear updates, delivered asset tracking, media proof when achieved, and a final case study.' },
];

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function PartnersPage() {
  return (
    <Layout>
      <section className="partner-deck-hero">
        <div className="partner-deck-hero-bg" aria-hidden="true"><img src={media.warsaw.finishWide} alt="" /></div>
        <div className="site-shell partner-deck-hero-grid">
          <div className="partner-deck-hero-copy">
            <p className="eyebrow">15 MINUTE PARTNER WALKTHROUGH</p>
            <h1>Do not sponsor the attempt.<br /><em>Own the part that makes it possible.</em></h1>
            <p className="partner-deck-hero-lead">Six full distance IRONMAN races. Six continents. Before 21. A small group of partners can each make one real part of the mission possible and build value around what they helped make happen.</p>
            <div className="partner-deck-hero-actions">
              <button className="button-primary" onClick={() => goTo('partner-mission')}><PlayCircle size={17} /> Start the 15 minute walkthrough</button>
              <button className="button-quiet" onClick={() => goTo('partner-fit')}>Jump to company fit <ArrowRight size={16} /></button>
            </div>
            <div className="partner-deck-status-row">
              <span><strong>ROUTE B</strong> Preferred</span>
              <span><strong>RACE 1</strong> Argentina · 1 Nov 2026</span>
              <span><strong>DEADLINE</strong> Before 14 Jun 2027</span>
            </div>
          </div>
          <div className="partner-deck-hero-card">
            <figure>
              <img src={media.partnerCover} alt="Toufic Abou Ali crossing the IRONMAN 70.3 Warsaw finish with the Lebanese flag" />
              <figcaption><span>THE PROOF BEFORE THE ATTEMPT</span><strong>IRONMAN 70.3 WARSAW</strong><small>6:08:15 · AGE 19</small></figcaption>
            </figure>
            <div className="partner-deck-record-card">
              <small>GUINNESS WORLD RECORDS APPLICATION</small>
              <strong>Accepted</strong>
              <p>Guidelines issued 5 August 2026 · Pending Evidence</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="partner-call-nav" aria-label="15 minute partner walkthrough chapters">
        <div className="site-shell partner-call-nav-inner">
          {callNav.map(([number, label, id]) => <button key={id} onClick={() => goTo(id)}><span>{number}</span>{label}</button>)}
          <button className="partner-call-nav-cta" onClick={() => openContactPanel('partnership')}>Discuss fit <ArrowRight size={14} /></button>
        </div>
      </nav>

      <section id="partner-mission" className="section partner-deck-section partner-mission-section">
        <div className="site-shell">
          <div className="partner-deck-heading">
            <motion.div {...reveal}>
              <p className="eyebrow">01 · THE MISSION IN 20 SECONDS</p>
              <h2>Six continents.<br />One deadline.<br /><em>One reason to care.</em></h2>
            </motion.div>
            <motion.div {...reveal} className="partner-deck-heading-copy">
              <p>At 20, Toufic Abou Ali is preparing to attempt the Guinness World Records title:</p>
              <blockquote>“{mission.recordTitle}.”</blockquote>
              <p>The target is to complete all six qualifying races before 14 June 2027.</p>
            </motion.div>
          </div>

          <div className="partner-belief-grid">
            {beliefs.map((item, index) => (
              <motion.article key={item.title} {...reveal} transition={{ duration: .5, delay: index * .055 }}>
                <span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
          <div className="partner-manifesto"><span>THE IDEA</span><strong>Where you start should not decide how far you can go.</strong><p>The mission is designed to make that belief visible through six hard, documented chapters.</p></div>
        </div>
      </section>

      <section id="partner-proof" className="section partner-deck-section partner-proof-section">
        <div className="site-shell partner-proof-layout">
          <motion.div {...reveal} className="partner-proof-copy">
            <p className="eyebrow">02 · WHY THIS IS BELIEVABLE</p>
            <h2>The ambition is new.<br /><em>The proof is not.</em></h2>
            <p>The mission starts with a real athletic result, a real operating company, an owned audience, and years of documentation. The next chapter is larger, but it is not starting from zero.</p>
            <div className="partner-proof-status"><Check size={17} /><span>Application accepted · guidelines issued · evidence process underway</span></div>
          </motion.div>
          <div className="partner-proof-grid">
            {proof.map((item, index) => (
              <motion.div key={item.label} {...reveal} transition={{ duration: .5, delay: index * .055 }}>
                <span>{item.detail}</span><strong>{item.value}</strong><p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-route" className="section partner-deck-section partner-route-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">03 · THE SIX CHAPTERS</p>
            <h2>The route is designed around one thing:<br /><em>finishing the whole mission.</em></h2>
            <p>Route B is the preferred operating plan because recovery spacing is materially safer. Route A remains a live backup until the final North America and Europe combination is secured.</p>
          </motion.div>
          <RoutePlans />
        </div>
      </section>

      <section id="partner-needs" className="section partner-deck-section partner-needs-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">04 · WHAT HAS TO WORK</p>
            <h2>I am not looking for one company to fund six races.</h2>
            <p>I am building a small group of serious partners that can each make one real part of the mission possible.</p>
          </motion.div>
          <div className="partner-needs-grid">
            {needs.map((item, index) => (
              <motion.article key={item.title} {...reveal} transition={{ duration: .5, delay: index * .045 }}>
                <div className="partner-need-icon"><item.icon size={22} /></div>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <small>{item.detail}</small>
              </motion.article>
            ))}
          </div>
          <div className="partner-needs-line"><strong>One partner solves one real problem.</strong><span>That becomes part of the story.</span></div>
        </div>
      </section>

      <section id="partner-fit" className="section partner-deck-section partner-fit-section">
        <div className="site-shell">
          <motion.div {...reveal} className="partner-fit-heading">
            <div><p className="eyebrow">05 · WHERE YOUR COMPANY FITS</p><h2>See yourself inside the mission in seconds.</h2></div>
            <p>There is no generic package to squeeze a company into. The role starts with the problem the company can genuinely own.</p>
          </motion.div>
          <div className="partner-fit-table" role="table" aria-label="Potential partner roles">
            <div className="partner-fit-row partner-fit-row-head" role="row"><span>COMPANY</span><span>ROLE</span><span>WHAT IT SOLVES</span><span>WHAT THE STORY BECOMES</span></div>
            {fits.map((item, index) => (
              <motion.div key={item.type} {...reveal} transition={{ duration: .44, delay: index * .035 }} className="partner-fit-row" role="row">
                <strong>{item.type}</strong><span>{item.role}</span><span>{item.solve}</span><span>{item.story}</span>
              </motion.div>
            ))}
          </div>
          <div className="partner-fit-callout"><Landmark size={22} /><p><strong>Best fit:</strong> the company that can own one clear part of the attempt and turn that contribution into useful business value.</p></div>
        </div>
      </section>

      <section id="partner-value" className="section partner-deck-section partner-value-deck-section">
        <div className="site-shell">
          <motion.div {...reveal} className="partner-value-title">
            <p className="eyebrow">06 · WHAT A PARTNER ACTUALLY GETS</p>
            <h2>Not a logo beside the story.<br /><em>A real role inside it.</em></h2>
          </motion.div>
          <div className="partner-value-deck-grid">
            {partnerValue.map((item, index) => (
              <motion.article key={item.title} {...reveal} transition={{ duration: .48, delay: index * .045 }}>
                <item.icon size={22} /><h3>{item.title}</h3><p>{item.copy}</p>
              </motion.article>
            ))}
          </div>

          <div className="partner-story-system">
            <motion.div {...reveal}><span>BEFORE</span><strong>Help build it</strong><p>The partner solves a real need before the first chapter starts.</p></motion.div>
            <motion.div {...reveal}><span>DURING</span><strong>Appear in real use</strong><p>The company is present through the preparation, travel, race, and recovery chapters it helps enable.</p></motion.div>
            <motion.div {...reveal}><span>AFTER</span><strong>Own the proof</strong><p>The journey becomes reusable content, delivered assets, partner reporting, and a final campaign case study.</p></motion.div>
          </div>
          <p className="partner-value-close">The strongest partner story is not “we appeared after the result.” It is “we helped make the result possible.”</p>
        </div>
      </section>

      <section id="partner-next" className="partner-deck-next">
        <div className="site-shell partner-deck-next-grid">
          <motion.div {...reveal} className="partner-deck-next-copy">
            <p className="eyebrow">07 · THE NEXT STEP</p>
            <h2>15 minutes.<br />One question:</h2>
            <strong>What part should your company own?</strong>
            <p>This page is the conversation. No generic sponsorship deck is needed before we understand the fit.</p>
          </motion.div>
          <div className="partner-scope-cards">
            <motion.article {...reveal}><span>01</span><h3>Whole mission</h3><p>A major role across all six chapters for a company that wants the broadest story and activation scope.</p></motion.article>
            <motion.article {...reveal}><span>02</span><h3>One category</h3><p>Own one core need across the mission, such as mobility, insurance, accommodation, bike, or health.</p></motion.article>
            <motion.article {...reveal}><span>03</span><h3>One race chapter</h3><p>Unlock one specific continent with a focused story, clear use, and clear activation.</p></motion.article>
          </div>
        </div>
        <div className="site-shell partner-deck-close">
          <div>
            <Clock3 size={20} />
            <p>After the conversation, only one custom proposal is built around the company’s goals: exact role, deliverables, rights, activation, KPIs, timeline, support, and next decision date.</p>
          </div>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss the right role <ArrowRight size={16} /></button>
        </div>
        <div className="site-shell partner-contact-strip">
          <span>Toufic Abou Ali · Lebanese Founder and Athlete</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <span>toufic.co</span>
        </div>
      </section>
    </Layout>
  );
}
