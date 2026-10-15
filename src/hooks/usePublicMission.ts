import { useEffect, useState } from 'react';

export type PublicMissionRace = {
  slug: string; title: string; city: string | null; country: string;
  continent: string; race_date: string | null; status: string;
  registration_status: string | null; public_summary: string | null; sort_order: number;
};

export function isSecured(race: PublicMissionRace) {
  return race.status === 'secured' && race.registration_status === 'Entry secured';
}

export function missionDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date to be confirmed';
  return new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

export function usePublicMission() {
  const [races, setRaces] = useState<PublicMissionRace[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/public/mission', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Route unavailable');
        return response.json();
      })
      .then((payload: { ok?: boolean; races?: PublicMissionRace[] }) => {
        if (controller.signal.aborted) return;
        const items = payload.races;
        if (!payload.ok || !Array.isArray(items) || items.length !== 6 ||
            new Set(items.map((race) => race.continent)).size !== 6) {
          throw new Error('Incomplete route');
        }
        setRaces(items);
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  return { races, error, loading: !races && !error, securedCount: races?.filter(isSecured).length ?? null };
}
