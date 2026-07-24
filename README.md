# Toufic Abou Ali — Six Continents

Final Vite/React website for `https://toufic.co`.

This package preserves the existing design, content, videos, proof archive, SEO pages and performance architecture. It adds the reliability fixes required for direct visits from Google, Instagram and other in-app browsers, plus a safe static layout when Reduced Motion is enabled.

## Required local test on Windows

Open PowerShell inside this folder and run:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```

Open the preview URL printed by Vite. Do not open `index.html` directly.

## Vercel settings

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

Production environment variables:

```text
VITE_SITE_URL=https://toufic.co
SITE_URL=https://toufic.co
```

## Canonical domain

- `https://toufic.co` is the canonical website.
- `https://www.toufic.co` permanently redirects to the same path on `https://toufic.co`.
- Only `toufic.co` URLs belong in sitemaps, canonical tags and indexing requests.

## Reliability protections

- Homepage code is included in the main bundle instead of being a second lazy chunk.
- Stale Vite chunks trigger one guarded refresh rather than a black screen or reload loop.
- A visible route-specific HTML fallback exists before React mounts.
- A React error boundary provides a recovery screen for unexpected rendering failures.
- Canonical page HTML is revalidated after each deployment while hashed assets remain cached for one year.
- Reduced Motion uses a separate static editorial layout that preserves all text in all three film chapters.

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

The Marathon filter returns only OMT Beirut Marathon and Prague Marathon.
