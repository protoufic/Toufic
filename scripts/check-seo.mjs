import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const config = JSON.parse(await fs.readFile(path.join(root, 'seo.config.json'), 'utf8'));
const siteUrl = config.siteUrl.replace(/\/$/, '');
const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const errors = [];
const warnings = [];
const required = [
  'sitemap.xml', 'image-sitemap.xml', 'robots.txt', 'feed.xml', 'llms.txt',
  'press-kit.json', 'manifest.json', '404.html', 'indexnow-key.txt',
];

const read = async (file) => fs.readFile(path.join(dist, file), 'utf8');
const exists = async (file) => fs.access(path.join(dist, file)).then(() => true).catch(() => false);

for (const file of required) {
  if (!(await exists(file))) errors.push(`Missing ${file}`);
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const canonicalUrls = [];
const canonicalPaths = new Set(config.pages.map((page) => page.path));

for (const page of config.pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  if (!(await exists(file))) {
    errors.push(`Missing ${file}`);
    continue;
  }

  const html = await read(file);
  const canonical = new URL(page.path, `${siteUrl}/`).toString();
  canonicalUrls.push(canonical);
  const title = `<title>${escapeHtml(page.title)}</title>`;
  const description = `<meta name="description" content="${escapeHtml(page.description)}" />`;

  if (!html.includes(title)) errors.push(`${file}: wrong title`);
  if (!html.includes(description)) errors.push(`${file}: wrong description`);
  if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) errors.push(`${file}: wrong canonical`);
  if (!html.includes(`<meta property="og:url" content="${canonical}" />`)) errors.push(`${file}: wrong og:url`);
  if (!html.includes(`<meta property="og:title" content="${escapeHtml(page.title)}" />`)) errors.push(`${file}: wrong og:title`);
  if (!html.includes(`<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)) errors.push(`${file}: wrong Twitter title`);
  if (!html.includes('index,follow,max-image-preview:large')) errors.push(`${file}: missing indexable robots directive`);
  if (/name="robots" content="noindex/i.test(html)) errors.push(`${file}: contains noindex`);
  if (!/<div id="root">[\s\S]+<\/div>/.test(html) || !html.includes('<main')) errors.push(`${file}: missing rendered page HTML`);

  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  if (h1Count !== 1) errors.push(`${file}: expected exactly one H1, found ${h1Count}`);

  const schemaMatch = html.match(/<script id="route-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!schemaMatch) {
    errors.push(`${file}: missing route structured data`);
  } else {
    try {
      const schema = JSON.parse(schemaMatch[1]);
      if (schema['@context'] !== 'https://schema.org' || !Array.isArray(schema['@graph'])) errors.push(`${file}: invalid schema graph`);
    } catch (error) {
      errors.push(`${file}: structured data is not valid JSON (${error.message})`);
    }
  }

  const imagePath = page.image.replace(/^\//, '');
  if (!(await exists(imagePath))) errors.push(`${file}: missing social image ${page.image}`);

  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    const reference = match[1];
    if (reference.startsWith('//')) continue;
    if (canonicalPaths.has(reference) || reference === '/404') continue;
    const local = reference.replace(/^\//, '');
    if (!local || local.endsWith('/')) continue;
    if (!(await exists(local))) errors.push(`${file}: broken local reference ${reference}`);
  }

  if (seenTitles.has(page.title)) errors.push(`${file}: duplicate title with ${seenTitles.get(page.title)}`);
  else seenTitles.set(page.title, file);
  if (seenDescriptions.has(page.description)) errors.push(`${file}: duplicate description with ${seenDescriptions.get(page.description)}`);
  else seenDescriptions.set(page.description, file);

  if (page.title.length > 65) warnings.push(`${file}: title is ${page.title.length} characters`);
  if (page.description.length > 165) warnings.push(`${file}: description is ${page.description.length} characters`);
}

const notFound = await read('404.html').catch(() => '');
if (notFound && !/name="robots" content="noindex,follow"/.test(notFound)) errors.push('404.html: missing noindex,follow');

const robots = await read('robots.txt').catch(() => '');
if (/Disallow:\s*\//i.test(robots)) errors.push('robots.txt blocks the site');
if (!robots.includes(`${siteUrl}/sitemap.xml`)) errors.push('robots.txt: missing sitemap URL');

const sitemap = await read('sitemap.xml').catch(() => '');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== canonicalUrls.length) errors.push(`sitemap.xml: expected ${canonicalUrls.length} URLs, found ${sitemapUrls.length}`);
for (const url of canonicalUrls) if (!sitemapUrls.includes(url)) errors.push(`sitemap.xml: missing ${url}`);

if (warnings.length) console.warn(`SEO warnings:\n${warnings.join('\n')}`);
if (errors.length) {
  console.error(`SEO validation failed:\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`SEO validation passed for ${config.pages.length} canonical pages, rendered HTML, metadata, schema, sitemap, images, and local links.`);
