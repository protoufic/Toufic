# Final deployment checklist

## 1. Test locally

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```

Check the homepage, all three film chapters, Reduced Motion on and off, Mission, Proof, Founder, Partners, Warsaw and Media.

## 2. Replace the connected repository

1. Extract the ZIP.
2. Open GitHub Desktop and select the `Toufic` repository on `main`.
3. Choose **Repository → Show in Explorer**.
4. Delete the old visible project files, but never delete `.git`.
5. Copy all extracted files directly into the repository root.
6. Commit with:

```text
Finalize search loading and reduced-motion reliability
```

7. Push origin.

## 3. Confirm Vercel

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

Keep these Production variables:

```text
VITE_SITE_URL=https://toufic.co
SITE_URL=https://toufic.co
```

Deploy the newest commit and clear the build cache once.

## 4. Verify production

Open an Incognito window and test:

```text
https://toufic.co
https://toufic.co/mission
https://toufic.co/proof
https://toufic.co/founder
https://toufic.co/partners
https://toufic.co/warsaw
https://toufic.co/media
```

Also test:

```text
https://www.toufic.co/mission
```

It must permanently redirect to:

```text
https://toufic.co/mission
```

## 5. Verify search and cache behavior

```powershell
curl.exe -I https://toufic.co/
curl.exe -I https://www.toufic.co/mission
```

The first response must not contain `noindex`. The second should return a permanent redirect to the non-`www` URL.

Open:

```text
https://toufic.co/robots.txt
https://toufic.co/sitemap.xml
https://toufic.co/image-sitemap.xml
```

All sitemap URLs must use `https://toufic.co`.

## 6. Final device checks

- Normal animation: all three scroll films work forward and backward.
- Reduced Motion: every image and every line of copy is visible.
- Instagram in-app browser: no clipped copy and no blank page.
- Direct Google result visit: the homepage loads or shows the branded HTML fallback, never an empty black screen.
- Marathon filter: only OMT Beirut Marathon and Prague Marathon.
