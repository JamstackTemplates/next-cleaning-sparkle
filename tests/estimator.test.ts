import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateEstimate, selectableExtrasForPackage } from '../lib/estimator.ts';

test('estimator matches hand-calculated Regular, End-of-lease and Office totals', () => {
  // Regular three-bed ($199) fortnightly (-10%) = 179.1 -> $179
  const regular = calculateEstimate({
    packageId: 'regular',
    sizeId: 'three-bed',
    frequencyId: 'fortnightly',
  });
  assert.equal(regular.total, 179);

  // End-of-lease two-bed ($429) + extra bathroom ($25) = $454
  const eol = calculateEstimate({
    packageId: 'end-of-lease',
    sizeId: 'two-bed',
    extraQuantities: { 'extra-bathroom': 1 },
  });
  assert.equal(eol.total, 454);

  // Office evenings ($74/cleaner-hr), 2 cleaners x 3 hours = $444
  const office = calculateEstimate({
    packageId: 'office',
    hourlyRateId: 'evenings',
    cleaners: 2,
    hours: 3,
  });
  assert.equal(office.total, 444);
});

test('unavailable extras cannot be chosen in the estimator', () => {
  const regularSelectable = selectableExtrasForPackage('regular');
  const eolSelectable = selectableExtrasForPackage('end-of-lease');
  assert.ok(!regularSelectable.some(e => e.id === 'carpet-steam'));
  assert.ok(!eolSelectable.some(e => e.id === 'carpet-steam'));

  assert.throws(
    () => calculateEstimate({
      packageId: 'end-of-lease',
      sizeId: 'two-bed',
      extraQuantities: { 'carpet-steam': 2 },
    }),
    /carpet-steam.*paused/,
  );
});

test('office estimator enforces minimum hours per shift', () => {
  // Saturday shift has 3-hour minimum at $79/hr
  const sat = calculateEstimate({
    packageId: 'office',
    hourlyRateId: 'saturday',
    cleaners: 1,
    hours: 1,
  });
  assert.equal(sat.total, 79 * 3);
});
