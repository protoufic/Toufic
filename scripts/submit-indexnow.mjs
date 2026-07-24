import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await fs.readFile(path.join(root, 'seo.config.json'), 'utf8'));
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || config.siteUrl).replace(/\/$/, '');
const host = new URL(siteUrl).host;
const key = (await fs.readFile(path.join(root, 'public', 'indexnow-key.txt'), 'utf8')).trim();
const urls = config.pages.map((page) => new URL(page.path, `${siteUrl}/`).toString());
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${siteUrl}/indexnow-key.txt`, urlList: urls }),
});
if (!response.ok) {
  throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`);
}
console.log(`Submitted ${urls.length} canonical URLs to IndexNow for ${host}.`);
