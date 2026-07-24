import seoConfig from '../../seo.config.json';

type SeoPage = (typeof seoConfig.pages)[number];

const aliases = seoConfig.redirects as Record<string, string>;

function absoluteUrl(path: string, baseUrl: string) {
  return new URL(path, `${baseUrl.replace(/\/$/, '')}/`).toString();
}

function normalizedPath(pathname: string) {
  const clean = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  return aliases[clean] || clean;
}

export function getSeoPage(pathname: string): SeoPage {
  const path = normalizedPath(pathname);
  return seoConfig.pages.find((page) => page.path === path) || seoConfig.pages[0];
}

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}


function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function setLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}

function personEntity(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#toufic-abou-ali`,
    name: seoConfig.person.name,
    alternateName: seoConfig.person.alternateName,
    url: `${siteUrl}/founder`,
    image: absoluteUrl(seoConfig.person.image, siteUrl),
    description: seoConfig.person.description,
    jobTitle: seoConfig.person.jobTitle,
    nationality: { '@type': 'Country', name: seoConfig.person.nationality },
    sameAs: seoConfig.person.sameAs,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://siracareers.com/#organization',
      name: 'Sira',
      url: 'https://siracareers.com',
    },
    knowsAbout: ['IRONMAN triathlon', 'endurance sport', 'entrepreneurship', 'career development'],
  };
}

export function buildStructuredData(page: SeoPage, siteUrlInput?: string) {
  const siteUrl = (siteUrlInput || seoConfig.siteUrl).replace(/\/$/, '');
  const canonical = absoluteUrl(page.path, siteUrl);
  const person = personEntity(siteUrl);
  const graph: Record<string, unknown>[] = [person];

  if (page.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: seoConfig.siteName,
      description: page.description,
      inLanguage: seoConfig.language,
      publisher: { '@id': person['@id'] },
    });
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': person['@id'] },
      primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absoluteUrl(page.image, siteUrl) },
      inLanguage: seoConfig.language,
    });
  } else {
    const breadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical },
      ],
    };
    graph.push(breadcrumb);

    if (page.schemaType === 'ProfilePage') {
      graph.push({
        '@type': 'ProfilePage',
        '@id': `${canonical}#profile`,
        url: canonical,
        name: page.title,
        description: page.description,
        mainEntity: { '@id': person['@id'] },
        breadcrumb: { '@id': breadcrumb['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absoluteUrl(page.image, siteUrl) },
        inLanguage: seoConfig.language,
      });
    } else if (page.schemaType === 'Article') {
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        mainEntityOfPage: canonical,
        headline: 'IRONMAN 70.3 Warsaw: Toufic Abou Ali’s First IRONMAN 70.3',
        description: page.description,
        image: [absoluteUrl(page.image, siteUrl)],
        datePublished: '2026-06-07',
        dateModified: '2026-07-23',
        author: { '@id': person['@id'] },
        publisher: { '@id': person['@id'] },
        about: ['IRONMAN 70.3 Warsaw', 'Toufic Abou Ali', 'Lebanese endurance athlete'],
        breadcrumb: { '@id': breadcrumb['@id'] },
        inLanguage: seoConfig.language,
      });
    } else {
      graph.push({
        '@type': page.schemaType,
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': person['@id'] },
        breadcrumb: { '@id': breadcrumb['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absoluteUrl(page.image, siteUrl) },
        inLanguage: seoConfig.language,
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function applyRouteSeo(pathname: string) {
  const page = getSeoPage(pathname);
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL || seoConfig.siteUrl;
  const siteUrl = configuredSiteUrl.replace(/\/$/, '');
  const canonical = absoluteUrl(page.path, siteUrl);
  const image = absoluteUrl(page.image, siteUrl);

  document.title = page.title;
  document.documentElement.lang = seoConfig.language;

  setMeta('meta[name="description"]', { name: 'description', content: page.description });
  setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
  setMeta('meta[name="author"]', { name: 'author', content: seoConfig.person.name });
  setMeta('meta[property="og:type"]', { property: 'og:type', content: page.schemaType === 'Article' ? 'article' : 'website' });
  setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: seoConfig.siteName });
  setMeta('meta[property="og:locale"]', { property: 'og:locale', content: seoConfig.locale });
  setMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
  setMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
  setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
  setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  setMeta('meta[property="og:image:secure_url"]', { property: 'og:image:secure_url', content: image });
  setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
  setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
  setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: page.imageAlt });
  setMeta('meta[property="og:image:type"]', { property: 'og:image:type', content: 'image/jpeg' });
  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: page.imageAlt });
  setLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });
  setLink('link[rel="author"]', { rel: 'author', href: `${siteUrl}/founder` });

  if (page.schemaType === 'Article') {
    setMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: '2026-06-07' });
    setMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: '2026-07-23' });
    setMeta('meta[property="article:author"]', { property: 'article:author', content: `${siteUrl}/founder` });
  } else {
    removeMeta('meta[property="article:published_time"]');
    removeMeta('meta[property="article:modified_time"]');
    removeMeta('meta[property="article:author"]');
  }

  let structuredData = document.getElementById('route-structured-data') as HTMLScriptElement | null;
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'route-structured-data';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(buildStructuredData(page, siteUrl));
}
