import type { MetadataRoute } from 'next';

const paths = ['/', '/support', '/mission', '/proof', '/founder', '/partners', '/warsaw', '/media'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://toufic.co${path === '/' ? '' : path}`,
    lastModified: new Date('2026-09-16T00:00:00Z'),
    changeFrequency: path === '/support' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/support' ? 0.95 : 0.8,
  }));
}
