import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin } from 'lucide-react';
import { routePlans, type RoutePlanKey } from '../data/mission';

function daysBetween(start: string, end: string) {
  const a = new Date(`${start}T12:00:00Z`).getTime();
  const b = new Date(`${end}T12:00:00Z`).getTime();
  return Math.round((b - a) / 86400000);
}

export function RoutePlans({ compact = false }: { compact?: boolean }) {
  const [activeKey, setActiveKey] = useState<RoutePlanKey>('B');
  const active = routePlans[activeKey];
  const gaps = useMemo(
    () => active.chapters.map((chapter, index) => index === 0 ? null : daysBetween(active.chapters[index - 1].isoDate, chapter.isoDate)),
    [active],
  );

  return (
    <div className={`route-plans ${compact ? 'route-plans-compact' : ''}`}>
      <div className="route-plans-switch" role="tablist" aria-label="Mission route options">
        <button
          role="tab"
          aria-selected={activeKey === 'B'}
          className={activeKey === 'B' ? 'active preferred' : ''}
          onClick={() => setActiveKey('B')}
        >
          <span>ROUTE B</span>
          <strong>Preferred</strong>
        </button>
        <button
          role="tab"
          aria-selected={activeKey === 'A'}
          className={activeKey === 'A' ? 'active' : ''}
          onClick={() => setActiveKey('A')}
        >
          <span>ROUTE A</span>
          <strong>Backup</strong>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          className="route-plans-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: .28, ease: 'easeOut' }}
        >
          <div className="route-plan-summary">
            <div>
              <p className="eyebrow">{active.status}</p>
              <h3>{active.label}: six race chapters.</h3>
            </div>
            <div>
              <p>{active.description}</p>
              <div className={`route-plan-reason ${active.key === 'B' ? 'positive' : 'warning'}`}>
                {active.key === 'B' ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}
                <span>{active.rationale}</span>
              </div>
            </div>
          </div>

          <div className="route-timeline" aria-label={`${active.label} race sequence`}>
            {active.chapters.map((chapter, index) => (
              <article className="route-stop" key={`${active.key}-${chapter.continent}`}>
                <div className="route-stop-topline">
                  <span className="route-stop-number">{String(index + 1).padStart(2, '0')}</span>
                  {gaps[index] && <span className={`route-gap ${gaps[index]! <= 7 ? 'route-gap-tight' : ''}`}>{gaps[index]} days after prior race</span>}
                </div>
                <p>{chapter.continent}</p>
                <h4>{chapter.location}</h4>
                <div className="route-stop-meta">
                  <span><MapPin size={13} />{chapter.country}</span>
                  <span><CalendarDays size={13} />{chapter.date}</span>
                </div>
                {chapter.note && <small>{chapter.note}</small>}
                {index < active.chapters.length - 1 && <ArrowRight className="route-stop-arrow" size={16} aria-hidden="true" />}
              </article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="route-plans-note">Route B is the operating preference. Route A remains a live backup until the final North America and Europe combination is secured.</p>
    </div>
  );
}
