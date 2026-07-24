# Final deployment steps

1. Extract the ZIP.
2. Run `npm.cmd install` and `npm.cmd run build`.
3. Run `npm.cmd run preview` and test the first slide with Windows Animation Effects both ON and OFF.
4. Test the preview at a short desktop size and in a mobile browser.
5. Replace the visible files in the connected GitHub repository root; never change `.git`.
6. Commit: `Fix embedded hero visibility and enforce canonical domain`.
7. Push to `main`.
8. Confirm Vercel deploys the newest commit.
9. In Vercel Domains, keep both `toufic.co` and `www.toufic.co` connected.
10. Set `www.toufic.co` to redirect permanently to `toufic.co`. The source code now enforces this as a second safeguard.
11. Open `https://www.toufic.co/mission`; it must redirect to `https://toufic.co/mission`.
12. Open `https://toufic.co/robots.txt` and `https://toufic.co/sitemap.xml`.
13. View page source and confirm canonical URLs begin with `https://toufic.co`.
14. Only submit `https://toufic.co` URLs to Google Search Console and Bing Webmaster Tools.
