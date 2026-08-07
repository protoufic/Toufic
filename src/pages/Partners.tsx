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
  { icon: Camera, title: 'Original content', copy: 'Preparation, travel, race week, race day, result, and evidence across six chapters.' },
  { icon: PackageCheck, title: 'Real use', copy: 'The product or service solves a real problem inside the attempt.' },
  { icon: Globe2, title: 'Clear partner role', copy: 'The company is named as the solution to one specific blocker.' },
  { icon: Users, title: 'People activation', copy: 'Employees, customers, students, or communities can take part.' },
  { icon: Megaphone, title: 'Usable media assets', copy: 'Approved photos, interviews, clips, and campaign material.' },
  { icon: ShieldCheck, title: 'Proof and reporting', copy: 'Agreed deliverables, evidence of use, updates, and a final report.' },
];

const routes = [
  { title: 'General Mission Partner', copy: 'Help unlock one or more critical parts of the attempt through direct support and a clear campaign role.' },
  { title: 'Race Chapter Partner', copy: 'Help make one qualifying race possible from preparation to result and evidence.' },
  { title: 'Founding Partner', copy: 'Join before Race 1 is locked and become part of the beginning of the attempt.' },
  { title: 'Technical Partner', copy: 'Remove one real blocker through travel, equipment, nutrition, medical, insurance, technology, or production.' },
  { title: 'Media or Activation Partner', copy: 'Build an editorial, employee, customer, campus, or community activation around the attempt.' },
];

export function PartnersPage() {
  return (
    <Layout>
      <section className="partners-hero-split">
        <div className="site-shell partners-hero-grid">
          <div className="partners-hero-copy">
            <p className="eyebrow">PARTNERSHIP OPPORTUNITY</p>
            <h1>Help build the attempt before Race 1.</h1>
            <p>Application accepted. Guidelines issued. Six qualifying races. One clear role for each partner.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss a Partner Role <ArrowRight size={16} /></button>
          </div>
          <figure className="partners-hero-media">
            <img src={media.partnerCover} alt="Toufic Abou Ali crossing the IRONMAN 70.3 Warsaw finish with the Lebanese flag" />
            <figcaption><span>REAL PROOF</span><strong>IRONMAN 70.3 WARSAW</strong><small>LEBANON · BIB 760</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section partner-opening-section">
        <div className="site-shell partner-opening-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE SIMPLE OFFER</p>
            <h2>A partner removes one real blocker.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>The company helps solve travel, insurance, equipment, health, nutrition, race entry, or evidence—and becomes part of the documented solution.</p>
            <p>The company receives a clear role, real use, content, activation, rights, and reporting.</p>
          </motion.div>
        </div>
      </section>

      <section className="section partner-now-section">
        <div className="site-shell partner-now-grid">
          <motion.div {...reveal} className="partner-now-copy">
            <p className="eyebrow">WHY NOW</p>
            <h2>Race 1 is not locked yet.</h2>
            <p>The application is accepted and the rules are issued. The first partners can still help choose, fund, protect, and document the first qualifying chapter.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Help Build Race 1 <ArrowRight size={16} /></button>
          </motion.div>
          <div className="partner-now-list">
            <div><strong>01</strong><span>Lock the first qualifying race</span></div>
            <div><strong>02</strong><span>Build the witness and evidence system</span></div>
            <div><strong>03</strong><span>Remove one critical execution risk</span></div>
            <div><strong>04</strong><span>Become part of the beginning</span></div>
          </div>
        </div>
      </section>

      <section className="section partner-value-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading">
            <p className="eyebrow">WHAT A PARTNER CAN RECEIVE</p>
            <h2>One clear role. One measurable solution.</h2>
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
            <h2>Choose the problem. Build the exact role after.</h2>
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
            <h2>Know exactly what is promised.</h2>
            <p className="trust-intro">The contribution, role, deliverables, rights, approvals, dates, and reporting are agreed before activation.</p>
            <div className="trust-deliverables">
              {['Exact deliverables', 'Usage rights', 'Approvals', 'Owners and dates', 'Reports and asset delivery'].map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}
            </div>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Build the Right Role <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="final-cta partner-final-cta">
        <div className="site-shell final-cta-inner">
          <div><p className="eyebrow">THE NEXT STEP</p><h2>Tell me the problem your company can solve.<br />I will build one clear role.</h2></div>
          <div><p>Share the company objective and what it can unlock. The next step is a simple proposal with the role, contribution, deliverables, rights, dates, and reporting.</p><button className="button-primary" onClick={() => openContactPanel('partnership')}>Start the Conversation <ArrowRight size={16} /></button></div>
        </div>
      </section>
    </Layout>
  );
}
