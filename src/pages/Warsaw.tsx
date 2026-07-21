import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bike, Footprints, Waves } from 'lucide-react';
import { Layout } from '../components/Layout';
import { media, quotes, warsawRace } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.58 },
};

export function WarsawPage() {
  return (
    <Layout>
      <section className="page-hero warsaw-page-hero">
        <img src={media.warsaw.finishWide} alt="IRONMAN 70.3 Warsaw finish line" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">JUNE 7, 2026 · WARSAW, POLAND</p>
          <h1>IRONMAN 70.3 Warsaw.</h1>
          <p>Toufic’s first IRONMAN 70.3. Seven days before turning 20. Official finish: 6:08:15.</p>
          <a className="button-primary" href={warsawRace.links.official} target="_blank" rel="noreferrer">View Official Result <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="section warsaw-result-section">
        <div className="site-shell">
          <motion.div {...reveal} className="warsaw-result-hero">
            <div><p className="eyebrow">OFFICIAL FINISH</p><strong>{warsawRace.total}</strong><span>113th M18–24 · Bib {warsawRace.bib}</span></div>
            <div className="warsaw-result-splits">
              <span><small>Swim</small><strong>{warsawRace.splits.swim}</strong></span>
              <span><small>T1</small><strong>{warsawRace.splits.t1}</strong></span>
              <span><small>Bike</small><strong>{warsawRace.splits.bike}</strong></span>
              <span><small>T2</small><strong>{warsawRace.splits.t2}</strong></span>
              <span><small>Run</small><strong>{warsawRace.splits.run}</strong></span>
            </div>
          </motion.div>
          <motion.figure {...reveal} className="official-result-frame">
            <img src={media.warsaw.result} alt="Official IRONMAN 70.3 Warsaw result for Toufic Abou Ali" loading="lazy" />
          </motion.figure>
        </div>
      </section>

      <section className="section warsaw-story-intro">
        <div className="site-shell warsaw-story-grid">
          <motion.div {...reveal}><p className="eyebrow">WHAT THE FINISH PROVED</p><h2>Toufic could survive the race.</h2></motion.div>
          <motion.div {...reveal}><p>He entered injured, tired, and technically underprepared. He still completed the swim, bike, and run, carried the Lebanese flag, and crossed the finish line.</p><blockquote>“{quotes[0]}”</blockquote></motion.div>
          <motion.div {...reveal}><p className="eyebrow">WHAT THE RESULT EXPOSED</p><h2>Fitness was not enough.</h2></motion.div>
          <motion.div {...reveal}><p>Almost no outdoor cycling. No open-water preparation. No brick training. No race simulation. No transition practice. Weak hydration and fueling. Little experience with the bike and clipless pedals.</p><blockquote>“{quotes[1]}”</blockquote></motion.div>
        </div>
      </section>

      <section className="section race-chapters-section">
        <div className="site-shell">
          <div className="race-chapter">
            <motion.figure {...reveal}><img src={media.warsaw.swimExit} alt="Toufic leaving the water at IRONMAN 70.3 Warsaw" loading="lazy" /></motion.figure>
            <motion.div {...reveal}><Waves size={24} /><p className="eyebrow">SWIM · 44:26</p><h2>First open-water race swim.</h2><p>The water was chaotic. Athletes hit, grabbed, and crossed his line. He exited with cramps already starting.</p></motion.div>
          </div>
          <div className="race-chapter race-chapter-reverse">
            <motion.figure {...reveal}><img src={media.warsaw.bikeCourse} alt="Toufic cycling at IRONMAN 70.3 Warsaw" loading="lazy" /></motion.figure>
            <motion.div {...reveal}><Bike size={24} /><p className="eyebrow">BIKE · 3:21:42</p><h2>The bike is where the race was lost.</h2><p>He fell, nearly crashed, barely used the aero position, struggled to drink while riding, and took in roughly 250 ml across 90 km.</p></motion.div>
          </div>
          <div className="race-chapter">
            <motion.figure {...reveal}><img src={media.warsaw.run} alt="Toufic running at IRONMAN 70.3 Warsaw" loading="lazy" /></motion.figure>
            <motion.div {...reveal}><Footprints size={24} /><p className="eyebrow">RUN · 1:51:56</p><h2>The run proved the engine.</h2><p>He began with cramps and damage from the bike. He did not walk. The cramps eased, he started passing athletes, and he carried the Lebanese flag to the finish.</p></motion.div>
          </div>
        </div>
      </section>

      <section className="section warsaw-gallery-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading"><p className="eyebrow">THE RACE IN FRAMES</p><h2>One finish. Different moments.</h2></motion.div>
          <div className="warsaw-gallery">
            <img src={media.warsaw.swimFocus} alt="Before the swim start" loading="lazy" />
            <img src={media.warsaw.t1} alt="Running into transition" loading="lazy" />
            <img src={media.warsaw.bikeCity} alt="Cycling through Warsaw" loading="lazy" />
            <img src={media.warsaw.finishUp} alt="Looking up after the finish" loading="lazy" />
            <img src={media.warsaw.finishDown} alt="Looking down after the finish" loading="lazy" />
            <img src={media.warsaw.postFlag} alt="After the finish with the Lebanese flag" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section warsaw-video-section">
        <div className="site-shell warsaw-video-grid">
          <motion.div {...reveal}><p className="eyebrow">FINISH-ZONE FOOTAGE</p><h2>The finish was real.</h2><p>The next chapter is not about surviving the sport. It is about executing it properly.</p></motion.div>
          <motion.video {...reveal} controls muted playsInline preload="metadata" poster={media.warsaw.finishLebanon}>
            <source src={media.warsaw.finisherVideo} type="video/mp4" />
          </motion.video>
        </div>
      </section>

      <section className="section strava-section">
        <div className="site-shell">
          <motion.div {...reveal} className="section-heading"><p className="eyebrow">THE THREE ACTIVITIES</p><h2>Swim. Bike. Run.</h2></motion.div>
          <div className="strava-link-grid">
            <a href={warsawRace.links.swim} target="_blank" rel="noreferrer"><span>Swim</span><strong>1.9 km</strong><small>Open in Strava</small><ArrowUpRight size={16} /></a>
            <a href={warsawRace.links.bike} target="_blank" rel="noreferrer"><span>Bike</span><strong>90 km</strong><small>Open in Strava</small><ArrowUpRight size={16} /></a>
            <a href={warsawRace.links.run} target="_blank" rel="noreferrer"><span>Run</span><strong>21.1 km</strong><small>Open in Strava</small><ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="site-shell final-cta-inner">
          <div><p className="eyebrow">THE RESPONSE</p><h2>Warsaw showed the gap.<br />Six Continents builds the system.</h2></div>
          <div><p>Professional coaching. Technical cycling. Open water. Full simulations. Tested fueling. Medical support. Controlled race selection. Clear proof.</p><button className="button-primary" onClick={() => openContactPanel('partnership')}>Build the Next Chapter <ArrowRight size={16} /></button></div>
        </div>
      </section>
    </Layout>
  );
}
