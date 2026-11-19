'use client';

import { useEffect, useRef, useState } from 'react';
import { extras } from '../content/extras';
import { formatAdjustment, frequencies } from '../content/frequencies';
import { homeSizes } from '../content/home-sizes';
import { packages, type PackageId } from '../content/packages';
import { calculateEstimate, selectableExtrasForPackage } from '../lib/estimator';
import { SiteLink } from './site-link';

/**
 * Interactive Price Estimator:
 * Asymmetric layout — mist-pane controls on the left, spray-bottle label readout on the right.
 * Rounds to whole dollars, excludes unavailable extras, and copies a plain-text summary
 * ready to paste into the Contact enquiry form.
 */
export function PriceEstimator() {
  const availablePackages = packages.filter(p => p.available);
  const [packageId, setPackageId] = useState<PackageId>(availablePackages[0]?.id ?? 'regular');
  const [sizeId, setSizeId] = useState<string>('three-bed');
  const [frequencyId, setFrequencyId] = useState<string>('fortnightly');
  const [hourlyRateId, setHourlyRateId] = useState<string>('evenings');
  const [cleaners, setCleaners] = useState<number>(2);
  const [hours, setHours] = useState<number>(3);
  const [extraQuantities, setExtraQuantities] = useState<Record<string, number>>({});
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const currentPkg = availablePackages.find(p => p.id === packageId) ?? availablePackages[0];
  const applicableExtras = selectableExtrasForPackage(currentPkg.id, extras);

  // Filter quantities to only extras currently valid for the active package
  const activeExtraQuantities: Record<string, number> = {};
  for (const extra of applicableExtras) {
    const qty = extraQuantities[extra.id] ?? 0;
    if (qty > 0) activeExtraQuantities[extra.id] = qty;
  }

  const officeRate = currentPkg.pricing.kind === 'hourly'
    ? (currentPkg.pricing.rates.find(r => r.id === hourlyRateId) ?? currentPkg.pricing.rates[0])
    : null;

  const effectiveHours = officeRate ? Math.max(officeRate.minimumHours, hours) : hours;

  const estimate = calculateEstimate({
    packageId: currentPkg.id,
    sizeId,
    frequencyId,
    hourlyRateId: officeRate?.id,
    cleaners,
    hours: effectiveHours,
    extraQuantities: activeExtraQuantities,
  });

  function handlePackageChange(nextId: PackageId) {
    setPackageId(nextId);
    setCopyState('idle');
  }

  function updateExtraQty(id: string, delta: number) {
    setExtraQuantities(prev => {
      const next = Math.max(0, Math.min(10, (prev[id] ?? 0) + delta));
      return { ...prev, [id]: next };
    });
    setCopyState('idle');
  }

  async function copyEstimate() {
    try {
      await navigator.clipboard.writeText(estimate.summaryText);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState('idle'), 4500);
  }

  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.95fr]">
        {/* Left: Controls on a misted glass pane */}
        <div className="mist-pane p-6 sm:p-8 space-y-7">
          {/* 1. Package choice */}
          <fieldset className="border-0 m-0 p-0">
            <legend className="eyebrow mb-3 block">1. Choose your package</legend>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {availablePackages.map(pkg => {
                const active = currentPkg.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handlePackageChange(pkg.id)}
                    className={`rounded-ui border px-4 py-3 text-left transition-colors ${
                      active
                        ? 'border-accent bg-accent text-on-accent shadow-xs'
                        : 'border-line bg-surface text-ink hover:border-aqua'
                    }`}
                  >
                    <span className="block font-display text-base">{pkg.name}</span>
                    <span className={`mt-0.5 block text-xs ${active ? 'text-on-accent/85' : 'text-muted'}`}>
                      {pkg.pricing.kind === 'hourly' ? 'Hourly shifts' : 'By home size'}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Home size OR Office shift/hours */}
          {currentPkg.pricing.kind === 'by-home-size' ? (
            <fieldset className="border-0 m-0 p-0">
              <legend className="eyebrow mb-3 block">2. Home size</legend>
              <div className="grid gap-2 sm:grid-cols-5">
                {homeSizes.map(size => {
                  const active = sizeId === size.id;
                  const rate = currentPkg.pricing.kind === 'by-home-size'
                    ? currentPkg.pricing.rates.find(r => r.sizeId === size.id)
                    : undefined;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => { setSizeId(size.id); setCopyState('idle'); }}
                      className={`rounded-ui border px-3 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-accent bg-surface ring-2 ring-accent text-ink'
                          : 'border-line bg-surface/80 text-ink hover:border-aqua'
                      }`}
                    >
                      <span className="block text-xs font-semibold leading-tight">{size.label}</span>
                      <span className="mt-1 block font-mono text-xs text-accent-ink">
                        ${rate?.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <div className="space-y-5">
              <fieldset className="border-0 m-0 p-0">
                <legend className="eyebrow mb-3 block">2. Office shift window</legend>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {currentPkg.pricing.rates.map(rate => {
                    const active = officeRate?.id === rate.id;
                    return (
                      <button
                        key={rate.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setHourlyRateId(rate.id);
                          setHours(h => Math.max(rate.minimumHours, h));
                          setCopyState('idle');
                        }}
                        className={`rounded-ui border px-3.5 py-2.5 text-left transition-colors ${
                          active
                            ? 'border-accent bg-surface ring-2 ring-accent text-ink'
                            : 'border-line bg-surface/80 text-ink hover:border-aqua'
                        }`}
                      >
                        <span className="block text-xs font-semibold leading-snug">{rate.label}</span>
                        <span className="mt-1 block font-mono text-xs text-accent-ink">
                          ${rate.perCleanerHour}/hr · min {rate.minimumHours}h
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block rounded-ui border border-line bg-surface p-3.5">
                  <span className="eyebrow block">Cleaners</span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-xl text-ink">{cleaners}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease cleaners"
                        onClick={() => setCleaners(c => Math.max(1, c - 1))}
                        className="h-9 w-9 rounded-ui border border-line bg-mist font-mono text-base font-bold text-ink hover:border-aqua"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label="Increase cleaners"
                        onClick={() => setCleaners(c => Math.min(6, c + 1))}
                        className="h-9 w-9 rounded-ui border border-line bg-mist font-mono text-base font-bold text-ink hover:border-aqua"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </label>

                <label className="block rounded-ui border border-line bg-surface p-3.5">
                  <span className="eyebrow block">
                    Hours (min {officeRate?.minimumHours ?? 2})
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-xl text-ink">{effectiveHours} hrs</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease hours"
                        onClick={() => setHours(h => Math.max(officeRate?.minimumHours ?? 2, h - 1))}
                        className="h-9 w-9 rounded-ui border border-line bg-mist font-mono text-base font-bold text-ink hover:border-aqua"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label="Increase hours"
                        onClick={() => setHours(h => Math.min(12, h + 1))}
                        className="h-9 w-9 rounded-ui border border-line bg-mist font-mono text-base font-bold text-ink hover:border-aqua"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* 3. Frequency (Regular only) */}
          {currentPkg.id === 'regular' ? (
            <fieldset className="border-0 m-0 p-0">
              <legend className="eyebrow mb-3 block">3. Frequency</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {frequencies.map(freq => {
                  const active = frequencyId === freq.id;
                  return (
                    <button
                      key={freq.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => { setFrequencyId(freq.id); setCopyState('idle'); }}
                      className={`flex items-center justify-between gap-2 rounded-ui border px-3.5 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-accent bg-surface ring-2 ring-accent text-ink'
                          : 'border-line bg-surface/80 text-ink hover:border-aqua'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium">{freq.label}</span>
                        <span className="block text-xs text-muted">{freq.note}</span>
                      </span>
                      <span className="shrink-0 font-mono text-xs font-semibold text-accent-ink">
                        {formatAdjustment(freq.adjustmentPercent)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {/* 4. Available add-ons */}
          <fieldset className="border-0 m-0 p-0">
            <legend className="eyebrow mb-3 block">
              {currentPkg.id === 'regular' ? '4.' : '3.'} Optional add-ons
            </legend>
            {applicableExtras.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {applicableExtras.map(extra => {
                  const qty = activeExtraQuantities[extra.id] ?? 0;
                  const isPerVisit = extra.unit === 'per visit';
                  return (
                    <div
                      key={extra.id}
                      className={`flex items-center justify-between gap-3 rounded-ui border px-3.5 py-2.5 ${
                        qty > 0
                          ? 'border-accent bg-surface'
                          : 'border-line bg-surface/75'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-ink">{extra.name}</span>
                        <span className="block font-mono text-xs text-muted">
                          +${extra.price} {extra.unit}
                        </span>
                      </div>
                      {isPerVisit ? (
                        <button
                          type="button"
                          aria-pressed={qty > 0}
                          onClick={() => updateExtraQty(extra.id, qty > 0 ? -qty : 1)}
                          className={`min-h-9 shrink-0 rounded-ui border px-3 font-mono text-xs font-semibold uppercase ${
                            qty > 0
                              ? 'border-accent bg-accent text-on-accent'
                              : 'border-line bg-mist text-ink hover:border-aqua'
                          }`}
                        >
                          {qty > 0 ? 'Added' : 'Add'}
                        </button>
                      ) : (
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            aria-label={`Remove ${extra.name}`}
                            disabled={qty === 0}
                            onClick={() => updateExtraQty(extra.id, -1)}
                            className="h-8 w-8 rounded-ui border border-line bg-mist font-mono text-sm font-bold text-ink disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-semibold text-ink">
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Add ${extra.name}`}
                            onClick={() => updateExtraQty(extra.id, 1)}
                            className="h-8 w-8 rounded-ui border border-line bg-mist font-mono text-sm font-bold text-ink hover:border-aqua"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted">No optional add-ons are available for this package.</p>
            )}
          </fieldset>
        </div>

        {/* Right: Spray-bottle printed label readout */}
        <aside aria-label="Estimate readout" className="lg:sticky lg:top-24">
          {/* Trigger spray nozzle top */}
          <div className="mx-auto flex w-44 flex-col items-center" aria-hidden="true">
            <svg viewBox="0 0 180 64" fill="none" className="h-14 w-44">
              <path
                d="M44 12H128L148 26H44V12Z"
                fill="var(--accent)"
                stroke="var(--ink-stroke)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect x="64" y="26" width="44" height="16" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="2" />
              <path d="M122 26L134 52" stroke="var(--ink-stroke)" strokeWidth="3" strokeLinecap="round" />
              <path d="M40 62C40 48 60 42 86 42C112 42 132 48 132 62" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="2" />
            </svg>
          </div>

          {/* Bottle body & printed label */}
          <div className="rounded-[14px] border-2 border-ink/75 bg-surface p-6 shadow-sm">
            <div className="rounded-ui border border-line bg-mist/60 p-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-ink">
                  Morning Dew · Estimate
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                  AUD incl. GST
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-2">
                <p className="font-display text-5xl text-ink" aria-live="polite">
                  ${estimate.total}
                </p>
                <span className="font-mono text-xs text-muted">{estimate.crewSummary}</span>
              </div>

              {/* Line-item breakdown */}
              <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                {estimate.lines.map(line => (
                  <div key={line.label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink">
                      {line.label}
                      {line.detail ? (
                        <span className="block font-mono text-[0.72rem] text-muted">{line.detail}</span>
                      ) : null}
                    </dt>
                    <dd className="shrink-0 font-mono text-sm font-semibold text-ink">
                      {line.amount < 0 ? `−$${Math.abs(line.amount)}` : `$${line.amount}`}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                Estimate only. Your quote is confirmed when we reply.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={copyEstimate}
                  className="button flex-1 text-sm"
                >
                  Copy my estimate
                </button>
                <SiteLink href="/contact/" className="button button-quiet text-sm">
                  Paste in quote form
                </SiteLink>
              </div>
              <p className="mt-2 min-h-5 font-mono text-xs text-accent-ink" role="status" aria-live="polite">
                {copyState === 'copied'
                  ? 'Estimate copied — paste it into the Contact message.'
                  : copyState === 'failed'
                    ? 'Could not copy automatically — note your total for the Contact message.'
                    : ''}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <noscript>
        <p className="mt-4 rounded-ui border border-line bg-surface p-4 text-sm text-muted">
          The interactive estimator needs JavaScript. Full rate tables for Regular, End-of-lease, Office
          and Add-ons are listed directly below.
        </p>
      </noscript>
    </div>
  );
}
