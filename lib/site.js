// Public origin the site is served from. Canonical URLs, Open Graph tags,
// structured data, the sitemap and the RSS feed are all built from this.
export const SITE_URL = 'https://monad.hu';
export const SITE_NAME = 'MONAD SYSTEMS';
export const OG_IMAGE_URL = `${SITE_URL}/og_1200_630.png`;
export const FEED_PATH = '/feed.xml';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Pages are exported as `<path>.html` without a trailing slash, and English is
// served without a locale prefix, so canonical URLs follow that shape:
// `/`, `/posts/slug`, `/hu`, `/hu/posts/slug`.
export const getCanonicalPath = (basePath, locale) => {
  const cleanBasePath = basePath && basePath !== '/' ? basePath : '';
  if (locale === 'hu') {
    return `/hu${cleanBasePath}`;
  }
  return cleanBasePath || '/';
};

export const getCanonicalUrl = (basePath, locale) =>
  `${SITE_URL}${getCanonicalPath(basePath, locale)}`;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: 'MONAD SYSTEMS Kft.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: OG_IMAGE_URL,
  email: 'hello@monad.hu',
  telephone: '+36306360775',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gödöllő',
    addressCountry: 'HU',
  },
  areaServed: 'EU',
  sameAs: [
    'https://github.com/monad-systems/',
    'https://www.linkedin.com/company/monad-systems/',
  ],
};

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['en', 'hu'],
  publisher: { '@id': ORGANIZATION_ID },
};

export const getBlogPostingJsonLd = (postData, description) => {
  // An untranslated post is the English text, so it points at the English URL.
  const contentLocale = postData.isFallbackLocale ? 'en' : postData.locale;
  const url = getCanonicalUrl(`/posts/${postData.id}`, contentLocale);
  const organizationRef = {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description,
    url,
    mainEntityOfPage: url,
    image: OG_IMAGE_URL,
    inLanguage: contentLocale,
    ...(postData.date ? { datePublished: postData.date } : {}),
    ...(Array.isArray(postData.tags) && postData.tags.length
      ? { keywords: postData.tags.join(', ') }
      : {}),
    author: organizationRef,
    publisher: {
      ...organizationRef,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
  };
};
