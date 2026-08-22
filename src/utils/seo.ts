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

function imageEntity(page: SeoPage, siteUrl: string) {
  const canonical = absoluteUrl(page.path, siteUrl);
  const image = absoluteUrl(page.image, siteUrl);
  return {
    '@type': 'ImageObject',
    '@id': `${canonical}#primaryimage`,
    url: image,
    contentUrl: image,
    width: 1200,
    height: 630,
    caption: page.imageAlt,
    representativeOfPage: true,
  };
}

function personEntity(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#toufic-abou-ali`,
    name: seoConfig.person.name,
    alternateName: seoConfig.person.alternateName,
    url: `${siteUrl}/founder`,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(seoConfig.person.image, siteUrl),
      contentUrl: absoluteUrl(seoConfig.person.image, siteUrl),
      caption: 'Toufic Abou Ali',
    },
    description: seoConfig.person.description,
    jobTitle: seoConfig.person.jobTitle,
    email: `mailto:${seoConfig.email}`,
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
  const image = imageEntity(page, siteUrl);
  const websiteId = `${siteUrl}/#website`;
  const graph: Record<string, unknown>[] = [
    person,
    image,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: seoConfig.siteName,
      description: seoConfig.pages[0].description,
      inLanguage: seoConfig.language,
      publisher: { '@id': person['@id'] },
    },
  ];

  const basePage = {
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': person['@id'] },
    primaryImageOfPage: { '@id': image['@id'] },
    dateModified: page.lastModified,
    inLanguage: seoConfig.language,
  };

  if (page.path === '/') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      ...basePage,
      mainEntity: { '@id': person['@id'] },
    });
  } else {
    const breadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.breadcrumbName, item: canonical },
      ],
    };
    graph.push(breadcrumb);

    if (page.schemaType === 'ProfilePage') {
      graph.push({
        '@type': 'ProfilePage',
        '@id': `${canonical}#profile`,
        ...basePage,
        mainEntity: { '@id': person['@id'] },
        breadcrumb: { '@id': breadcrumb['@id'] },
      });
    } else if (page.schemaType === 'Article') {
      const published = ('datePublished' in page && page.datePublished) || page.lastModified;
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        ...basePage,
        mainEntityOfPage: { '@id': `${canonical}#webpage` },
        headline: 'IRONMAN 70.3 Warsaw: Toufic Abou Ali’s First IRONMAN 70.3',
        image: { '@id': image['@id'] },
        datePublished: published,
        author: { '@id': person['@id'] },
        publisher: { '@id': person['@id'] },
        about: ['IRONMAN 70.3 Warsaw', 'Toufic Abou Ali', 'Lebanese endurance athlete'],
        breadcrumb: { '@id': breadcrumb['@id'] },
      });
      graph.push({
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        ...basePage,
        breadcrumb: { '@id': breadcrumb['@id'] },
      });
    } else {
      graph.push({
        '@type': page.schemaType,
        '@id': `${canonical}#webpage`,
        ...basePage,
        breadcrumb: { '@id': breadcrumb['@id'] },
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function applyRouteSeo(pathname: string) {
  const page = getSeoPage(pathname);
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || seoConfig.siteUrl;
  const siteUrl = configuredSiteUrl.replace(/\/$/, '');
  const canonical = absoluteUrl(page.path, siteUrl);
  const image = absoluteUrl(page.image, siteUrl);
  const ogType = page.schemaType === 'Article' ? 'article' : page.schemaType === 'ProfilePage' ? 'profile' : 'website';

  document.title = page.title;
  document.documentElement.lang = seoConfig.language;

  setMeta('meta[name="description"]', { name: 'description', content: page.description });
  setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
  setMeta('meta[name="author"]', { name: 'author', content: seoConfig.person.name });
  setMeta('meta[name="application-name"]', { name: 'application-name', content: seoConfig.siteName });
  setMeta('meta[name="format-detection"]', { name: 'format-detection', content: 'telephone=no' });
  setMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
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
  setMeta('meta[property="og:updated_time"]', { property: 'og:updated_time', content: page.lastModified });
  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  setMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: seoConfig.twitterHandle });
  setMeta('meta[name="twitter:creator"]', { name: 'twitter:creator', content: seoConfig.twitterHandle });
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: page.imageAlt });
  setLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });
  setLink('link[rel="author"]', { rel: 'author', href: `${siteUrl}/founder` });
  setLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: canonical });
  setLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: canonical });

  if (page.schemaType === 'Article') {
    const published = ('datePublished' in page && page.datePublished) || page.lastModified;
    setMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: published });
    setMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: page.lastModified });
    setMeta('meta[property="article:author"]', { property: 'article:author', content: `${siteUrl}/founder` });
    setMeta('meta[property="article:section"]', { property: 'article:section', content: 'Endurance Sport' });
  } else {
    removeMeta('meta[property="article:published_time"]');
    removeMeta('meta[property="article:modified_time"]');
    removeMeta('meta[property="article:author"]');
    removeMeta('meta[property="article:section"]');
  }

  if (page.schemaType === 'ProfilePage') {
    setMeta('meta[property="profile:first_name"]', { property: 'profile:first_name', content: 'Toufic' });
    setMeta('meta[property="profile:last_name"]', { property: 'profile:last_name', content: 'Abou Ali' });
    setMeta('meta[property="profile:username"]', { property: 'profile:username', content: 'touficaa' });
  } else {
    removeMeta('meta[property="profile:first_name"]');
    removeMeta('meta[property="profile:last_name"]');
    removeMeta('meta[property="profile:username"]');
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
