# Final QA report

## Passed

- Production build: `npm run build`
- TypeScript/React transformation: 2,219 modules
- Route code splitting: Home, Mission, Proof, Founder, Partners, Warsaw, Media, and Not Found
- Local route responses: `/`, `/mission`, `/proof`, `/founder`, `/partners`, `/warsaw`, `/media`, `/story`, `/record`, `/ironman`
- Race archive: 52 unique race IDs
- Local asset audit: 49 code-referenced assets, 0 missing
- Public phone number: not printed; used only inside the WhatsApp URL
- Public copy scan: no public sponsor prices, full budget, `1,356 lives`, “Warsaw was the audit”, “The map is public”, or internal correction labels
- Proof-pending administrative notes: hidden from the public race details
- Critical image review: hero start, hero map finish, founder portrait, Warsaw Lebanese finish, Sira workshop screenshot, and map reference
- Vercel SPA routes: explicit rewrites for all production and legacy routes
- Private-preview directives: `noindex`, `nofollow`, `noarchive`, and `robots.txt` disallow

## Scroll-film verification

### Desktop master

- File: `public/assets/media/mission-scroll-1080.mp4`
- Codec: H.264
- Size: 1920 × 1080
- Rate: 30 fps
- Duration: 15.0667 seconds
- Frames: 452
- Keyframes: 452
- Seek/decode checks passed at 0, 2.5, 5.5, 8.5, 12, and 14.8 seconds

### Mobile master

- File: `public/assets/media/mission-scroll-720.mp4`
- Codec: H.264
- Size: 1280 × 720
- Rate: 30 fps
- Duration: 15.0667 seconds
- Frames: 452
- Keyframes: 452
- Seek/decode checks passed at 0, 2.5, 5.5, 8.5, 12, and 14.8 seconds

Every frame is independently seekable. Downward and upward scroll map to the film timeline through `requestAnimationFrame` and `video.currentTime`.

## Repository-size check

Largest individual file:

- `mission-scroll-1080.mp4`: approximately 36.14 MB

No individual project file approaches GitHub’s normal 100 MiB per-file command-line limit.

## Remaining production check

This sandbox blocks headless browsers from navigating to local HTTP addresses (`ERR_BLOCKED_BY_ADMINISTRATOR`), so a full rendered screenshot pass could not be completed here. The included `DEPLOYMENT-CHECKLIST.md` provides the exact final production checks for Chrome, Safari, iPhone, Android, and reverse scrolling after Vercel deployment.
