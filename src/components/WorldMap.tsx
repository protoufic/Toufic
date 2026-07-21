import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { mission, media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

export function WorldMap() {
  const [selected, setSelected] = useState(mission.continents[0]);

  return (
    <div className="mission-map-shell">
      <div className="mission-map" role="group" aria-label="Six target continents">
        <img src={media.map} alt="World map showing the six target continents" />
        <div className="mission-map-shade" />
        <svg className="mission-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {mission.continents.map((continent, index) => (
            <motion.path
              key={continent.name}
              d={`M 54 39 Q ${(54 + continent.x) / 2} ${Math.max(8, Math.min(39, continent.y) - 16 - index * 0.5)} ${continent.x} ${continent.y}`}
              fill="none"
              stroke="rgba(225, 29, 36, .58)"
              strokeWidth=".34"
              strokeDasharray="1.4 1.7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.4, delay: index * 0.08 }}
            />
          ))}
        </svg>
        <div className="map-origin" style={{ left: '54%', top: '39%' }} aria-label="Lebanon, mission origin">
          <span />
          <small>LEBANON</small>
        </div>
        {mission.continents.map((continent) => (
          <button
            key={continent.name}
            className={`map-node ${selected.name === continent.name ? 'active' : ''}`}
            style={{ left: `${continent.x}%`, top: `${continent.y}%` }}
            onClick={() => setSelected(continent)}
            aria-pressed={selected.name === continent.name}
            aria-label={`${continent.name}: race selection in progress`}
          >
            <span />
            <small>{continent.name}</small>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          className="map-detail"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div>
            <p className="eyebrow">TARGET CONTINENT</p>
            <h3>{selected.name}</h3>
          </div>
          <p>{selected.summary}</p>
          <span className="map-status">Race selection in progress</span>
        </motion.div>
      </AnimatePresence>

      <div className="map-mobile-list">
        {mission.continents.map((continent) => (
          <button key={continent.name} onClick={() => setSelected(continent)} className={selected.name === continent.name ? 'active' : ''}>
            <span>{continent.name}</span><ArrowRight size={15} />
          </button>
        ))}
      </div>

      <div className="map-next-step">
        <p><strong>The mission must launch before the route can be secured.</strong> Race entries, travel, training, evidence, and recovery planning all move early.</p>
        <button className="button-quiet" onClick={() => openContactPanel('partnership')}>Discuss the first chapter <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
