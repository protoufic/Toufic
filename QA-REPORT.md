# QA report

## Completed checks

- 21 TypeScript/TSX source files parsed with zero syntax diagnostics.
- CSS opening and closing braces are balanced.
- 63 direct local asset references were audited.
- Missing direct local assets: 0.
- All expected frame filenames exist without gaps.
- Scene 1: 138 desktop frames and 138 mobile frames.
- Scene 2: 55 desktop frames and 55 mobile frames.
- Scene 3: 259 desktop frames and 259 mobile frames.
- Representative beginning, middle, and final WebP frames decoded successfully for every scene.
- Desktop and mobile H.264 fallback files decoded successfully.
- Fallback files contain the correct frame counts and durations.
- Header logo and favicon asset added.
- Mission cover replaced by the updated third-video final frame.
- Partners cover retained as the strongest Lebanese Warsaw finish image.
- Founder page duplicate Warsaw image replaced by a running image.
- Interactive-map coordinates were corrected against the actual 16:9 map artwork.
- Map detail panel moved below the map so it no longer covers continent markers.
- Frame assets receive immutable cache headers through `vercel.json`.

## Compatibility design

- Canvas frame sequence is the primary scroll-rendering method.
- Desktop and mobile use separate frame resolutions.
- Only a limited decoded-frame window is held in memory.
- Compressed frames are warmed in the browser cache before their chapter is reached.
- Neighbouring frames are blended to reduce visible stepping.
- MP4 fallback is used for data-saving connections or frame-load failure.
- Reduced-motion users receive stable posters and full copy.
- The film begins below the fixed header.

## Not completed in this environment

A full Vite production build could not be run because the sandbox package registry repeatedly returned a temporary 503 response during dependency installation. This is an environment dependency-download failure, not a detected source-code failure.

A complete physical-device browser matrix was therefore not claimed. Run `npm.cmd install`, `npm.cmd run build`, and the deployment checklist on the connected computer/Vercel project before sponsor distribution.
