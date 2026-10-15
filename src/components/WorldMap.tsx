import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { mission, media } from '../data/mission';
import { usePublicMission, isSecured, missionDate } from '../hooks/usePublicMission';
import { openContactPanel } from '../utils/contact';

const origin = { x: 56.2, y: 47.8 };

export function WorldMap() {
  const [selectedName, setSelectedName] = useState(mission.continents[0].name);
  const { races, loading, error, securedCount } = usePublicMission();
  const continents = continents.map((location) => {
    const race = races?.find((item) => item.continent === location.name || (location.name === 'Australasia' && item.continent === 'Oceania'));
    return { ...location, race: race ? [race.title, race.city && race.city !== race.title ? race.city : null, race.country !== race.title ? race.country : null].filter(Boolean).join(', ') : '', date: race ? missionDate(race.race_date) : '', status: race ? (race.registration_status || race.status) : '', secured: race ? isSecured(race) : false, summary: race?.public_summary || '' };
  });
  const selected = continents.find((item) => item.name === selectedName) || continents[0];

  return (
    <div className="mission-map-shell">
      <div className="mission-map" role="group" aria-label="Six target continents">
        <img src={media.map} alt="World map showing the six target continents" loading="lazy" decoding="async" />
        <div className="mission-map-shade" />
        <svg className="mission-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {mission.continents.map((continent, index) => (
            <motion.path
              key={continent.name}
              d={`M ${origin.x} ${origin.y} Q ${(origin.x + continent.x) / 2} ${Math.max(10, Math.min(origin.y, continent.y) - 10 - index * 0.35)} ${continent.x} ${continent.y}`}
              fill="none"
              stroke="rgba(236, 37, 43, .72)"
              strokeWidth=".28"
              strokeDasharray="1.2 1.25"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, delay: index * 0.07, ease: 'easeOut' }}
            />
          ))}
        </svg>
        <div className="map-origin" style={{ left: `${origin.x}%`, top: `${origin.y}%` }} aria-label="Lebanon, mission origin">
          <span />
          <small>LEBANON</small>
        </div>
        {mission.continents.map((continent) => (
          <button
            key={continent.name}
            className={`map-node ${selectedName === continent.name ? 'active' : ''}`}
            style={{ left: `${continent.x}%`, top: `${continent.y}%` }}
            onClick={() => setSelectedName(continent.name)}
            onMouseEnter={() => setSelected(continent)}
            onFocus={() => setSelected(continent)}
            aria-pressed={selected.name === continent.name}
            aria-label={`${continent.name}: ${continent.status}`}
          >
            <span />
            <small>{continent.name}</small>
          </button>
        ))}
      </div>

      {loading && <p role="status" className="source-note">Loading the current race route…</p>}
      {error && <p role="alert" className="source-note">The verified mission route is temporarily unavailable.</p>}
      {races && <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          className="map-detail"
          initial={{ opacity: 0, y: 10, scale: .985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -7, scale: .985 }}
          transition={{ duration: .24, ease: 'easeOut' }}
        >
          <div>
            <p className="eyebrow">{selected.status}</p>
            <h3>{selected.name}</h3>
            <strong>{selected.race} · {selected.date}</strong>
          </div>
          <p>{selected.summary}</p>
          <span className={`map-status ${selected.secured ? 'map-status-secured' : ''}`}>{selected.status}</span>
        </motion.div>
      </AnimatePresence>}

      <div className="map-mobile-list">
        {mission.continents.map((continent) => (
          <button key={continent.name} onClick={() => setSelected(continent)} className={selected.name === continent.name ? 'active' : ''}>
            <span>{continent.name}</span><ArrowRight size={15} />
          </button>
        ))}
      </div>

      <div className="map-next-step">
        <p>{races ? <><strong>{securedCount} of six entries are secured.</strong> Race statuses and dates above are sourced from the current published mission record.</> : 'Current entry status will appear when the verified mission route is available.'}</p>
        <button className="button-quiet" onClick={() => openContactPanel('partnership')}>Help unlock the route <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
