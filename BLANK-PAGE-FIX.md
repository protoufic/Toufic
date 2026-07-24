# Blank-page prevention fix

## Problem addressed

A search result or an in-app browser could open the HTML shell while the JavaScript application failed to mount. The most likely trigger after repeated deployments is an outdated page trying to load an old Vite dynamic chunk that no longer exists on the newest deployment.

## Permanent protections added

1. The homepage is bundled into the initial JavaScript instead of being a second lazy-loaded chunk.
2. `vite:preloadError` is handled. A stale-chunk failure triggers one controlled reload to the newest deployment.
3. Every canonical HTML page contains meaningful visible fallback content inside `#root`. If JavaScript is blocked or fails, visitors and crawlers still see the correct page title, description, and navigation instead of a black screen.
4. A React error boundary displays a branded recovery screen with a reload button rather than an empty page.
5. Canonical HTML routes explicitly require browser revalidation, while hashed assets remain cached for one year.
6. SEO validation now fails if a generated canonical page is missing its static app fallback.

## Files changed

- `index.html`
- `vercel.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/AppErrorBoundary.tsx`
- `scripts/generate-seo.mjs`
- `scripts/check-seo.mjs`

No website copy, mission-slide design, proof data, imagery, map, partnership content, or SEO metadata was removed.
