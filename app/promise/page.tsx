import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { LightCtaBand } from '../../components/sections/packages-sections';
import {
  CaddySection,
  FaqSection,
  RecleanTimelineBand,
  TrustLabelsGridSection,
} from '../../components/sections/promise-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Our promise',
  description: 'Police-checked crews, $20M public liability, colour-coded cloths, low-tox products and our written 72-hour re-clean promise for inner Melbourne cleans.',
  alternates: { canonical: absoluteUrl('/promise/') },
};

export default function PromisePage() {
  return (
    <>
      <PageHead eyebrow="Our standards" title="Promises we keep in writing" motif="care-label">
        <p>
          Inviting a cleaning crew into your home or office takes trust. Every standard below is
          printed on our crew sheets and backed in writing.
        </p>
      </PageHead>

      <TrustLabelsGridSection
        eyebrow="Care labels"
        heading="Eight standards on every visit"
      />

      <RecleanTimelineBand
        eyebrow="72-hour re-clean promise"
        heading="If we miss a listed item, we come back free"
        intro="Applies to every Regular, End-of-lease and Office clean across the tasks included in your package."
        steps={[
          {
            label: 'Day 0',
            title: 'Clean finished',
            detail: 'Your crew signs off the room-by-room checklist and locks up as arranged.',
          },
          {
            label: 'Within 72 hours',
            title: 'Tell us what was missed',
            detail: 'Email or call our Melbourne office within 72 hours with the listed item and a quick photo if helpful.',
          },
          {
            label: 'Within 2 business days',
            title: 'Re-clean of listed items',
            detail: 'We schedule a return visit within two business days to re-clean every noted checklist item.',
          },
          {
            label: '$0',
            title: 'No charge',
            detail: 'There is no call-out fee and no extra charge for re-cleaning items on your package list.',
          },
        ]}
      />

      <CaddySection
        eyebrow="What's in the caddy"
        heading="Every van arrives stocked"
        intro="You never need to leave out sprays, rags or a vacuum. Here is the kit our crews bring through your door:"
        items={[
          {
            name: 'Plant-based all-purpose spray',
            note: 'Biodegradable, low-tox surface cleaner safe for stone benchtops and family homes.',
          },
          {
            name: 'Fragrance-free option',
            note: 'Available on request for allergy-sensitive households, nurseries and pets.',
          },
          {
            name: 'Vinegar descaler',
            note: 'Cuts soap scum and hard-water marks on shower glass, taps and tiles without harsh chlorine fumes.',
          },
          {
            name: 'HEPA vacuum',
            note: 'Commercial-grade HEPA filtration capturing fine dust and pet dander on rugs, carpets and timber.',
          },
          {
            name: 'Flat microfibre mops',
            note: 'Swapped to a fresh pad for every property so floors dry fast with zero streaky residue.',
          },
          {
            name: 'Four colour-coded microfibre cloths',
            note: 'Green for kitchen, yellow for bathrooms, red for toilets only, blue for living and offices.',
          },
          {
            name: 'Extendable squeegee',
            note: 'Leaves shower screens, mirrors and interior glass crisp and streak-free.',
          },
          {
            name: 'Step ladder',
            note: 'Reaches exhaust fan covers, top cupboard rails, high shelves and blinds safely.',
          },
        ]}
      />

      <FaqSection
        eyebrow="Common questions"
        heading="Straight answers before you enquire"
        items={[
          {
            question: 'Do I need to be home?',
            answer: 'No. Many regular and end-of-lease clients leave a key in a lockbox, with building concierge, or arrange a key handover once their quote is confirmed. You are also welcome to be home while we clean.',
          },
          {
            question: 'Do you bring supplies?',
            answer: 'Yes. Every crew brings our full caddy — plant-based sprays (with a fragrance-free option), vinegar descaler, HEPA vacuums, flat mops, four-colour microfibre cloths, an extendable squeegee and a step ladder.',
          },
          {
            question: 'Can I keep the same cleaner?',
            answer: 'Yes for Regular weekly and fortnightly cleans. We assign the same crew and day so they learn your home and preferences. If someone is on leave, we let you know before sending a vetted cover cleaner.',
          },
          {
            question: 'How do I pause or cancel regular cleans?',
            answer: 'Just email or call with 48 hours\u2019 notice. There are no lock-in contracts, pause fees or cancellation penalties.',
          },
          {
            question: 'Will an end-of-lease clean get my bond back?',
            answer: 'We clean to a detailed room-by-room checklist matched to typical Victorian condition reports, and back every listed item with our 72-hour re-clean promise. Because the final bond decision is always your landlord\u2019s or property manager\u2019s, we never guarantee bond return — we guarantee our work.',
          },
          {
            question: 'Do you clean after hours for offices?',
            answer: 'Yes. Office cleans run during business hours (07:00–18:00), weekday evenings (18:00–22:00) and Saturdays (08:00–16:00) so your team walks into a fresh workspace without daytime disruption.',
          },
        ]}
      />

      <LightCtaBand
        heading="Questions about your home or office?"
        body="Tell us what you need cleaned and we will reply with a written quote and available dates."
        ctaLabel="Request a cleaning quote"
        secondaryHref="/packages/"
        secondaryLabel="View packages & prices"
      />
    </>
  );
}
