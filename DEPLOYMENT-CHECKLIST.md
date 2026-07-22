# Deployment checklist

## 1. Replace the connected GitHub repository

1. Extract the final ZIP.
2. Open GitHub Desktop.
3. Select the connected `Toufic` repository and branch `main`.
4. Choose **Repository → Show in Explorer**.
5. Delete the old visible project files. Never delete `.git`.
6. Copy everything from the extracted final folder directly into the connected repository folder.
7. Confirm `package.json`, `src`, and `public` are visible directly in the repository root.
8. Commit with:

```text
Final smooth three-scene mission experience
```

9. Click **Push origin**.

The repository contains many frame files. Let GitHub Desktop finish completely before closing it.

## 2. Confirm the required media reached GitHub

Check these directories online:

```text
public/assets/frames/scene-01/desktop
public/assets/frames/scene-01/mobile
public/assets/frames/scene-02/desktop
public/assets/frames/scene-02/mobile
public/assets/frames/scene-03/desktop
public/assets/frames/scene-03/mobile
public/assets/media
```

Expected frame counts:

```text
Scene 1: 138 desktop + 138 mobile
Scene 2: 55 desktop + 55 mobile
Scene 3: 259 desktop + 259 mobile
```

## 3. Configure Vercel

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

Pushes to `main` should trigger a new deployment.

If the old site appears:

1. Open the latest Vercel deployment.
2. Confirm it references the newest Git commit.
3. Redeploy with the build cache cleared.
4. Open the new deployment URL in a private window.

## 4. Test the production URL

Do not test by opening `index.html` directly.

Test the HTTPS Vercel URL on:

- Chrome desktop
- Edge desktop
- Safari on iPhone
- Chrome on Android
- one tablet or responsive browser view

For each of the three film chapters, confirm:

- the poster appears immediately;
- scrolling down moves forward;
- scrolling up moves backward;
- Scene 2 begins slowly before it fully reaches the sticky position;
- Scene 3 begins slowly before it fully reaches the sticky position;
- the copy becomes fully visible and remains readable;
- the video starts below the fixed header;
- Toufic's face is not covered by the menu;
- there are no blank frames;
- fast scrolling catches up without freezing.

## 5. Browser preferences

When the operating system requests reduced motion, the website intentionally shows still cinematic frames instead of scrubbed motion.

On Windows, test normal motion with:

```text
Settings → Accessibility → Visual effects → Animation effects: On
```

## 6. Network check

In browser developer tools:

1. Open **Network**.
2. Filter by `webp` and `mp4`.
3. Scroll through all three chapters.
4. Confirm frame and fallback assets return 200 or cached responses.
5. Confirm there are no 404 responses.

## 7. Final page review

Check:

- Home
- Mission
- Proof
- Founder
- Partners
- IRONMAN 70.3 Warsaw
- Media
- contact panel
- WhatsApp link
- email link
- countdown including seconds
- interactive map alignment
- Toufic header mark and favicon
