import type { Metadata } from 'next';
import { SiteClient } from '../../site-client';

export const metadata: Metadata = {
  title: 'Sponsor Argentina | Interactive Race Marketplace | Toufic.co',
  description: 'Explore 13 scarce Argentina sponsorship placements on Toufic’s trisuit, helmet and bike. Preview your logo in 3D or discuss a custom takeover.',
  alternates: { canonical: '/sponsor/argentina' },
  openGraph: {
    title: 'Sponsor Argentina | Interactive Race Marketplace | Toufic.co',
    description: 'Explore 13 scarce Argentina sponsorship placements on Toufic’s trisuit, helmet and bike. Preview your logo in 3D or discuss a custom takeover.',
    type: 'website',
    images: [{ url: '/assets/3d/argentina/poster_full_front.webp', width: 1200, height: 630, alt: 'Toufic.co Argentina sponsorship marketplace preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sponsor Argentina | Interactive Race Marketplace | Toufic.co',
    description: 'Explore 13 scarce Argentina sponsorship placements on Toufic’s trisuit, helmet and bike. Preview your logo in 3D or discuss a custom takeover.',
    images: ['/assets/3d/argentina/poster_full_front.webp'],
  },
};

export default function Page() {
  return <SiteClient initialPath="/sponsor/argentina" />;
}
