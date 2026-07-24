# Final direct-home deployment

## What changed

The visible emergency fallback card was removed. Normal visitors now see the real Home page directly.

The site still keeps:
- an eager Home-page bundle;
- Vite stale-chunk recovery;
- a React error boundary for genuine errors;
- HTML revalidation on canonical pages;
- immutable caching for versioned assets;
- a seamless first-scene poster while the bundle starts;
- reduced-motion layouts that keep all three mission slides complete;
- canonical SEO on `https://toufic.co`;
- the permanent `www.toufic.co` redirect.

## Deploy

1. Run:
   - `npm.cmd install`
   - `npm.cmd run build`
   - `npm.cmd run preview`
2. Confirm the real Home page appears immediately.
3. Replace the visible files in the connected GitHub repository root. Never delete `.git`.
4. Commit: `Load the real homepage directly`
5. Push to `main`.
6. In Vercel, confirm:
   - Framework: Vite
   - Build command: `npm run build`
   - Output: `dist`
   - Node: 22.x
   - `VITE_SITE_URL=https://toufic.co`
   - `SITE_URL=https://toufic.co`
7. Redeploy once with the build cache cleared.
8. Test `https://toufic.co` in an Incognito window and from a Google result.

## Expected behavior

- Normal connection: real interactive Home page loads directly.
- During the fraction of a second before React mounts: only the matching first-scene poster can appear.
- Missing stale chunk after a deployment: one guarded reload.
- Genuine runtime crash: branded error recovery, not the old fallback card.
- JavaScript disabled: content inside `<noscript>` is available.
