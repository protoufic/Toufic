# Final launch checklist

1. Extract the ZIP and confirm `package.json`, `src`, `public`, `scripts`, `vite.config.ts` and `vercel.json` are directly in the folder root.
2. Open PowerShell in the folder.
3. Run `npm.cmd install`.
4. Run `npm.cmd run build`.
5. Confirm the build ends with `SEO validation passed for 7 canonical pages.`
6. Run `npm.cmd run preview` and open the printed local URL.
7. Test all three scenes with Windows Animation Effects ON.
8. Turn Animation Effects OFF, fully restart the browser, and confirm every scene, line and button remains visible.
9. Test a phone-width viewport and a short-height viewport.
10. Replace only the visible files inside the connected GitHub repository root; never delete `.git`.
11. Commit: `Finalize SEO and all-device mission reliability`.
12. Push to `main`.
13. In Vercel use Vite, root `./`, install `npm install`, build `npm run build`, output `dist`, Node 22.x.
14. Keep `VITE_SITE_URL=https://toufic.co` and `SITE_URL=https://toufic.co` in Production.
15. Ensure `toufic.co` is primary and `www.toufic.co` redirects to `toufic.co`.
16. Redeploy once with build cache cleared.
17. Test all canonical pages in an Incognito browser.
18. Confirm `/robots.txt`, `/sitemap.xml`, `/image-sitemap.xml`, `/feed.xml`, `/llms.txt` and `/press-kit.json` load.
19. Submit `sitemap.xml` and `image-sitemap.xml` in Google Search Console and Bing Webmaster Tools.
20. Run `npm.cmd run indexnow` only after the final production deployment is live.
