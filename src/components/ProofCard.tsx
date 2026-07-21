import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { Race } from '../data/races';

const imageByRace: Record<string, string> = {
  '2023-barja-race': '/assets/img/races/2023-barja.webp',
  '2023-batroun-multisport-race': '/assets/img/races/2023-batroun.webp',
  '2023-kharbe-race': '/assets/img/races/2023-kharbe.webp',
  '2023-hasbaya-5k-race': '/assets/img/races/2023-hasbaya.webp',
  '2023-isf-half-marathon': '/assets/img/races/2023-isf.webp',
  '2023-al-jabal-race': '/assets/img/races/2023-al-jabal.webp',
  '2023-yanta-race': '/assets/img/races/2023-yanta.webp',
  '2023-bekaa-race': '/assets/img/races/2023-bekaa.webp',
  '2023-beirut-marathon': '/assets/img/races/2023-beirut-broken-leg.webp',
  '2024-kharbe-race': '/assets/img/races/2024-kharbe.webp',
  '2024-qabr-shmoon-10k-race': '/assets/img/races/2024-qabr-shmoon.webp',
  '2024-run-the-city-beirut-marathon': '/assets/img/races/2024-run-city.webp',
  '2024-yanta-race': '/assets/img/races/2024-yanta.webp',
  '2025-montpellier-run-festival': '/assets/img/races/2025-montpellier.webp',
  '2025-omt-beirut-marathon': '/assets/img/races/2025-beirut.webp',
  '2025-anjar-race': '/assets/img/races/2025-anjar.webp',
  '2025-al-jabal-race-al-jurd': '/assets/img/races/2025-al-jurd.webp',
  '2025-al-jabal-race': '/assets/img/races/2025-al-jabal.webp',
  '2025-tripoli-race': '/assets/img/races/2025-tripoli.webp',
  '2025-biathle-triathle-world-tour': '/assets/img/races/2025-biathle.webp',
  '2026-ironman-70-3-warsaw': '/assets/img/warsaw/finish-lebanon.webp',
};

export function ProofCard({ race }: { race: Race }) {
  const [open, setOpen] = useState(false);
  const image = imageByRace[race.id];
  const cleanTime = race.time === '—' ? '' : race.time.replace(' official', '').replace(' tracked', '');
  return (
    <article className={`race-card ${open ? 'open' : ''}`}>
      {image && <img src={image} alt={`${race.name}, ${race.year}`} loading="lazy" />}
      <div className="race-card-body">
        <div className="race-card-meta"><span>{race.year}</span><span>{race.country}</span><span>{race.distance}</span></div>
        <h3>{race.name}</h3>
        <div className="race-card-result">
          {cleanTime && <strong>{cleanTime}</strong>}
          <span>{race.result}</span>
        </div>
        <button className="race-card-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          {open ? 'Close details' : 'View race'} <ChevronDown size={16} />
        </button>
        {open && (
          <div className="race-card-details">
            <dl>
              <div><dt>Date</dt><dd>{race.date}</dd></div>
              <div><dt>Location</dt><dd>{race.location}</dd></div>
              <div><dt>Discipline</dt><dd>{race.discipline}</dd></div>
            </dl>
            {race.note && race.status !== 'Proof pending' && <p>{race.note}</p>}
            {race.links.length > 0 && (
              <div className="race-card-links">
                {race.links.map((link) => (
                  <a key={`${race.id}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}<ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
