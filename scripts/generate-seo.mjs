import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const config = JSON.parse(await fs.readFile(path.join(root, 'seo.config.json'), 'utf8'));
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || config.siteUrl).replace(/\/$/, '');
const buildDate = process.env.SEO_LASTMOD || new Date().toISOString().slice(0, 10);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const escapeXml = escapeHtml;
const absolute = (url) => new URL(url, `${siteUrl}/`).toString();

function personEntity() {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#toufic-abou-ali`,
    name: config.person.name,
    alternateName: config.person.alternateName,
    url: `${siteUrl}/founder`,
    image: absolute(config.person.image),
    description: config.person.description,
    jobTitle: config.person.jobTitle,
    email: `mailto:${config.email}`,
    nationality: { '@type': 'Country', name: config.person.nationality },
    sameAs: config.person.sameAs,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://siracareers.com/#organization',
      name: 'Sira',
      url: 'https://siracareers.com',
    },
    knowsAbout: ['IRONMAN triathlon', 'endurance sport', 'entrepreneurship', 'career development'],
  };
}

function structuredData(page) {
  const canonical = absolute(page.path);
  const person = personEntity();
  const graph = [person];
  const websiteId = `${siteUrl}/#website`;

  if (page.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: config.siteName,
      description: page.description,
      inLanguage: config.language,
      publisher: { '@id': person['@id'] },
    });
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': person['@id'] },
      primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absolute(page.image) },
      inLanguage: config.language,
    });
  } else {
    const breadcrumbId = `${canonical}#breadcrumb`;
    graph.push({
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: config.siteName,
      inLanguage: config.language,
      publisher: { '@id': person['@id'] },
    });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical },
      ],
    });

    if (page.schemaType === 'ProfilePage') {
      graph.push({
        '@type': 'ProfilePage',
        '@id': `${canonical}#profile`,
        url: canonical,
        name: page.title,
        description: page.description,
        mainEntity: { '@id': person['@id'] },
        isPartOf: { '@id': websiteId },
        breadcrumb: { '@id': breadcrumbId },
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absolute(page.image) },
        inLanguage: config.language,
      });
    } else if (page.schemaType === 'Article') {
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        mainEntityOfPage: canonical,
        headline: 'IRONMAN 70.3 Warsaw: Toufic Abou Ali’s First IRONMAN 70.3',
        description: page.description,
        image: [absolute(page.image)],
        datePublished: '2026-06-07',
        dateModified: buildDate,
        author: { '@id': person['@id'] },
        publisher: { '@id': person['@id'] },
        about: ['IRONMAN 70.3 Warsaw', 'Toufic Abou Ali', 'Lebanese endurance athlete'],
        breadcrumb: { '@id': breadcrumbId },
        inLanguage: config.language,
      });
    } else {
      graph.push({
        '@type': page.schemaType,
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': person['@id'] },
        breadcrumb: { '@id': breadcrumbId },
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absolute(page.image) },
        inLanguage: config.language,
      });
    }
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function verificationTags() {
  const tags = [];
  if (process.env.GOOGLE_SITE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${escapeHtml(process.env.GOOGLE_SITE_VERIFICATION)}" />`);
  if (process.env.BING_SITE_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${escapeHtml(process.env.BING_SITE_VERIFICATION)}" />`);
  if (process.env.YANDEX_SITE_VERIFICATION) tags.push(`<meta name="yandex-verification" content="${escapeHtml(process.env.YANDEX_SITE_VERIFICATION)}" />`);
  return tags.join('\n    ');
}

function headMarkup(page, noindex = false) {
  const canonical = absolute(page.path);
  const image = absolute(page.image);
  const verification = verificationTags();
  return `<!-- SEO_HEAD_START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />
    <meta name="author" content="${escapeHtml(config.person.name)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="author" href="${escapeHtml(`${siteUrl}/founder`)}" />
    <link rel="me" href="https://www.instagram.com/touficaa/" />
    <link rel="me" href="https://www.linkedin.com/in/touficabouali" />
    <link rel="me" href="https://www.strava.com/athletes/109556347" />
    <meta property="og:type" content="${page.schemaType === 'Article' ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${escapeHtml(config.siteName)}" />
    <meta property="og:locale" content="${escapeHtml(config.locale)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="alternate" type="application/rss+xml" title="Toufic Abou Ali — Six Continents updates" href="/feed.xml" />
    ${page.schemaType === 'Article' ? `<meta property="article:published_time" content="2026-06-07" />\n    <meta property="article:modified_time" content="${buildDate}" />\n    <meta property="article:author" content="${siteUrl}/founder" />` : ''}
    ${verification}
    <!-- SEO_HEAD_END -->`;
}

function noscriptMarkup(page) {
  const links = config.pages.map((entry) => `<a href="${entry.path}">${escapeHtml(entry.path === '/' ? 'Home' : entry.path.slice(1).replaceAll('-', ' '))}</a>`).join(' · ');
  return `<noscript><main><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.description)}</p><nav>${links}</nav><p>Media and partnership enquiries: <a href="mailto:${escapeHtml(config.email)}">${escapeHtml(config.email)}</a></p></main></noscript>`;
}


function appFallbackMarkup(page) {
  const label = page.path === '/' ? 'Toufic Abou Ali · Lebanese Founder-Athlete' : 'Toufic Abou Ali · Six Continents';
  const links = config.pages
    .filter((entry) => entry.path !== page.path)
    .slice(0, 6)
    .map((entry) => `<a href="${entry.path}">${escapeHtml(entry.path === '/' ? 'Home' : entry.path.slice(1).replaceAll('-', ' '))}</a>`)
    .join('');
  return `<!-- APP_FALLBACK_START -->
      <main class="boot-fallback" aria-label="${escapeHtml(page.title)}">
        <section class="boot-fallback-card">
          <p class="boot-fallback-eyebrow">${escapeHtml(label)}</p>
          <h1>${escapeHtml(page.title.split('|')[0].trim())}</h1>
          <p>${escapeHtml(page.description)}</p>
          <nav class="boot-fallback-nav" aria-label="Main pages">${links}</nav>
        </section>
      </main>
      <!-- APP_FALLBACK_END -->`;
}

function renderPage(template, page, noindex = false) {
  const headRegex = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
  const schemaRegex = /<!-- STRUCTURED_DATA_START -->[\s\S]*?<!-- STRUCTURED_DATA_END -->/;
  if (!headRegex.test(template) || !schemaRegex.test(template)) throw new Error('SEO markers were not preserved in the Vite output.');
  return template
    .replace(headRegex, headMarkup(page, noindex))
    .replace(schemaRegex, `<!-- STRUCTURED_DATA_START -->\n    <script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData(page))}</script>\n    <!-- STRUCTURED_DATA_END -->`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptMarkup(page))
    .replace(/<!-- APP_FALLBACK_START -->[\s\S]*?<!-- APP_FALLBACK_END -->/, appFallbackMarkup(page));
}

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
for (const page of config.pages) {
  const output = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  await fs.writeFile(path.join(dist, output), renderPage(template, page), 'utf8');
}

const notFoundPage = {
  path: '/404',
  title: 'Page Not Found | Toufic Abou Ali — Six Continents',
  description: 'The requested page could not be found. Return to the Six Continents IRONMAN world-record mission website.',
  image: '/assets/img/social/home.jpg',
  imageAlt: 'Toufic Abou Ali — Six Continents',
  schemaType: 'WebPage',
};
await fs.writeFile(path.join(dist, '404.html'), renderPage(template, notFoundPage, true), 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${config.pages.map((page) => `  <url><loc>${escapeXml(absolute(page.path))}</loc><lastmod>${buildDate}</lastmod><priority>${page.priority.toFixed(2)}</priority></url>`).join('\n')}
</urlset>\n`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

const pageImages = {
  '/': [
    ['/assets/img/social/home.jpg', 'Toufic Abou Ali and the Six Continents world-record mission'],
    ['/assets/img/mission/scene-03-final.webp', 'Toufic Abou Ali in front of the Six Continents world map'],
    ['/assets/img/warsaw/finish-lebanon.webp', 'Toufic Abou Ali carrying the Lebanese flag at IRONMAN 70.3 Warsaw'],
  ],
  '/mission': [
    ['/assets/img/social/mission.jpg', 'Six Continents IRONMAN world-record mission'],
    ['/assets/img/mission/mission-page-cover.webp', 'Toufic Abou Ali and the Six Continents mission'],
    ['/assets/img/mission/map-final.webp', 'Six-continent mission map'],
  ],
  '/proof': [
    ['/assets/img/social/proof.jpg', 'Toufic Abou Ali race results and athletic proof'],
    ['/assets/img/races/2025-beirut-wide.webp', 'Toufic Abou Ali at the Beirut Marathon'],
    ['/assets/img/races/2023-isf.webp', 'Toufic Abou Ali on the ISF Half Marathon podium'],
  ],
  '/founder': [
    ['/assets/img/social/founder.jpg', 'Lebanese founder-athlete Toufic Abou Ali'],
    ['/assets/img/identity/headshot.webp', 'Portrait of Toufic Abou Ali'],
    ['/assets/img/identity/founder-warsaw.webp', 'Toufic Abou Ali in Warsaw'],
  ],
  '/partners': [
    ['/assets/img/social/partners.jpg', 'Six Continents partnership opportunity'],
    ['/assets/img/warsaw/finish-lebanon.webp', 'Toufic Abou Ali at the IRONMAN 70.3 Warsaw finish with the Lebanese flag'],
  ],
  '/warsaw': [
    ['/assets/img/social/warsaw.jpg', 'IRONMAN 70.3 Warsaw result and story'],
    ['/assets/img/warsaw/finish-wide.webp', 'IRONMAN 70.3 Warsaw finish line'],
    ['/assets/img/warsaw/swim-exit.webp', 'Toufic Abou Ali leaving the water at IRONMAN 70.3 Warsaw'],
    ['/assets/img/warsaw/bike-course.webp', 'Toufic Abou Ali cycling at IRONMAN 70.3 Warsaw'],
    ['/assets/img/warsaw/run-course.webp', 'Toufic Abou Ali running at IRONMAN 70.3 Warsaw'],
  ],
  '/media': [
    ['/assets/img/social/media.jpg', 'Toufic Abou Ali media kit'],
    ['/assets/img/identity/headshot.webp', 'Official portrait of Toufic Abou Ali'],
    ['/assets/img/warsaw/finish-lebanon.webp', 'Toufic Abou Ali carrying the Lebanese flag at IRONMAN 70.3 Warsaw'],
  ],
};
const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${Object.entries(pageImages).map(([pagePath, images]) => `  <url>\n    <loc>${escapeXml(absolute(pagePath))}</loc>\n${images.map(([image, caption]) => `    <image:image><image:loc>${escapeXml(absolute(image))}</image:loc><image:caption>${escapeXml(caption)}</image:caption></image:image>`).join('\n')}\n  </url>`).join('\n')}
</urlset>\n`;
await fs.writeFile(path.join(dist, 'image-sitemap.xml'), imageSitemap, 'utf8');

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/image-sitemap.xml\n`;
await fs.writeFile(path.join(dist, 'robots.txt'), robots, 'utf8');

const rssItems = config.pages.filter((page) => ['/', '/mission', '/warsaw', '/founder', '/media'].includes(page.path));
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${escapeXml(config.siteName)}</title><link>${escapeXml(`${siteUrl}/`)}</link><description>${escapeXml(config.pages[0].description)}</description><language>en</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems.map((page) => `<item><title>${escapeXml(page.title)}</title><link>${escapeXml(absolute(page.path))}</link><guid isPermaLink="true">${escapeXml(absolute(page.path))}</guid><description>${escapeXml(page.description)}</description><pubDate>${new Date(`${buildDate}T12:00:00Z`).toUTCString()}</pubDate></item>`).join('\n')}
</channel></rss>\n`;
await fs.writeFile(path.join(dist, 'feed.xml'), feed, 'utf8');

const llms = `# Toufic Abou Ali — Six Continents\n\n> Official website for Lebanese founder-athlete Toufic Abou Ali and the Six Continents IRONMAN world-record attempt.\n\n## Canonical pages\n${config.pages.map((page) => `- [${page.title}](${absolute(page.path)}): ${page.description}`).join('\n')}\n\n## Core facts\n- Toufic Abou Ali is a Lebanese founder-athlete and Founder & CEO of Sira.\n- The mission target is six full IRONMAN races across six continents.\n- One full IRONMAN is 3.8 km swimming, 180 km cycling, and 42.2 km running: 226 km total.\n- Six races total 1,356 km.\n- The main working record deadline is November 27, 2027.\n- Toufic completed IRONMAN 70.3 Warsaw on June 7, 2026, at age 19, in 6:08:15.\n- Record application, final rules, race selections, and verification remain subject to confirmation.\n\n## Media contact\n- Email: ${config.email}\n- Media resources: ${siteUrl}/media\n- Partnership opportunities: ${siteUrl}/partners\n`;
await fs.writeFile(path.join(dist, 'llms.txt'), llms, 'utf8');

const pressKit = {
  name: config.person.name,
  identity: 'Lebanese Founder-Athlete',
  role: 'Founder & CEO of Sira',
  mission: 'Six continents. Six full IRONMAN races. One world-record attempt.',
  mainWorkingDeadline: '2027-11-27',
  missionDistanceKilometres: 1356,
  ironmanDistance: { swimKilometres: 3.8, bikeKilometres: 180, runKilometres: 42.2, totalKilometres: 226 },
  ironman703Warsaw: { date: '2026-06-07', officialTime: '6:08:15', age: 19 },
  mediaPage: `${siteUrl}/media`,
  email: config.email,
  sameAs: config.person.sameAs,
  disclaimer: 'Record application, final rules, race selections, and verification remain subject to confirmation. No endorsement is implied.',
};
await fs.writeFile(path.join(dist, 'press-kit.json'), JSON.stringify(pressKit, null, 2), 'utf8');

console.log(`SEO files generated for ${siteUrl}`);
