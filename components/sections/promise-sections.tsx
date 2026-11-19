import type { ReactNode } from 'react';
import { trustBadges } from '../../content/badges';
import { BadgeIcon, Clock72h } from '../art/cleaning-icons';
import { CaddyContentsArt } from '../art/scenes';

/** Large woven care labels in a staggered two-row layout, each with its detail. */
export function TrustLabelsGridSection({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: ReactNode;
}) {
  const visible = trustBadges.filter(b => b.shown);

  return (
    <section className="bg-bg py-16 sm:py-20">
      <div className="wrap">
        <span className="care-label">{eyebrow}</span>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {visible.map((badge, idx) => (
            <li
              key={badge.id}
              id={badge.id}
              className={`care-label-stitched flex flex-col justify-between p-6 ${
                idx % 2 === 1 ? 'lg:mt-5' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist border border-line">
                    <BadgeIcon id={badge.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{badge.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{badge.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Single full-bleed deep-aqua band on /promise/:
 * 72-hour re-clean promise as a horizontal timeline on desktop (vertical on mobile)
 * with the 72-hour clock face.
 */
export function RecleanTimelineBand({
  eyebrow,
  heading,
  intro,
  steps,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  steps: readonly { label: string; title: string; detail: string }[];
}) {
  return (
    <section id="reclean" className="deep-band py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-[3px] border border-dawn/70 bg-deep-band-surface px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-dawn">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] text-deep-band-ink">{heading}</h2>
            <p className="mt-3 text-base text-deep-band-muted">{intro}</p>
          </div>
          <Clock72h className="h-24 w-24" />
        </div>

        {/* Wipe-edge track line on desktop */}
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-6 right-6 h-0.5 bg-dawn/60"
          />
          <ol className="grid gap-5 lg:grid-cols-4 list-none p-0">
            {steps.map((step, idx) => (
              <li
                key={step.title}
                className="relative rounded-ui border border-deep-band-muted/30 bg-deep-band-surface p-5"
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-dawn">
                  <span className="h-2.5 w-2.5 rounded-full bg-dawn" aria-hidden="true" />
                  Step 0{idx + 1} · {step.label}
                </span>
                <h3 className="mt-3 font-display text-xl text-deep-band-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep-band-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** "What's in the caddy" — open caddy illustration with labelled tools/products around it. */
export function CaddySection({
  eyebrow,
  heading,
  intro,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  items: readonly { name: string; note: string }[];
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
            <p className="mt-3 text-base text-muted">{intro}</p>
            <div className="mt-8">
              <CaddyContentsArt />
            </div>
          </div>

          <ul className="grid gap-3.5 sm:grid-cols-2 list-none p-0">
            {items.map((item, idx) => (
              <li
                key={item.name}
                className="rounded-ui border border-line bg-bg p-4"
              >
                <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent-ink">
                  Kit 0{idx + 1}
                </span>
                <h3 className="mt-1 font-display text-lg text-ink">{item.name}</h3>
                <p className="mt-1 text-sm text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** FAQ section — adjacent <details>/<summary> on a mist pane (no headings inside <summary>). */
export function FaqSection({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section aria-labelledby="faq-heading" className="mist-pane rounded-none border-x-0 py-16 sm:py-20">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 id="faq-heading" className="mt-4 text-[clamp(2rem,4vw,3rem)] text-ink">
              {heading}
            </h2>
          </div>

          <div className="faq-accordion rounded-ui border border-line bg-surface px-6 py-2">
            {items.map(item => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p className="pb-5 pl-7 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
