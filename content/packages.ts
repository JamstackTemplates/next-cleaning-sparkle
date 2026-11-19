import { homeSizes, type HomeSize } from './home-sizes.ts';

export type PackageId = 'regular' | 'end-of-lease' | 'office';
export type TowelStripe = 'aqua' | 'dawn' | 'ink';

export interface HomeSizeRate {
  /** Matches an id in content/home-sizes.ts. */
  sizeId: string;
  /** Whole-dollar AUD price including GST (50–2000). */
  price: number;
  /** Crew size (1–6 cleaners). */
  cleaners: number;
  /** Estimated visit duration in hours (1–12). */
  hours: number;
}

export interface HourlyRate {
  /** Unique URL-safe identifier within the package. */
  id: string;
  /** Shift window label. */
  label: string;
  /** Whole-dollar AUD rate per cleaner hour including GST (50–2000). */
  perCleanerHour: number;
  /** Minimum billed hours per visit (1–12). */
  minimumHours: number;
}

export type PackagePricing =
  | { kind: 'by-home-size'; rates: readonly HomeSizeRate[] }
  | { kind: 'hourly'; rates: readonly HourlyRate[] };

export interface CleaningPackage {
  /** Stable URL-safe package identifier, also used as URL hash and anchor. */
  id: PackageId;
  /** Display name. */
  name: string;
  /** Short line describing who the package suits. */
  suits: string;
  /** Concise summary for cards, tags and structured data. */
  summary: string;
  /** Towel stripe colour token for visual identity. */
  stripe: TowelStripe;
  /** When false, displays "Not taking new clients" and removes it from the estimator. */
  available: boolean;
  /** Rate table: either by home size or hourly shifts. */
  pricing: PackagePricing;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const packages: readonly CleaningPackage[] = [
  {
    id: 'regular',
    name: 'Regular clean',
    suits: 'Homes and share houses, weekly to every four weeks',
    summary: 'Consistent upkeep for kitchens, bathrooms, bedrooms and floors with the same crew each visit.',
    stripe: 'aqua',
    available: true,
    pricing: {
      kind: 'by-home-size',
      rates: [
        { sizeId: 'studio', price: 129, cleaners: 1, hours: 2.5 },
        { sizeId: 'two-bed', price: 159, cleaners: 1, hours: 3 },
        { sizeId: 'three-bed', price: 199, cleaners: 2, hours: 2 },
        { sizeId: 'four-bed', price: 239, cleaners: 2, hours: 2.5 },
        { sizeId: 'five-bed', price: 289, cleaners: 2, hours: 3 },
      ],
    },
  },
  {
    id: 'end-of-lease',
    name: 'End-of-lease clean',
    suits: 'Renters handing back keys, and sellers before settlement',
    summary: 'Top-to-bottom vacate clean including oven, fridge, cupboards, blinds, tracks and grout, backed by our 72-hour re-clean promise.',
    stripe: 'dawn',
    available: true,
    pricing: {
      kind: 'by-home-size',
      rates: [
        { sizeId: 'studio', price: 329, cleaners: 2, hours: 3 },
        { sizeId: 'two-bed', price: 429, cleaners: 2, hours: 4 },
        { sizeId: 'three-bed', price: 549, cleaners: 3, hours: 4 },
        { sizeId: 'four-bed', price: 679, cleaners: 3, hours: 5 },
        { sizeId: 'five-bed', price: 799, cleaners: 4, hours: 5 },
      ],
    },
  },
  {
    id: 'office',
    name: 'Office clean',
    suits: 'Offices and studios up to about 40 desks',
    summary: 'Daytime, weekday evening or Saturday workspace resets covering desks, kitchens, toilets, meeting rooms and restocking.',
    stripe: 'ink',
    available: true,
    pricing: {
      kind: 'hourly',
      rates: [
        { id: 'business-hours', label: 'Weekdays 07:00–18:00', perCleanerHour: 62, minimumHours: 2 },
        { id: 'evenings', label: 'Weekday evenings 18:00–22:00', perCleanerHour: 74, minimumHours: 2 },
        { id: 'saturday', label: 'Saturdays 08:00–16:00', perCleanerHour: 79, minimumHours: 3 },
      ],
    },
  },
];

export function getPackage(id: PackageId): CleaningPackage {
  const pkg = packages.find(item => item.id === id);
  if (!pkg) throw new Error(`packages: unknown package "${id}"`);
  return pkg;
}

/** Cheapest base rate across the Regular package (or all by-home-size packages as fallback). */
export function startingRegularPrice(items: readonly CleaningPackage[] = packages): number {
  const regular = items.find(pkg => pkg.id === 'regular' && pkg.pricing.kind === 'by-home-size');
  if (regular && regular.pricing.kind === 'by-home-size') {
    return Math.min(...regular.pricing.rates.map(r => r.price));
  }
  const all = items.flatMap(pkg => pkg.pricing.kind === 'by-home-size' ? pkg.pricing.rates.map(r => r.price) : []);
  if (!all.length) throw new Error('packages: no by-home-size rates available');
  return Math.min(...all);
}

/** Lowest starting price for a single package (flat visit or hourly minimum). */
export function packageStartingPrice(pkg: CleaningPackage): { amount: number; suffix: string } {
  if (pkg.pricing.kind === 'by-home-size') {
    return { amount: Math.min(...pkg.pricing.rates.map(r => r.price)), suffix: 'a visit' };
  }
  const lowest = Math.min(...pkg.pricing.rates.map(r => r.perCleanerHour));
  return { amount: lowest, suffix: '/ cleaner hr' };
}

/** Schema.org priceRange derived from current package rates. */
export function packagePriceRange(items: readonly CleaningPackage[] = packages): string {
  const prices = items.flatMap(pkg =>
    pkg.pricing.kind === 'by-home-size'
      ? pkg.pricing.rates.map(r => r.price)
      : pkg.pricing.rates.map(r => r.perCleanerHour * r.minimumHours),
  );
  if (!prices.length) return '$129';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `$${min}–$${max}`;
}

export function validatePackages(
  items: readonly CleaningPackage[] = packages,
  sizes: readonly HomeSize[] = homeSizes,
): void {
  if (!items.length) throw new Error('packages: at least one package is required');
  const seenPkg = new Set<string>();
  const sizeIds = new Set(sizes.map(s => s.id));
  let availableCount = 0;

  for (const pkg of items) {
    if (!SLUG.test(pkg.id)) {
      throw new Error(`packages[${pkg.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seenPkg.has(pkg.id)) {
      throw new Error(`packages[${pkg.id}]: duplicate package id`);
    }
    seenPkg.add(pkg.id);
    if (!pkg.name.trim()) throw new Error(`packages[${pkg.id}]: name is required`);
    if (!pkg.suits.trim()) throw new Error(`packages[${pkg.id}]: suits is required`);
    if (!pkg.summary.trim()) throw new Error(`packages[${pkg.id}]: summary is required`);
    if (pkg.available) availableCount++;

    if (pkg.pricing.kind === 'by-home-size') {
      const seenSizes = new Set<string>();
      for (const rate of pkg.pricing.rates) {
        if (!sizeIds.has(rate.sizeId)) {
          throw new Error(`packages[${pkg.id}].rates[${rate.sizeId}]: unknown home sizeId`);
        }
        if (seenSizes.has(rate.sizeId)) {
          throw new Error(`packages[${pkg.id}].rates[${rate.sizeId}]: duplicate rate for home size`);
        }
        seenSizes.add(rate.sizeId);
        if (!Number.isInteger(rate.price) || rate.price < 50 || rate.price > 2000) {
          throw new Error(`packages[${pkg.id}].rates[${rate.sizeId}]: price must be a whole number between 50 and 2000`);
        }
        if (!Number.isInteger(rate.cleaners) || rate.cleaners < 1 || rate.cleaners > 6) {
          throw new Error(`packages[${pkg.id}].rates[${rate.sizeId}]: cleaners must be an integer between 1 and 6`);
        }
        if (typeof rate.hours !== 'number' || Number.isNaN(rate.hours) || rate.hours < 1 || rate.hours > 12) {
          throw new Error(`packages[${pkg.id}].rates[${rate.sizeId}]: hours must be between 1 and 12`);
        }
      }
      for (const size of sizes) {
        if (!seenSizes.has(size.id)) {
          throw new Error(`packages[${pkg.id}]: missing rate for home size "${size.id}"`);
        }
      }
    } else {
      if (!pkg.pricing.rates.length) {
        throw new Error(`packages[${pkg.id}]: at least one hourly rate is required`);
      }
      const seenHourly = new Set<string>();
      for (const rate of pkg.pricing.rates) {
        if (!SLUG.test(rate.id)) {
          throw new Error(`packages[${pkg.id}].rates[${rate.id}]: hourly rate id must be URL-safe kebab-case`);
        }
        if (seenHourly.has(rate.id)) {
          throw new Error(`packages[${pkg.id}].rates[${rate.id}]: duplicate hourly rate id`);
        }
        seenHourly.add(rate.id);
        if (!rate.label.trim()) {
          throw new Error(`packages[${pkg.id}].rates[${rate.id}]: label is required`);
        }
        if (!Number.isInteger(rate.perCleanerHour) || rate.perCleanerHour < 50 || rate.perCleanerHour > 2000) {
          throw new Error(`packages[${pkg.id}].rates[${rate.id}]: perCleanerHour must be a whole number between 50 and 2000`);
        }
        if (typeof rate.minimumHours !== 'number' || Number.isNaN(rate.minimumHours) || rate.minimumHours < 1 || rate.minimumHours > 12) {
          throw new Error(`packages[${pkg.id}].rates[${rate.id}]: minimumHours must be between 1 and 12`);
        }
      }
    }
  }

  if (availableCount < 1) {
    throw new Error('packages: at least one package must have available: true');
  }
}
