# Deployment checklist — optimized version

## 1. Replace the connected GitHub repository

1. Extract the final ZIP.
2. Open GitHub Desktop.
3. Select the connected `Toufic` repository and branch `main`.
4. Choose **Repository → Show in Explorer**.
5. Delete the old visible project files. Never delete `.git`.
6. Copy everything from the extracted final folder directly into the connected repository folder.
7. Confirm `package.json`, `src`, and `public` are directly in the repository root.
8. Commit with:

```text
Optimize loading and fix marathon filter
```

9. Click **Push origin** and allow every file to finish uploading.

## 2. Confirm optimized media reached GitHub

Check these directories online:

```text
public/assets/frames-opt-v2/scene-01/desktop
public/assets/frames-opt-v2/scene-01/mobile
public/assets/frames-opt-v2/scene-02/desktop
public/assets/frames-opt-v2/scene-02/mobile
public/assets/frames-opt-v2/scene-03/desktop
public/assets/frames-opt-v2/scene-03/mobile
public/assets/media
```

Expected frame counts:

```text
Scene 1: 69 desktop + 69 mobile
Scene 2: 28 desktop + 28 mobile
Scene 3: 130 desktop + 130 mobile
```

The optimized MP4 names end in `-opt-v2.mp4`.

## 3. Vercel settings

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

After pushing:

1. Open the newest Vercel deployment.
2. Confirm it references the commit `Optimize loading and fix marathon filter`.
3. Redeploy with build cache cleared if the old version appears.
4. Open the new deployment in a private browser window.

The media paths are versioned, so the optimized files should not be confused with the old cached files.

## 4. Production test

Test the HTTPS Vercel URL on desktop and mobile.

Confirm:

- Scene 1 starts immediately and remains smooth.
- Scene 2 and Scene 3 load before they become active.
- Scrolling down moves forward.
- Scrolling up moves backward.
- Fast scrolling does not create blank frames.
- Navigation remains responsive while film chapters are active.
- The Marathon filter shows only Prague Marathon and OMT Beirut Marathon.

## 5. Network test

In browser developer tools:

1. Open **Network**.
2. Enable **Disable cache** only for the first diagnostic test.
3. Reload the page.
4. Filter by `frame-`.
5. Confirm the browser does not request all 454 frame files immediately.
6. Scroll into Scene 2 and Scene 3 and confirm their files begin loading only as those scenes approach.
7. Confirm no 404 errors.
8. Repeat with cache enabled and confirm repeated visits use disk or memory cache.

## 6. Local production test on Windows

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```

Open the preview URL printed by Vite. Do not double-click `index.html`.

## 7. SEO production requirements

Before requesting indexing:

1. Connect the final canonical domain, preferably `https://toufic.co`.
2. Set `VITE_SITE_URL` and `SITE_URL` to that exact production origin in Vercel.
3. Confirm the production response does not contain `X-Robots-Tag: noindex`.
4. Open `/robots.txt`, `/sitemap.xml`, and `/image-sitemap.xml` successfully.
5. Follow every step in `SEO-LAUNCH-CHECKLIST.md`.
6. Submit the canonical pages through Google Search Console and Bing Webmaster Tools.
7. Run `npm.cmd run indexnow` only after the production deployment is live.
