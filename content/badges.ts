export type BadgeIconId =
  | 'shield'
  | 'policy'
  | 'reclean'
  | 'crew'
  | 'leaf'
  | 'caddy'
  | 'cloths'
  | 'padlock';

export interface TrustBadge {
  /** Stable URL-safe identifier. */
  id: string;
  /** Short woven care-label text (maximum 24 characters). */
  label: string;
  /** One-sentence explanation shown on /promise/. */
  detail: string;
  /** Icon rendered inside the care label. */
  icon: BadgeIconId;
  /** Set false to hide a badge without deleting it. */
  shown: boolean;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const trustBadges: readonly TrustBadge[] = [
  {
    id: 'police-checked',
    label: 'Police-checked crew',
    detail: 'Every cleaner holds a national police check, renewed every year.',
    icon: 'shield',
    shown: true,
  },
  {
    id: 'insured',
    label: '$20M public liability',
    detail: 'Your home and office are covered while we work.',
    icon: 'policy',
    shown: true,
  },
  {
    id: 're-clean',
    label: '72-hour re-clean',
    detail: 'Tell us within 72 hours and we re-clean the listed items free.',
    icon: 'reclean',
    shown: true,
  },
  {
    id: 'same-crew',
    label: 'Same crew each visit',
    detail: 'Regular clients see the same faces on the same day.',
    icon: 'crew',
    shown: true,
  },
  {
    id: 'low-tox',
    label: 'Low-tox products',
    detail: 'Plant-based sprays, with a fragrance-free option.',
    icon: 'leaf',
    shown: true,
  },
  {
    id: 'bring-everything',
    label: 'We bring everything',
    detail: 'HEPA vacuums, mops, cloths and a ladder in every van.',
    icon: 'caddy',
    shown: true,
  },
  {
    id: 'colour-coded',
    label: 'Colour-coded cloths',
    detail: 'Toilet cloths never touch your kitchen bench.',
    icon: 'cloths',
    shown: true,
  },
  {
    id: 'no-lock-in',
    label: 'No lock-in',
    detail: 'Pause or cancel regular cleans with 48 hours\u2019 notice.',
    icon: 'padlock',
    shown: true,
  },
];

export function validateBadges(items: readonly TrustBadge[] = trustBadges): void {
  if (!items.length) throw new Error('trustBadges: at least one badge is required');
  const seen = new Set<string>();
  for (const badge of items) {
    if (!SLUG.test(badge.id)) {
      throw new Error(`trustBadges[${badge.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(badge.id)) {
      throw new Error(`trustBadges[${badge.id}]: duplicate id`);
    }
    seen.add(badge.id);
    if (!badge.label.trim()) {
      throw new Error(`trustBadges[${badge.id}]: label is required`);
    }
    if (badge.label.length > 24) {
      throw new Error(`trustBadges[${badge.id}]: label "${badge.label}" exceeds 24 characters (${badge.label.length})`);
    }
    if (!badge.detail.trim()) {
      throw new Error(`trustBadges[${badge.id}]: detail is required`);
    }
  }
}
