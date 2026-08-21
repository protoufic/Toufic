import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Building2, GraduationCap, MapPinned } from 'lucide-react';
import { Layout } from '../components/Layout';
import { media, quotes, siraMetrics, site } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.58 },
};

const pillars = [
  { icon: Building2, title: 'Build systems', copy: 'The mission requires planning, owners, deadlines, reporting, and repeatable execution.' },
  { icon: BriefcaseBusiness, title: 'Lead teams', copy: 'Toufic is Founder & CEO of Sira while preparing the campaign.' },
  { icon: GraduationCap, title: 'Operate under pressure', copy: 'University, international life, company responsibilities, and training all compete for the same time.' },
  { icon: MapPinned, title: 'Work across markets', copy: 'Lebanon is the origin. France, China, and six race continents shape the context.' },
];

export function FounderPage() {
  return (
    <Layout>
      <section className="page-hero founder-page-hero">
        <div className="site-shell founder-page-hero-grid">
          <div className="founder-page-copy">
            <p className="eyebrow">TOUFIC ABOU ALI</p>
            <h1>Lebanese Founder and Athlete.</h1>
            <p>Founder & CEO of Sira. Student abroad. Endurance athlete. Building one global campaign through the same discipline used to build teams and systems.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Discuss the Campaign <ArrowRight size={16} /></button>
          </div>
          <figure className="founder-main-portrait">
            <img src={media.founderWarsaw} alt="Toufic Abou Ali in Warsaw" />
            <figcaption><span>LEBANON</span><strong>FOUNDER & CEO</strong><small>ENDURANCE ATHLETE</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section founder-story-section">
        <div className="site-shell founder-story-grid">
          <motion.div {...reveal}>
            <p className="eyebrow">THE OPERATING STORY</p>
            <h2>The mission is not separate from the work.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>Toufic began using fitness as a way to change his life at 13. The discipline later became useful in school, work, entrepreneurship, and endurance sport.</p>
            <p>He moved abroad, studied in France, helped build Sira, led systems and teams, completed marathons, and finished IRONMAN 70.3 Warsaw before turning 20.</p>
            <blockquote>“{quotes[2]}”</blockquote>
          </motion.div>
        </div>
      </section>

      <section className="section founder-pillars-section">
        <div className="site-shell founder-pillars-grid">
          {pillars.map((pillar, index) => (
            <motion.article key={pillar.title} {...reveal} transition={{ duration: .5, delay: index * .06 }}>
              <pillar.icon size={22} /><h3>{pillar.title}</h3><p>{pillar.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section sira-proof-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading section-heading-wide">
            <p className="eyebrow">EXECUTION PROOF</p>
            <h2>Sira shows what Toufic can build beyond sport.</h2>
            <p>The company supports professionals and employers through career services, recruitment, training, and community.</p>
          </motion.div>
          <div className="sira-metric-grid">
            {siraMetrics.map((item, index) => (
              <motion.div key={item.label} {...reveal} transition={{ duration: .46, delay: index * .045 }}>
                <strong>{item.value}</strong><span>{item.label}</span>
              </motion.div>
            ))}
          </div>
          <a className="button-quiet" href={site.sira} target="_blank" rel="noreferrer">Visit Sira <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="section founder-sport-section">
        <div className="site-shell founder-sport-grid">
          <motion.figure {...reveal}>
            <img src={media.founderRunning} alt="Toufic Abou Ali running" loading="lazy" />
          </motion.figure>
          <motion.div {...reveal}>
            <p className="eyebrow">FOUNDER × ATHLETE</p>
            <h2>Pressure does not disappear. It gets organised.</h2>
            <p>Six Continents World Record requires the athlete, founder, student, and operator to work as one system. The story is not about doing everything alone. It is about building the right team around a hard target.</p>
            <button className="button-primary" onClick={() => openContactPanel('partnership')}>Build the Mission Together <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
