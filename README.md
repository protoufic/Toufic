# Six Continents — Toufic Abou Ali

**Six continents. Six full IRONMAN races. One world-record attempt.**

Production-ready sponsor-conversion website for Lebanese founder-athlete Toufic Abou Ali's Six Continents world-record attempt.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Full sponsor-conversion journey |
| Mission | `mission.html` | Mission clarity and ethical urgency |
| Proof | `proof.html` | Complete race archive with filters |
| Founder | `founder.html` | Toufic's identity and Sira |
| Partners | `partners.html` | Partnership funnel and value |
| IRONMAN 70.3 Warsaw | `warsaw.html` | Detailed race report and gallery |
| Media | `media.html` | Bios, quotes, story angles for press |
| 404 | `404.html` | Custom error page |

## Quick Start

```bash
# Serve locally
cd six-continents
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Import the repository in Vercel (vercel.com/new)
3. Framework Preset: **Other**
4. Root Directory: `./`
5. Click **Deploy**

No build step required. Vercel serves the static files directly.

## Project Structure

```
/
├── index.html          # Home page
├── mission.html        # Mission page
├── proof.html          # Proof / Race archive
├── founder.html        # Founder page
├── partners.html       # Partnership funnel
├── warsaw.html         # IRONMAN 70.3 Warsaw detail
├── media.html          # Media resources
├── 404.html            # Error page
├── robots.txt          # Search engine directives
├── sitemap.xml         # XML sitemap
├── site.webmanifest    # PWA manifest
├── favicon.svg         # Favicon
├── vercel.json         # Vercel deployment config
├── README.md           # This file
├── MEDIA-INTEGRATION-GUIDE.md  # Media integration instructions
└── assets/
    ├── css/
    │   └── site.css    # Complete stylesheet
    ├── js/
    │   ├── config.js   # Media configuration
    │   ├── site.js     # Core interactions
    │   ├── map.js      # Continent map
    │   ├── proof.js    # Race archive filters
    │   ├── gallery.js  # Lightbox gallery
    │   ├── scroll-story.js  # Scroll animations
    │   └── contact.js  # Contact form
    └── img/            # All images (replaceable)
```

## Media Integration

See `MEDIA-INTEGRATION-GUIDE.md` for exact instructions on where to insert final videos and images.

## Performance

- Static HTML — no framework, no build step
- Lazy loading for below-fold images
- IntersectionObserver for scroll animations
- `prefers-reduced-motion` respected
- No blocking third-party scripts
- No layout shift
- No horizontal overflow

## Accessibility

- Semantic HTML landmarks
- Logical heading hierarchy
- Keyboard navigation
- Focus trapping in dialogs
- Visible focus indicators
- Alt text on all images
- Reduced motion support
- Sufficient color contrast

## Contact

- Email: protoufic@gmail.com
- Instagram: https://www.instagram.com/touficaa/
- LinkedIn: https://www.linkedin.com/in/touficabouali
- Strava: https://www.strava.com/athletes/109556347
- Sira: https://siracareers.com

## License

© 2025–2026 Toufic Abou Ali. All rights reserved.
