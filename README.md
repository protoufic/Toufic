# Toufic Abou Ali — Six Continents

Production-ready Vite/React website for Toufic Abou Ali’s public Six Continents mission, media profile and partnership campaign.

## Performance-first mission media

The homepage keeps the exact same three mission chapters and visual structure:

1. Standing and breathing
2. Sprint
3. Lebanon and six-continent reveal

The scroll experience still uses responsive WebP frame sequences on capable connections, with MP4 fallback on data-saving or very slow connections.

### Optimized frame delivery

- Desktop frames: 1600 × 900
- Mobile frames: 960 × 540
- Frame sampling: 15 fps with neighbouring-frame blending
- Scene 1: 69 frames per device class
- Scene 2: 28 frames per device class
- Scene 3: 130 frames per device class
- Total frame files: 454

Only a small directional frame window is requested around the visitor's current scroll position. The website no longer downloads every frame in the background. Sparse anchor frames preserve fast-scroll responsiveness without consuming the entire sequence.

Optimized H.264 MP4 files remain as fallbacks. They use frequent keyframes, local hosting, byte-range delivery, and separate desktop/mobile sizes.

## Local preview on Windows

Open PowerShell inside this folder and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the localhost URL printed by Vite, usually:

```text
http://localhost:5173
```

Do not double-click `index.html`. This is a Vite project and must be served through Vite or Vercel.

To test the production build locally:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Vercel settings

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

The optimized frame and video paths are versioned so browsers cannot reuse the older, heavier media files after deployment.

## Main routes

```text
/
/mission
/proof
/founder
/partners
/warsaw
/media
```

Legacy compatibility routes:

```text
/story
/record
/ironman
```

## Proof filter correction

The Marathon filter now returns only the two full marathons:

- OMT Beirut Marathon
- Prague Marathon

Half marathons and shorter Beirut Marathon events are excluded.

## Search-engine configuration

The production build generates page-specific HTML metadata, structured data, canonical URLs, sitemaps, an image sitemap, RSS discovery feed, `llms.txt`, `press-kit.json`, and IndexNow support.

Set these Vercel Production environment variables:

```text
VITE_SITE_URL=https://toufic.co
SITE_URL=https://toufic.co
```

Optional webmaster verification variables:

```text
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
```

Build and validate:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```

After the production deployment, notify Bing and other IndexNow engines:

```powershell
npm.cmd run indexnow
```

Read `SEO-LAUNCH-CHECKLIST.md` before submitting the site to search engines.
