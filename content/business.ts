import type { OpeningHours } from '../lib/hours.ts';
import { startingRegularPrice } from './packages.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction derived from current regular rates. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Formatted Melbourne phone number. */
  phone: string;
  /** E.164 phone number for tel: links and structured data. */
  phoneE164: string;
  /** General service area description (no shopfront). */
  serviceArea: string;
  /** Inner and middle Melbourne suburbs served. */
  suburbs: readonly string[];
  /** Office (phone & email) hours in Australia/Melbourne; same-day intervals only. */
  officeHours: readonly OpeningHours[];
  /** Static, neutral summary of office hours for no-JS / print display. */
  officeHoursSummary: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export function businessMetaDescription(fromPrice = startingRegularPrice()): string {
  return `Regular, end-of-lease and office cleaning across inner Melbourne from $${fromPrice} a visit. Police-checked crews, colour-coded cloths, a room-by-room checklist and a 72-hour re-clean promise.`;
}

const fromPrice = startingRegularPrice();

export const business: Business = {
  name: 'Morning Dew Cleaning',
  tagline: 'Wake up to a cleaner home.',
  introduction: businessMetaDescription(fromPrice),
  email: 'hello@morningdew.example',
  phone: '(03) 5550 3187',
  phoneE164: '+61355503187',
  serviceArea: 'Inner and middle Melbourne',
  suburbs: [
    'Melbourne CBD',
    'Docklands',
    'Southbank',
    'Carlton',
    'Fitzroy',
    'Collingwood',
    'Abbotsford',
    'Richmond',
    'Cremorne',
    'South Yarra',
    'Prahran',
    'Windsor',
    'St Kilda',
    'Port Melbourne',
    'South Melbourne',
    'Albert Park',
    'Brunswick',
    'Northcote',
    'Thornbury',
    'Footscray',
    'Yarraville',
    'Hawthorn',
    'Kew',
    'Camberwell',
  ],
  officeHours: [
    { day: 'Monday', opens: '07:30', closes: '17:30' },
    { day: 'Tuesday', opens: '07:30', closes: '17:30' },
    { day: 'Wednesday', opens: '07:30', closes: '17:30' },
    { day: 'Thursday', opens: '07:30', closes: '17:30' },
    { day: 'Friday', opens: '07:30', closes: '17:30' },
    { day: 'Saturday', opens: '08:00', closes: '13:00' },
    { day: 'Sunday' },
  ],
  officeHoursSummary: 'Office hours: Mon–Fri 07:30–17:30, Sat 08:00–13:00, Sun closed (Melbourne time)',
  enquiries: {
    title: 'Request a cleaning quote',
    introduction: 'Send us the details of your home or office for a written quote. A clean is booked only when we confirm a date by reply.',
    usefulToInclude: [
      'Which package you need (Regular, End-of-lease or Office)',
      'Your suburb and home size (bedrooms and bathrooms) or office size and preferred hours',
      'Preferred day and frequency (or your key handover / inspection date for end-of-lease)',
      'Any add-ons you want included, plus access, parking and pet notes',
    ],
  },
};
