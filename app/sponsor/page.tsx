import type { Metadata } from 'next';
import { SiteClient } from '../site-client';

export const metadata: Metadata = {
  title: 'Sponsor the Six Continents Mission | Toufic Abou Ali',
  description: 'Explore scarce race-specific sponsorship placements on Toufic Abou Ali’s trisuit, helmet and bike, plus custom full-takeover partnerships.',
  alternates: { canonical: '/sponsor' },
  openGraph: {
    title: 'Sponsor the Six Continents Mission | Toufic Abou Ali',
    description: 'Explore scarce race-specific sponsorship placements on Toufic Abou Ali’s trisuit, helmet and bike, plus custom full-takeover partnerships.',
    type: 'website',
    images: [{ url: '/assets/3d/argentina/poster_full_front.webp', width: 1200, height: 630, alt: 'Toufic.co Argentina sponsorship marketplace preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sponsor the Six Continents Mission | Toufic Abou Ali',
    description: 'Explore scarce race-specific sponsorship placements on Toufic Abou Ali’s trisuit, helmet and bike, plus custom full-takeover partnerships.',
    images: ['/assets/3d/argentina/poster_full_front.webp'],
  },
};

export default function Page() {
  return <SiteClient initialPath="/sponsor" />;
}
