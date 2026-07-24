# Toufic.co SEO Launch Checklist

## Important reality

No developer, agency, plugin, or SEO package can guarantee a number-one ranking. Search engines decide rankings using relevance, quality, authority, links, user satisfaction, freshness, competition, and many other signals. This package removes the major technical blockers and gives the website the strongest responsible foundation for discovery by Google, Bing, Copilot, image search, and journalists.

## 1. Use one permanent production domain

For the strongest long-term result, use:

```text
https://toufic.co
```

Do not split indexing between a Vercel URL, GitHub Pages URL, `www`, and the root domain.

In Vercel:

1. Open the project.
2. Go to **Settings → Domains**.
3. Add `toufic.co`.
4. Add `www.toufic.co` and redirect it permanently to `toufic.co`.
5. Keep the Vercel URL available for administration, but do not promote it publicly.
6. Confirm HTTPS is active.

Set these Vercel environment variables for Production:

```text
VITE_SITE_URL=https://toufic.co
SITE_URL=https://toufic.co
```

If the custom domain is not connected yet, temporarily set both values to the exact production Vercel URL. Change both to `https://toufic.co` before submitting the site for indexing.

## 2. Deploy the production build

Vercel settings:

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

The build now generates separate indexable HTML files for:

```text
/
/mission
/proof
/founder
/partners
/warsaw
/media
```

It also generates:

```text
/sitemap.xml
/image-sitemap.xml
/robots.txt
/feed.xml
/llms.txt
/press-kit.json
/indexnow-key.txt
```

## 3. Verify that indexing is no longer blocked

Open the production website and check the response headers in Developer Tools.

There must be no:

```text
X-Robots-Tag: noindex
```

View page source and confirm:

```html
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
```

Open:

```text
https://toufic.co/robots.txt
```

It must show `Allow: /` and both sitemap URLs.

## 4. Set up Google Search Console

1. Open Google Search Console.
2. Add a **Domain property** for `toufic.co`.
3. Verify ownership through the DNS TXT record.
4. Open **Sitemaps**.
5. Submit:

```text
https://toufic.co/sitemap.xml
https://toufic.co/image-sitemap.xml
```

6. Use **URL Inspection** and request indexing for:

```text
https://toufic.co/
https://toufic.co/mission
https://toufic.co/proof
https://toufic.co/founder
https://toufic.co/partners
https://toufic.co/warsaw
https://toufic.co/media
```

7. Inspect the live URL, not only the indexed copy.
8. Confirm Google sees the canonical URL, structured data, images, and rendered content.

Optional verification meta:

After Search Console gives a meta verification token, add it to Vercel:

```text
GOOGLE_SITE_VERIFICATION=the-token-only
```

Redeploy.

## 5. Set up Bing Webmaster Tools and Copilot discovery

1. Open Bing Webmaster Tools.
2. Import the verified site from Google Search Console or verify it directly.
3. Submit:

```text
https://toufic.co/sitemap.xml
https://toufic.co/image-sitemap.xml
```

4. Use URL Inspection for the seven canonical URLs.
5. Run the IndexNow command after the production deployment:

```powershell
npm.cmd run indexnow
```

The repository includes a valid IndexNow key file at the site root. This notifies Bing and participating engines that the canonical pages have changed.

Optional Bing verification meta:

```text
BING_SITE_VERIFICATION=the-token-only
```

## 6. Validate structured data

Test these URLs with Google Rich Results Test and Schema Markup Validator:

```text
/
/founder
/warsaw
/media
```

Expected structured-data entities include:

- Person: Toufic Abou Ali
- WebSite
- WebPage / AboutPage / CollectionPage
- ProfilePage on `/founder`
- Article on `/warsaw`
- BreadcrumbList on internal pages
- Sira as the organization Toufic works for

Warnings do not always mean invalid markup. Fix actual errors only.

## 7. Test search previews and social previews

Each page has its own:

- title;
- meta description;
- canonical URL;
- Open Graph title and description;
- 1200 × 630 social image;
- Twitter/X large-card metadata;
- image alt description.

Test links with LinkedIn Post Inspector and other social preview tools after deployment.

## 8. Build the authority search engines cannot get from code alone

Technical SEO makes the site indexable and understandable. Top rankings require independent authority.

Every credible profile or article should link to the same canonical domain:

```text
https://toufic.co
```

Priority links:

1. LinkedIn profile Featured and Contact sections.
2. Instagram bio.
3. Sira founder/about page.
4. Lebanese Triathlon Federation coverage.
5. University profile or news coverage.
6. IRONMAN-related interviews and race recaps.
7. Lebanese media features.
8. Sponsor and partner campaign pages.
9. Podcast and event speaker pages.
10. Press releases and journalist articles.

Ask outlets to use the exact name **Toufic Abou Ali** and link to the most relevant page, not always only the homepage.

Examples:

- Record mission coverage → `/mission`
- Athlete history → `/proof`
- Founder story → `/founder`
- Warsaw coverage → `/warsaw`
- Journalist resources → `/media`
- Sponsor coverage → `/partners`

A real editorial link is more valuable than dozens of low-quality directory links.

## 9. Make the media page the journalist destination

Always send journalists:

```text
https://toufic.co/media
```

Keep it current with:

- verified facts;
- exact result times;
- short and long biographies;
- approved quotes;
- high-resolution assets;
- interview contact;
- current mission status;
- confirmed race announcements only.

When a major race, sponsor, interview, or result is confirmed, update the relevant page and redeploy. The sitemap `lastmod` values and IndexNow submission will notify search engines.

## 10. Content plan needed to compete beyond name searches

The site should quickly rank for the unique name and mission combination once indexed. Ranking first for broad searches such as “IRONMAN athlete,” “Lebanese athlete,” or “sports sponsorship” requires ongoing authoritative content and links.

Publish only meaningful updates, such as:

- first full IRONMAN race confirmation;
- training-system launch;
- medical and performance preparation;
- continent-by-continent race announcements;
- official sponsor announcement;
- race-week briefing;
- official result and evidence recap;
- documentary or interview release.

Each update should answer a specific search question, include original evidence, and link into the mission, proof, founder, partners, and media pages.

Do not publish thin AI-written posts only to create volume.

## 11. Monitor monthly

In Google Search Console review:

- indexed pages;
- crawl errors;
- Core Web Vitals;
- image indexing;
- queries containing Toufic, Lebanon, IRONMAN, founder-athlete, Warsaw, and Six Continents;
- pages receiving impressions but weak click-through rates;
- backlinks.

In Bing Webmaster Tools review:

- Site Explorer;
- URL Inspection;
- IndexNow activity;
- SEO reports;
- backlinks;
- search performance.

Improve titles and page copy using actual query data, not guesses.

## 12. Never do these

- Do not buy spam backlinks.
- Do not repeat keywords unnaturally.
- Do not create fake media coverage.
- Do not add invisible text.
- Do not copy articles from other websites.
- Do not claim Guinness World Records approval before approval exists.
- Do not create hundreds of low-value generated pages.
- Do not keep both the Vercel URL and custom domain indexed as separate sites.
- Do not turn Deployment Protection on for the production URL after requesting indexing.

## Final launch order

```text
Connect toufic.co
→ Set VITE_SITE_URL and SITE_URL
→ Deploy production
→ Verify robots and headers
→ Verify Google Search Console
→ Submit both sitemaps
→ Request indexing for all seven pages
→ Import into Bing Webmaster Tools
→ Run npm.cmd run indexnow
→ Add toufic.co to every authoritative profile
→ Secure editorial links through real media and partners
→ Monitor and update with confirmed mission news
```
