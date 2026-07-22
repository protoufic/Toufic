import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { mission, media } from '../data/mission';
import { openContactPanel } from '../utils/contact';

const origin = { x: 56.2, y: 47.8 };

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
            className={`map-node ${selected.name === continent.name ? 'active' : ''}`}
            style={{ left: `${continent.x}%`, top: `${continent.y}%` }}
            onClick={() => setSelected(continent)}
            onMouseEnter={() => setSelected(continent)}
            onFocus={() => setSelected(continent)}
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
          initial={{ opacity: 0, y: 10, scale: .985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -7, scale: .985 }}
          transition={{ duration: .24, ease: 'easeOut' }}
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
        <p><strong>The campaign must move before the route is secured.</strong> Entry windows, travel, training, evidence, and recovery planning all begin early.</p>
        <button className="button-quiet" onClick={() => openContactPanel('partnership')}>Discuss the first chapter <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
