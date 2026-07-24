# Final domain, SEO, and first-slide visibility patch

## Visual correction

The first film panel was clipped when Reduced Motion was active because the accessibility rule removed the desktop `translateY(-50%)` centering transform while leaving the panel at `top: 50%`.

This package restores the correct centering, compacts the panel only on short desktop viewports, and lets the static mobile/in-app-browser fallback grow vertically instead of hiding the final headline line or buttons.

## Canonical domain correction

- `https://toufic.co` remains the only canonical host in HTML, structured data, sitemaps, RSS, llms.txt, and press-kit.json.
- `https://www.toufic.co/:path*` now has a source-controlled permanent Vercel redirect to `https://toufic.co/:path*`.
- Both domains must remain connected to the same Vercel project. The `www` hostname is a redirect, not a second SEO website.
- The SEO validation script now fails the build if the host redirect or canonical site URL is removed.
