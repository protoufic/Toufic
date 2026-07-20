# MEDIA INTEGRATION GUIDE

## How to Use This Guide

This guide lists every media slot in the website. When you have final videos or images, use this document to find exactly where each one goes and what specifications it needs.

All image paths are centralized in `assets/js/config.js`. For most slots, you only need to change the path in that one file.

---

## QUICK REFERENCE

### How to Replace an Image

1. Prepare the image to the recommended dimensions
2. Save it to `assets/img/` with the recommended filename (or any name you prefer)
3. Open `assets/js/config.js` and update the `src` path for the relevant slot
4. Update the `alt` text if needed
5. Adjust `focalDesktop` and `focalMobile` to control the crop on each screen size

### How to Add a Video

1. Save the video file or use a hosted URL (e.g., Cloudflare Stream, Vimeo, or self-hosted)
2. Open `assets/js/config.js` and set `heroVideo.src` to the video URL
3. The hero section will need a `<video>` element added — see the video slot details below

---

## HERO SECTION

### HERO_SCENE_01 — Primary Hero Background

| Property | Value |
|---|---|
| **Page** | `index.html` — Hero section |
| **Type** | Image (now) → Video (later) |
| **Desktop Ratio** | 16:9 |
| **Mobile Ratio** | 9:16 or 4:5 crop |
| **Recommended Size** | 1920 × 1080 px (desktop), 1080 × 1920 px (mobile) |
| **Subject-Safe Area** | Center-right |
| **Text-Safe Area** | Left 42% |
| **Desktop Focal Point** | 50% 42% |
| **Mobile Focal Point** | 55% 35% |
| **Fallback** | Current `hero-mission-frame.png` |
| **Config Key** | `media.hero` |
| **Filename** | `hero-mission-frame.png` |

**Current file:** `assets/img/hero-mission-frame.png`

**To add video:** Replace the `<img>` tag in the hero `.hero__bg` div with:
```html
<video autoplay muted loop playsinline poster="assets/img/hero-mission-frame.png">
  <source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
</video>
```
Keep the poster image as fallback.

---

### HERO_STILLNESS — State 1: Stillness

| Property | Value |
|---|---|
| **Page** | `index.html` — Section 2 (Dynamic Mission Stage) |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 800 × 1000 px |
| **Subject-Safe Area** | Center |
| **Text-Safe Area** | Right side (split layout) |
| **Desktop Focal Point** | 50% 40% |
| **Mobile Focal Point** | 50% 30% |
| **Config Key** | `media.heroStartLine` |
| **Filename** | `toufic-start-line-dark.png` |

**Current file:** `assets/img/toufic-start-line-dark.png`

**Description:** Toufic standing alone at a start line, still and composed. Dark, cinematic mood.

---

### HERO_MOVEMENT — State 2: Movement

| Property | Value |
|---|---|
| **Page** | `index.html` — Section 3 (Movement) |
| **Type** | Image or Video |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 800 × 1000 px |
| **Subject-Safe Area** | Center |
| **Desktop Focal Point** | 50% 45% |
| **Mobile Focal Point** | 55% 40% |
| **Config Key** | `media.heroRunning` |
| **Filename** | `toufic-running-forward.png` |

**Current file:** `assets/img/toufic-running-forward.png`

**Description:** Toufic beginning to run forward. Energy and motion.

---

### HERO_FLAG — Lebanese Flag Energy

| Property | Value |
|---|---|
| **Page** | `mission.html` — Hero |
| **Type** | Image |
| **Desktop Ratio** | 16:9 |
| **Recommended Size** | 1920 × 1080 px |
| **Subject-Safe Area** | Center |
| **Desktop Focal Point** | 50% 35% |
| **Mobile Focal Point** | 50% 25% |
| **Config Key** | `media.heroFlag` |
| **Filename** | `toufic-flag-energy.png` |

**Current file:** `assets/img/toufic-flag-energy.png`

---

### HERO_CLOSEUP — Close-up Focus

| Property | Value |
|---|---|
| **Page** | `mission.html` — Identity section |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 600 × 750 px |
| **Subject-Safe Area** | Center, face prominent |
| **Desktop Focal Point** | 50% 30% |
| **Mobile Focal Point** | 50% 20% |
| **Config Key** | `media.heroCloseup` |
| **Filename** | `toufic-closeup-focused.png` |

