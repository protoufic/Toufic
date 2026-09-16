export type PaymentMethodKey = 'gofundme' | 'whish' | 'omt' | 'purpl' | 'mymonty';
export type LocalPaymentMethodKey = Exclude<PaymentMethodKey, 'gofundme'>;

export type PublicSupporter = {
  id: string;
  displayName: string;
  country?: string;
  amount?: number;
  currency?: string;
  showCountry: boolean;
  showAmount: boolean;
  foundingNumber?: number;
};

function verifiedUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function verifiedNumber(value: string | undefined) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

const fundingGoal = verifiedNumber(process.env.NEXT_PUBLIC_SUPPORT_GOAL) ?? 30000;
const cashReceived = verifiedNumber(process.env.NEXT_PUBLIC_SUPPORT_CASH_RECEIVED) ?? 0;
const committedCash = verifiedNumber(process.env.NEXT_PUBLIC_SUPPORT_COMMITTED_CASH) ?? 1000;
const inKindValue = verifiedNumber(process.env.NEXT_PUBLIC_SUPPORT_IN_KIND_VALUE) ?? 0;
const foundingSupporterCount = Math.min(100, Math.floor(verifiedNumber(process.env.NEXT_PUBLIC_FOUNDING_SUPPORTER_COUNT) ?? 0));

const mediaProof = [
  { name: 'Annahar', description: 'Video feature', url: verifiedUrl(process.env.NEXT_PUBLIC_ANNAHAR_COVERAGE_URL) ?? 'https://www.instagram.com/reel/DdT-aPmtUae/' },
  { name: 'Noursat', description: 'TV appearance', url: verifiedUrl(process.env.NEXT_PUBLIC_NOURSAT_APPEARANCE_URL) ?? 'https://www.instagram.com/reel/DdTav13JPn8/' },
  { name: 'Télé Liban', description: 'TV appearance', url: verifiedUrl(process.env.NEXT_PUBLIC_TELE_LIBAN_APPEARANCE_URL) ?? 'https://www.instagram.com/reel/Dc87f-ypZ6o/' },
].filter((outlet): outlet is { name: string; description: string; url: string } => Boolean(outlet.url));

export const supportConfig = {
  canonicalUrl: 'https://toufic.co/support',
  contactEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'protoufic@gmail.com',
  supporterWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '96176923943',
  foundingSupporterCount,
  nextRace: {
    name: 'IRONMAN San Juan',
    city: 'San Juan',
    country: 'Argentina',
    date: '1 November 2026',
    officialUrl: 'https://www.ironman.com/races/im-san-juan',
  },
  payments: {
    gofundme: {
      label: 'GoFundMe',
      description: 'Best for supporters outside Lebanon.',
      url: verifiedUrl(process.env.NEXT_PUBLIC_GOFUNDME_URL) ?? 'https://gofund.me/5612179bc',
      feeNote: 'The provider shows the final currency and any applicable charge before payment.',
    },
    whish: {
      label: 'Whish',
      description: 'Fast local wallet transfer.',
      feeNote: 'Confirm the currency, recipient name and any fee shown in Whish before sending.',
    },
    omt: {
      label: 'OMT Pay',
      description: 'An alternative local wallet route.',
      feeNote: 'Confirm the recipient name, amount and fee shown inside OMT Pay before payment.',
    },
    purpl: {
      label: 'Purpl',
      description: 'Transfer using a Lebanese mobile number.',
      feeNote: 'Purpl shows any applicable charge before confirmation and may require recipient registration.',
    },
    mymonty: {
      label: 'MyMonty',
      description: 'Transfer using a mobile number.',
      feeNote: 'MyMonty currently lists wallet sending and receiving as free. Confirm the live review screen.',
    },
  },
  localTransfer: {
    displayNumber: process.env.NEXT_PUBLIC_LOCAL_WALLET_NUMBER || '76 923 943',
    copyValue: process.env.NEXT_PUBLIC_LOCAL_WALLET_COPY_VALUE || '+96176923943',
    recipientName: 'Toufic Abou Ali',
  },
  funding: {
    currency: process.env.NEXT_PUBLIC_SUPPORT_CURRENCY || 'EUR',
    goal: fundingGoal,
    cashReceived,
    committedCash,
    inKindValue,
    updatedAt: process.env.NEXT_PUBLIC_SUPPORT_UPDATED_AT || '16 September 2026',
    isVerified: true,
    milestoneNote: 'GoFundMe may show a smaller automatic milestone while the full mission cash target remains €30,000.',
  },
  budgetCategories: [
    'Race entries',
    'Flights and bicycle transport',
    'Accommodation and local travel',
    'Bicycle and essential equipment',
    'Medical care and insurance',
    'Training and nutrition',
    'Documentation and evidence',
  ],
  route: [
    { number: '01', continent: 'South America', status: 'Next', detail: 'San Juan, Argentina' },
    { number: '02', continent: 'Asia', status: 'Future chapter', detail: 'Route planned' },
    { number: '03', continent: 'Oceania', status: 'Future chapter', detail: 'Route planned' },
    { number: '04', continent: 'Africa', status: 'Future chapter', detail: 'Route planned' },
    { number: '05', continent: 'North America', status: 'Future chapter', detail: 'Route planned' },
    { number: '06', continent: 'Europe', status: 'Final chapter', detail: 'Route being confirmed' },
  ],
  mediaProof,
  supporterConsentUrl: verifiedUrl(process.env.NEXT_PUBLIC_SUPPORTER_CONSENT_URL),
} as const;

// This public file must contain only supporters who explicitly approved each visible field.
// The private donation ledger must never be imported into the website bundle.
export const publicSupporters: PublicSupporter[] = [];
