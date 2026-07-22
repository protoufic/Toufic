# Toufic Abou Ali — Six Continents

Production-ready Vite/React website for the private Six Continents sponsor preview.

## Final media architecture

The homepage uses three separate mission chapters:

1. Standing and breathing
2. Sprint
3. Lebanon and six-continent reveal

The latest supplied edits are integrated by **visual content**, because the first two Drive files were named in the opposite order from their actual scenes:

- Scene 1 uses the standing/breathing footage.
- Scene 2 uses the sprint footage.
- Scene 3 uses the Lebanon/world-map footage.

### Smooth scrolling method

The primary experience does not depend on repeatedly seeking through one normal MP4. Each video was exported into responsive WebP frame sequences:

- Desktop: 1600 × 900
- Mobile: 960 × 540
- Scene 1: 138 frames
- Scene 2: 55 frames
- Scene 3: 259 frames

The browser draws the correct frames to a canvas, keeps only a small decoded frame window in memory, warms the compressed browser cache in the background, and softly blends neighbouring frames. This supports forward and reverse scrolling with less decoder stutter.

High-quality all-intra H.264 MP4 files remain included as fallbacks for data-saving connections or frame-loading failure.

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

Use:

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

The `vercel.json` file includes clean-route rewrites and long-lived caching for frame and media assets.

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

## Brand assets

The Toufic mark is used in the header and favicon:

```text
public/assets/img/brand/toufic-mark.svg
```

The mission cover uses the final frame from the updated third video. The Partners cover uses the strongest Lebanese IRONMAN 70.3 Warsaw finish image, so no new generated cover is required for this version.

## Updating later

Replace source media only through the configured paths in:

```text
src/data/mission.ts
```

Do not hotlink Google Drive files. Keep public website assets inside `public/assets`.
