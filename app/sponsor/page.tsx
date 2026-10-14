import type { Metadata } from 'next';
import { SiteClient } from '../site-client';

export const metadata: Metadata = {
  title: 'Sponsor the Six Continents Mission | Toufic Abou Ali',
  description: 'Explore scarce race-specific sponsorship placements on Toufic Abou Ali’s trisuit, helmet and bike, plus custom full-takeover partnerships.',
  alternates: { canonical: '/sponsor' },
};

export default function Sponsor() {
  return <SiteClient initialPath="/sponsor" />;
}
