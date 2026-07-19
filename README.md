# Toufic Abou Ali — Six Continents

Static, Vercel-ready mission website. No CMS and no build step.

## Deploy on Vercel

1. Extract this folder.
2. Upload it to a new GitHub repository, with `index.html` directly at the repository root.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Framework preset: **Other**.
5. Build command: leave empty.
6. Output directory: leave empty.
7. Deploy.

Vercel reads `vercel.json`, serves clean URLs, applies long-term caching to media assets, and adds basic security headers.

## Before connecting a custom domain

Update the URLs inside `sitemap.xml` from the current portfolio URL to the final custom domain. Also add absolute canonical and Open Graph URLs once the final domain is known.

## Main files

- `index.html` — mission and sponsor-conversion homepage
- `warsaw.html` — IRONMAN 70.3 Warsaw origin story and proof
- `record.html` — searchable, expandable race archive
- `partners.html` — clear public partnership page without prices
- `media.html` — media kit, bios, quotes and direct proof links
- `story.html` — founder-athlete story
- `data/races.js` and `data/races.json` — structured race archive
- `assets/media/mission-scroll-1080.mp4` — scroll-linked desktop film
- `assets/media/mission-scroll-720.mp4` — lighter mobile film

## Accuracy rules already applied

- Uses `Founder & CEO of Sira` as the public title.
- Uses `world-record attempt` and never claims Guinness approval.
- Does not publish the budget, sponsor prices or phone number.
- Does not publish the 1,356-lives promise.
- Shows the 2023 ISF Half Marathon as a category win, while identifying 1:49:25 only as a 20.00 km Strava recording.
- Gives official race times priority over Strava moving times.
- Uses real Warsaw imagery without adding third-party logos or suggesting endorsement.

## Updating the race archive

Edit `data/races.js` and keep the same object structure. Update `data/races.json` as the portable data copy. The race page loads 12 entries at a time and supports year, discipline, podium and text filters.
