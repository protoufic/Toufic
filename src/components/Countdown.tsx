import { useEffect, useMemo, useState } from 'react';
import { mission } from '../data/mission';

function diff(target: string) {
  const remaining = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
  };
}

function CountdownBlock({ target, label, emphasis = false }: { target: string; label: string; emphasis?: boolean }) {
  const [value, setValue] = useState(() => diff(target));
  useEffect(() => {
    const timer = window.setInterval(() => setValue(diff(target)), 30000);
    return () => window.clearInterval(timer);
  }, [target]);
  return (
    <div className={`countdown-block ${emphasis ? 'countdown-emphasis' : ''}`}>
      <p>{label}</p>
      <div className="countdown-numbers">
        <span><strong>{value.days}</strong><small>days</small></span>
        <span><strong>{String(value.hours).padStart(2, '0')}</strong><small>hours</small></span>
        <span><strong>{String(value.minutes).padStart(2, '0')}</strong><small>minutes</small></span>
      </div>
      <time dateTime={target}>{new Date(target).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
    </div>
  );
}

export function DualCountdown() {
  return (
    <div className="dual-countdown">
      <CountdownBlock target={mission.deadlines.main} label={mission.deadlines.mainLabel} emphasis />
      <CountdownBlock target={mission.deadlines.extreme} label={mission.deadlines.extremeLabel} />
    </div>
  );
}
