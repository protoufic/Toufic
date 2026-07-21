# Deployment verification checklist

After Vercel reports **Ready**, test the production URL in a private browser window.

## Core pages

- [ ] `/`
- [ ] `/mission`
- [ ] `/proof`
- [ ] `/founder`
- [ ] `/partners`
- [ ] `/warsaw`
- [ ] `/media`

## Scroll film

- [ ] First poster appears immediately
- [ ] Film begins moving with the first meaningful scroll
- [ ] Slow downward scroll moves forward smoothly
- [ ] Upward scroll reverses smoothly
- [ ] Fast scroll catches the correct point without a blank frame
- [ ] Final world-map frame remains stable
- [ ] Mobile uses the lighter film
- [ ] Reduced-motion mode preserves all messages

## Conversion

- [ ] Header partnership CTA opens the contact panel
- [ ] WhatsApp opens with a prepared message
- [ ] Email opens with a prepared formal brief
- [ ] Mobile menu opens, closes, and does not trap the page incorrectly

## Proof

- [ ] Filters work
- [ ] Race cards expand
- [ ] Load more works
- [ ] Strava and proof links open
- [ ] Warsaw official result and all three activities open

## Visual checks

- [ ] No horizontal scrolling at 360 px
- [ ] Founder face is not cut
- [ ] Warsaw finish is framed correctly
- [ ] Sira workshop screenshot is fully visible
- [ ] Continent markers stay on their continents
- [ ] No repeated hero image appears by mistake

## Cache

If the old website appears, hard refresh with `Ctrl + Shift + R` or open the deployment in a private window.
