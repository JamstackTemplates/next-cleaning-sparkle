/** Visit frequencies for Regular cleans. */
export interface Frequency {
  /** Stable URL-safe identifier. */
  id: string;
  /** Display label. */
  label: string;
  /** Percentage adjustment applied to the base Regular rate (-30 to +30; negative is a discount). */
  adjustmentPercent: number;
  /** Short explanatory note shown on frequency tags. */
  note: string;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const frequencies: readonly Frequency[] = [
  { id: 'weekly', label: 'Weekly', adjustmentPercent: -15, note: 'Same crew, same day each week' },
  { id: 'fortnightly', label: 'Fortnightly', adjustmentPercent: -10, note: 'Our most popular rhythm' },
  { id: 'four-weekly', label: 'Every four weeks', adjustmentPercent: 0, note: 'A thorough monthly reset' },
  { id: 'one-off', label: 'One-off', adjustmentPercent: 20, note: 'Includes a deeper first clean' },
];

export function formatAdjustment(percent: number): string {
  if (percent === 0) return 'Standard rate';
  return percent < 0 ? `${Math.abs(percent)}% off` : `+${percent}%`;
}

export function validateFrequencies(items: readonly Frequency[] = frequencies): void {
  if (!items.length) throw new Error('frequencies: at least one frequency is required');
  const seen = new Set<string>();
  for (const item of items) {
    if (!SLUG.test(item.id)) {
      throw new Error(`frequencies[${item.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`frequencies[${item.id}]: duplicate id`);
    }
    seen.add(item.id);
    if (!item.label.trim()) {
      throw new Error(`frequencies[${item.id}]: label is required`);
    }
    if (!item.note.trim()) {
      throw new Error(`frequencies[${item.id}]: note is required`);
    }
    if (
      typeof item.adjustmentPercent !== 'number'
      || Number.isNaN(item.adjustmentPercent)
      || item.adjustmentPercent < -30
      || item.adjustmentPercent > 30
    ) {
      throw new Error(`frequencies[${item.id}]: adjustmentPercent must be between -30 and 30`);
    }
  }
}
