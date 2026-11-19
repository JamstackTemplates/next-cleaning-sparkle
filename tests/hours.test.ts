import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('Morning Dew Melbourne office hours boundaries and Australia/Melbourne DST transitions', () => {
  const mel = (isoUtc: string) => openingLabel(business.officeHours, 'Australia/Melbourne', new Date(isoUtc));

  // Weekday in AEST (UTC+10): Wednesday 2026-07-15
  // 07:29 AEST = 2026-07-14T21:29:00Z, 07:30 AEST = 2026-07-14T21:30:00Z
  // 17:29 AEST = 2026-07-15T07:29:00Z, 17:30 AEST = 2026-07-15T07:30:00Z
  assert.equal(mel('2026-07-14T21:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(mel('2026-07-14T21:30:00Z'), 'Open now · until 17:30');
  assert.equal(mel('2026-07-15T07:29:00Z'), 'Open now · until 17:30');
  assert.equal(mel('2026-07-15T07:30:00Z'), 'Closed · opens Thursday at 07:30');

  // Saturday 2026-07-18 in AEST (08:00–13:00): 12:59 open, 13:00 closed -> Monday 07:30
  assert.equal(mel('2026-07-18T02:59:00Z'), 'Open now · until 13:00');
  assert.equal(mel('2026-07-18T03:00:00Z'), 'Closed · opens Monday at 07:30');

  // Sunday 2026-07-19 closed all day -> Monday 07:30
  assert.equal(mel('2026-07-19T00:00:00Z'), 'Closed · opens Monday at 07:30');

  // DST spring-forward: first Sunday of October 2026 (2026-10-04, AEST UTC+10 -> AEDT UTC+11)
  // Saturday 2026-10-03 08:00 AEST = 2026-10-02T22:00:00Z
  assert.equal(mel('2026-10-02T21:59:00Z'), 'Closed · opens today at 08:00');
  assert.equal(mel('2026-10-02T22:00:00Z'), 'Open now · until 13:00');
  // Monday 2026-10-05 07:30 AEDT = 2026-10-04T20:30:00Z
  assert.equal(mel('2026-10-04T20:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(mel('2026-10-04T20:30:00Z'), 'Open now · until 17:30');

  // DST fall-back: first Sunday of April 2026 (2026-04-05, AEDT UTC+11 -> AEST UTC+10)
  // Saturday 2026-04-04 08:00 AEDT = 2026-04-03T21:00:00Z
  assert.equal(mel('2026-04-03T20:59:00Z'), 'Closed · opens today at 08:00');
  assert.equal(mel('2026-04-03T21:00:00Z'), 'Open now · until 13:00');
  // Monday 2026-04-06 07:30 AEST = 2026-04-05T21:30:00Z
  assert.equal(mel('2026-04-05T21:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(mel('2026-04-05T21:30:00Z'), 'Open now · until 17:30');
});
