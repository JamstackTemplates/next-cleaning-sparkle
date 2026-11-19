import { Wordmark } from './wordmark';

/**
 * Van side panel: white van body with aqua stripe and wordmark, carrying the suburb list
 * as decal lettering, with the evening office-clean note on the van's door.
 */
export function VanSide({
  suburbs,
  eveningNote,
}: {
  suburbs: readonly string[];
  eveningNote: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[12px] border-2 border-ink/80 bg-surface shadow-sm">
      {/* Roof drip rail */}
      <div className="h-2.5 w-full bg-mist border-b border-line" aria-hidden="true" />

      {/* Main van body: left cargo panel (suburbs) + right cab door (evening note) */}
      <div className="grid md:grid-cols-[1fr_19rem]">
        {/* Cargo panel */}
        <div className="relative p-6 sm:p-8 md:border-r-2 md:border-ink/30">
          {/* Top aqua decal stripe */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-4 border-aqua pb-4">
            <Wordmark compact />
            <span className="font-mono text-xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
              {suburbs.length} Inner Melbourne Suburbs
            </span>
          </div>

          {/* Suburbs as clean decal lettering */}
          <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.8rem] font-medium tracking-wide text-ink sm:text-[0.84rem]">
            {suburbs.map((suburb, index) => (
              <li key={suburb} className="inline-flex items-center gap-3">
                <span>{suburb}</span>
                {index < suburbs.length - 1 ? (
                  <span aria-hidden="true" className="text-aqua">·</span>
                ) : null}
              </li>
            ))}
          </ul>

          {/* Recessed van side handle */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-2 w-12 rounded-full bg-chrome" aria-hidden="true" />
            <span className="font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">
              Home cleans Mon–Sat
            </span>
          </div>
        </div>

        {/* Cab door with window and evening office-clean note */}
        <div className="flex flex-col justify-between bg-mist/65 p-6 sm:p-7">
          {/* Cab window silhouette */}
          <div
            className="mb-5 h-20 rounded-tr-[28px] rounded-tl-[6px] rounded-b-[4px] border-2 border-ink/70 bg-surface/85 p-3"
            aria-hidden="true"
          >
            <div className="h-full w-1/2 rounded-sm bg-gradient-to-br from-sea-glass/35 to-transparent" />
          </div>

          <div>
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.15em] text-accent-ink uppercase">
              After-hours office shift
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{eveningNote}</p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-line">
            <div className="h-2 w-10 rounded-full bg-chrome" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              VIC · Inner Metro
            </span>
          </div>
        </div>
      </div>

      {/* Lower aqua sill stripe & wheel arches */}
      <div className="relative h-7 bg-accent" aria-hidden="true">
        <div className="mx-auto flex h-full max-w-4xl items-end justify-between px-10 sm:px-20">
          <div className="h-6 w-20 rounded-t-full border-2 border-b-0 border-ink bg-bg" />
          <div className="h-6 w-20 rounded-t-full border-2 border-b-0 border-ink bg-bg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Open cleaning caddy illustration for /promise/ ("What's in the caddy").
 */
export function CaddyContentsArt({ className = 'w-full max-w-sm' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      role="img"
      aria-label="An open cleaning caddy holding a plant-based spray bottle, vinegar descaler, four colour-coded microfibre cloths, an extendable squeegee and a flat mop head"
      className={className}
    >
      <ellipse cx="180" cy="196" rx="146" ry="14" fill="var(--sea-glass)" fillOpacity="0.3" />
      {/* Extendable squeegee leaning behind */}
      <line x1="274" y1="26" x2="246" y2="174" stroke="var(--chrome)" strokeWidth="5" strokeLinecap="round" />
      <rect x="242" y="18" width="70" height="10" rx="3" transform="rotate(10 242 18)" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />

      {/* Plant-based spray bottle */}
      <g transform="translate(68, 36)">
        <path d="M14 26C14 19 20 16 28 16C36 16 42 19 42 26L46 86H10L14 26Z" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <path d="M18 6H44L50 11H18V6Z" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="23" y="11" width="10" height="5" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.5" />
        <rect x="17" y="40" width="22" height="26" rx="2" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.3" />
        <path d="M23 55C26 51 29 48 33 46" stroke="var(--cloth-green)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Vinegar descaler bottle */}
      <g transform="translate(128, 52)">
        <rect x="6" y="16" width="32" height="56" rx="6" fill="var(--dawn)" fillOpacity="0.5" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="16" y="6" width="12" height="10" rx="2" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="11" y="30" width="22" height="20" rx="2" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.2" />
      </g>

      {/* Four folded colour-coded cloths */}
      <rect x="176" y="62" width="16" height="56" rx="3" fill="var(--cloth-green)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <rect x="193" y="66" width="16" height="52" rx="3" fill="var(--cloth-yellow)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <rect x="210" y="60" width="16" height="58" rx="3" fill="var(--cloth-red)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <rect x="227" y="68" width="16" height="50" rx="3" fill="var(--cloth-blue)" stroke="var(--ink-stroke)" strokeWidth="1.75" />

      {/* Caddy central handle */}
      <path d="M104 114V38C104 28 136 22 174 22C212 22 244 28 244 38V114" stroke="var(--ink-stroke)" strokeWidth="2.4" fill="none" />

      {/* Caddy outer bucket */}
      <path d="M44 110H296L278 188H62L44 110Z" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="48" y1="126" x2="292" y2="126" stroke="var(--aqua)" strokeWidth="4" />
      <rect x="128" y="142" width="84" height="24" rx="3" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.5" />
      <text x="170" y="158" textAnchor="middle" fill="var(--ink-stroke)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.4">
        VAN KIT
      </text>
    </svg>
  );
}

/**
 * 404 "Missed a spot" pane: clean window pane with one round smudge and a squeegee leaning on the sill.
 */
export function MissedSpotPane({ className = 'w-full max-w-xl' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 280"
      fill="none"
      role="img"
      aria-label="A sparkling clean window pane with one small round smudge in the middle and a squeegee leaning on the sill"
      className={className}
    >
      {/* Window frame */}
      <rect x="24" y="16" width="492" height="224" rx="8" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="2" />
      <rect x="40" y="30" width="460" height="196" rx="4" fill="var(--bg)" stroke="var(--ink-stroke)" strokeWidth="1.75" />

      {/* Clean glass shine streaks */}
      <line x1="88" y1="54" x2="176" y2="188" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <line x1="112" y1="54" x2="192" y2="174" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      <line x1="364" y1="52" x2="432" y2="156" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.55" />

      {/* Sparkle stars */}
      <path d="M118 82L121 73L124 82L133 85L124 88L121 97L118 88L109 85L118 82Z" fill="var(--aqua)" />
      <path d="M416 74L418 68L420 74L426 76L420 78L418 84L416 78L410 76L416 74Z" fill="var(--dawn)" />

      {/* The single missed round smudge */}
      <g transform="translate(270, 126)">
        <ellipse cx="0" cy="0" rx="42" ry="30" fill="var(--mist)" stroke="var(--sea-glass)" strokeWidth="1.5" strokeDasharray="4 4" />
        <ellipse cx="-8" cy="-4" rx="22" ry="14" fill="var(--sea-glass)" fillOpacity="0.45" />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fill="var(--accent-ink)"
          fontSize="20"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          404
        </text>
      </g>

      {/* Window sill */}
      <rect x="10" y="236" width="520" height="22" rx="4" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="2" />

      {/* Squeegee leaning on the sill */}
      <g transform="translate(384, 152) rotate(18)">
        <rect x="0" y="0" width="76" height="9" rx="2.5" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="4" y="8" width="68" height="8" rx="2" fill="var(--chrome)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="31" y="16" width="14" height="66" rx="5" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      </g>
    </svg>
  );
}
