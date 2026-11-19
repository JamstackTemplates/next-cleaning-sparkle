import type { ReactNode } from 'react';
import { extras } from '../../content/extras';
import { formatAdjustment, frequencies } from '../../content/frequencies';
import { homeSizes } from '../../content/home-sizes';
import { getPackage } from '../../content/packages';
import { PriceEstimator } from '../price-estimator';
import { SiteLink } from '../site-link';

export function EstimatorSection({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section className="bg-bg py-14 sm:py-18">
      <div className="wrap">
        <span className="care-label">{eyebrow}</span>
        <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,2.85rem)] text-ink">{heading}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted">{intro}</p>
        <div className="mt-8">
          <PriceEstimator />
        </div>
      </div>
    </section>
  );
}

/**
 * Regular (#regular):
 * Rates as a shelf of folded towel stacks growing in height from studio to 5+ bedrooms,
 * each stack labelled with price, cleaners and hours; frequency discounts as stitched tags.
 */
export function RegularShelfSection({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  const pkg = getPackage('regular');
  const rates = pkg.pricing.kind === 'by-home-size' ? pkg.pricing.rates : [];

  return (
    <section id="regular" className="bg-surface py-16 sm:py-20 border-t border-line">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          </div>
          <p className="max-w-md text-sm text-muted">{intro}</p>
        </div>

        {!pkg.available ? (
          <p className="mt-4 inline-block rounded-ui border border-cloth-red bg-mist px-3 py-1 font-mono text-xs uppercase text-cloth-red">
            Not taking new clients
          </p>
        ) : null}

        {/* Shelf of folded towel stacks growing in height */}
        <div className="mt-10 grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {rates.map((rate, idx) => {
            const size = homeSizes.find(s => s.id === rate.sizeId)!;
            const folds = idx + 2; // 2 folds for studio up to 6 folds for 5+ bed
            return (
              <div key={rate.sizeId} className="flex flex-col">
                <div className="rounded-t-[8px] border-2 border-b-0 border-ink/70 bg-bg p-4">
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent-ink">
                    {size.label}
                  </p>
                  <p className="mt-2 font-display text-3xl text-ink">${rate.price}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {rate.cleaners} {rate.cleaners === 1 ? 'cleaner' : 'cleaners'} · {rate.hours} hrs
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Incl. {size.bathrooms} {size.bathrooms === 1 ? 'bathroom' : 'bathrooms'}
                  </p>
                </div>

                {/* Stacked folded towels growing with home size */}
                <div className="space-y-1 rounded-b-[4px] border-2 border-t-0 border-ink/70 bg-mist/60 px-2 pb-2 pt-1" aria-hidden="true">
                  {Array.from({ length: folds }).map((_, foldIdx) => (
                    <div
                      key={foldIdx}
                      className="flex h-3.5 items-center justify-center rounded-[4px] border border-ink/50 bg-surface px-2"
                    >
                      <span
                        className={`h-1 w-full rounded-full ${
                          foldIdx === 0 ? 'bg-aqua' : 'bg-sea-glass/70'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* Chrome shelf rail beneath the stacks */}
        <hr className="chrome-rule mt-1" />

        {/* Frequency discounts as stitched care tags */}
        <div className="mt-10">
          <h3 className="font-display text-xl text-ink">Frequency adjustments</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
            {frequencies.map(freq => (
              <li key={freq.id} className="care-label-stitched px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg text-ink">{freq.label}</span>
                  <span className="font-mono text-xs font-semibold uppercase text-accent-ink">
                    {formatAdjustment(freq.adjustmentPercent)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{freq.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * End-of-lease (#end-of-lease):
 * The single full-bleed deep-aqua band on /packages/.
 * Fixed prices as key tags hanging from a key hook rail, plus "What's added over a regular clean",
 * the re-clean promise and the bond wording note.
 */
export function EndOfLeaseBand({
  eyebrow,
  heading,
  intro,
  addedItems,
  bondNote,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  addedItems: readonly string[];
  bondNote: ReactNode;
}) {
  const pkg = getPackage('end-of-lease');
  const rates = pkg.pricing.kind === 'by-home-size' ? pkg.pricing.rates : [];

  return (
    <section id="end-of-lease" className="deep-band py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-[3px] border border-dawn/70 bg-deep-band-surface px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-dawn">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] text-deep-band-ink">{heading}</h2>
          </div>
          <p className="max-w-md text-sm text-deep-band-muted">{intro}</p>
        </div>

        {/* Key hook rail */}
        <div className="mt-10 rounded-ui border border-deep-band-muted/35 bg-deep-band-surface/70 p-4 sm:p-6">
          <div className="mb-4 h-2 w-full rounded-full bg-dawn/70" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {rates.map(rate => {
              const size = homeSizes.find(s => s.id === rate.sizeId)!;
              return (
                <div
                  key={rate.sizeId}
                  className="relative flex flex-col items-center rounded-b-[10px] rounded-t-[4px] border border-deep-band-muted/40 bg-deep-band-surface px-4 pb-5 pt-6 text-center"
                >
                  {/* Key ring hole */}
                  <span
                    aria-hidden="true"
                    className="mb-3 h-4 w-4 rounded-full border-2 border-dawn bg-deep-band"
                  />
                  <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-dawn">
                    {size.label}
                  </span>
                  <span className="mt-2 font-display text-3xl text-deep-band-ink">
                    ${rate.price}
                  </span>
                  <span className="mt-1 font-mono text-xs text-deep-band-muted">
                    {rate.cleaners} cleaners · {rate.hours} hrs
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="font-display text-2xl text-deep-band-ink">
              What&apos;s added over a regular clean
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-sm text-deep-band-muted list-none p-0">
              {addedItems.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-dawn" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-ui border border-dawn/50 bg-deep-band-surface p-6 text-sm leading-relaxed text-deep-band-muted">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-dawn">
              72-hour re-clean &amp; bond note
            </p>
            <p className="mt-3 text-deep-band-ink">{bondNote}</p>
            <div className="mt-4">
              <SiteLink href="/promise/#reclean" className="text-sm font-semibold text-dawn underline">
                Read the 72-hour re-clean timeline →
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Office (#office):
 * Hourly rates as a lobby directory board (mono white letters on a dark-aqua board),
 * with minimum hours, after-hours evening note and supplies restocking.
 */
export function OfficeBoardSection({
  eyebrow,
  heading,
  intro,
  eveningNote,
  restockNote,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  eveningNote: ReactNode;
  restockNote: ReactNode;
}) {
  const pkg = getPackage('office');
  const rates = pkg.pricing.kind === 'hourly' ? pkg.pricing.rates : [];

  return (
    <section id="office" className="bg-surface py-16 sm:py-20">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="care-label">{eyebrow}</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          <p className="mt-4 text-base text-muted">{intro}</p>
          <div className="mt-6 space-y-4 text-sm text-muted">
            <p>{eveningNote}</p>
            <p>{restockNote}</p>
          </div>
        </div>

        {/* Lobby directory board */}
        <div className="rounded-[10px] border-4 border-chrome bg-board-bg p-6 text-board-ink shadow-sm sm:p-8">
          <div className="flex items-center justify-between border-b border-board-muted/30 pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-aqua">
              Office Shift Directory
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-board-muted">
              Per cleaner · AUD
            </span>
          </div>

          <ul className="mt-5 divide-y divide-board-muted/20 list-none p-0">
            {rates.map(rate => (
              <li key={rate.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4 font-mono">
                <div>
                  <span className="block text-sm font-semibold tracking-wider text-board-ink uppercase">
                    {rate.label}
                  </span>
                  <span className="mt-1 block text-xs text-board-muted">
                    Minimum {rate.minimumHours} hours per visit
                  </span>
                </div>
                <span className="text-xl font-semibold text-aqua">
                  ${rate.perCleanerHour}
                  <span className="text-xs font-normal text-board-muted"> / hr</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-board-muted/25 pt-4 font-mono text-xs text-board-muted">
            Up to ~40 desks · Key-safe or swipe-card access · Public liability certificate supplied on request
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Extras (#extras):
 * Two-column price list styled as a spray-bottle label sheet, marking "Included in End-of-lease"
 * and "Paused for now" for unavailable items.
 */
export function ExtrasSheetSection({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section id="extras" className="mist-pane rounded-none border-x-0 py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          </div>
          <p className="max-w-md text-sm text-muted">{intro}</p>
        </div>

        <div className="mt-8 rounded-[10px] border-2 border-ink/70 bg-surface p-6 sm:p-8">
          <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2 list-none m-0 p-0">
            {extras.map(extra => (
              <li
                key={extra.id}
                className={`flex items-start justify-between gap-4 border-b border-line pb-4 ${
                  !extra.available ? 'opacity-70' : ''
                }`}
              >
                <div>
                  <p className="font-medium text-ink">{extra.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider">
                    {extra.includedIn.includes('end-of-lease') ? (
                      <span className="rounded-[3px] bg-mist px-2 py-0.5 text-accent-ink">
                        ✓ Included in End-of-lease
                      </span>
                    ) : null}
                    {!extra.available ? (
                      <span className="rounded-[3px] border border-cloth-red/60 bg-bg px-2 py-0.5 text-cloth-red">
                        Paused for now
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-display text-xl text-ink">${extra.price}</span>
                  <span className="block font-mono text-[0.68rem] uppercase text-muted">
                    {extra.unit}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Light closing CTA band (used on pages that already have their one full-bleed deep-aqua band). */
export function LightCtaBand({
  heading,
  body,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
}: {
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-surface py-14 sm:py-16 border-t border-line">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">{heading}</h2>
          <p className="mt-2 text-base text-muted">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SiteLink href="/contact/" className="button">
            {ctaLabel}
          </SiteLink>
          {secondaryHref && secondaryLabel ? (
            <SiteLink href={secondaryHref} className="button button-quiet">
              {secondaryLabel}
            </SiteLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
