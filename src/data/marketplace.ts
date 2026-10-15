export type MarketplaceTier = 'premium' | 'standard' | 'entry';
export type MarketplaceAsset = 'athlete' | 'helmet' | 'bike';

export type SponsorSpot = {
  id: string;
  label: string;
  tier: MarketplaceTier;
  asset: MarketplaceAsset;
  mesh: string;
  camera: string;
  position: [number, number, number];
  normal: [number, number, number];
  // Physical width/height of this validated 3D sponsor zone; recalibrate on model replacement.
  aspectRatio: number;
  basePrice: number;
  nextPrice: number;
  status: 'available' | 'owned';
  owner?: string;
};

export const pricingLadders = {
  premium: [1000, 2000, 4000, 8000, 16000],
  standard: [500, 1000, 2000, 4000, 8000],
  entry: [250, 500, 1000, 2000, 4000],
} as const;

export const argentinaSpots: SponsorSpot[] = [
  { id: 'trisuit_chest_left', label: 'Left Chest', tier: 'premium', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_CHEST_LEFT', camera: 'chest_left', position: [0.0729645, 1.3665643, 0.1115787], normal: [0.3161578, -0.0515983, 0.9473024], aspectRatio: 1.3255, basePrice: 1000, nextPrice: 1000, status: 'available' },
  { id: 'trisuit_chest_right', label: 'Right Chest', tier: 'premium', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_CHEST_RIGHT', camera: 'chest_right', position: [-0.0780992, 1.3665631, 0.1098436], normal: [-0.3161171, -0.0541758, 0.9471721], aspectRatio: 1.3255, basePrice: 1000, nextPrice: 1000, status: 'available' },
  { id: 'trisuit_back_upper', label: 'Upper Back', tier: 'premium', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_BACK_UPPER', camera: 'back_upper', position: [-0.0059594, 1.3881182, -0.1299901], normal: [-0.033926, -0.0590362, -0.9976792], aspectRatio: 2.124, basePrice: 1000, nextPrice: 1000, status: 'available' },
  { id: 'trisuit_back_lower', label: 'Lower Back', tier: 'standard', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_BACK_LOWER', camera: 'back_lower', position: [0.0044853, 1.1743776, -0.1041091], normal: [0.0368228, -0.084587, -0.9957355], aspectRatio: 2.1598, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'trisuit_sleeve_left', label: 'Left Sleeve', tier: 'standard', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_SLEEVE_LEFT', camera: 'sleeve_left', position: [0.2995169, 1.3081248, 0.0317621], normal: [0.8775177, 0.2641235, 0.4002517], aspectRatio: 0.7598, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'trisuit_sleeve_right', label: 'Right Sleeve', tier: 'standard', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_SLEEVE_RIGHT', camera: 'sleeve_right', position: [-0.3023349, 1.299131, 0.0315253], normal: [-0.8772509, 0.2640103, 0.4009106], aspectRatio: 0.7598, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'trisuit_thigh_left', label: 'Left Thigh', tier: 'standard', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_THIGH_LEFT', camera: 'thigh_left', position: [0.1079494, 0.7862877, 0.0912431], normal: [0.0569494, -0.1160151, 0.9916135], aspectRatio: 0.6483, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'trisuit_thigh_right', label: 'Right Thigh', tier: 'standard', asset: 'athlete', mesh: 'SPONSOR_TRISUIT_THIGH_RIGHT', camera: 'thigh_right', position: [-0.1130015, 0.7862936, 0.0906621], normal: [-0.1699249, -0.1032, 0.9800384], aspectRatio: 0.6483, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'helmet_left', label: 'Helmet Left', tier: 'standard', asset: 'helmet', mesh: 'SPONSOR_HELMET_LEFT', camera: 'helmet_left', position: [0.0976355, 1.7669604, 0.0062464], normal: [0.8863521, 0.4612569, 0.0402747], aspectRatio: 1.6244, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'helmet_right', label: 'Helmet Right', tier: 'standard', asset: 'helmet', mesh: 'SPONSOR_HELMET_RIGHT', camera: 'helmet_right', position: [-0.0976355, 1.7669604, -0.0062464], normal: [-0.8863521, 0.4612569, -0.0402747], aspectRatio: 1.6244, basePrice: 500, nextPrice: 500, status: 'available' },
  { id: 'helmet_rear', label: 'Helmet Rear', tier: 'entry', asset: 'helmet', mesh: 'SPONSOR_HELMET_REAR', camera: 'helmet_rear', position: [0.0043508, 1.7670415, -0.1405487], normal: [0.0754192, 0.5986266, -0.7974698], aspectRatio: 1.0099, basePrice: 250, nextPrice: 250, status: 'available' },
  { id: 'bike_frame_left_hero', label: 'Bike Left Hero', tier: 'premium', asset: 'bike', mesh: 'SPONSOR_BIKE_FRAME_LEFT_HERO', camera: 'bike_left', position: [0.0304552, 0.5458238, 0.1294965], normal: [0.9988996, 0.0364789, -0.0294781], aspectRatio: 5.022, basePrice: 1000, nextPrice: 1000, status: 'available' },
  { id: 'bike_frame_right_hero', label: 'Bike Right Hero', tier: 'premium', asset: 'bike', mesh: 'SPONSOR_BIKE_FRAME_RIGHT_HERO', camera: 'bike_right', position: [-0.0304552, 0.4534682, 0.2041274], normal: [-0.9988996, -0.0364791, 0.0294779], aspectRatio: 5.022, basePrice: 1000, nextPrice: 1000, status: 'available' },
];

export const argentinaMarketplace = {
  raceName: 'Argentina',
  raceLabel: 'South America · Race 01',
  closeIso: '2026-10-20T20:59:00.000Z',
  closeLabel: '20 Oct 2026 · 23:59 Beirut',
  checkoutEnabled: false,
  coreCount: 13,
  secondaryCount: 4,
  customModes: [
    'Chest Takeover',
    'Full Trisuit',
    'Full Helmet',
    'Full Bike',
    'Full Equipment',
    'Full Race',
    'Multi-race Partnership',
  ],
};
