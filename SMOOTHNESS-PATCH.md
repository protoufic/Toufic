# Scroll-film smoothness patch

Only two source files were changed:

- `src/components/ScrollHero.tsx`
- `index.html`

The public design, copy, frame assets, routes, proof data, and filtering remain unchanged.

Changes:

1. Preloads the first four scene-one frames from HTML.
2. Warms roughly the first second of scene one immediately.
3. Removes a layout measurement from every animation frame.
4. Stops recalculating the preload window on every animation frame unless the displayed frame changes.
5. Expands the directional frame window slightly.
6. Makes the visual response follow scroll input more tightly.
7. Blends all the way into the next frame to remove frame-boundary popping.
8. Uses `ResizeObserver` so canvas sizing is updated only when needed.

Test with:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```
