import { business, businessMetaDescription } from '../content/business.ts';
import { packagePriceRange, packageStartingPrice, packages } from '../content/packages.ts';
import { absoluteUrl } from './paths.ts';

/** LocalBusiness JSON-LD derived from typed content collections. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.officeHours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const offers = packages
    .filter(pkg => pkg.available)
    .map(pkg => {
      const start = packageStartingPrice(pkg);
      return {
        '@type': 'Offer',
        name: pkg.name,
        description: pkg.summary,
        priceCurrency: 'AUD',
        price: start.amount,
        ...(url ? { url: absoluteUrl(`/packages/#${pkg.id}`) } : {}),
      };
    });

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: businessMetaDescription(),
    email: business.email,
    telephone: business.phoneE164,
    priceRange: packagePriceRange(),
    ...(url ? { url } : {}),
    areaServed: business.suburbs.map(suburb => ({
      '@type': 'Place',
      name: `${suburb}, Melbourne VIC, Australia`,
    })),
    openingHoursSpecification,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning packages',
      itemListElement: offers,
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
