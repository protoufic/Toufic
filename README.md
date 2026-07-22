# Toufic Abou Ali — Six Continents

Production source for the private sponsor-preview website.

## Final structure

- Home
- Mission
- Proof
- Founder
- Partners
- IRONMAN 70.3 Warsaw
- Media resources

## What changed in this polished build

- The single combined hero film was replaced by three separate scroll-controlled video chapters.
- The videos remain active on mobile instead of being hidden by CSS.
- Every frame in every scroll video is an H.264 keyframe for precise forward and reverse seeking.
- The Guinness World Records image was replaced with the supplied transparent logo.
- The negative “what is not promised” partnership block was removed.
- The Sira workshop screenshot was removed.
- Both countdowns now show seconds.
- The world map uses a purpose-built dark asset, corrected continent coordinates, larger interaction targets, hover/focus selection, and a clean mobile list.
- Additional race and mission photography is used as dimmed editorial background atmosphere.
- The source remains private-preview oriented with `noindex` headers.

## Video architecture

The Home page uses three independent sticky scroll scenes:

1. `mission-scene-01-*` — standing, breathing, camera approach.
2. `mission-scene-02-*` — movement into the sprint.
3. `mission-scene-03-*` — Lebanon, flag, and six-continent reveal.

Desktop files are 1920×1080. Mobile files are 1280×720. All files are H.264, 30 fps, muted, locally hosted, fast-start enabled, and encoded with every frame as a keyframe.

Scroll position maps directly to `video.currentTime`:

- scroll down → forward;
- scroll up → reverse;
- slow scroll → precise movement;
- fast scroll → direct seek to the correct frame.

Posters remain visible while media loads. Reduced-motion visitors receive still-image scenes. A media error falls back to the poster instead of showing a blank section.

## Local test

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite. Do not test by double-clicking `index.html`.

## Production build

```bash
npm install
npm run build
npm run preview
```

The output folder is `dist`.

## Vercel settings

- Framework preset: **Vite**
- Root directory: `./`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` includes clean routes, SPA rewrites, long-lived asset caching, inline MP4 handling, and range-response headers.

## Private preview

The project currently sends `noindex, nofollow, noarchive`. That discourages indexing but is not access control. Use Vercel Deployment Protection or a protected preview URL when needed.

## Main contact

- Email: `protoufic@gmail.com`
- WhatsApp: configured as a direct CTA without displaying the number in page text.
