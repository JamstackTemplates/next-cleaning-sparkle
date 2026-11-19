import { packages, type CleaningPackage, type PackageId } from './packages.ts';

export type ExtraUnit = 'each' | 'per room' | 'per bed' | 'per visit';

export interface Extra {
  /** Stable URL-safe identifier referenced by checklist tasks and the estimator. */
  id: string;
  /** Visitor-facing add-on name. */
  name: string;
  /** Whole-dollar AUD price including GST. */
  price: number;
  /** Pricing unit displayed beside the price. */
  unit: ExtraUnit;
  /** Package IDs where this task is already included at no extra cost. */
  includedIn: readonly PackageId[];
  /** Package IDs where this item can be selected as a paid add-on. */
  appliesTo: readonly PackageId[];
  /** When false, displays "Paused for now" and cannot be selected in the estimator. */
  available: boolean;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_UNITS = new Set<ExtraUnit>(['each', 'per room', 'per bed', 'per visit']);

export const extras: readonly Extra[] = [
  {
    id: 'inside-oven',
    name: 'Inside the oven',
    price: 59,
    unit: 'each',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular'],
    available: true,
  },
  {
    id: 'inside-fridge',
    name: 'Inside the fridge',
    price: 39,
    unit: 'each',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular', 'office'],
    available: true,
  },
  {
    id: 'inside-cupboards',
    name: 'Inside kitchen cupboards',
    price: 45,
    unit: 'per visit',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular'],
    available: true,
  },
  {
    id: 'interior-windows',
    name: 'Interior windows and tracks',
    price: 49,
    unit: 'per visit',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular', 'office'],
    available: true,
  },
  {
    id: 'wall-spot-clean',
    name: 'Wall spot cleaning',
    price: 35,
    unit: 'per room',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular'],
    available: true,
  },
  {
    id: 'blinds',
    name: 'Dust blinds',
    price: 10,
    unit: 'each',
    includedIn: ['end-of-lease'],
    appliesTo: ['regular', 'office'],
    available: true,
  },
  {
    id: 'extra-bathroom',
    name: 'Extra bathroom',
    price: 25,
    unit: 'each',
    includedIn: [],
    appliesTo: ['regular', 'end-of-lease'],
    available: true,
  },
  {
    id: 'linen-change',
    name: 'Fresh linen change',
    price: 15,
    unit: 'per bed',
    includedIn: [],
    appliesTo: ['regular'],
    available: true,
  },
  {
    id: 'balcony',
    name: 'Balcony sweep and wipe',
    price: 35,
    unit: 'each',
    includedIn: [],
    appliesTo: ['regular', 'end-of-lease'],
    available: true,
  },
  {
    id: 'carpet-steam',
    name: 'Carpet steam clean',
    price: 45,
    unit: 'per room',
    includedIn: [],
    appliesTo: ['end-of-lease', 'regular'],
    available: false,
  },
];

export function validateExtras(
  items: readonly Extra[] = extras,
  allPackages: readonly CleaningPackage[] = packages,
): void {
  const pkgIds = new Set<string>(allPackages.map(p => p.id));
  const seen = new Set<string>();

  for (const extra of items) {
    if (!SLUG.test(extra.id)) {
      throw new Error(`extras[${extra.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(extra.id)) {
      throw new Error(`extras[${extra.id}]: duplicate id`);
    }
    seen.add(extra.id);
    if (!extra.name.trim()) {
      throw new Error(`extras[${extra.id}]: name is required`);
    }
    if (!Number.isInteger(extra.price) || extra.price <= 0) {
      throw new Error(`extras[${extra.id}]: price must be a positive whole dollar amount`);
    }
    if (!VALID_UNITS.has(extra.unit)) {
      throw new Error(`extras[${extra.id}]: invalid unit "${extra.unit}"`);
    }
    for (const pkgId of extra.includedIn) {
      if (!pkgIds.has(pkgId)) {
        throw new Error(`extras[${extra.id}]: unknown package "${pkgId}" in includedIn`);
      }
    }
    for (const pkgId of extra.appliesTo) {
      if (!pkgIds.has(pkgId)) {
        throw new Error(`extras[${extra.id}]: unknown package "${pkgId}" in appliesTo`);
      }
      if (extra.includedIn.includes(pkgId)) {
        throw new Error(`extras[${extra.id}]: package "${pkgId}" cannot appear in both includedIn and appliesTo`);
      }
    }
  }
}
