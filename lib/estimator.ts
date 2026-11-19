import { extras, type Extra } from '../content/extras.ts';
import { formatAdjustment, frequencies, type Frequency } from '../content/frequencies.ts';
import { homeSizes, type HomeSize } from '../content/home-sizes.ts';
import { packages, type CleaningPackage, type PackageId } from '../content/packages.ts';

export interface EstimateInput {
  packageId: PackageId;
  /** Used when package pricing is by-home-size. */
  sizeId?: string;
  /** Used when packageId is 'regular'. */
  frequencyId?: string;
  /** Used when package pricing is hourly. */
  hourlyRateId?: string;
  /** Cleaners count for hourly packages (1–6). */
  cleaners?: number;
  /** Visit duration in hours for hourly packages (>= minimumHours). */
  hours?: number;
  /** Map of extraId -> quantity (positive integer). */
  extraQuantities?: Record<string, number>;
}

export interface EstimateLine {
  label: string;
  detail?: string;
  amount: number;
}

export interface EstimateResult {
  packageId: PackageId;
  packageName: string;
  baseAmount: number;
  adjustmentAmount: number;
  extrasAmount: number;
  total: number;
  crewSummary: string;
  lines: EstimateLine[];
  summaryText: string;
}

export function selectableExtrasForPackage(
  packageId: PackageId,
  allExtras: readonly Extra[] = extras,
): Extra[] {
  return allExtras.filter(item => item.available && item.appliesTo.includes(packageId));
}

export function calculateEstimate(
  input: EstimateInput,
  deps: {
    packages?: readonly CleaningPackage[];
    homeSizes?: readonly HomeSize[];
    frequencies?: readonly Frequency[];
    extras?: readonly Extra[];
  } = {},
): EstimateResult {
  const allPackages = deps.packages ?? packages;
  const allSizes = deps.homeSizes ?? homeSizes;
  const allFreqs = deps.frequencies ?? frequencies;
  const allExtras = deps.extras ?? extras;

  const pkg = allPackages.find(p => p.id === input.packageId);
  if (!pkg) throw new Error(`estimator: unknown package "${input.packageId}"`);
  if (!pkg.available) throw new Error(`estimator: package "${pkg.id}" is not currently available`);

  const lines: EstimateLine[] = [];
  let baseAmount = 0;
  let adjustmentAmount = 0;
  let crewSummary = '';
  const summaryParts: string[] = [`Package: ${pkg.name}`];

  if (pkg.pricing.kind === 'by-home-size') {
    const sizeId = input.sizeId ?? allSizes[0]?.id;
    const size = allSizes.find(s => s.id === sizeId);
    if (!size) throw new Error(`estimator: unknown home size "${sizeId}"`);
    const rate = pkg.pricing.rates.find(r => r.sizeId === size.id);
    if (!rate) throw new Error(`estimator: no rate for package "${pkg.id}" and size "${size.id}"`);

    baseAmount = rate.price;
    crewSummary = `${rate.cleaners} ${rate.cleaners === 1 ? 'cleaner' : 'cleaners'} · approx. ${rate.hours} hrs`;
    summaryParts.push(`Home size: ${size.label} (incl. ${size.bathrooms} ${size.bathrooms === 1 ? 'bathroom' : 'bathrooms'})`);

    if (pkg.id === 'regular') {
      const freqId = input.frequencyId ?? 'fortnightly';
      const freq = allFreqs.find(f => f.id === freqId);
      if (!freq) throw new Error(`estimator: unknown frequency "${freqId}"`);
      const adjusted = Math.round(baseAmount * (1 + freq.adjustmentPercent / 100));
      adjustmentAmount = adjusted - baseAmount;
      lines.push({
        label: `${pkg.name} — ${size.label}`,
        detail: crewSummary,
        amount: baseAmount,
      });
      if (adjustmentAmount !== 0) {
        lines.push({
          label: `${freq.label} (${formatAdjustment(freq.adjustmentPercent)})`,
          amount: adjustmentAmount,
        });
      }
      summaryParts.push(`Frequency: ${freq.label} (${formatAdjustment(freq.adjustmentPercent)})`);
    } else {
      lines.push({
        label: `${pkg.name} — ${size.label}`,
        detail: crewSummary,
        amount: baseAmount,
      });
    }
  } else {
    const hourlyRateId = input.hourlyRateId ?? pkg.pricing.rates[0]?.id;
    const rate = pkg.pricing.rates.find(r => r.id === hourlyRateId);
    if (!rate) throw new Error(`estimator: unknown hourly rate "${hourlyRateId}"`);
    const cleaners = Math.max(1, Math.min(6, Math.round(input.cleaners ?? 2)));
    const hours = Math.max(rate.minimumHours, Math.min(12, input.hours ?? rate.minimumHours));
    baseAmount = Math.round(rate.perCleanerHour * cleaners * hours);
    crewSummary = `${cleaners} ${cleaners === 1 ? 'cleaner' : 'cleaners'} × ${hours} hrs @ $${rate.perCleanerHour}/hr`;
    lines.push({
      label: `${pkg.name} — ${rate.label}`,
      detail: crewSummary,
      amount: baseAmount,
    });
    summaryParts.push(`Shift: ${rate.label}`);
    summaryParts.push(`Crew & duration: ${cleaners} ${cleaners === 1 ? 'cleaner' : 'cleaners'} × ${hours} hrs`);
  }

  let extrasAmount = 0;
  const chosenExtras: string[] = [];
  if (input.extraQuantities) {
    for (const [extraId, rawQty] of Object.entries(input.extraQuantities)) {
      const qty = Math.floor(rawQty);
      if (!qty || qty <= 0) continue;
      const extra = allExtras.find(e => e.id === extraId);
      if (!extra) throw new Error(`estimator: unknown extra "${extraId}"`);
      if (!extra.available) {
        throw new Error(`estimator: extra "${extra.id}" is paused and cannot be selected`);
      }
      if (!extra.appliesTo.includes(pkg.id)) {
        throw new Error(`estimator: extra "${extra.id}" does not apply to package "${pkg.id}"`);
      }
      const lineTotal = extra.price * qty;
      extrasAmount += lineTotal;
      lines.push({
        label: qty > 1 ? `${extra.name} × ${qty}` : extra.name,
        detail: `$${extra.price} ${extra.unit}`,
        amount: lineTotal,
      });
      chosenExtras.push(qty > 1 ? `${extra.name} × ${qty} ($${lineTotal})` : `${extra.name} ($${lineTotal})`);
    }
  }

  if (chosenExtras.length) {
    summaryParts.push(`Add-ons: ${chosenExtras.join(', ')}`);
  }

  const total = Math.round(baseAmount + adjustmentAmount + extrasAmount);
  summaryParts.push(`Estimated total: $${total} AUD (incl. GST) — estimate only, quote confirmed by reply.`);

  return {
    packageId: pkg.id,
    packageName: pkg.name,
    baseAmount,
    adjustmentAmount,
    extrasAmount,
    total,
    crewSummary,
    lines,
    summaryText: summaryParts.join('\n'),
  };
}
