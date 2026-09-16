import type { Metadata } from 'next';
import { SiteClient } from '../site-client';

export const metadata: Metadata = {
  title: 'Fund the Six Continents Mission | Toufic Abou Ali',
  description: 'Help Toufic Abou Ali reach six full distance IRONMAN starting lines across six continents as part of an official Guinness World Records attempt.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Six Continents. One Mission.',
    description: 'Help Toufic Abou Ali reach the next starting line.',
    url: '/support',
    images: [{
      url: '/assets/img/support/six-continents-one-mission.webp',
      width: 1600,
      height: 900,
      alt: 'Six Continents, One Mission — Toufic Abou Ali official Guinness World Records attempt in progress',
    }],
  },
};

export default function Support() {
  return <SiteClient initialPath="/support" />;
}
