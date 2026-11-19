import type { ReactNode } from 'react';
import { trustBadges } from '../../content/badges';
import { business } from '../../content/business';
import { packageStartingPrice, packages } from '../../content/packages';
import { DawnWindow } from '../art/dawn-window';
import { BubbleCluster, LemonWheel, ScourSponge, SudsBucket, WholeLemon } from '../art/cleaning-props';
import { BadgeIcon } from '../art/cleaning-icons';
import { DropletTrail, TowelStackDivider } from '../art/dividers';
import { PackageVignette } from '../art/package-art';
import { VanSide } from '../art/scenes';
import { OpenBadge } from '../open-badge';
import { SiteLink } from '../site-link';
import { SqueegeeChecklist } from '../squeegee-checklist';

type ChildrenProps = { children: ReactNode };

/* ==========================================================================
   1. Home Hero
   - 1440px: 2 columns — left display heading on wiped diagonal stripe, intro,
     primary & secondary actions, 3 mono facts; right Dawn window art large &
     bleeding off the right edge.
   - 390px: Dawn window art ~240px band first, then heading, intro, primary
     action all within the first screen.
   ========================================================================== */

function HomeHeroRoot({
  facts,
  children,
}: {
  facts: readonly string[];
  children: ReactNode;
}) {
  return (
    <section className="mist-pane wiped-stripe rounded-none border-x-0 border-t-0 pb-14 sm:pb-18 lg:pb-20">
      {/* Background props: suds bucket under the sill, fresh lemons and loose bubbles */}
      <SudsBucket className="cleaning-prop bottom-12 right-[3%] hidden w-28 -rotate-3 lg:block xl:w-32" />
      <WholeLemon className="cleaning-prop bottom-12 right-[12.5%] hidden w-20 rotate-[-6deg] lg:block xl:w-22" />
      <LemonWheel className="cleaning-prop bottom-12 right-[18.5%] hidden w-13 rotate-12 lg:block" />
      <BubbleCluster className="cleaning-prop prop-bob prop-bob-late top-6 left-[38%] hidden w-16 opacity-80 xl:block" />
      <LemonWheel className="cleaning-prop -bottom-3 -left-3 w-14 rotate-[20deg] opacity-90 lg:hidden" />
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:pl-12 lg:pr-0">
        <div className="grid items-center gap-6 pt-4 sm:pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] lg:gap-8 lg:pt-10">
          {/* Art appears first on mobile (~240px band) and right bleeding on desktop */}
          <div className="order-1 lg:order-2 lg:overflow-visible">
            <DawnWindow className="mx-auto max-h-[235px] w-full object-contain sm:max-h-[340px] lg:max-h-[540px] lg:w-[110%] lg:max-w-none lg:translate-x-8" />
          </div>

          <div className="order-2 lg:order-1 lg:py-6">
            {children}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted list-none p-0">
              {facts.map(fact => (
                <li key={fact} className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-aqua" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <div className="relative">
      <span className="care-label mb-4 inline-flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1L9.7 6.3L15 8L9.7 9.7L8 15L6.3 9.7L1 8L6.3 6.3L8 1Z" fill="var(--aqua)" />
        </svg>
        Inner Melbourne Home &amp; Office Cleaning
      </span>
      <h1 className="relative text-[clamp(2.25rem,5.4vw,4.35rem)] leading-[1.06] text-ink">
        {children}
        <svg
          width="26"
          height="26"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className="sparkle-twinkle ml-2 inline-block align-top text-aqua"
        >
          <path
            d="M14 2L16.8 11.2L26 14L16.8 16.8L14 26L11.2 16.8L2 14L11.2 11.2L14 2Z"
            fill="currentColor"
          />
        </svg>
      </h1>
    </div>
  );
}

function HeroIntro({ children }: ChildrenProps) {
  return (
    <p className="mt-4 max-w-xl text-[clamp(1rem,1.45vw,1.15rem)] leading-relaxed text-muted">
      {children}
    </p>
  );
}

function HeroActions({ children }: ChildrenProps) {
  return <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>;
}

function HeroPrimaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/contact/" className="button">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/whats-included/" className="button button-quiet">
      {children}
    </SiteLink>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Heading: HeroHeading,
  Intro: HeroIntro,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
});

/* ==========================================================================
   2. Trust Strip — 8 woven care labels overlapping hero's lower edge
   ========================================================================== */

export function TrustStrip({ label }: { label: string }) {
  const visible = trustBadges.filter(b => b.shown);
  return (
    <section aria-label={label} className="relative z-10 -mt-8 pb-6 sm:-mt-10">
      <div className="wrap">
        <ul className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory list-none m-0 p-0 lg:grid lg:grid-cols-4 lg:overflow-visible xl:grid-cols-8">
          {visible.map(badge => (
            <li key={badge.id} className="snap-start shrink-0 lg:shrink">
              <SiteLink
                href={`/promise/#${badge.id}`}
                className="care-label-stitched group flex h-full min-w-[10.5rem] flex-col items-start gap-2 px-3.5 py-3 no-underline transition-transform hover:-translate-y-0.5 hover:no-underline lg:min-w-0"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-mist border border-sea-glass/70">
                    <BadgeIcon id={badge.icon} className="h-4 w-4" />
                  </span>
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1L8.4 5.6L13 7L8.4 8.4L7 13L5.6 8.4L1 7L5.6 5.6L7 1Z" fill="var(--aqua)" />
                  </svg>
                </span>
                <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.06em] leading-snug text-ink group-hover:text-accent-ink">
                  {badge.label}
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. Pick Your Clean — Chrome towel rail with three hanging towels
   ========================================================================== */

function TowelRailRoot({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
}) {
  const stripeClass = {
    aqua: 'bg-aqua',
    dawn: 'bg-dawn',
    ink: 'bg-ink',
  } as const;

  const lengthClass = {
    regular: 'pb-7',
    'end-of-lease': 'pb-12',
    office: 'pb-9',
  } as const;

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] text-ink">{heading}</h2>
          </div>
          {children ? <div className="max-w-md text-sm text-muted">{children}</div> : null}
        </div>

        {/* Chrome rail spanning above the three hanging towels */}
        <div className="relative mt-10">
          <div className="hidden items-center justify-between md:flex" aria-hidden="true">
            <span className="h-4 w-4 rounded-full border-2 border-ink/70 bg-chrome" />
            <div className="h-2.5 flex-1 bg-gradient-to-b from-surface via-chrome to-line border-y border-ink/40" />
            <span className="h-4 w-4 rounded-full border-2 border-ink/70 bg-chrome" />
          </div>

          <div className="grid items-start gap-6 md:-mt-1.5 md:grid-cols-3 md:gap-7">
            {packages.map(pkg => {
              const start = packageStartingPrice(pkg);
              return (
                <article
                  key={pkg.id}
                  className={`towel-hang relative rounded-b-[10px] rounded-t-[4px] border-2 border-ink/75 bg-bg px-6 pt-7 shadow-xs ${lengthClass[pkg.id]}`}
                >
                  {/* Folded towel top crease */}
                  <div
                    className="absolute inset-x-0 top-0 h-3 rounded-t-[2px] border-b border-line bg-mist/80"
                    aria-hidden="true"
                  />
                  {/* Package vignette */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>
                      {!pkg.available ? (
                        <span className="mt-1 inline-block font-mono text-xs uppercase text-cloth-red">
                          Not taking new clients
                        </span>
                      ) : null}
                    </div>
                    <PackageVignette packageId={pkg.id} className="h-20 w-24" />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.suits}</p>

                  {/* Stitched hang tag with starting price */}
                  <div className="care-label-stitched mt-5 flex items-baseline justify-between px-4 py-3">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                      From
                    </span>
                    <span className="font-display text-2xl text-ink">
                      ${start.amount}{' '}
                      <span className="font-mono text-xs font-normal text-muted">{start.suffix}</span>
                    </span>
                  </div>

                  <div className="mt-5">
                    <SiteLink
                      href={`/packages/#${pkg.id}`}
                      className="text-link inline-flex items-center gap-1.5 text-sm font-semibold"
                    >
                      See {pkg.name.toLowerCase()} rates
                      <span aria-hidden="true">→</span>
                    </SiteLink>
                  </div>

                  {/* Signature woven towel stripe near the hem */}
                  <div className={`mt-6 h-2.5 w-full rounded-[2px] ${stripeClass[pkg.stripe]}`} aria-hidden="true" />
                  <div className="mt-1.5 h-0.5 w-full bg-line" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const TowelRailSection = TowelRailRoot;

/* ==========================================================================
   4. Squeegee Checklist Teaser — Offset right with large display heading left
   ========================================================================== */

export function ChecklistTeaserSection({
  eyebrow,
  heading,
  intro,
  ctaLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: string;
}) {
  return (
    <section className="mist-pane rounded-none border-x-0 py-16 sm:py-20">
      <div className="wrap">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-24">
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.4rem)] text-ink">{heading}</h2>
            <p className="mt-4 text-base text-muted">{intro}</p>
            <div className="mt-6">
              <SiteLink href="/whats-included/" className="button">
                {ctaLabel}
              </SiteLink>
            </div>
          </div>

          <div>
            <SqueegeeChecklist roomIds={['kitchen', 'bathroom']} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. How a Clean Runs — Four steps along a diagonal droplet trail
   ========================================================================== */

export function HowItRunsSection({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow: string;
  heading: ReactNode;
  steps: readonly { title: string; body: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <ScourSponge className="cleaning-prop prop-bob top-10 right-[6%] hidden w-28 rotate-[-6deg] md:block lg:w-32" />
      <BubbleCluster className="cleaning-prop top-28 right-[16%] hidden w-12 opacity-70 lg:block" />
      <div className="wrap relative">
        <span className="care-label">{eyebrow}</span>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] text-ink">{heading}</h2>
        <DropletTrail className="mt-4 hidden w-full max-w-4xl md:block" />

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className={`rounded-ui border border-line bg-bg p-6 ${
                idx === 1 ? 'lg:mt-6' : idx === 2 ? 'lg:mt-12' : idx === 3 ? 'lg:mt-18' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="block font-display text-5xl leading-none text-transparent"
                style={{ WebkitTextStroke: '1.6px var(--accent-ink)' }}
              >
                0{idx + 1}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Where We Clean — Van side across width
   ========================================================================== */

export function VanAreaSection({
  eyebrow,
  heading,
  eveningNote,
}: {
  eyebrow: string;
  heading: ReactNode;
  eveningNote: string;
}) {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <TowelStackDivider className="mb-12" />
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="care-label">{eyebrow}</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] text-ink">{heading}</h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            No shopfront — our vans come to your home or workplace with everything on board.
          </p>
        </div>

        <VanSide suburbs={business.suburbs} eveningNote={eveningNote} />
      </div>
    </section>
  );
}

/* ==========================================================================
   7. Closing Band — Full-bleed deep aqua with apricot horizon line
   ========================================================================== */

export function ClosingBand({
  heading,
  body,
  ctaLabel,
}: {
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
}) {
  return (
    <section className="deep-band py-16 sm:py-20">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-[clamp(2.1rem,4.5vw,3.4rem)] text-deep-band-ink">{heading}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-deep-band-muted">{body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <SiteLink href="/contact/" className="button button-on-deep">
              {ctaLabel}
            </SiteLink>
            <OpenBadge hours={business.officeHours} onDeep />
          </div>
        </div>

        <div className="rounded-ui border border-deep-band-muted/30 bg-deep-band-surface p-6 space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-dawn">
            Melbourne office desk
          </p>
          <p className="text-lg font-medium text-deep-band-ink">
            <a href={`tel:${business.phoneE164}`} className="text-deep-band-ink underline decoration-dawn/70">
              {business.phone}
            </a>
          </p>
          <p className="text-sm text-deep-band-ink">
            <a href={`mailto:${business.email}`} className="text-deep-band-ink underline decoration-deep-band-muted/60 wrap-anywhere">
              {business.email}
            </a>
          </p>
          <p className="pt-2 border-t border-deep-band-muted/25 font-mono text-xs text-deep-band-muted">
            {business.officeHoursSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
