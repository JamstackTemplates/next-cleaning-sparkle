/**
 * Decorative cleaning props drawn in the same ink-outline style as the Dawn window:
 * bucket of suds, scouring sponge, lemon wheel, whole lemon, rubber glove and soap bubbles.
 * Every prop is aria-hidden and uses theme tokens so it follows light/dark mode.
 */

type PropArtProps = { className?: string };

const INK = 'var(--ink-stroke)';
const LEMON = 'var(--cloth-yellow)';
/** Pale pith/juice tone kept light in both themes so slices read as fresh fruit. */
const PITH = '#FFF6D2';

/** Mop bucket brimming with suds, wringer lip and wire handle. */
export function SudsBucket({ className = '' }: PropArtProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      {/* Wire handle */}
      <path d="M24 46C24 14 96 14 96 46" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <rect x="54" y="18" width="12" height="6" rx="3" fill="var(--chrome)" stroke={INK} strokeWidth="1.5" />
      {/* Body */}
      <path d="M18 50H102L94 110C93.6 113 91.4 114 88.5 114H31.5C28.6 114 26.4 113 26 110L18 50Z" fill="var(--aqua)" stroke={INK} strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M24 64H96" stroke={INK} strokeWidth="1.5" />
      <path d="M27 96H93" stroke={INK} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Body sheen */}
      <path d="M30 70L35 104" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      {/* Rim */}
      <rect x="14" y="44" width="92" height="9" rx="4.5" fill="var(--sea-glass)" stroke={INK} strokeWidth="1.75" />
      {/* Suds mound */}
      <path
        d="M20 46C16 38 24 30 32 34C32 24 46 22 50 30C54 20 70 20 72 30C78 22 92 26 90 36C98 34 104 42 100 46Z"
        fill="var(--surface)"
        stroke={INK}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="38" r="3" stroke="var(--aqua)" strokeWidth="1.3" />
      <circle cx="62" cy="34" r="2.2" stroke="var(--aqua)" strokeWidth="1.3" />
      <circle cx="80" cy="39" r="2.6" stroke="var(--aqua)" strokeWidth="1.3" />
      {/* Escaping bubbles */}
      <circle cx="98" cy="18" r="6" fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.4" />
      <circle cx="96" cy="16" r="1.6" fill="#FFFFFF" />
      <circle cx="110" cy="30" r="3.5" fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.3" />
    </svg>
  );
}

/** Yellow cellulose sponge with green scour pad and a couple of bubbles. */
export function ScourSponge({ className = '' }: PropArtProps) {
  return (
    <svg viewBox="0 0 120 84" fill="none" aria-hidden="true" className={className}>
      {/* Scour pad */}
      <path d="M12 52C12 47 15 44 20 44H100C105 44 108 47 108 52V60H12V52Z" fill="var(--cloth-green)" stroke={INK} strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M20 50L28 56M36 50L44 56M52 50L60 56M68 50L76 56M84 50L92 56" stroke={INK} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
      {/* Sponge body */}
      <path d="M12 58H108V70C108 75 105 78 100 78H20C15 78 12 75 12 70V58Z" fill={LEMON} stroke={INK} strokeWidth="1.75" strokeLinejoin="round" />
      {/* Pores */}
      {[
        [24, 66, 2.2], [36, 71, 1.6], [46, 64, 1.8], [58, 70, 2.4], [70, 65, 1.5], [82, 71, 2], [94, 65, 1.8], [100, 72, 1.3],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={INK} fillOpacity="0.28" />
      ))}
      {/* Bubbles on top */}
      <circle cx="34" cy="32" r="9" fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.5" />
      <circle cx="31" cy="29" r="2.2" fill="#FFFFFF" />
      <circle cx="52" cy="22" r="5.5" fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.4" />
      <circle cx="74" cy="34" r="6.5" fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.4" />
      <circle cx="72" cy="32" r="1.6" fill="#FFFFFF" />
      <circle cx="62" cy="8" r="3" stroke="var(--aqua)" strokeWidth="1.3" />
    </svg>
  );
}

/** Fresh lemon wheel with segments and pith. */
export function LemonWheel({ className = '' }: PropArtProps) {
  const segments = Array.from({ length: 8 }, (_, i) => (i * Math.PI * 2) / 8);
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="28" fill={LEMON} stroke={INK} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="23" fill={PITH} />
      <circle cx="32" cy="32" r="21" fill={LEMON} fillOpacity="0.55" />
      {segments.map(angle => (
        <line
          key={angle}
          x1="32"
          y1="32"
          x2={(32 + Math.cos(angle) * 21).toFixed(2)}
          y2={(32 + Math.sin(angle) * 21).toFixed(2)}
          stroke={PITH}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ))}
      <circle cx="32" cy="32" r="3" fill={PITH} />
      <path d="M14 22C17 16 22 12 28 11" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Whole lemon with a leaf — the fresh-scent cue. */
export function WholeLemon({ className = '' }: PropArtProps) {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 34C8 24 18 14 36 14C54 14 66 22 70 32C72 36 74 37 76 38C74 40 72 40 70 42C66 50 54 56 38 56C20 56 8 46 8 34Z"
        fill={LEMON}
        stroke={INK}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 34C6 33 4 33 3 34C4 36 6 36 8 35" fill={LEMON} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M22 26C27 21 34 20 40 20" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2.2" strokeLinecap="round" />
      {[[30, 38], [44, 44], [52, 30], [24, 46], [58, 42]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill={INK} fillOpacity="0.35" />
      ))}
      {/* Leaf */}
      <path d="M36 15C34 8 38 3 48 2C48 10 44 15 36 15Z" fill="var(--cloth-green)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M37 14L45 5" stroke={INK} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/** Rubber cleaning glove, cuff rolled. */
export function RubberGlove({ className = '' }: PropArtProps) {
  return (
    <svg viewBox="0 0 64 96" fill="none" aria-hidden="true" className={className}>
      <path
        d="M18 58V26C18 22.7 20.7 21 23 21C25.3 21 27 22.7 27 26V44V14C27 10.7 29.2 9 31.5 9C33.8 9 36 10.7 36 14V42V16C36 12.7 38.2 11 40.5 11C42.8 11 45 12.7 45 16V44V24C45 21 47 19.5 49 19.5C51 19.5 53 21 53 24V60C53 66 50 70 47 72V80H21V72C17 68 10 60 7 52C5.5 48 7 45 10 45C12.5 45 14.5 47 16 50L18 58Z"
        fill="var(--dawn)"
        stroke={INK}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <rect x="17" y="78" width="34" height="14" rx="3" fill="var(--dawn)" stroke={INK} strokeWidth="1.75" />
      <path d="M17 84H51" stroke={INK} strokeOpacity="0.4" strokeWidth="1.2" />
      <path d="M23 30V50M32 18V40" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Loose cluster of soap bubbles with highlights. */
export function BubbleCluster({ className = '' }: PropArtProps) {
  const bubbles: [number, number, number][] = [
    [20, 54, 14], [46, 30, 9], [52, 60, 6], [30, 18, 5], [66, 40, 4], [10, 26, 3.5],
  ];
  return (
    <svg viewBox="0 0 76 76" fill="none" aria-hidden="true" className={className}>
      {bubbles.map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r} fill="var(--glass-glint)" stroke="var(--aqua)" strokeWidth="1.4" />
          {r > 5 ? (
            <path
              d={`M${cx - r * 0.55} ${cy - r * 0.1}A${r * 0.6} ${r * 0.6} 0 0 1 ${cx - r * 0.05} ${cy - r * 0.6}`}
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
