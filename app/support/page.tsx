import type { Metadata } from 'next';
import { SiteClient } from '../site-client';

export const metadata: Metadata = {
  title: 'Support Six Continents Before 21 | Toufic Abou Ali',
  description: 'Help Toufic Abou Ali reach the next starting line in San Juan, Argentina, on 1 November 2026.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Six Continents. One Mission.',
    description: 'Help Toufic Abou Ali reach the next starting line.',
    url: '/support',
    images: [{
      url: '/assets/img/mission/scene-01-poster.webp',
      width: 1600,
      height: 900,
      alt: 'Toufic Abou Ali standing at a starting line',
    }],
  },
};

export default function Support() {
  return <SiteClient initialPath="/support" />;
}
