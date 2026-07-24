# Deploy the blank-page-safe version

1. Extract the ZIP.
2. Open PowerShell in the extracted folder.
3. Run `npm.cmd install`.
4. Run `npm.cmd run build`.
5. Run `npm.cmd run preview` and open the displayed localhost URL.
6. Test `/`, `/mission`, `/proof`, `/founder`, `/partners`, `/warsaw`, and `/media`.
7. In GitHub Desktop, replace the visible files in the connected Toufic repository. Never remove `.git`.
8. Commit: `Prevent blank pages from search and stale deployments`.
9. Push to `main`.
10. In Vercel, confirm the deployment uses that commit and reaches `Ready`.
11. Redeploy once with the build cache cleared.
12. Open `https://toufic.co` in an Incognito window and hard-refresh.
13. Search for the site again and open the result.

## Vercel settings

- Framework: Vite
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `22.x`

## Final checks

- `https://toufic.co` opens normally.
- `https://www.toufic.co` redirects to `https://toufic.co`.
- The page never remains completely black if JavaScript fails.
- `robots.txt`, `sitemap.xml`, and `image-sitemap.xml` still load.
- Page source contains the route-specific `boot-fallback` content.
