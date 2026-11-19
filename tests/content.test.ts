import assert from 'node:assert/strict';
import { test } from 'node:test';
import { trustBadges, validateBadges } from '../content/badges.ts';
import { business, businessMetaDescription } from '../content/business.ts';
import { checklistRooms, checklistTasks, validateChecklist } from '../content/checklist.ts';
import { extras, validateExtras } from '../content/extras.ts';
import { frequencies, validateFrequencies } from '../content/frequencies.ts';
import { homeSizes, validateHomeSizes } from '../content/home-sizes.ts';
import { packages, startingRegularPrice, validatePackages } from '../content/packages.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'phoneE164'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.suburbs.length >= 20, 'business.suburbs: expected inner Melbourne suburbs list');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('all typed content collections pass validation', () => {
  assert.doesNotThrow(() => validateHomeSizes(homeSizes));
  assert.doesNotThrow(() => validatePackages(packages, homeSizes));
  assert.doesNotThrow(() => validateFrequencies(frequencies));
  assert.doesNotThrow(() => validateExtras(extras, packages));
  assert.doesNotThrow(() => validateChecklist(checklistRooms, checklistTasks, packages, extras));
  assert.doesNotThrow(() => validateBadges(trustBadges));
});

test('content validators fail with item-specific messages on bad edits', () => {
  // Duplicate home size ID
  assert.throws(
    () => validateHomeSizes([...homeSizes, homeSizes[0]]),
    /homeSizes\[studio\]: duplicate id/,
  );

  // Missing rate for a home size
  const regular = packages.find(p => p.id === 'regular')!;
  assert.equal(regular.pricing.kind, 'by-home-size');
  const missingSizePkg = {
    ...regular,
    pricing: { kind: 'by-home-size' as const, rates: regular.pricing.rates.slice(1) },
  };
  assert.throws(
    () => validatePackages([missingSizePkg, ...packages.slice(1)], homeSizes),
    /packages\[regular\]: missing rate for home size "studio"/,
  );

  // Unknown sizeId
  const badSizePkg = {
    ...regular,
    pricing: {
      kind: 'by-home-size' as const,
      rates: regular.pricing.rates.map(r => r.sizeId === 'studio' ? { ...r, sizeId: 'mansion' } : r),
    },
  };
  assert.throws(
    () => validatePackages([badSizePkg, ...packages.slice(1)], homeSizes),
    /mansion.*unknown home sizeId/,
  );

  // Package price outside 50..2000
  const badPricePkg = {
    ...regular,
    pricing: {
      kind: 'by-home-size' as const,
      rates: regular.pricing.rates.map(r => r.sizeId === 'two-bed' ? { ...r, price: 2500 } : r),
    },
  };
  assert.throws(
    () => validatePackages([badPricePkg, ...packages.slice(1)], homeSizes),
    /packages\[regular\]\.rates\[two-bed\]: price/,
  );

  // Non-positive extra price
  assert.throws(
    () => validateExtras(extras.map(e => e.id === 'inside-oven' ? { ...e, price: 0 } : e), packages),
    /extras\[inside-oven\]: price/,
  );

  // Extra referencing unknown package
  assert.throws(
    () => validateExtras(
      extras.map(e => e.id === 'balcony' ? { ...e, appliesTo: ['regular', 'unknown' as never] } : e),
      packages,
    ),
    /extras\[balcony\]: unknown package "unknown"/,
  );

  // Frequency adjustment outside +-30%
  assert.throws(
    () => validateFrequencies(frequencies.map(f => f.id === 'weekly' ? { ...f, adjustmentPercent: -40 } : f)),
    /frequencies\[weekly\]: adjustmentPercent/,
  );

  // Checklist unknown roomId & extraId
  assert.throws(
    () => validateChecklist(
      checklistRooms,
      checklistTasks.map(t => t.id === 'benchtops' ? { ...t, roomId: 'attic' as never } : t),
      packages,
      extras,
    ),
    /checklistTasks\[benchtops\]: unknown roomId "attic"/,
  );
  assert.throws(
    () => validateChecklist(
      checklistRooms,
      checklistTasks.map(t => t.id === 'inside-oven' ? { ...t, extraId: 'no-such-extra' } : t),
      packages,
      extras,
    ),
    /checklistTasks\[inside-oven\]: unknown extraId "no-such-extra"/,
  );

  // Badge label over 24 characters
  assert.throws(
    () => validateBadges(
      trustBadges.map(b => b.id === 'insured' ? { ...b, label: 'Twenty million dollars public liability' } : b),
    ),
    /trustBadges\[insured\]: label .* exceeds 24 characters/,
  );
});

test('derived metadata and LocalBusiness JSON-LD pull from package rates and escape script tags', () => {
  const from = startingRegularPrice();
  assert.equal(from, 129);
  assert.ok(businessMetaDescription().includes(`from $${from} a visit`));

  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'LocalBusiness');
  assert.equal(schema.telephone, business.phoneE164);
  assert.equal(schema.areaServed.length, business.suburbs.length);
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.hasOfferCatalog.itemListElement.length, 3);
  assert.equal(schema.hasOfferCatalog.itemListElement[0].price, from);
  assert.match(schema.priceRange, /^\$\d+–\$\d+$/);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
