# Final reduced-motion fix

## Problem

Slides 2 and 3 reused animated absolute positioning and scroll-controlled opacity when the device requested reduced motion. This caused two failures:

1. The Scene 2 panel could be vertically centered partly outside a short viewport.
2. Scene 2 and Scene 3 copy could remain transparent because their `--copy-reveal` value normally depends on scroll progress.

## Permanent fix

- Reduced motion now uses a dedicated static editorial layout instead of the animated layout with movement removed.
- All three copy panels are forced visible in both React and CSS.
- Desktop static chapters use a one-cell CSS grid, allowing the chapter to grow if the copy needs more height while preserving the image behind it.
- Scene 1 and Scene 3 remain left aligned; Scene 2 remains right aligned.
- Mobile and embedded browsers stack the full 16:9 poster above the copy in normal document flow, making clipping impossible.
- Canvas and video scrubbing remain disabled for reduced-motion users.
- The normal animated experience is unchanged.

## Files changed

- `src/components/ScrollHero.tsx`
- `src/index.css`

## Required tests

1. Windows Animation Effects ON: all three scroll films animate normally.
2. Windows Animation Effects OFF: every line and button on all three chapters is visible.
3. Desktop viewport around 1920x830: Scene 2 starts with `3.8 km swim.` visible and Scene 3 shows its complete panel.
4. Instagram in-app browser / short phone viewport: poster appears first, followed by the complete panel without clipping.
