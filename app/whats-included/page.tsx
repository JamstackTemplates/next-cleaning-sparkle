import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import {
  BeforeArrivalSection,
  ClothCodeSection,
  DeepCtaBand,
  ExclusionsSection,
  FullChecklistSection,
} from '../../components/sections/included-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: "What's included",
  description: "Full room-by-room cleaning checklist for Regular, End-of-lease and Office cleans, plus our four-colour microfibre cloth code and pre-visit preparation guide.",
  alternates: { canonical: absoluteUrl('/whats-included/') },
};

export default function WhatsIncludedPage() {
  return (
    <>
      <PageHead eyebrow="Room checklist" title="What's included, room by room" motif="cloths">
        <p>
          Every crew works from the same printed list. Switch packages below to wipe the glass clear
          and see exactly what is included, what is an optional add-on, and which cloth enters each
          room.
        </p>
      </PageHead>

      <FullChecklistSection
        eyebrow="Squeegee checklist"
        heading="Compare every room"
        intro="Select Regular, End-of-lease or Office — or print the page for a three-column comparison sheet covering all six areas."
      />

      <ClothCodeSection
        eyebrow="Hygiene system"
        heading="The cloth colour code"
        intro="Every van carries freshly laundered microfibre cloths in four colours. Each colour stays strictly in its assigned rooms."
      />

      <ExclusionsSection
        eyebrow="Clear boundaries"
        heading="What we don't do"
        intro="For crew safety and specialist care, a few jobs sit outside our cleaning packages:"
        items={[
          {
            title: 'Biohazard and sharps',
            detail: 'Blood, bodily fluids, needles or hazardous waste require licensed specialist remediation.',
          },
          {
            title: 'Mould remediation',
            detail: 'We wipe light surface condensation, but structural or penetrating mould needs a mould specialist.',
          },
          {
            title: 'Outside windows above ground floor',
            detail: 'We clean reachable interior glass and tracks; external upper-storey panes require height-rigged window cleaners.',
          },
          {
            title: 'Moving heavy furniture',
            detail: 'Crews clean around and under accessible furniture but do not lift fridges, washing machines or heavy wardrobes.',
          },
          {
            title: 'Carpet replacement or repairs',
            detail: 'We vacuum thoroughly and note wear, but cannot patch burns, restretch carpet or fix flooring.',
          },
          {
            title: 'Pest treatment',
            detail: 'Chemical spraying, baiting and pest control require a licensed pest technician.',
          },
        ]}
      />

      <BeforeArrivalSection
        eyebrow="Prep checklist"
        heading="Before we arrive"
        steps={[
          {
            title: 'Access and keys',
            detail: 'Let us know how the crew will get in — home to greet us, lockbox code, building concierge or spare key arrangement.',
          },
          {
            title: 'Parking notes',
            detail: 'Inner Melbourne streets can be tight. Tell us about visitor bays, permit zones or loading docks so we can unload vacuums and ladders.',
          },
          {
            title: 'Power and hot water on',
            detail: 'We need electricity for HEPA vacuums and hot water for degreasing. For end-of-lease cleans, please keep utilities connected until after the clean.',
          },
          {
            title: 'Pets settled',
            detail: 'We love Melbourne dogs and cats, but vacuums and open doors can startle them. Please keep pets in a calm room or let us know their routine.',
          },
          {
            title: 'Valuables put away',
            detail: 'Tuck away jewellery, fragile keepsakes and loose paperwork so our crew can wipe clear surfaces thoroughly.',
          },
        ]}
      />

      <DeepCtaBand
        heading="Want this checklist for your place?"
        body="Send us your suburb, package and preferred day. We reply with a written quote and available dates."
        ctaLabel="Request a cleaning quote"
        secondaryHref="/packages/"
        secondaryLabel="Estimate your price"
      />
    </>
  );
}