**Current file:** `assets/img/toufic-closeup-focused.png`

---

## FOUNDER SECTION

### FOUNDER_PORTRAIT — Editorial Portrait

| Property | Value |
|---|---|
| **Page** | `index.html` — Founder section; `founder.html` — Hero |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 600 × 750 px (split), 1920 × 1080 px (hero) |
| **Subject-Safe Area** | Upper center |
| **Desktop Focal Point** | 50% 25% |
| **Mobile Focal Point** | 50% 20% |
| **Config Key** | `media.founder` |
| **Filename** | `headshot-profile.png` |

**Current file:** `assets/img/headshot-profile.png`

---

### FOUNDER_WARSAW — Warsaw Portrait

| Property | Value |
|---|---|
| **Page** | `founder.html` — Identity section |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 600 × 750 px |
| **Subject-Safe Area** | Center |
| **Desktop Focal Point** | 50% 30% |
| **Mobile Focal Point** | 50% 25% |
| **Config Key** | `media.founderWarsaw` |
| **Filename** | `founder-warsaw.jpg` |

**Current file:** `assets/img/founder-warsaw.jpg`

---

## IRONMAN 70.3 WARSAW

### WARSAW_HERO — Race Hero

| Property | Value |
|---|---|
| **Page** | `warsaw.html` — Hero |
| **Type** | Image |
| **Desktop Ratio** | 16:9 |
| **Recommended Size** | 1920 × 1080 px |
| **Subject-Safe Area** | Center |
| **Desktop Focal Point** | 50% 40% |
| **Mobile Focal Point** | 50% 35% |
| **Config Key** | `media.ironmanFinish` |
| **Filename** | `finisher-ironman.png` |

**Current file:** `assets/img/finisher-ironman.png`

---

### WARSAW_BIKE — Cycling in Warsaw

| Property | Value |
|---|---|
| **Page** | `index.html`, `warsaw.html` — Bike sections |
| **Type** | Image |
| **Desktop Ratio** | 4:3 |
| **Recommended Size** | 800 × 600 px |
| **Subject-Safe Area** | Center |
| **Config Key** | `media.ironmanBikeWarsaw` |
| **Filename** | `ironman-bike-warsaw.jpg` |

**Current file:** `assets/img/ironman-bike-warsaw.jpg`

---

### WARSAW_RUNNING — Running During Race

| Property | Value |
|---|---|
| **Page** | `warsaw.html` — What happened section |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 600 × 750 px |
| **Config Key** | `media.ironmanRunning` |
| **Filename** | `ironman-running.png` |

**Current file:** `assets/img/ironman-running.png`

---

### WARSAW_FINISH — Finish Moment

| Property | Value |
|---|---|
| **Page** | `warsaw.html`, `proof.html` — Result sections |
| **Type** | Image |
| **Desktop Ratio** | 4:5 |
| **Recommended Size** | 600 × 750 px |
| **Config Key** | `media.ironmanFinishDown` |
| **Filename** | `ironman-finish-down.jpg` |

**Current file:** `assets/img/ironman-finish-down.jpg`

---

## WARSAW GALLERY (15 slots)

All gallery images use 4:3 ratio at 400 × 300 px minimum.

| Slot | Current File | Description |
|---|---|---|
| WARSAW_GAL_01 | `ironman-pre-swim-cap.png` | Fixing cap before swim start |
| WARSAW_GAL_02 | `ironman-pre-swim-glasses.png` | Adjusting glasses pre-race |
| WARSAW_GAL_03 | `ironman-pre-swim-look.png` | Looking up before swim |
| WARSAW_GAL_04 | `ironman-water-exit.png` | Exiting the water |
| WARSAW_GAL_05 | `ironman-running-t1.png` | Running into T1 |
| WARSAW_GAL_06 | `ironman-bike-warsaw.jpg` | Cycling in Warsaw |
| WARSAW_GAL_07 | `ironman-bike-green.jpg` | Cycling through green trees |
| WARSAW_GAL_08 | `ironman-running.png` | Running during race |
| WARSAW_GAL_09 | `finisher-ironman.png` | Finisher photo |
| WARSAW_GAL_10 | `ironman-finish-down.jpg` | Crossing finish line |
| WARSAW_GAL_11 | `ironman-finish-up.jpg` | Finish line moment |
| WARSAW_GAL_12 | `ironman-exit-finisher.png` | Exiting finisher zone |
| WARSAW_GAL_13 | `finish-lebanese.png` | With Lebanese flag |
| WARSAW_GAL_14 | `pre-ironman-bike-warsaw.png` | Holding bike pre-race |
| WARSAW_GAL_15 | `pre-ironman-standing-bike.png` | Standing with bike, Warsaw behind |

