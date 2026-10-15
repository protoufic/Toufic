import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProofCard } from '../components/ProofCard';
import type { Race } from '../data/races';
import { media } from '../data/mission';

type PublicEvent = {
  slug: string; title: string; event_date: string | null; date_label: string | null;
  location: string | null; discipline: string | null; distance_label: string | null;
  time_label: string | null; result_label: string | null; is_podium: boolean;
  featured: boolean; images: unknown; links: unknown; notes: string | null;
};
type PublicBest = { code: string; label: string; distance_label: string; performance_label: string; evidence_url: string | null; };
type ProofResponse = { ok: true; events: PublicEvent[]; bests: PublicBest[] };
function linksOf(value: unknown): Race['links'] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry: unknown) => {
    if (!entry || typeof entry !== 'object') return [];
    const item = entry as Record<string, unknown>;
    if (typeof item.url !== 'string' || !/^https:\/\//.test(item.url)) return [];
    const type: Race['links'][number]['type'] = item.type === 'strava' ? 'strava' : item.type === 'official' ? 'official' : item.type === 'media' ? 'media' : 'proof';
    return [{ url: item.url, label: typeof item.label === 'string' ? item.label : 'View evidence', type }];
  });
}
function toRace(event: PublicEvent, order: number): Race {
  const year = Number(event.event_date?.slice(0, 4) || event.date_label?.match(/20\d{2}/)?.[0] || 0);
  return {
    id: event.slug, year, name: event.title, date: event.date_label || event.event_date || String(year),
    location: event.location || '', country: event.location?.split(',').pop()?.trim() || '',
    discipline: event.discipline || '', distance: event.distance_label || '',
    time: event.time_label || '', result: event.result_label || '',
    status: 'Verified', note: event.notes || '', images: [], links: linksOf(event.links),
    featured: Boolean(event.featured), podium: Boolean(event.is_podium), order, sourceSummary: '',
  };
}
const filters = [
  { id: 'all', label: 'All' },
  { id: 'triathlon', label: 'IRONMAN / Multisport' },
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
  const [data, setData] = useState<ProofResponse | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/public/proof', { signal: controller.signal })
      .then(async (r) => { if (!r.ok) throw Error('Unavailable'); return r.json(); })
      .then((r: ProofResponse) => { if (!controller.signal.aborted && r.ok && Array.isArray(r.events) && Array.isArray(r.bests)) setData(r); else if (!controller.signal.aborted) setError(true); })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  const races = useMemo(() => (data?.events || []).map(toRace), [data]);
  const filtered = useMemo(() => races.filter((race) => {
    const text = `${race.name} ${race.location} ${race.distance} ${race.result}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return false;
    if (filter === 'triathlon') return /triathlon|multisport|duathlon/i.test(race.discipline) || /ironman/i.test(race.name);
    if (filter === 'marathon') return /marathon/i.test(race.distance) && !/half/i.test(race.distance);
    if (filter === 'half') return /half|21k|21.1k/i.test(race.distance);
    if (filter === 'short') return /10k|8.5k|6k|6.5k|5k|4k/i.test(race.distance) && !/half|marathon/i.test(race.name);
    if (filter === 'podium') return race.podium;
    if (filter === 'track') return /track/i.test(race.discipline);
    return true;
  }).sort((a, b) => b.year - a.year || b.order - a.order), [races, filter, query]);
  const bests = data?.bests || [];
  return (
    <Layout>
      <section className="page-hero proof-page-hero">
        <img src="/assets/img/races/2025-beirut-wide.webp" alt="Toufic racing the Beirut Marathon" />
        <div className="page-hero-overlay" />
        <div className="site-shell page-hero-content">
          <p className="eyebrow">JOURNEY & PROOF</p>
          <h1>The mission starts with a documented record of work.</h1>
          <p>Race history, results and evidence sourced from the verified public archive.</p>
        </div>
      </section>
      <section className="section proof-overview-section"><div className="site-shell">
        {data && <div className="proof-overview-grid">
          <div><strong>{races.length}</strong><span>verified published race records</span></div>
          <div><strong>{races.filter((r) => r.podium).length}</strong><span>documented podium records</span></div>
          {bests.slice(0, 4).map((b) => <div key={b.code}>
            {b.evidence_url ? <a href={b.evidence_url} target="_blank" rel="noopener noreferrer"><strong>{b.performance_label}</strong></a> : <strong>{b.performance_label}</strong>}
            <span>{b.label}</span>
          </div>)}
        </div>}
      </div></section>
      <section className="section proof-featured-section">
        <div className="site-shell proof-featured-grid">
          <figure><img src={media.warsaw.finishLebanon} alt="IRONMAN 70.3 Warsaw finish" loading="lazy" /><figcaption><span>2026</span><strong>IRONMAN 70.3 Warsaw</strong><small>6:08:15</small></figcaption></figure>
          <figure><img src="/assets/img/races/2025-beirut.webp" alt="OMT Beirut Marathon podium" loading="lazy" /><figcaption><span>2025</span><strong>OMT Beirut Marathon</strong><small>2nd U20 · 1st 542 program</small></figcaption></figure>
          <figure><img src="/assets/img/races/2023-isf.webp" alt="ISF Half Marathon podium" loading="lazy" /><figcaption><span>2023</span><strong>ISF Half Marathon</strong><small>1st U18 · Lebanon</small></figcaption></figure>
        </div>
      </section>
      <section className="section race-archive-section"><div className="site-shell">
        <div className="race-archive-top">
          <div><p className="eyebrow">VERIFIED RACE ARCHIVE</p><h2>Find the result. Open the detail. Check the evidence.</h2></div>
          <label className="race-search"><Search size={17}/><input value={query} onChange={(e) => { setQuery(e.target.value); setVisible(12); }} placeholder="Search races" /></label>
        </div>
        {error && <p role="alert">Verified race data is temporarily unavailable. Please try again later; no unverified results are being substituted.</p>}
        {!data && !error && <p role="status">Loading verified race records…</p>}
        {data && <>
          <div className="race-filters" role="group" aria-label="Race filters">{filters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => {setFilter(item.id);setVisible(12);}}>{item.label}</button>)}</div>
          <div className="race-grid">{filtered.slice(0,visible).map(race => <ProofCard key={race.id} race={race}/>)}</div>
          {filtered.length === 0 && <p>No verified races match this search.</p>}
          {visible < filtered.length && <button className="button-primary load-more" onClick={() => setVisible((v) => v+12)}>Load More Races <ArrowRight size={16}/></button>}
        </>}
      </div></section>
    </Layout>
  );
}
