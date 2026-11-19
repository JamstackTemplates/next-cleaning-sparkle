import type { BadgeIconId } from '../../content/badges';
import type { ClothColour, RoomIconId } from '../../content/checklist';

export const clothCssVar: Record<ClothColour, string> = {
  green: 'var(--cloth-green)',
  yellow: 'var(--cloth-yellow)',
  red: 'var(--cloth-red)',
  blue: 'var(--cloth-blue)',
};

export const clothLabelText: Record<ClothColour, string> = {
  green: 'Green · Kitchen',
  yellow: 'Yellow · Bathroom',
  red: 'Red · Toilets',
  blue: 'Blue · General',
};

/** Squeegee component: rubber blade, chrome channel, handle & hanging drip. */
export function SqueegeeBlade({ className = '', horizontal = false }: { className?: string; horizontal?: boolean }) {
  if (horizontal) {
    return (
      <svg viewBox="0 0 24 220" fill="none" aria-hidden="true" className={className}>
        <rect x="2" y="8" width="8" height="204" rx="3" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="10" y="14" width="7" height="192" rx="2" fill="var(--chrome)" stroke="var(--ink-stroke)" strokeWidth="1.5" />
        <line x1="13" y1="26" x2="13" y2="194" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <path
          d="M 10 208 C 10 208 15 215 15 218 C 15 220 12.8 221.5 10 221.5 C 7.2 221.5 5 220 5 218 C 5 215 10 208 10 208 Z"
          fill="var(--aqua)"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 72" fill="none" aria-hidden="true" className={className}>
      <rect x="6" y="8" width="108" height="10" rx="3" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <rect x="12" y="16" width="96" height="9" rx="2" fill="var(--chrome)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <line x1="20" y1="20" x2="98" y2="20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <rect x="52" y="25" width="16" height="40" rx="6" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <path d="M56 37H64M56 46H64M56 55H64" stroke="var(--aqua)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M104 25C104 25 109 33 109 37C109 39.8 106.8 42 104 42C101.2 42 99 39.8 99 37C99 33 104 25 104 25Z"
        fill="var(--aqua)"
        stroke="var(--ink-stroke)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Folded microfibre cloth tab in one of the four code colours. */
export function ClothTab({
  colour,
  large = false,
  className = '',
}: {
  colour: ClothColour;
  large?: boolean;
  className?: string;
}) {
  const fill = clothCssVar[colour];
  return (
    <svg
      viewBox="0 0 56 44"
      fill="none"
      aria-hidden="true"
      className={`${large ? 'h-12 w-14' : 'h-6 w-7'} shrink-0 ${className}`}
    >
      {/* Back fold */}
      <rect x="8" y="6" width="42" height="30" rx="5" fill={fill} fillOpacity="0.65" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      {/* Front fold */}
      <rect x="4" y="11" width="42" height="28" rx="5" fill={fill} stroke="var(--ink-stroke)" strokeWidth="1.75" />
      {/* Stitched microfibre edge */}
      <rect x="8" y="15" width="34" height="20" rx="3" fill="none" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Woven care loop */}
      <path d="M46 21H52V28H46" stroke="var(--ink-stroke)" strokeWidth="1.6" strokeLinejoin="round" fill="var(--surface)" />
    </svg>
  );
}

/** Room icon set inside a clean droplet. */
export function RoomIcon({ id, className = 'h-9 w-8' }: { id: RoomIconId; className?: string }) {
  return (
    <svg viewBox="0 0 40 46" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path
        d="M20 3C20 3 5 18 5 28.5C5 36.8 11.7 43 20 43C28.3 43 35 36.8 35 28.5C35 18 20 3 20 3Z"
        fill="var(--surface)"
        stroke="var(--ink-stroke)"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <g stroke="var(--accent-ink)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {id === 'kitchen' && (
          <>
            <path d="M13 28H27V32C27 34.2 25.2 36 23 36H17C14.8 36 13 34.2 13 32V28Z" />
            <path d="M20 28V22C20 20.3 21.3 19 23 19C24.4 19 25.5 20 25.5 21.3" />
          </>
        )}
        {id === 'bathroom' && (
          <>
            <path d="M13 21H22C24.2 21 26 22.8 26 25" />
            <path d="M22 25H29" />
            <path d="M23 29V32M26 29V34M29 29V31" />
          </>
        )}
        {id === 'toilets' && (
          <>
            <rect x="13" y="20" width="6" height="10" rx="1.5" />
            <path d="M19 27H27C27 31.5 24 34.5 20 34.5H17" />
            <path d="M17 34.5L15.5 37H23.5" />
          </>
        )}
        {id === 'living' && (
          <>
            <rect x="12" y="25" width="16" height="8" rx="2" />
            <path d="M14 25V22H26V25" />
            <path d="M14 33V36M26 33V36" />
          </>
        )}
        {id === 'floors' && (
          <>
            <path d="M12 34H28" />
            <path d="M14 34L20 22L26 34" />
            <path d="M18 28H22" />
          </>
        )}
        {id === 'workspace' && (
          <>
            <rect x="12" y="21" width="16" height="10" rx="1.5" />
            <path d="M17 35H23M20 31V35" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Trust badge icon inside woven care labels. */
export function BadgeIcon({ id, className = 'h-5 w-5' }: { id: BadgeIconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-ink)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {id === 'shield' && (
        <>
          <path d="M12 3L5 6V11.5C5 16.2 8 20.1 12 21.5C16 20.1 19 16.2 19 11.5V6L12 3Z" />
          <path d="M9 12L11 14L15.5 9.5" />
        </>
      )}
      {id === 'policy' && (
        <>
          <path d="M6 3H15L19 7V21H6V3Z" />
          <path d="M15 3V7H19" />
          <path d="M9 12H16M9 16H13" />
        </>
      )}
      {id === 'reclean' && (
        <>
          <path d="M20 12A8 8 0 1 1 17.6 6.3" />
          <path d="M20 4V8.5H15.5" />
          <path d="M12 8.5V12L14.5 13.5" />
        </>
      )}
      {id === 'crew' && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M4 19C4 16 6.2 14 9 14C11.8 14 14 16 14 19" />
          <circle cx="16.5" cy="9.5" r="2.2" />
          <path d="M15 14.5C17.5 14.5 19.5 16.2 19.5 19" />
        </>
      )}
      {id === 'leaf' && (
        <>
          <path d="M19 5C12 5 6 9 6 17C14 17 19 13 19 5Z" />
          <path d="M5 19C8 15 11.5 12 15 9.5" />
        </>
      )}
      {id === 'caddy' && (
        <>
          <path d="M4 11H20L18.5 19H5.5L4 11Z" />
          <path d="M8 11V7C8 5.3 9.8 4 12 4C14.2 4 16 5.3 16 7V11" />
          <path d="M12 11V19" />
        </>
      )}
      {id === 'cloths' && (
        <>
          <rect x="4" y="5" width="12" height="10" rx="2" />
          <rect x="8" y="9" width="12" height="10" rx="2" fill="var(--surface)" />
        </>
      )}
      {id === 'padlock' && (
        <>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7.5C8 5.3 9.8 3.5 12 3.5C13.9 3.5 15.4 4.7 15.8 6.5" />
        </>
      )}
    </svg>
  );
}

/** Small crossed-out droplet for "What we don't do". */
export function CrossedDroplet({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path
        d="M14 4C14 4 6.5 12.2 6.5 17.5C6.5 21.8 9.9 25 14 25C18.1 25 21.5 21.8 21.5 17.5C21.5 12.2 14 4 14 4Z"
        fill="var(--mist)"
        stroke="var(--muted)"
        strokeWidth="1.6"
      />
      <line x1="5" y1="23" x2="23" y2="5" stroke="var(--cloth-red)" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

/** 72-hour clock face for the re-clean timeline. */
export function Clock72h({ className = 'h-20 w-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="44" cy="44" r="39" fill="var(--deep-band-surface)" stroke="var(--dawn)" strokeWidth="2.2" />
      <circle cx="44" cy="44" r="32" fill="none" stroke="var(--sea-glass)" strokeWidth="1.2" strokeDasharray="3 4" />
      <path d="M44 12V18M76 44H70M44 76V70M12 44H18" stroke="var(--deep-band-muted)" strokeWidth="1.75" strokeLinecap="round" />
      <text
        x="44"
        y="47"
        textAnchor="middle"
        fill="var(--deep-band-ink)"
        fontSize="20"
        fontFamily="var(--font-display)"
      >
        72h
      </text>
      <text
        x="44"
        y="61"
        textAnchor="middle"
        fill="var(--dawn)"
        fontSize="7.5"
        fontFamily="var(--font-mono)"
        letterSpacing="1.2"
      >
        RE-CLEAN
      </text>
    </svg>
  );
}
