import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const config = JSON.parse(await fs.readFile(path.join(root, 'seo.config.json'), 'utf8'));
const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\"', '&quot;');
const required = ['sitemap.xml', 'image-sitemap.xml', 'robots.txt', 'feed.xml', 'llms.txt', 'press-kit.json', '404.html'];
const errors = [];
for (const file of required) {
  try { await fs.access(path.join(dist, file)); } catch { errors.push(`Missing ${file}`); }
}
for (const page of config.pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  try {
    const html = await fs.readFile(path.join(dist, file), 'utf8');
    if (!html.includes(`<title>${escapeHtml(page.title)}</title>`)) errors.push(`${file}: wrong title`);
    if (!html.includes('rel="canonical"')) errors.push(`${file}: missing canonical`);
    if (!html.includes('application/ld+json')) errors.push(`${file}: missing structured data`);
    if (/noindex/i.test(html)) errors.push(`${file}: contains noindex`);
  } catch { errors.push(`Missing ${file}`); }
}
const robots = await fs.readFile(path.join(dist, 'robots.txt'), 'utf8').catch(() => '');
if (/Disallow:\s*\//i.test(robots)) errors.push('robots.txt blocks the site');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO validation passed for ${config.pages.length} canonical pages.`);
