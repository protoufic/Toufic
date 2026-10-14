import type { Metadata } from 'next';
import { SiteClient } from '../../site-client';

export const metadata: Metadata = {
  title: 'Sponsor Argentina | Interactive Race Marketplace | Toufic.co',
  description: 'Explore 13 scarce Argentina sponsorship placements on Toufic’s trisuit, helmet and bike. Preview your logo in 3D or discuss a custom takeover.',
  alternates: { canonical: '/sponsor/argentina' },
};

export default function ArgentinaSponsorMarketplace() {
  return <SiteClient initialPath="/sponsor/argentina" />;
}
