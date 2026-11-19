import type { Metadata } from 'next';
import { businessMetaDescription } from '../content/business';
import { startingRegularPrice } from '../content/packages';
import {
  ChecklistTeaserSection,
  ClosingBand,
  HomeHero,
  HowItRunsSection,
  TowelRailSection,
  TrustStrip,
  VanAreaSection,
} from '../components/sections/home-sections';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

const fromPrice = startingRegularPrice();

export const metadata: Metadata = {
  description: businessMetaDescription(fromPrice),
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero facts={[`From $${fromPrice} a visit`, 'Police-checked', '72-hour re-clean']}>
        <HomeHero.Heading>
          Wake up to a{' '}
          <span className="relative inline-block text-accent-ink underline decoration-aqua/70 decoration-[4px] underline-offset-[6px]">
            cleaner
          </span>{' '}
          home.
        </HomeHero.Heading>
        <HomeHero.Intro>
          Regular, end-of-lease and office cleans across inner Melbourne, from ${fromPrice} a visit.
          Police-checked crews, colour-coded cloths and a 72-hour re-clean promise.
        </HomeHero.Intro>
        <HomeHero.Actions>
          <HomeHero.PrimaryAction>Request a cleaning quote</HomeHero.PrimaryAction>
          <HomeHero.SecondaryAction>See what&apos;s included</HomeHero.SecondaryAction>
        </HomeHero.Actions>
      </HomeHero>

      <TrustStrip label="Morning Dew guarantees" />

      <TowelRailSection eyebrow="Packages" heading="Pick your clean">
        <p>
          Every visit follows our printed room checklist and colour-coded cloth system. Choose a
          regular rhythm, a fixed-price vacate clean or an after-hours office shift.
        </p>
      </TowelRailSection>

      <ChecklistTeaserSection
        eyebrow="Squeegee checklist"
        heading="What's included?"
        intro="Switch between Regular, End-of-lease and Office to wipe the glass clear and see what is covered in kitchens and bathrooms."
        ctaLabel="See every room"
      />

      <HowItRunsSection
        eyebrow="Process"
        heading="How a clean runs"
        steps={[
          {
            title: 'Ask for a quote',
            body: 'Send your package, suburb, home or office size and any extras. You can paste a summary straight from our estimator.',
          },
          {
            title: 'We confirm a date by reply',
            body: 'Our Melbourne office replies with a written quote and available time window. A clean is booked only once we confirm by reply.',
          },
          {
            title: 'Your crew arrives with everything',
            body: 'Police-checked cleaners arrive with HEPA vacuums, flat mops, low-tox sprays, a step ladder and four colour-coded cloths.',
          },
          {
            title: 'Walk-through and 72-hour re-clean window',
            body: 'Check the finished rooms against our list. If anything listed was missed, tell us within 72 hours and we return at no charge.',
          },
        ]}
      />

      <VanAreaSection
        eyebrow="Service area"
        heading="Where we clean"
        eveningNote="Home cleans run Monday to Saturday. Office cleans also run weekday evenings from 18:00 until 22:00 so your desks are reset before morning."
      />

      <ClosingBand
        heading="Tell us about your place"
        body="Share your suburb, room count and preferred day for a written quote. No lock-in contracts and no payment until we confirm your clean."
        ctaLabel="Request a cleaning quote"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
