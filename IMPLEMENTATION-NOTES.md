# Final Implementation Notes

## Architecture

- Static HTML, modern CSS, and vanilla JavaScript retained.
- No build process and no heavy framework.
- Primary navigation simplified to Home, Journey & Proof, Founder, and Partners.
- Detailed Warsaw and Media pages remain available as utility URLs.

## Media added

- `assets/media/mission-scene-01-breathing.mp4`
- `assets/media/mission-scene-01-breathing-mobile.mp4`
- `assets/media/mission-scene-01-breathing-poster.webp`
- `assets/media/mission-scene-02-sprint.mp4`
- `assets/media/mission-scene-02-sprint-mobile.mp4`
- `assets/media/mission-scene-02-sprint-poster.webp`
- `assets/media/mission-scene-03-lebanon-map.mp4`
- `assets/media/mission-scene-03-lebanon-map-mobile.mp4`
- `assets/media/mission-scene-03-lebanon-map-poster.webp`
- `assets/img/mission/map-interactive.webp`
- `assets/js/config.js`

The three supplied videos were renamed, locally served, re-encoded to H.264, stripped of audio, prepared with frequent keyframes, and given separate desktop and mobile versions.

## Removed

- `assets/media/mission-scroll-1080.mp4`
- `assets/media/mission-scroll-720.mp4`

These were superseded by the three-scene scroll system.

## Contact configuration

`assets/js/config.js` centralizes the contact email, WhatsApp URL, Calendly URL, partnership brief, media kit, record page, and official Warsaw results.

- Email is active: `protoufic@gmail.com`.
- WhatsApp remains hidden because no public WhatsApp link was approved for this website.
- Calendly remains hidden because no Calendly URL was supplied.
- Adding either valid URL to `config.js` automatically reveals the corresponding contact option.

The proposal form does not pretend to send data to a server. It prepares a complete email for the visitor to review and send.

## Third-party logos

Graphic versions of the IRONMAN and Guinness World Records logos are not rendered because permission for campaign use was not confirmed. The opening uses restrained text references, accurate legal wording, and authentic Warsaw photography where race branding is naturally visible. This avoids implying endorsement or approval.

## Accuracy

- Uses “world-record attempt,” never an approved or verified claim.
- Identifies IRONMAN 70.3 Warsaw correctly as a 1.9 km / 90 km / 21.1 km race.
- Identifies a full IRONMAN as 3.8 km / 180 km / 42.2 km.
- Separates official race times from Strava moving times.
- Preserves 46 race records and their supplied proof links.
- Does not publish sponsor prices, private phone details, or the unfinished 1,356-lives promise.

## Testing completed

- JavaScript syntax checks for `site.js`, `record.js`, and `config.js`.
- Local-reference audit across every HTML page: no missing image, script, stylesheet, video, or internal page path.
- One semantic H1 per page.
- Responsive visual checks at 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844, and 360×800.
- No horizontal overflow in the tested responsive views.
- Mobile navigation, dialog logic, and interactive map handlers reviewed through the browser test harness.
- All three mobile video encodes decoded and sought successfully from beginning to middle, near-end, and back toward the beginning.
- Keyframes occur approximately every 0.267 seconds for responsive scroll seeking.
- Reduced-motion, no-JavaScript, poster, and video-failure fallbacks are included.

## Deployment

See `README.md` for Vercel deployment steps. No build command is required.
