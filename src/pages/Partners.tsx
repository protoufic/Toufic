import { motion } from 'framer-motion';
import { ArrowRight, Camera, Check, Globe2, Megaphone, PackageCheck, ShieldCheck, Users } from 'lucide-react';
import { Layout } from '../components/Layout';
import { media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.58 },
};

const value = [
  { icon: Camera, title: 'Global content', copy: 'Original material across preparation, travel, race week, race day, result, and recap.' },
  { icon: PackageCheck, title: 'Real product or service use', copy: 'A real use case in difficult conditions, with agreed integration and honest feedback.' },
  { icon: Globe2, title: 'Brand position', copy: 'Association with endurance, execution, Lebanon, and international ambition.' },
  { icon: Users, title: 'People activation', copy: 'Employee, customer, university, or community participation built around the campaign.' },
  { icon: Megaphone, title: 'A usable media story', copy: 'A sports, founder, student, and national story with recurring chapters.' },
  { icon: ShieldCheck, title: 'Clear reporting', copy: 'Agreed deliverables, asset libraries, race reports, activation results, and final recap.' },
];

const routes = [
  { title: 'Lead Mission Partner', copy: 'Campaign-wide position, the strongest integration, and the largest agreed deliverable system.' },
  { title: 'Continent Partner', copy: 'Own one meaningful race chapter, market, or continent story.' },
  { title: 'Founding Partner', copy: 'Enter before the first full race is secured and help build the platform from the origin.' },
  { title: 'Technical Partner', copy: 'Remove a real barrier through travel, equipment, nutrition, medical, insurance, technology, or production support.' },
  { title: 'Media or Activation Partner', copy: 'Build an audience, event, employee, campus, customer, or content activation around the mission.' },
];

export function PartnersPage() {
  return (
    <Layout>
      <section className="page-hero partners-page-hero">
        <img src={media.flag} alt="Toufic Abou Ali with Lebanese flag energy" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">PARTNERSHIP OPPORTUNITY</p>
          <h1>Partner with a global Lebanese world-record attempt.</h1>
          <p>Six full IRONMAN races. Six continents. One campaign built around endurance, execution, original content, and Lebanon.</p>
          <button className="button-primary" onClick={() => openContactPanel('partnership')}>Request a Tailored Proposal <ArrowRight size={16} /></button>
        </div>
      </section>

      <section className="section partner-opening-section">
        <div className="site-shell partner-opening-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE SIMPLE OFFER</p>
            <h2>A partner is not buying a logo placement.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>The company receives a campaign it can use: attention, positioning, original content, real product or service use, people activation, and clear reporting.</p>
            <p>The final package is built around the company objective.</p>
          </motion.div>
        </div>
      </section>

      <section className="section partner-now-section">
        <div className="site-shell partner-now-grid">
          <motion.div {...reveal} className="partner-now-copy">
            <p className="eyebrow">WHY NOW</p>
            <h2>The route cannot be secured after the windows close.</h2>
            <p>Entries, travel, visas, coaching, equipment, and production need to move before the first full-race chapter. The founding position only exists before the campaign is established.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Help Secure the First Chapter <ArrowRight size={16} /></button>
          </motion.div>
          <div className="partner-now-list">
            <div><strong>01</strong><span>Secure the first qualifying chapter</span></div>
            <div><strong>02</strong><span>Build the readiness and evidence system</span></div>
            <div><strong>03</strong><span>Launch the content platform before race one</span></div>
            <div><strong>04</strong><span>Own the origin, not only the outcome</span></div>
          </div>
        </div>
      </section>

      <section className="section partner-value-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">WHAT A PARTNER CAN RECEIVE</p>
            <h2>Simple value. Built around one clear goal.</h2>
          </motion.div>
          <div className="partner-value-page-grid">
            {value.map((item, index) => (
              <motion.article key={item.title} {...reveal} transition={{ duration: .5, delay: index * .055 }}>
                <item.icon size={22} /><h3>{item.title}</h3><p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-routes-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">PARTNERSHIP ROUTES</p>
            <h2>Choose the role. Build the exact package after.</h2>
          </motion.div>
          <div className="partner-routes">
            {routes.map((route, index) => (
              <motion.article key={route.title} {...reveal} transition={{ duration: .48, delay: index * .055 }}>
                <span>{String(index + 1).padStart(2, '0')}</span><div><h3>{route.title}</h3><p>{route.copy}</p></div><ArrowRight size={18} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-trust-section visual-backdrop-section">
        <div className="section-backdrop section-backdrop-trust" aria-hidden="true"><img src={media.warsaw.postFlag} alt="" /></div>
        <div className="site-shell partner-trust-single">
          <motion.div {...reveal} className="trust-column trust-column-positive">
            <p className="eyebrow">CLEAR SCOPE. CLEAR DELIVERY.</p>
            <h2>A serious campaign, built around the company goal.</h2>
            <p className="trust-intro">The partnership is defined before launch so the company knows what it receives, when it receives it, and how it can use it.</p>
            <div className="trust-deliverables">
              {['Exact deliverables', 'Usage rights', 'Approvals', 'Owners and dates', 'Reports and asset delivery'].map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}
            </div>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Build the Right Package <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="final-cta partner-final-cta">
        <div className="site-shell final-cta-inner">
          <div><p className="eyebrow">THE NEXT STEP</p><h2>Tell me your goal.<br />I will build the exact proposal.</h2></div>
          <div><p>Share the company objective, market, and preferred contribution. The next response can be a tailored route with deliverables, rights, dates, and reporting.</p><button className="button-primary" onClick={() => openContactPanel('partnership')}>Start the Conversation <ArrowRight size={16} /></button></div>
        </div>
      </section>
    </Layout>
  );
}
