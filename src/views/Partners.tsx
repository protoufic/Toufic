import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bike,
  Building2,
  Camera,
  Check,
  CircleDollarSign,
  Eye,
  FileCheck2,
  Film,
  Globe2,
  Handshake,
  HeartPulse,
  Hotel,
  LineChart,
  Megaphone,
  MessageCircle,
  PackageCheck,
  Plane,
  Presentation,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { media, mission, preferredRoute, site, warsawRace } from '../data/mission';
import { personalBests, raceMetrics } from '../data/metrics';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.56 },
};

const proof = [
  { value: `${raceMetrics.totalEntries}+`, label: 'races locally and internationally' },
  { value: `${raceMetrics.verifiedPodiums}+`, label: 'podium finishes' },
  { value: '2', label: 'full marathons completed' },
  { value: personalBests.halfMarathon.time, label: 'half marathon best' },
  { value: warsawRace.total, label: 'first IRONMAN 70.3 at 19' },
];

const needs = [
  { icon: Plane, title: 'Global mobility', copy: 'Flights, bicycle transport, visas, and reliable movement across six continents.' },
  { icon: ShieldCheck, title: 'Protection', copy: 'Travel, health, and equipment cover that protects the attempt when plans change.' },
  { icon: Hotel, title: 'Race week base', copy: 'Accommodation and local support for preparation, recovery, and race execution.' },
  { icon: Bike, title: 'Bicycle system', copy: 'A race ready bicycle, fit, travel case, service, spares, and technical support.' },
  { icon: HeartPulse, title: 'Health and performance', copy: 'Medical oversight, physiotherapy, nutrition, testing, and recovery support.' },
  { icon: CircleDollarSign, title: 'Race access and funding', copy: 'Registrations, travel, and the core costs behind all six race chapters.' },
  { icon: Camera, title: 'Story and evidence', copy: 'Content production and disciplined proof capture from preparation to final review.' },
];

const companyFit = [
  { company: 'Airline or travel', role: 'Global Mobility Partner', action: 'Move Toufic and the bicycle', story: 'Six continents made reachable' },
  { company: 'Insurance', role: 'Insurance and Risk Partner', action: 'Protect health, travel, and equipment', story: 'Ambition protected by preparation' },
  { company: 'Hotel or property', role: 'Accommodation Partner', action: 'Create the race week base', story: 'Rest, place, and recovery' },
  { company: 'Bicycle or sports', role: 'Bicycle and Technical Partner', action: 'Build the race system', story: 'Products used in real conditions' },
  { company: 'Hospital or clinic', role: 'Health and Performance Partner', action: 'Support safe performance', story: 'Responsible ambition' },
  { company: 'Bank, telecom, or payment', role: 'Founding Mission Partner', action: 'Unlock a chapter or core cost', story: 'Youth, access, and execution' },
  { company: 'Media or production', role: 'Content and Media Partner', action: 'Capture and distribute the story', story: 'Six international chapters' },
];

