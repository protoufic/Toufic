# QA report — performance-only update

## Confirmed changes

- The website design, text, page structure, imagery, and interactions were preserved.
- Marathon filtering was corrected and returns only:
  - 2025 OMT Beirut Marathon
  - 2026 Prague Marathon
- 23 TypeScript/TSX files parsed successfully with no syntax diagnostics.
- 65 direct local asset references were audited.
- Missing direct local assets: 0.
- Scene 1: 69 desktop frames and 69 mobile frames.
- Scene 2: 28 desktop frames and 28 mobile frames.
- Scene 3: 130 desktop frames and 130 mobile frames.
- Total frame files: 454, reduced from 904.
- Every expected frame number exists without gaps.
- All six optimized desktop/mobile MP4 fallbacks decode as H.264 video.
- Frame directories and MP4 filenames were versioned to prevent stale browser-cache reuse.
- Route chunks now preload only after real pointer, keyboard, or touch intent.
- The large race database is no longer included in the homepage data path.
- Off-screen decorative background images and the world map are lazy-decoded.

## Network behavior

- Full background warming of every film frame was removed.
- Only a small directional window around the current frame is requested.
- Five sparse anchor frames help fast scroll jumps without fetching the complete chapter.
- Scene 2 and Scene 3 do not begin loading until they approach the viewport.
- Data Saver and 2G-class connections use optimized MP4 fallback instead of many image requests.
- Immutable caching remains enabled for versioned static assets.

## Size reduction

- Previous extracted project: approximately 107 MB.
- Optimized extracted project: approximately 38 MB.
- Frame assets: approximately 34 MB reduced to approximately 12 MB.
- Mission fallback videos: heavily reduced while preserving H.264 compatibility and frequent seek points.

## Environment limitation

The source files were syntax-checked and media assets were decoded with FFmpeg. A complete Vite production build was not completed in this container because npm dependency installation was unavailable. Run `npm.cmd run build` and `npm.cmd run preview` on the same Windows computer where the previous version already worked before pushing to sponsors.
