# Direct home-page loading fix

The visible pre-React fallback card was removed.

The site now:
- renders the real Home page immediately because Home is included in the main bundle;
- keeps the first hero poster as a seamless temporary background only while the JavaScript bundle starts;
- reloads once after eight seconds only if React still has not mounted;
- retains Vite stale-chunk recovery for later lazy-loaded pages;
- retains the React error boundary for genuine application errors;
- keeps `<noscript>` content for visitors who disable JavaScript and for crawler resilience;
- keeps all SEO metadata, structured data, canonical URLs, sitemaps, reduced-motion fixes, proof filters, videos and visuals unchanged.

The card shown in the previous version was not the homepage. It was a visible emergency fallback. It is no longer included in generated production pages.
