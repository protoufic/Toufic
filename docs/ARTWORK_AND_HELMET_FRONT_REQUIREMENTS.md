# Argentina marketplace — Artwork and helmet-front production requirements

Status: **implementation in progress; checkout OFF**.

## Helmet front hero zone (new, premium)
- Proposed commercial ID: `helmet_front_hero`.
- Public label: **Helmet Front — Hero**.
- Tier: **Premium**, provisional price ladder $1,000 → $2,000 → $4,000 → $8,000 → $16,000 → custom, subject to a commercial/physical sign-off.
- Position: visually prominent forehead/front crown of the actual helmet, where unobstructed by visor, vents, official markings, safety hardware, and race requirements.
- Must have its own mesh named `SPONSOR_HELMET_FRONT_HERO`, fitted on the final helmet GLB; hotspot position, normal, precise camera, UV/island and surface aspect must be measured and verified.
- Do **not** reuse a side or rear decal; do not fake a clickable spot without geometry.
- Keep the spot **unpublished / not available for checkout** until the actual helmet and printing/wrapping feasibility are validated.
- Decide whether helmet-front inventory increases core count from 13 to 14 only after geometry and race-equipment approval. Until then the public inventory remains 13.

## Uploaded artwork
- Never stretch raster or vector artwork to fit a rectangle. Preserve native aspect ratio and apply compensated mapping to the current GLB overlay aspect; perform visual QA for curved or irregular UVs.
- Provide live controls: uniform scale, X/Y positioning, rotation, reset; later allow direct drag handles on the projected surface.
- Reject uploads that cannot be safely decoded or approved; sanitize SVG before any server storage/display and enforce file-size and pixel limits.
- Guide buyers to submit vector SVG/PDF where accepted, otherwise transparent PNG (initial guidance: >=2000 px along longest side). The exact required pixel resolution depends on **approved physical width × height** and production process: required pixels = print inches × target PPI (normally 300 PPI for close-view apparel graphics, with printer confirmation).
- The 1024-square canvas is a browser preview only, not a print master. Retain original artwork and a non-destructive transform specification; physical output generated at approved resolution later.
- Changes to position/scale/rotation **inside the purchased area** have no additional fee. Increasing the **purchased physical area** or acquiring a neighboring placement can be separately quoted, only if technically feasible and clearly disclosed.
- Final printing/template approval, race rules, sponsor exclusivity and third-party rights still apply.

## Tripo model replacement
- Use multiple consistent high-quality front, side and rear photos of the real athlete to guide identity, body and clothing shape.
- Export GLB, test proportions/orientation (Y up; front +Z in runtime; grounded at y=0) and lighting.
- Preserve existing commercial zone IDs; transfer/adapt sponsor meshes to the revised body and revalidate all UVs and hotspot coordinates. Do not assume an existing decal mapping survives a new topology.
- Optimize mesh/polycount and texture size for mobile; retain older model and 2D posters as fallback until QA passes.
