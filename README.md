# Toufic Abou Ali — Six Continents Sponsor Website

Production-ready Vite/React website for the private Six Continents sponsor preview.

## Mission

**6 continents. 6 full IRONMAN races. 1 world-record attempt.**

- Main world-record target: November 27, 2027
- Extreme target: complete all six before Toufic turns 21
- One full IRONMAN: 3.8 km swim + 180 km bike + 42.2 km run = 226 km
- Six races: 1,356 km

## Final architecture

Primary pages:

- `/` — sponsor-conversion homepage
- `/mission` — scale, record target, route-control system, and urgency
- `/proof` — searchable and expandable race/proof archive
- `/founder` — founder-athlete credibility and Sira execution proof
- `/partners` — partnership funnel and direct enquiry flow
- `/warsaw` — detailed IRONMAN 70.3 Warsaw origin story
- `/media` — media facts, bios, quotes, and contact

Legacy routes `/story`, `/record`, and `/ironman` remain compatible.

## Scroll-film engineering

The three approved source scenes were assembled into one seamless 15-second master. Two local delivery files are included:

- `public/assets/media/mission-scroll-1080.mp4`
- `public/assets/media/mission-scroll-720.mp4`

Both are H.264, fast-start MP4 files with **every frame encoded as a keyframe**. This gives the browser a precise seek point for every 1/30 second of film. The page maps scroll position to `video.currentTime` using `requestAnimationFrame`:

- scroll down → film moves forward;
- scroll up → film reverses;
- fast scroll → target time updates immediately and eases to the correct frame;
- mobile → lighter 720p master;
- reduced motion or media failure → the premium poster remains visible and all copy stays available.

This avoids hundreds of separate frame-network requests while retaining frame-level seeking and native hardware video decoding.

## Local testing

Do not double-click `index.html`. The site and video assets must be served over HTTP.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Production build:

```bash
npm run build
npm run preview
```

## Vercel deployment

Recommended project settings:

- Framework Preset: **Vite**
- Root Directory: `./`
- Install Command: `npm install` or Vercel default
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` contains explicit SPA rewrites, immutable asset caching, security headers, and private-preview noindex headers.

## GitHub Desktop replacement

1. Extract the final ZIP.
2. In GitHub Desktop, select the connected `Toufic` repository.
3. Choose **Repository → Show in Explorer**.
4. Delete the old visible files, but never delete `.git`.
5. Copy the contents of this folder directly into the repository root.
6. Confirm that `package.json`, `src`, `public`, `index.html`, and `vercel.json` are directly visible.
7. Commit: `Launch final Six Continents sponsor website`.
8. Click **Push origin**.
9. Vercel will build the new commit automatically when the repository is connected.

## Private-preview status

The project currently uses `noindex, nofollow, noarchive`. This reduces accidental search indexing but is **not password protection**. Use deployment access controls before sharing sensitive private material beyond the intended sponsor group.

The Guinness World Records asset is displayed as a private-preview reference. The opening uses a restrained IRONMAN wordmark treatment and authentic race photography. Before a public launch, confirm current logo and trademark permissions and remove or replace any unapproved standalone brand treatment.

## Contact flow

Primary: WhatsApp. Secondary: email. The public page does not print the phone number. No fake form submission or Calendly URL is used.

## Editing key facts

Main facts and media paths live in:

`src/data/mission.ts`

Race data lives in the attached source data files under `src/data`.
