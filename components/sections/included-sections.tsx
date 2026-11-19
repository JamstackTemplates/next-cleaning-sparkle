import type { ReactNode } from 'react';
import { clothCode } from '../../content/checklist';
import { ClothTab, CrossedDroplet } from '../art/cleaning-icons';
import { PackageVignette } from '../art/package-art';
import { SiteLink } from '../site-link';
import { SqueegeeChecklist } from '../squeegee-checklist';

export function FullChecklistSection({
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
          <SqueegeeChecklist syncHash showPrintButton />
        </div>
      </div>
    </section>
  );
}

/** Four folded microfibre cloths laid out large in a row with their rooms. */
export function ClothCodeSection({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section className="mist-pane rounded-none border-x-0 py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          </div>
          <p className="max-w-md text-sm text-muted">{intro}</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {clothCode.map(cloth => (
            <li
              key={cloth.colour}
              className="rounded-ui border border-line bg-surface p-6 shadow-xs"
            >
              <ClothTab colour={cloth.colour} large />
              <h3 className="mt-4 font-display text-xl text-ink">{cloth.name}</h3>
              <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink">
                {cloth.rooms}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cloth.rule}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "What we don't do" — short list on a white band, each item with a crossed-out droplet. */
export function ExclusionsSection({
  eyebrow,
  heading,
  intro,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  items: readonly { title: string; detail: string }[];
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="wrap">
        <span className="care-label">{eyebrow}</span>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted">{intro}</p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {items.map(item => (
            <li
              key={item.title}
              className="flex items-start gap-3.5 rounded-ui border border-line bg-bg p-5"
            >
              <CrossedDroplet className="mt-0.5 h-6 w-6" />
              <div>
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Before we arrive" — numbered list beside the caddy vignette. */
export function BeforeArrivalSection({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow: string;
  heading: ReactNode;
  steps: readonly { title: string; detail: string }[];
}) {
  return (
    <section className="bg-bg py-16 sm:py-20 border-t border-line">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="care-label">{eyebrow}</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          <div className="mt-8 flex justify-start">
            <PackageVignette packageId="regular" className="h-40 w-52" />
          </div>
        </div>

        <ol className="space-y-4 list-none p-0">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-ui border border-line bg-surface p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist font-mono text-xs font-semibold text-accent-ink border border-line">
                0{idx + 1}
              </span>
              <div>
                <h3 className="font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Single full-bleed deep-aqua CTA band for /whats-included/. */
export function DeepCtaBand({
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
    <section className="deep-band py-14 sm:py-18">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.85rem,3.6vw,2.7rem)] text-deep-band-ink">{heading}</h2>
          <p className="mt-2.5 text-base text-deep-band-muted">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SiteLink href="/contact/" className="button button-on-deep">
            {ctaLabel}
          </SiteLink>
          {secondaryHref && secondaryLabel ? (
            <SiteLink
              href={secondaryHref}
              className="button border-deep-band-muted/50 bg-transparent text-deep-band-ink hover:bg-deep-band-surface"
            >
              {secondaryLabel}
            </SiteLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
