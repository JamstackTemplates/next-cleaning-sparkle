import type { PackageId } from '../../content/packages';

/**
 * Bespoke vignette per package:
 * - regular: cleaning caddy with spray bottle and four colour-coded cloths
 * - end-of-lease: key on a ring tag resting on a gleaming empty floor beside a taped moving carton
 * - office: desk with a monitor, wheeled bin and coffee cup under a pendant light
 */
export function PackageVignette({
  packageId,
  className = 'h-28 w-36',
}: {
  packageId: PackageId;
  className?: string;
}) {
  if (packageId === 'regular') {
    return (
      <svg viewBox="0 0 160 124" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
        {/* Ground reflection */}
        <ellipse cx="80" cy="108" rx="58" ry="7" fill="var(--sea-glass)" fillOpacity="0.35" />
        {/* Spray bottle inside caddy */}
        <path d="M44 50C44 45 48 42 54 42C60 42 64 45 64 50L66 84H42L44 50Z" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <path d="M48 34H66L70 38H48V34Z" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="51" y="38" width="6" height="4" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        {/* Four colour-coded folded cloths tucked in */}
        <rect x="74" y="44" width="12" height="36" rx="3" fill="var(--cloth-green)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="86" y="47" width="12" height="33" rx="3" fill="var(--cloth-yellow)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="98" y="45" width="12" height="35" rx="3" fill="var(--cloth-red)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="110" y="49" width="11" height="31" rx="3" fill="var(--cloth-blue)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        {/* Caddy handle */}
        <path d="M52 68V30C52 24 64 20 80 20C96 20 108 24 108 30V68" stroke="var(--ink-stroke)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Caddy body */}
        <path d="M26 66H134L126 104H34L26 66Z" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.75" strokeLinejoin="round" />
        <rect x="58" y="78" width="44" height="14" rx="2" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <line x1="65" y1="85" x2="95" y2="85" stroke="var(--aqua)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (packageId === 'end-of-lease') {
    return (
      <svg viewBox="0 0 160 124" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
        {/* Gleaming empty floor */}
        <path d="M12 96H148" stroke="var(--ink-stroke)" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M26 105H128" stroke="var(--aqua)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        {/* Floorboard sheen sparkles */}
        <path d="M36 86L38 80L40 86L46 88L40 90L38 96L36 90L30 88L36 86Z" fill="var(--dawn)" stroke="var(--ink-stroke)" strokeWidth="1.2" />
        {/* Taped moving carton */}
        <rect x="80" y="34" width="58" height="62" rx="3" fill="var(--dawn)" fillOpacity="0.45" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="103" y="34" width="12" height="22" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <line x1="80" y1="49" x2="138" y2="49" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <rect x="88" y="64" width="22" height="14" rx="2" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.2" />
        {/* Key on a ring tag resting on the floor */}
        <circle cx="46" cy="70" r="10" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <circle cx="46" cy="70" r="4" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <path d="M55 74L72 86M64 80L61 84M69 83L66 87" stroke="var(--ink-stroke)" strokeWidth="2" strokeLinecap="round" />
        {/* Key tag */}
        <rect x="20" y="50" width="24" height="14" rx="3" transform="rotate(-14 20 50)" fill="var(--aqua)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
      </svg>
    );
  }

  // Office vignette: desk with monitor, wheeled bin and coffee cup under pendant light
  return (
    <svg viewBox="0 0 160 124" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      {/* Pendant light */}
      <line x1="80" y1="4" x2="80" y2="20" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <path d="M64 32C64 23 71 18 80 18C89 18 96 23 96 32H64Z" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <path d="M72 32H88" stroke="var(--dawn)" strokeWidth="3" strokeLinecap="round" />
      {/* Desk top & legs */}
      <rect x="20" y="74" width="120" height="8" rx="2" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <line x1="28" y1="82" x2="28" y2="112" stroke="var(--ink-stroke)" strokeWidth="2" strokeLinecap="round" />
      <line x1="132" y1="82" x2="132" y2="112" stroke="var(--ink-stroke)" strokeWidth="2" strokeLinecap="round" />
      {/* Monitor */}
      <rect x="48" y="42" width="44" height="26" rx="3" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <line x1="56" y1="50" x2="72" y2="62" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 68H76M70 68V74" stroke="var(--ink-stroke)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Coffee cup */}
      <rect x="106" y="60" width="14" height="14" rx="2" fill="var(--dawn)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
      <path d="M120 63C124 63 124 70 120 70" stroke="var(--ink-stroke)" strokeWidth="1.6" />
      {/* Wheeled office bin under desk */}
      <path d="M40 86H64L61 108H43L40 86Z" fill="var(--sea-glass)" stroke="var(--ink-stroke)" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="46" cy="111" r="2.5" fill="var(--ink-stroke)" />
      <circle cx="58" cy="111" r="2.5" fill="var(--ink-stroke)" />
    </svg>
  );
}

/** Small header motif per inner page (towel, cloth-tabs, care-label, spray-bottle). */
export function PageHeadMotif({
  motif,
}: {
  motif: 'towel' | 'cloths' | 'care-label' | 'spray-bottle';
}) {
  if (motif === 'towel') {
    return (
      <svg viewBox="0 0 88 52" fill="none" aria-hidden="true" className="h-12 w-20 shrink-0">
        <line x1="4" y1="10" x2="84" y2="10" stroke="var(--chrome)" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="16" y="10" width="56" height="36" rx="4" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="17" y="32" width="54" height="6" fill="var(--aqua)" />
        <line x1="22" y1="18" x2="66" y2="18" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }
  if (motif === 'cloths') {
    return (
      <svg viewBox="0 0 96 52" fill="none" aria-hidden="true" className="h-12 w-22 shrink-0">
        <rect x="6" y="10" width="22" height="32" rx="4" fill="var(--cloth-green)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="26" y="14" width="22" height="32" rx="4" fill="var(--cloth-yellow)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="46" y="8" width="22" height="32" rx="4" fill="var(--cloth-red)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="66" y="12" width="22" height="32" rx="4" fill="var(--cloth-blue)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
      </svg>
    );
  }
  if (motif === 'care-label') {
    return (
      <svg viewBox="0 0 88 52" fill="none" aria-hidden="true" className="h-12 w-20 shrink-0">
        <path d="M36 10C36 5 52 5 52 10" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="12" y="10" width="64" height="36" rx="3" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="17" y="15" width="54" height="26" rx="1.5" stroke="var(--sea-glass)" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M38 28L42 32L51 23" stroke="var(--accent-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 68" fill="none" aria-hidden="true" className="h-14 w-14 shrink-0">
      <path d="M18 26C18 20 24 18 32 18C40 18 46 20 46 26L50 62H14L18 26Z" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" strokeLinejoin="round" />
      <rect x="20" y="34" width="24" height="18" rx="2" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.3" />
      <line x1="24" y1="41" x2="40" y2="41" stroke="var(--aqua)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="24" y1="47" x2="36" y2="47" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 8H46L52 13H22V8Z" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="27" y="13" width="10" height="5" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.5" />
      <path d="M44 13L48 22" stroke="var(--ink-stroke)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
