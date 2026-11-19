'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; browser refreshes in the configured Melbourne time zone every minute. */
export function OpenBadge({
  hours,
  onDeep = false,
}: {
  hours: readonly OpeningHours[];
  onDeep?: boolean;
}) {
  const [label, setLabel] = useState('See office hours');

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-ui border px-3 py-1 font-mono text-xs font-medium tracking-wide ${
        onDeep
          ? 'border-deep-band-muted/40 bg-deep-band-surface text-deep-band-ink'
          : 'border-line bg-surface text-ink'
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-cloth-green' : onDeep ? 'bg-dawn' : 'bg-aqua'
        }`}
      />
      <span>{label}</span>
    </span>
  );
}
