# Toufic Abou Ali: Six Continents World Record

This is the production ready Vercel edition of Toufic Abou Ali's website.

## Deploy on Vercel

1. Upload this folder to a GitHub repository or import the ZIP into your project.
2. Vercel should detect **Next.js** automatically.
3. Keep the root directory as the project root.
4. Keep the install command as `npm ci`.
5. Keep the build command as `npm run build`.
6. Set the output directory to `dist`.
7. Deploy.

The included `next.config.ts` writes the native Next.js build to `dist`, and `vercel.json` applies the matching Vercel setting. This makes the project compatible with an existing Vercel project already configured to expect `dist`.

## Local verification

Use Node.js 22.

```bash
npm ci
npm test
```

The test command runs the full lint check and the optimized Next.js production build.

## Main pages

- `/partners`: conversion focused partner brief
- `/proof`: race and evidence archive
- `/mission`: six continent attempt and route
- `/founder`: founder and athlete story
- `/warsaw`: IRONMAN 70.3 Warsaw case study
- `/media`: approved biographies, facts, and sources

## Important claim language

The Guinness World Records application is accepted and remains Pending Evidence. The record is not claimed, guaranteed, or presented as achieved. Preserve that distinction in future edits.

The Guinness World Records logo and IRONMAN wordmark are intentionally retained with the existing disclaimer and source language.
