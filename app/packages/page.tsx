import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import {
  EndOfLeaseBand,
  EstimatorSection,
  ExtrasSheetSection,
  LightCtaBand,
  OfficeBoardSection,
  RegularShelfSection,
} from '../../components/sections/packages-sections';
import { startingRegularPrice } from '../../content/packages';
import { absoluteUrl } from '../../lib/paths';

const fromPrice = startingRegularPrice();

export const metadata: Metadata = {
  title: 'Packages & prices',
  description: `Regular home cleans from $${fromPrice}, fixed-price end-of-lease cleans, hourly office shifts and optional add-ons across inner Melbourne. All prices in AUD including GST.`,
  alternates: { canonical: absoluteUrl('/packages/') },
};

export default function PackagesPage() {
  return (
    <>
      <PageHead eyebrow="Packages & prices" title="Three ways to a clean place" motif="towel">
        <p>
          Clear AUD rates including GST for inner Melbourne homes and small offices. Use the
          estimator to build a guide price, or browse the full rate tables below.
        </p>
      </PageHead>

      <EstimatorSection
        eyebrow="Price estimator"
        heading="Build a guide estimate"
        intro="Pick your package, size or office hours, frequency and any optional add-ons. Copy the summary straight into the quote enquiry form."
      />

      <RegularShelfSection
        eyebrow="Regular clean"
        heading="Home upkeep on your rhythm"
        intro="Base rates are per visit before your frequency adjustment. Weekly and fortnightly clients keep the same crew and day each visit."
      />

      <EndOfLeaseBand
        eyebrow="End-of-lease clean"
        heading="Fixed prices for handing back keys"
        intro="Designed for empty Melbourne apartments and houses before a final inspection or settlement, with oven, fridge, cupboards, blinds and window tracks built in."
        addedItems={[
          'Inside the oven, racks and door glass',
          'Inside the fridge and kitchen cupboards',
          'Rangehood degrease and filter wash',
          'Wall tiles, grout lines and exhaust fan covers',
          'Skirting boards and inside wardrobes',
          'Blinds, interior windows and sliding tracks',
          'Spot cleaning reachable wall marks',
          '72-hour re-clean of listed items at no charge',
        ]}
        bondNote="We clean to a room-by-room checklist matched to typical Victorian condition reports, backed by our 72-hour re-clean promise for any listed item. Because your landlord or property manager makes the final bond decision, we never promise bond return — we promise our checklist is done properly."
      />

      <OfficeBoardSection
        eyebrow="Office clean"
        heading="Quiet resets for small workplaces"
        intro="Built for studios, clinics and offices up to about 40 desks across inner Melbourne. Billed per cleaner hour with transparent shift rates."
        eveningNote="After-hours evening shifts run Monday to Friday from 18:00 to 22:00 so crews never interrupt calls or meetings."
        restockNote="We wipe clear desks, empty and reline bins, run the kitchenette dishwasher, reset meeting rooms and restock your supplied paper and hand soap."
      />

      <ExtrasSheetSection
        eyebrow="Add-ons"
        heading="Extras you can add to any clean"
        intro="Add individual deep-clean tasks to a Regular or Office visit. Items ticked below are already included in End-of-lease."
      />

      <LightCtaBand
        heading="Ready for a written quote?"
        body="Tell us your suburb, home or office size and preferred timing. A clean is booked only when we confirm a date by reply."
        ctaLabel="Ask for a quote"
        secondaryHref="/whats-included/"
        secondaryLabel="See room-by-room checklist"
      />
    </>
  );
}
