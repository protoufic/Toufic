# Final deployment checklist

## Replace the repository files

1. Extract the final ZIP.
2. Open GitHub Desktop.
3. Select the connected `Toufic` repository on `main`.
4. Choose **Repository → Show in Explorer**.
5. Turn hidden items off.
6. Delete the old visible project files. Never delete `.git`.
7. Copy the contents of the extracted folder directly into the repository root.
8. Confirm the root directly contains `package.json`, `index.html`, `src`, `public`, `vite.config.ts`, and `vercel.json`.
9. Commit with: `Polish final Six Continents sponsor website`.
10. Click **Push origin**.

## Vercel

Use:

- Framework preset: `Vite`
- Root directory: `./`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Wait for the deployment status to become **Ready**.

## Video verification after deployment

Test the deployed HTTPS URL, not a local file.

Desktop:

1. Hard refresh with `Ctrl + Shift + R`.
2. Confirm Scene 1 moves from the first scroll.
3. Scroll backward and confirm it reverses.
4. Continue to Scene 2 and Scene 3.
5. Scroll rapidly across each scene and confirm no blank frames appear.

Mobile:

1. Open the Vercel URL in Safari or Chrome.
2. Touch and scroll through all three scenes.
3. Confirm video appears rather than only the poster.
4. Scroll backward.
5. Rotate once and confirm the layout recovers.

Network:

- Each MP4 request should return `video/mp4`.
- Seeking should produce HTTP `206 Partial Content` range responses.
- No video should be requested from Google Drive.

## Other visual checks

- Countdown shows days, hours, minutes, and seconds.
- Guinness World Records logo has a transparent background.
- Sira workshop screenshot is absent.
- No negative promise section appears on Partners.
- All six map markers sit on the correct continent.
- Hover, keyboard focus, click, and mobile continent list all change the map detail.
- Founder image is not cropped through the face.
- No horizontal overflow at 360 px.
