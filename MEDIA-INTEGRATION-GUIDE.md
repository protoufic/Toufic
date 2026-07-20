# MEDIA INTEGRATION GUIDE

## How to Replace Images

All images are referenced directly in the HTML. To replace:

1. Save the new image to `assets/img/`
2. Update the `src` path in the relevant HTML file
3. Update `width`, `height`, and `alt` attributes

## Image Slots by Page

### Homepage (`index.html`)

| Slot | Current File | Recommended Size | Notes |
|---|---|---|---|
| HERO | `Final mission frame...png` | 1920×1080 | Main hero background |
| WARSAW BIKE | `Ironman_Bike_Warsaw_Behind.jpg` | 800×600 | Split section |
| FOUNDER | `My Headshot Profile...png` | 600×750 | Split section |
| CEDAR ICON | `Lebanese Cedar Icon.png` | 32×32 | Navigation logo |
| WORLD MAP | `World Map Referrence.png` | 1800×900 | Map section background |

### Warsaw Page (`warsaw.html`)

| Slot | Current File | Notes |
|---|---|---|
| HERO | `Finisher Photo Ironman.png` | Race hero |
| BIKE | `Ironman_Bike_Warsaw_Behind.jpg` | Split section |
| GALLERY (15) | Various Warsaw photos | Gallery grid |

### Founder Page (`founder.html`)

| Slot | Current File | Notes |
|---|---|---|
| PORTRAIT | `My Headshot Profile...png` | Main portrait |

### Partners Page (`partners.html`)

| Slot | Current File | Notes |
|---|---|---|
| FINISH | `Ironman Finish looking up.jpg` | Honesty section |

## Adding Video

Replace the `<img>` in the hero `.hero__bg` with:

```html
<video autoplay muted loop playsinline poster="POSTER_URL">
  <source src="VIDEO_URL.mp4" type="video/mp4">
  <img src="POSTER_URL" alt="..." width="1920" height="1080">
</video>
```

## Social Image

Create `assets/img/og-image.jpg` (1200×630px) and update `og:image` in all HTML files.

## Checklist

- [ ] All images optimized (WebP preferred, max 500KB)
- [ ] All images have correct alt text
- [ ] Videos have poster images
- [ ] Social image created
- [ ] Focal points tested on mobile and desktop
- [ ] No layout shift when images load
