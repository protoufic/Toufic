import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProofCard } from '../components/ProofCard';
import { personalBests, raceMetrics, races } from '../data/races';
import { media } from '../data/mission';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'triathlon', label: 'IRONMAN / Triathlon' },
  { id: 'marathon', label: 'Marathon' },
  { id: 'half', label: 'Half Marathon' },
  { id: 'short', label: '10K and shorter' },
  { id: 'podium', label: 'Podiums' },
  { id: 'track', label: 'Track' },
];

export function ProofPage() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => races.filter((race) => {
    const text = `${race.name} ${race.location} ${race.country} ${race.distance} ${race.result}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return false;
    if (filter === 'triathlon') return /triathlon|multisport/i.test(race.discipline) || /ironman/i.test(race.name);
    if (filter === 'marathon') return /marathon/i.test(race.distance) || race.distance === '42K';
    if (filter === 'half') return /half/i.test(race.name) || /21K|21\.1K/i.test(race.distance);
    if (filter === 'short') return /10K|8\.5K|6K|6\.5K|5K|4K/i.test(race.distance) && !/half|marathon/i.test(race.name);
    if (filter === 'podium') return race.podium;
    if (filter === 'track') return /track/i.test(race.discipline);
    return true;
  }).sort((a, b) => b.year - a.year || b.order - a.order), [filter, query]);

  return (
    <Layout>
      <section className="page-hero proof-page-hero">
        <img src="/assets/img/races/2025-beirut-wide.webp" alt="Toufic Abou Ali racing the Beirut Marathon" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">JOURNEY & PROOF</p>
          <h1>The mission starts with a documented record of work.</h1>
          <p>IRONMAN 70.3. Marathons. Half marathons. Podiums. Track races. Training. Founder execution.</p>
        </div>
      </section>

      <section className="section proof-overview-section">
        <div className="site-shell">
          <div className="proof-overview-grid">
            <div><strong>{raceMetrics.totalEntries}</strong><span>race archive entries</span></div>
            <div><strong>{raceMetrics.verifiedPodiums}+</strong><span>documented podium results</span></div>
            <div><strong>{personalBests.halfMarathon.time}</strong><span>half-marathon best</span></div>
            <div><strong>{personalBests.tenK.time}</strong><span>10 km best</span></div>
            <div><strong>{personalBests.marathon.time}</strong><span>marathon best</span></div>
            <div><strong>{personalBests.ironman703.time}</strong><span>IRONMAN 70.3</span></div>
          </div>
        </div>
      </section>

      <section className="section proof-featured-section">
        <div className="site-shell proof-featured-grid">
          <figure><img src={media.warsaw.finishLebanon} alt="IRONMAN 70.3 Warsaw finish" loading="lazy" /><figcaption><span>2026</span><strong>IRONMAN 70.3 Warsaw</strong><small>6:08:15</small></figcaption></figure>
          <figure><img src="/assets/img/races/2025-beirut.webp" alt="OMT Beirut Marathon podium" loading="lazy" /><figcaption><span>2025</span><strong>OMT Beirut Marathon</strong><small>2nd U20 · 1st 542 program</small></figcaption></figure>
          <figure><img src="/assets/img/races/2023-isf.webp" alt="ISF Half Marathon podium" loading="lazy" /><figcaption><span>2023</span><strong>ISF Half Marathon</strong><small>1st U18 · Lebanon</small></figcaption></figure>
        </div>
      </section>

      <section className="section race-archive-section">
        <div className="site-shell">
          <div className="race-archive-top">
            <div><p className="eyebrow">FULL RACE ARCHIVE</p><h2>Find the result. Open the detail. Check the link.</h2></div>
            <label className="race-search"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(12); }} placeholder="Search races" /></label>
          </div>
          <div className="race-filters" role="group" aria-label="Race filters">
            {filters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => { setFilter(item.id); setVisible(12); }}>{item.label}</button>)}
          </div>
          <div className="race-grid">
            {filtered.slice(0, visible).map((race) => <ProofCard key={race.id} race={race} />)}
          </div>
          {visible < filtered.length && <button className="button-primary load-more" onClick={() => setVisible((value) => value + 12)}>Load More Races <ArrowRight size={16} /></button>}
        </div>
      </section>

      <section className="section longest-run-section">
        <div className="site-shell longest-run-grid">
          <div><p className="eyebrow">LONGEST TRAINING RUN</p><h2>Rashaya to Sit Shaawene Shrine – Aammiq, Lebanon</h2></div>
          <div className="longest-run-stats"><span><strong>35.01</strong><small>KM</small></span><span><strong>3:23:22</strong><small>TIME</small></span><span><strong>383</strong><small>M ELEVATION</small></span><a href="https://www.strava.com/activities/12178538005" target="_blank" rel="noreferrer">View on Strava <ArrowRight size={15} /></a></div>
        </div>
      </section>
    </Layout>
  );
}
