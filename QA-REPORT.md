# QA report — final polish

## Root cause of the previous video issue

The prior build was not merely a Vercel publishing problem.

Two source-level issues existed:

1. Home used one combined video rather than the requested three-section sequence.
2. The mobile media query explicitly set the scroll video to `display: none`, so mobile visitors could only see the poster image.

The new build removes that rule and uses three separate video chapters.

## Video checks completed

Six production video files were inspected:

- three 1920×1080 desktop files;
- three 1280×720 mobile files.

All are:

- H.264;
- 30 fps;
- `yuv420p`;
- fast-start enabled;
- audio-free;
- encoded with every frame as a keyframe.

Frame counts:

- Scene 1: 138 frames / 138 keyframes;
- Scene 2: 51 frames / 51 keyframes;
- Scene 3: 255 frames / 255 keyframes.

Beginning, midpoint, and near-end decoding succeeded for all six files. A local HTTP range request returned `206 Partial Content`, confirming the media format supports browser seeking.

## Source checks completed

- 21 TypeScript/TSX files passed syntax transpilation.
- CSS parsed successfully with PostCSS.
- 56 unique local asset paths were audited.
- Missing local assets: 0.
- Race records preserved: 52.
- Old combined mission videos removed.
- Old workshop screenshot removed from public assets.
- Old Guinness logo replaced with the supplied transparent file.

## Environment limitation

A full automated Chromium visual run could not be completed in this sandbox because the system browser aborted when its GPU process was unavailable. This is an environment restriction, not a detected application error. Real desktop and iPhone/Safari checks must still be completed on the deployed Vercel URL using the included deployment checklist.

## Build note

The source is Vite-ready. Dependency installation could not be completed inside this sandbox because the package registry repeatedly returned temporary 503/DNS errors. The TypeScript syntax, CSS, assets, media encodes, paths, and deployment configuration were checked independently. Vercel should install dependencies during deployment.
