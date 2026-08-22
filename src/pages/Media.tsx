import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Copy } from 'lucide-react';
import { Layout } from '../components/Layout';
import { media, quotes, site, warsawRace } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const bios = {
  short: 'Toufic Abou Ali is a 20 year old Lebanese founder and athlete and Founder and CEO of Sira. He has completed more than 60 races, earned more than 20 podiums, finished two full marathons, and completed IRONMAN 70.3 Warsaw at 19. His Guinness World Records application is accepted and remains Pending Evidence.',
  medium: 'Toufic Abou Ali is a Lebanese founder and athlete and Founder and CEO of Sira. He has completed more than 60 races locally and internationally, earned more than 20 podiums, finished two full marathons, and completed IRONMAN 70.3 Warsaw at 19 in 6:08:15. The Lebanese Triathlon Federation featured him as the youngest Lebanese athlete to complete an IRONMAN 70.3. He is now preparing six qualifying full distance IRONMAN races across six continents before turning 21. Four race entries are secured. His Guinness World Records application is accepted, the official guidelines were issued on 5 August 2026, and the status is Pending Evidence. No record is claimed.',
};

export function MediaPage() {
  const [copied, setCopied] = useState('');
  const copy = async (key: keyof typeof bios) => { await navigator.clipboard.writeText(bios[key]); setCopied(key); setTimeout(() => setCopied(''), 1600); };
  return (
    <Layout>
      <section className="page-hero media-page-hero">
        <img src={media.warsaw.finishUp} alt="Toufic Abou Ali after finishing IRONMAN 70.3 Warsaw" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content"><p className="eyebrow">MEDIA RESOURCES</p><h1>The facts, story, and approved language.</h1><p>Built for articles, interviews, event briefs, and internal partner reviews.</p><button className="button-primary" onClick={() => openContactPanel('media')}>Media Enquiry <ArrowRight size={16} /></button></div>
      </section>

      <section className="section bio-section">
        <div className="site-shell">
          <div className="bio-block"><div><p className="eyebrow">SHORT BIO</p><button onClick={() => copy('short')}><Copy size={15} />{copied === 'short' ? 'Copied' : 'Copy'}</button></div><p>{bios.short}</p></div>
          <div className="bio-block"><div><p className="eyebrow">FULL BIO</p><button onClick={() => copy('medium')}><Copy size={15} />{copied === 'medium' ? 'Copied' : 'Copy'}</button></div><p>{bios.medium}</p></div>
        </div>
      </section>

      <section className="section media-facts-section">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow">KEY FACTS</p><h2>Use the exact facts.</h2></div>
          <div className="media-facts-grid">
            <div><span>Mission</span><strong>Six Continents World Record</strong></div>
            <div><span>Application</span><strong>Accepted · 5 August 2026</strong></div>
            <div><span>Current status</span><strong>Pending Evidence</strong></div>
            <div><span>Personal target</span><strong>Complete all six before turning 21</strong></div>
            <div><span>Race route</span><strong>Four of six entries secured</strong></div>
            <div><span>First IRONMAN 70.3</span><strong>Warsaw · {warsawRace.total}</strong></div>
            <div><span>Race history</span><strong>60+ races · 20+ podiums · 2 marathons</strong></div>
            <div><span>Lebanese milestone</span><strong>Featured by the Lebanese Triathlon Federation</strong><a className="inline-link" href={site.federationFeature} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={14} /></a></div>
            <div><span>Identity</span><strong>Lebanese founder and athlete</strong></div>
            <div><span>Company</span><strong>Founder & CEO of Sira</strong></div>
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="site-shell"><div className="section-heading"><p className="eyebrow">APPROVED QUOTES</p><h2>Direct lines from the story.</h2></div><div className="quote-grid">{quotes.map((quote) => <blockquote key={quote}>“{quote}”</blockquote>)}</div></div>
      </section>

      <section className="section media-assets-section">
        <div className="site-shell media-assets-grid">
          <figure><img src={media.warsaw.finishLebanon} alt="Toufic finishing with the Lebanese flag" loading="lazy" /><figcaption>IRONMAN 70.3 Warsaw</figcaption></figure>
          <figure><img src={media.founder} alt="Toufic Abou Ali headshot" loading="lazy" /><figcaption>Founder portrait</figcaption></figure>
          <figure><img src={media.warsaw.run} alt="Toufic running at IRONMAN 70.3 Warsaw" loading="lazy" /><figcaption>Race action</figcaption></figure>
        </div>
      </section>

      <section className="final-cta"><div className="site-shell final-cta-inner"><div><p className="eyebrow">CONTACT</p><h2>Need a quote, interview, or original quality asset?</h2></div><div><p>Email {site.email} or open a direct media enquiry.</p><button className="button-primary" onClick={() => openContactPanel('media')}>Contact Toufic <ArrowRight size={16} /></button></div></div></section>
    </Layout>
  );
}