---

## MAP BACKGROUND

### WORLD_MAP

| Property | Value |
|---|---|
| **Page** | `index.html`, `mission.html` — Map sections |
| **Type** | Image |
| **Desktop Ratio** | 2:1 |
| **Recommended Size** | 1800 × 900 px |
| **Subject-Safe Area** | Full frame |
| **Config Key** | `media.worldMap` |
| **Filename** | `world-map-reference.png` |

**Current file:** `assets/img/world-map-reference.png`

---

## LOGO ASSETS

| Slot | File | Size | Notes |
|---|---|---|---|
| Guinness Logo | `guinness-logo.png` | 26 KB | Use as-is. Do not imply endorsement. |
| Lebanese Cedar | `cedar-icon.png` | 74 KB | Used in navigation logo mark |
| Lebanese Flag | `lebanese-flag.png` | 2 KB | Used in hero badges |

---

## VIDEO INTEGRATION PLAN

### Phase 1 (Current) — Static Images with Premium Fallbacks

All video slots use styled image fallbacks. The site looks complete without any video.

### Phase 2 (Later) — Video Integration

When videos are ready, add them in these locations:

| Location | Video Type | Recommended Specs |
|---|---|---|
| Hero background | Cinematic loop | 1920×1080, H.264, 15-30s loop, muted |
| Mission stage State 1 | Training stillness | 1920×1080, 5-10s, muted |
| Mission stage State 2 | Running/cycling montage | 1920×1080, 10-15s, muted |
| Mission stage State 3 | Global scale reveal | 1920×1080, 10-15s, muted |
| Warsaw race recap | Full race highlights | 1920×1080, 2-5 min, with audio |

### Video Implementation

For each video, replace the `<img>` in the relevant section with:

```html
<video autoplay muted loop playsinline poster="POSTER_IMAGE_URL">
  <source src="VIDEO_URL.mp4" type="video/mp4">
  <!-- Fallback image if video fails -->
  <img src="POSTER_IMAGE_URL" alt="Description" width="1920" height="1080">
</video>
```

For longer videos (race recap), use controls instead of autoplay:

```html
<video controls preload="metadata" poster="POSTER_IMAGE_URL" width="1920" height="1080">
  <source src="VIDEO_URL.mp4" type="video/mp4">
</video>
```

---

## SOCIAL IMAGE

Create a dedicated Open Graph image:

| Property | Value |
|---|---|
| **Size** | 1200 × 630 px |
| **Format** | JPG or PNG |
| **Content** | Toufic + "6 Continents. 6 IRONMAN. 1 Record." + Lebanese cedar |
| **Filename** | `og-image.jpg` |
| **Location** | `assets/img/og-image.jpg` |

Then update the `og:image` meta tags in all HTML files.

---

## CHECKLIST

Before deploying with final media:

- [ ] All images optimized (WebP preferred, max 500 KB each)
- [ ] All images have correct alt text
- [ ] All videos have poster images
- [ ] Videos are compressed (H.264, max 10 MB for hero, max 50 MB for race recap)
- [ ] Social image created (1200 × 630 px)
- [ ] Favicon updated if needed
- [ ] All focal points tested on mobile and desktop
- [ ] No layout shift when images load
- [ ] Lightbox works with all new images
- [ ] Gallery still has 15 slots filled

---

## FILE NAMING CONVENTION

Use lowercase, hyphens, no spaces:

```
ironman-warsaw-finish.jpg
toufic-running-forward.webp
hero-mission-video.mp4
```

Keep filenames descriptive but short. The `config.js` file maps filenames to usage, so you can rename files without searching through HTML.
