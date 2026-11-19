/** Home sizes used by Regular and End-of-lease packages. */
export interface HomeSize {
  /** Stable URL-safe identifier referenced by package rates. */
  id: string;
  /** Visitor-facing size label. */
  label: string;
  /** Bedroom count; 5 means 5 or more bedrooms. */
  bedrooms: number;
  /** Number of bathrooms included in the base rate; extra bathrooms are an add-on. */
  bathrooms: number;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const homeSizes: readonly HomeSize[] = [
  { id: 'studio', label: 'Studio or 1 bedroom', bedrooms: 1, bathrooms: 1 },
  { id: 'two-bed', label: '2 bedrooms', bedrooms: 2, bathrooms: 1 },
  { id: 'three-bed', label: '3 bedrooms', bedrooms: 3, bathrooms: 2 },
  { id: 'four-bed', label: '4 bedrooms', bedrooms: 4, bathrooms: 2 },
  { id: 'five-bed', label: '5+ bedrooms', bedrooms: 5, bathrooms: 3 },
];

export function validateHomeSizes(items: readonly HomeSize[] = homeSizes): void {
  if (!items.length) throw new Error('homeSizes: at least one home size is required');
  const seen = new Set<string>();
  for (const item of items) {
    if (!SLUG.test(item.id)) {
      throw new Error(`homeSizes[${item.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`homeSizes[${item.id}]: duplicate id`);
    }
    seen.add(item.id);
    if (!item.label.trim()) {
      throw new Error(`homeSizes[${item.id}]: label is required`);
    }
    if (!Number.isInteger(item.bedrooms) || item.bedrooms < 1 || item.bedrooms > 10) {
      throw new Error(`homeSizes[${item.id}]: bedrooms must be an integer between 1 and 10`);
    }
    if (!Number.isInteger(item.bathrooms) || item.bathrooms < 1 || item.bathrooms > 10) {
      throw new Error(`homeSizes[${item.id}]: bathrooms must be an integer between 1 and 10`);
    }
  }
}
