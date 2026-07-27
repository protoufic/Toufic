# Final implementation handoff

## Deploy

Use these Vercel settings:

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

Optional verification tokens can be added later:

```text
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
```

## After deployment

1. Confirm `/robots.txt`, `/sitemap.xml` and `/image-sitemap.xml` load on `https://toufic.co`.
2. View source on `/`, `/founder`, `/warsaw` and `/partners`; the full page copy must already be inside `#root`.
3. Add the domain property in Google Search Console and submit both sitemaps.
4. Import or verify the site in Bing Webmaster Tools.
5. Run `npm run indexnow` only after the canonical domain is live.
6. Add `https://toufic.co` to Instagram, LinkedIn, Sira, federation, university, sponsor and media profiles.
7. Send journalists directly to `/media` and sponsors directly to `/partners`.

See `SEO-LAUNCH-CHECKLIST.md` for the complete launch and authority plan.