const value = [
  { icon: Globe2, group: 'Visibility', title: 'Six continent visibility', copy: 'Your company can appear across six international race chapters, from preparation to the final finish.' },
  { icon: Eye, group: 'Visibility', title: 'Clear brand presence', copy: 'Agreed visibility on relevant content, equipment, appearances, and campaign material.' },
  { icon: Megaphone, group: 'Visibility', title: 'Social media exposure', copy: 'Planned posts, stories, tags, partner credits, race updates, and milestone content.' },
  { icon: Target, group: 'Visibility', title: 'Media opportunities', copy: 'A ready story, facts, images, and interviews that can support press outreach. Earned coverage is never guaranteed.' },
  { icon: Camera, group: 'Content', title: 'Original photos and video', copy: 'Approved race, travel, training, recovery, and behind the scenes assets for agreed use.' },
  { icon: Film, group: 'Content', title: 'A story that keeps moving', copy: 'Six races create repeated moments instead of one short campaign that disappears after a single event.' },
  { icon: Building2, group: 'Content', title: 'Content for company channels', copy: 'Agreed assets can be adapted for social media, websites, internal updates, events, and campaigns.' },
  { icon: PackageCheck, group: 'Proof', title: 'Product or service in action', copy: 'Show what your company provides while it solves a real need during the mission.' },
  { icon: Trophy, group: 'Position', title: 'Category exclusivity', copy: 'Where agreed, your company can be the only mission partner in its business category.' },
  { icon: ShieldCheck, group: 'Position', title: 'A recognised partner role', copy: 'Be clearly credited as the company that made the agreed part of the mission possible.' },
  { icon: Users, group: 'People', title: 'Employee engagement', copy: 'Talks, questions and answers, wellbeing ideas, goal setting, and internal mission updates.' },
  { icon: Building2, group: 'People', title: 'Employer brand', copy: 'Show current and future employees the kind of ambition, discipline, and purpose your company supports.' },
  { icon: Handshake, group: 'People', title: 'Customer and community moments', copy: 'Build agreed events, challenges, competitions, meetups, or digital activations around the journey.' },
  { icon: Presentation, group: 'People', title: 'Appearances and speaking', copy: 'Agreed interviews, company visits, events, workshops, and conversations with Toufic.' },
  { icon: HeartPulse, group: 'Meaning', title: 'Youth and ambition', copy: 'Connect the company with discipline, resilience, health, entrepreneurship, and young Lebanese ambition.' },
  { icon: Globe2, group: 'Meaning', title: 'Lebanon on an international stage', copy: 'Help carry a serious Lebanese story through six countries and bring every chapter back home.' },
  { icon: LineChart, group: 'Proof', title: 'Measured delivery', copy: 'Receive a clear record of agreed posts, assets, appearances, reach, engagement, and completed deliverables.' },
  { icon: FileCheck2, group: 'Proof', title: 'Final case study', copy: 'Turn the partnership into one usable story showing the need, the company role, the work, and the outcome.' },
];

const routeFlags: Record<string, string> = {
  Argentina: '🇦🇷',
  Oman: '🇴🇲',
  'New Zealand': '🇳🇿',
  'South Africa': '🇿🇦',
  'United States': '🇺🇸',
  Germany: '🇩🇪',
};

const scopes = [
  { number: '01', title: 'Whole mission', copy: 'A leading role across all six race chapters.' },
  { number: '02', title: 'One category', copy: 'Own one core need throughout the attempt.' },
  { number: '03', title: 'One race chapter', copy: 'Unlock one continent with a focused role.' },
  { number: '04', title: 'One specific need', copy: 'Provide the product, service, access, or funding that solves it.' },
];

const faqs = [
  {
    q: 'Is the Guinness World Records title already confirmed?',
    a: 'No. The application has been accepted and the official guidelines were issued on 5 August 2026. Recognition depends on completing all six races, submitting the required evidence, and passing the final review.',
  },
  {
    q: 'Where will the six race chapters happen?',
    a: 'The six race plan covers San Juan in Argentina, Oman, New Zealand, South Africa, Jacksonville in the United States, and Hamburg in Germany.',
  },
  {
    q: 'Does a company need to fund the whole mission?',
    a: 'A lead company can fund and own the full six race mission. A company can also choose one category, one race chapter, or one specific need. Support can be financial, product, service, access, or a useful mix.',
  },
  {
    q: 'What is promised before an agreement?',
    a: 'Nothing vague. The role, contribution, rights, deliverables, approvals, owners, dates, useful measures, and reporting are written into one custom proposal.',
  },
  {
    q: 'Is media coverage guaranteed?',
    a: 'No. The mission creates credible media opportunities and strong partner assets. Earned coverage is never promised unless it is already confirmed.',
  },
];

