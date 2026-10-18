import { site, serviceAreas, pricing } from '../../data/site';

/** Sitewide LocalBusiness / RealEstateAgent schema for a service-area business. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': `${site.url}/#business`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og/home.png`,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    priceRange: `$${pricing.monthlyFee} per unit / month`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: serviceAreas.map((name) => ({ '@type': 'City', name: `${name}, Ontario` })),
    sameAs: [site.social.facebook, site.social.google],
    knowsAbout: ['Property management', 'Residential leasing', 'Tenant screening', 'Ontario Landlord and Tenant Board'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: '24/7 emergency support for managed properties',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#business` },
    inLanguage: 'en-CA',
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, site.url).href,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Property management',
    provider: { '@id': `${site.url}/#business` },
    areaServed: serviceAreas.map((n) => ({ '@type': 'City', name: `${n}, Ontario` })),
    url: new URL(path, site.url).href,
  };
}
