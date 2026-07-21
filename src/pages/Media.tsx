import { useState } from 'react';
import { ArrowRight, Copy } from 'lucide-react';
import { Layout } from '../components/Layout';
import { media, quotes, site, warsawRace } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const bios = {
  short: 'Toufic Abou Ali is a 20-year-old Lebanese founder-athlete and Founder & CEO of Sira. After completing two marathons and IRONMAN 70.3 Warsaw before turning 20, he began preparing to complete six full IRONMAN races across six continents in a world-record attempt.',
  medium: 'Toufic Abou Ali is a Lebanese founder-athlete and Founder & CEO of Sira. He completed IRONMAN 70.3 Warsaw at 19 in 6:08:15, seven days before turning 20, after already finishing two marathons and five official half marathons. Warsaw exposed major technical and preparation gaps. Six Continents is the response: a professionally controlled attempt to complete official full IRONMAN races on six continents, targeting the current listed male age record while carrying Lebanon across the world.',
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
          <div className="bio-block"><div><p className="eyebrow">50-WORD BIO</p><button onClick={() => copy('short')}><Copy size={15} />{copied === 'short' ? 'Copied' : 'Copy'}</button></div><p>{bios.short}</p></div>
          <div className="bio-block"><div><p className="eyebrow">100-WORD BIO</p><button onClick={() => copy('medium')}><Copy size={15} />{copied === 'medium' ? 'Copied' : 'Copy'}</button></div><p>{bios.medium}</p></div>
        </div>
      </section>

      <section className="section media-facts-section">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow">KEY FACTS</p><h2>Use the exact facts.</h2></div>
          <div className="media-facts-grid">
            <div><span>Mission</span><strong>6 full IRONMAN races across 6 continents</strong></div>
            <div><span>Main target</span><strong>November 27, 2027</strong></div>
            <div><span>Extreme target</span><strong>Complete all six before turning 21</strong></div>
            <div><span>First IRONMAN 70.3</span><strong>Warsaw · {warsawRace.total}</strong></div>
            <div><span>Identity</span><strong>Lebanese Founder-Athlete</strong></div>
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

      <section className="final-cta"><div className="site-shell final-cta-inner"><div><p className="eyebrow">CONTACT</p><h2>Need a quote, interview, or full-resolution asset?</h2></div><div><p>Email {site.email} or open a direct media enquiry.</p><button className="button-primary" onClick={() => openContactPanel('media')}>Contact Toufic <ArrowRight size={16} /></button></div></div></section>
    </Layout>
  );
}