export function PartnersPage() {
  return (
    <Layout>
      <section className="partners-hero-split partner-deck-hero">
        <div className="site-shell partners-hero-grid">
          <div className="partners-hero-copy">
            <p className="eyebrow">PARTNER BRIEF · BUILT FOR A FIRST CONVERSATION</p>
            <h1><em>Own the part that makes six continents possible.</em></h1>
            <p>Six full distance races. Six continents. One Lebanese mission before age 21. Your company can make a real part possible and receive clear visibility, useful content, product use, audience engagement, and measured delivery in return.</p>
            <div className="partners-hero-actions">
              <button className="button-primary" onClick={() => openContactPanel('partnership')}>Start a 15 Minute Conversation <ArrowRight size={16} /></button>
              <a className="button-quiet" href="#fit">Find Your Company Fit</a>
            </div>
            <div className="partner-trust-line">
              <span><Check size={15} /> Application accepted</span>
              <span><Check size={15} /> Guidelines issued</span>
              <span><Check size={15} /> Six race chapters</span>
            </div>
          </div>
          <figure className="partners-hero-media">
            <img src={media.partnerCover} alt="Toufic Abou Ali crossing the IRONMAN 70.3 Warsaw finish with the Lebanese flag" />
            <figcaption><span>PROOF BEFORE THE PROMISE</span><strong>IRONMAN 70.3 WARSAW</strong><small>FINISHED AT 19 · {warsawRace.total}</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="partner-status-ribbon">
        <div className="site-shell partner-status-grid">
          <div><span>Race 1</span><strong>San Juan, Argentina</strong><small>1 November 2026</small></div>
          <div><span>Global route</span><strong>6 races · 6 continents</strong><small>One complete international mission</small></div>
          <div><span>Deadline</span><strong>Before age 21</strong><small>14 June 2027</small></div>
          <div><span>Application</span><strong>Pending Evidence</strong><small>No record is claimed</small></div>
        </div>
      </section>

      <section className="section partner-proof-section" id="proof">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">WHY THIS IS BELIEVABLE</p>
            <h2>The ambition is new. The proof is not.</h2>
            <p>Toufic is not asking a company to believe a promise with no history behind it.</p>
          </motion.div>
          <div className="partner-proof-grid">
            {proof.map((item, index) => (
              <motion.div key={item.label} {...reveal} transition={{ duration: .48, delay: index * .045 }}>
                <strong>{item.value}</strong><span>{item.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="partner-proof-notes">
            <p><strong>Lebanese athletic milestone.</strong> The Lebanese Triathlon Federation featured Toufic as the youngest Lebanese athlete to complete an IRONMAN 70.3. <a className="inline-link" href={site.federationFeature} target="_blank" rel="noreferrer">View the Federation post <ArrowRight size={14} /></a></p>
            <p><strong>Execution beyond sport.</strong> As Founder and CEO of Sira, Toufic helps lead a 25 person team, a 60K plus WhatsApp community, and work that has generated more than 15 million content impressions.</p>
          </div>
        </div>
      </section>

      <section className="section partner-opening-section" id="mission">
        <div className="site-shell partner-opening-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE MISSION IN ONE SENTENCE</p>
            <h2>Six full distance races. Six required regions. Finish before 14 June 2027.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>The accepted application title is <strong>{mission.recordTitle}</strong>.</p>
            <p>One qualifying race must be completed in North America, South America, Europe, Africa, Asia, and Australasia. Each result must then pass the required evidence review.</p>
            <p className="partner-legal-note">The application is accepted and official guidelines were issued on 5 August 2026. The record is not achieved, guaranteed, or approved in advance.</p>
          </motion.div>
        </div>
      </section>

      <section className="section partner-route-section" id="route">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">THE SIX RACE PLAN</p>
            <h2>Six races. Six continents. One complete story.</h2>
            <p>Each race is a full chapter: preparation, travel, race week, race day, recovery, content, and proof.</p>
          </motion.div>
          <div className="partner-route-grid">
            {preferredRoute.map((race, index) => (
              <motion.article key={race.number} {...reveal} transition={{ duration: .48, delay: index * .045 }}>
                <div><span>{race.number}</span><b aria-hidden="true">{routeFlags[race.country]}</b><small>{race.continent}</small></div>
                <h3>{race.race}</h3>
                <p>{race.country}</p>
                <time>{race.date}</time>
                <strong><Globe2 size={15} /> Full distance race chapter</strong>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-needs-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">THE REAL NEEDS</p>
            <h2>Choose the problem your company is built to solve.</h2>
            <p>The strongest partner role begins with a real mission need, not a logo position.</p>
          </motion.div>
          <div className="partner-needs-grid">
            {needs.map((need, index) => (
              <motion.article key={need.title} {...reveal} transition={{ duration: .48, delay: index * .04 }}>
                <need.icon size={22} /><span>{String(index + 1).padStart(2, '0')}</span><h3>{need.title}</h3><p>{need.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-fit-section" id="fit">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">WHERE YOUR COMPANY CAN FIT</p>
            <h2>See the role before the custom proposal.</h2>
            <p>This is the starting point. The final role is shaped around the company objective and the part it can genuinely enable.</p>
          </motion.div>
          <div className="partner-fit-table" role="table" aria-label="Company partnership fit">
            <div className="partner-fit-row partner-fit-head" role="row">
              <span role="columnheader">Company type</span><span role="columnheader">Possible role</span><span role="columnheader">What it enables</span><span role="columnheader">Story people understand</span>
            </div>
            {companyFit.map((item) => (
              <div className="partner-fit-row" role="row" key={item.company}>
                <strong role="cell">{item.company}</strong><span role="cell">{item.role}</span><span role="cell">{item.action}</span><span role="cell">{item.story}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-value-section" id="value">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">WHAT A COMPANY CAN GAIN</p>
            <h2>Visibility. Content. Real use. People. Meaning. Proof.</h2>
            <p>These are the possible benefits. The custom proposal keeps only the ones that matter to the company and defines exactly what will be delivered.</p>
          </motion.div>
          <div className="partner-value-page-grid">
            {value.map((item, index) => (
              <motion.article key={item.title} {...reveal} transition={{ duration: .48, delay: index * .045 }}>
                <div><item.icon size={22} /><span>{item.group}</span></div><h3>{item.title}</h3><p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-scope-section">
        <div className="site-shell partner-scope-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE SUPPORT CAN MATCH THE COMPANY</p>
            <h2>Lead the full mission or own one clear part.</h2>
            <p>A lead partner can fund and carry all six race chapters. Other partners can remove one important cost, service, product, or access gap.</p>
          </motion.div>
          <div className="partner-scope-list">
            {scopes.map((scope) => <article key={scope.number}><span>{scope.number}</span><div><h3>{scope.title}</h3><p>{scope.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section partner-process-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">WHAT HAPPENS NEXT</p>
            <h2>One short meeting. Then one precise proposal.</h2>
          </motion.div>
          <div className="partner-process-grid">
            <div><span>01</span><h3>15 minute fit call</h3><p>We identify the company goal, the strongest mission need, and the right internal owner.</p></div>
            <div><span>02</span><h3>Custom role</h3><p>You receive one clear proposal with the support, rights, deliverables, activation, useful measures, timeline, and decision date.</p></div>
            <div><span>03</span><h3>Clear agreement</h3><p>Nothing starts until the scope, approvals, owners, dates, and reporting are agreed.</p></div>
          </div>
        </div>
      </section>

      <section className="section partner-faq-section">
        <div className="site-shell partner-faq-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">STRAIGHT ANSWERS</p>
            <h2>No vague promises. No hidden assumptions.</h2>
          </motion.div>
          <div className="partner-faq-list">
            {faqs.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-trust-section visual-backdrop-section">
        <div className="section-backdrop section-backdrop-trust" aria-hidden="true"><img src={media.warsaw.postFlag} alt="" /></div>
        <div className="site-shell partner-trust-single">
          <motion.div {...reveal} className="trust-column trust-column-positive">
            <p className="eyebrow">CLEAR SCOPE. CLEAR DELIVERY.</p>
            <h2>Know exactly what is promised.</h2>
            <p className="trust-intro">The contribution, role, deliverables, rights, approvals, dates, and reporting are agreed before activation.</p>
            <div className="trust-deliverables">
              {['Exact deliverables', 'Usage rights', 'Approval process', 'Owners and dates', 'Reports and asset delivery'].map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}
            </div>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Build the Right Role <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="final-cta partner-final-cta">
        <div className="site-shell final-cta-inner">
          <div><p className="eyebrow">THE NEXT STEP</p><h2>What part should your company make possible?</h2></div>
          <div>
            <p>Start with 15 minutes. If the fit is real, the next step is one custom proposal built around the company goal and the mission need.</p>
            <div className="partner-contact-actions">
              <button className="button-primary" onClick={() => openContactPanel('partnership')}><MessageCircle size={17} /> Start the Conversation</button>
              <a className="button-quiet" href={`mailto:${site.email}`}>Email {site.email}</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
