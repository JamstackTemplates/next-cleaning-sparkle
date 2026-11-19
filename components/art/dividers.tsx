/**
 * "Wipe edge" divider: curved squeegee track with a hanging drip and beads gathered at its edge.
 */
export function WipeEdgeDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 44" fill="none" className="block h-8 w-full sm:h-11" preserveAspectRatio="none">
        <path
          d="M0 24 C 240 6, 480 34, 760 18 C 940 8, 1080 20, 1200 14"
          stroke="var(--aqua)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M0 28 C 240 10, 480 38, 760 22 C 940 12, 1080 24, 1200 18"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Gathered droplets along the edge */}
        {[180, 390, 610, 860, 1040].map((x, idx) => (
          <circle
            key={x}
            cx={x}
            cy={idx % 2 === 0 ? 19 : 25}
            r={idx % 2 === 0 ? 3.5 : 2.5}
            fill="var(--surface)"
            stroke="var(--aqua)"
            strokeWidth="1.4"
          />
        ))}
        {/* Hanging drip near the right */}
        <path
          d="M 960 16 C 960 16 967 27 967 33 C 967 37 963.9 40 960 40 C 956.1 40 953 37 953 33 C 953 27 960 16 960 16 Z"
          fill="var(--aqua)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/**
 * "Towel stack" divider: edges of folded towels in aqua, dawn and ink stripes.
 */
export function TowelStackDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 26" fill="none" className="block h-5 w-full">
        <rect x="0" y="2" width="1200" height="7" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="0" y="10" width="1200" height="6" rx="3" fill="var(--mist)" stroke="var(--line)" strokeWidth="1" />
        <rect x="0" y="17" width="1200" height="7" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="80" y="4" width="180" height="3" rx="1" fill="var(--aqua)" />
        <rect x="460" y="11.5" width="220" height="3" rx="1" fill="var(--dawn)" />
        <rect x="880" y="19" width="190" height="3" rx="1" fill="var(--accent)" />
      </svg>
    </div>
  );
}

/**
 * "Droplet trail": dotted run of beads guiding the "How a clean runs" steps.
 */
export function DropletTrail({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M 20 28 Q 225 6, 450 22 T 880 14"
        stroke="var(--sea-glass)"
        strokeWidth="2"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      {[110, 310, 560, 770].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={i % 2 === 0 ? 18 : 22}
          r={i % 2 === 0 ? 4.5 : 3.5}
          fill="var(--mist)"
          stroke="var(--aqua)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
