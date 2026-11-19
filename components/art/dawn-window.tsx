/**
 * Hero "Sparkling Dawn Window" illustration:
 * Immediately recognizable as a sparkling-clean home & office cleaning scene:
 * - Wide gleaming sash window being freshly wiped by a gloved hand & squeegee with soap suds
 *   and a hanging water drip at the blade edge.
 * - Crisp 4-point sparkle stars and translucent soap bubbles floating across the clean glass.
 * - Foreground cleaning kit on the sill: trigger spray bottle misting fine droplets, soapy
 *   bucket/caddy overflowing with white suds & four colour-coded microfibre cloths, and a
 *   folded aqua-striped towel.
 * - Through the freshly cleared diagonal stripe, Melbourne's Flinders Street Station dome and
 *   clock row gleam against a dawn sunrise (swapping to pre-dawn city glints in dark mode).
 */
export function DawnWindow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 660 540"
      fill="none"
      role="img"
      aria-label="A gloved hand wiping a sash window sparkling clean with a squeegee, surrounded by soap bubbles and 4-point sparkles, with a spray bottle, soapy cleaning caddy with four colour-coded cloths, and a folded aqua-striped towel on the sill"
      className={className}
    >
      <defs>
        {/* Sunrise sky gradient (light mode) */}
        <linearGradient id="dawn-sky-light" x1="330" y1="44" x2="330" y2="395" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C9EFEA" />
          <stop offset="46%" stopColor="#F5FCFB" />
          <stop offset="78%" stopColor="#FDE4D0" />
          <stop offset="100%" stopColor="#F4B285" />
        </linearGradient>

        {/* Pre-dawn sky gradient (dark mode) */}
        <linearGradient id="dawn-sky-dark" x1="330" y1="44" x2="330" y2="395" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#041216" />
          <stop offset="62%" stopColor="#0A282E" />
          <stop offset="90%" stopColor="#134247" />
          <stop offset="100%" stopColor="#523A2B" />
        </linearGradient>

        {/* Bubble sheen gradient */}
        <radialGradient id="bubble-fill" cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#A6DED6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2BB3A8" stopOpacity="0.42" />
        </radialGradient>

        {/* Diagonal wiped clear stripe clip path */}
        <clipPath id="wiped-glass-clip">
          <polygon points="86,44 398,44 568,348 568,408 232,408 86,162" />
        </clipPath>

        {/* Window glass inner bounds */}
        <clipPath id="window-inner-clip">
          <rect x="86" y="44" width="482" height="364" rx="4" />
        </clipPath>
      </defs>

      {/* Ambient floating soap bubbles behind/around the window frame */}
      <g opacity="0.9">
        {[
          [32, 118, 16], [52, 74, 9], [28, 174, 7],
          [616, 86, 18], [634, 138, 10], [608, 224, 12],
          [54, 336, 13], [24, 376, 8],
        ].map(([cx, cy, r], i) => (
          <g key={`outer-b-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill="url(#bubble-fill)" stroke="var(--aqua)" strokeWidth="1.25" />
            <path
              d={`M ${cx - r * 0.45} ${cy - r * 0.15} A ${r * 0.55} ${r * 0.55} 0 0 1 ${cx + r * 0.12} ${cy - r * 0.5}`}
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* Outer timber sash frame */}
      <rect
        x="62"
        y="20"
        width="530"
        height="412"
        rx="10"
        fill="var(--surface)"
        stroke="var(--ink-stroke)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="76"
        y="34"
        width="502"
        height="384"
        rx="5"
        fill="var(--mist)"
        stroke="var(--ink-stroke)"
        strokeWidth="1.75"
      />

      {/* Base misted glass pane (soapy fogged glass before squeegee) */}
      <g clipPath="url(#window-inner-clip)">
        <rect x="86" y="44" width="482" height="364" fill="var(--mist)" />

        {/* Subtle soapy swirl & condensation beads on the unwiped glass */}
        <path
          d="M448 64 C478 82, 514 78, 548 106 M464 128 C496 144, 526 142, 558 172"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.35"
        />
        {[
          [442, 78, 5.5], [488, 108, 4], [526, 74, 4.5], [468, 146, 3.5], [524, 166, 5.2],
          [492, 212, 4], [538, 232, 4.5], [114, 242, 5], [146, 278, 3.8], [112, 322, 5.5],
          [164, 348, 4], [130, 384, 4.4], [198, 382, 3.6], [428, 96, 3.2], [506, 146, 3],
        ].map(([cx, cy, r], i) => (
          <g key={`drop-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill="var(--surface)" fillOpacity="0.58" stroke="var(--aqua)" strokeOpacity="0.55" strokeWidth="1.1" />
            <path
              d={`M ${cx - r * 0.45} ${cy - r * 0.15} A ${r * 0.55} ${r * 0.55} 0 0 1 ${cx + r * 0.1} ${cy - r * 0.5}`}
              stroke="#FFFFFF"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* === WIPED SPARKLING CLEAR DIAGONAL STRIPE === */}
        <g clipPath="url(#wiped-glass-clip)" className="animate-hero-wipe">
          {/* Sky: sunrise in light mode, pre-dawn in dark mode */}
          <rect x="86" y="44" width="482" height="364" fill="url(#dawn-sky-light)" className="svg-light-only" />
          <rect x="86" y="44" width="482" height="364" fill="url(#dawn-sky-dark)" className="svg-dark-only" />

          {/* Rising sun glow (light mode) */}
          <g className="svg-light-only">
            <circle cx="238" cy="240" r="56" fill="#F4B285" opacity="0.34" />
            <circle cx="238" cy="240" r="32" fill="#F4B285" opacity="0.58" />
          </g>

          {/* Pre-dawn stars & city glints (dark mode) */}
          <g className="svg-dark-only">
            <circle cx="176" cy="96" r="2.2" fill="#E4F6F3" opacity="0.85" />
            <circle cx="242" cy="82" r="1.8" fill="#4FD6C8" opacity="0.95" />
            <circle cx="316" cy="108" r="2.2" fill="#E39A6B" opacity="0.9" />
            <path d="M130 296H510" stroke="#E39A6B" strokeWidth="2" opacity="0.65" />
          </g>

          {/* Distant Melbourne skyline */}
          <path
            d="M86 308H148V218H180V308H202V242H232V308H396V204H428V308H460V248H494V308H568V408H86V308Z"
            fill="var(--sea-glass)"
            fillOpacity="0.42"
          />

          {/* Flinders Street Station through the clean glass (softer background landmark) */}
          <g stroke="var(--ink-stroke)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.88">
            <path d="M256 276C256 238 283 218 316 218C349 218 376 238 376 276H256Z" fill="var(--aqua)" />
            <rect x="308" y="204" width="16" height="14" rx="2" fill="var(--surface)" />
            <path d="M316 192V204" strokeLinecap="round" />
            <rect x="428" y="224" width="40" height="86" fill="var(--surface)" />
            <path d="M424 224L448 204L472 224H424Z" fill="var(--aqua)" />
            <circle cx="448" cy="248" r="10" fill="var(--bg)" />
            <rect x="140" y="276" width="376" height="86" fill="var(--surface)" />
            <rect x="140" y="276" width="376" height="13" fill="var(--dawn)" />
            <path d="M276 362V322C276 300 294 290 316 290C338 290 356 300 356 322V362H276Z" fill="var(--mist)" />
            {[292, 304, 316, 328, 340].map((cx) => (
              <circle key={cx} cx={cx} cy="326" r="4.8" fill="var(--surface)" strokeWidth="1.2" />
            ))}
            {[160, 190, 220, 250, 382, 412].map((x) => (
              <path
                key={x}
                d={`M ${x} 334V308C${x} 302 ${x + 5} 298 ${x + 10} 298C${x + 15} 298 ${x + 20} 302 ${x + 20} 308V334H${x}Z`}
                fill="var(--dawn)"
                fillOpacity="0.42"
                strokeWidth="1.3"
              />
            ))}
            <rect x="86" y="362" width="482" height="46" fill="var(--accent)" fillOpacity="0.16" stroke="none" />
          </g>

          {/* Bright diagonal glass-shine gleam streaks */}
          <line x1="150" y1="64" x2="314" y2="342" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.48" />
          <line x1="184" y1="64" x2="338" y2="324" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.72" />
          <line x1="336" y1="64" x2="452" y2="260" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Crisp wiped edge specular borders + gathered soap suds along the squeegee track */}
        <line x1="86" y1="162" x2="232" y2="408" stroke="#FFFFFF" strokeWidth="3" opacity="0.95" />
        <line x1="398" y1="44" x2="568" y2="348" stroke="#FFFFFF" strokeWidth="3" opacity="0.95" />
        {[
          [112, 206, 4], [146, 264, 3.2], [184, 328, 4.2], [216, 382, 3.5],
          [420, 84, 3.8], [456, 148, 4.4], [492, 212, 3.6], [528, 276, 4.2],
        ].map(([bx, by, r], i) => (
          <circle key={`edge-${i}`} cx={bx} cy={by} r={r} fill="#FFFFFF" fillOpacity="0.85" stroke="var(--aqua)" strokeWidth="1.2" />
        ))}
      </g>

      {/* Window sash mullion bar */}
      <rect x="76" y="218" width="502" height="13" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
      <rect x="314" y="214" width="26" height="10" rx="3" fill="var(--dawn)" stroke="var(--ink-stroke)" strokeWidth="1.5" />

      {/* === LARGE 4-POINT SPARKLE STARS ON THE CLEAN GLASS === */}
      <g className="sparkle-twinkle">
        {/* Hero large aqua sparkle top-left of clean stripe */}
        <path
          d="M174 86L180 108L202 114L180 120L174 142L168 120L146 114L168 108L174 86Z"
          fill="#FFFFFF"
          stroke="var(--aqua)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Secondary dawn-apricot sparkle */}
        <path
          d="M222 72L225.5 83.5L237 87L225.5 90.5L222 102L218.5 90.5L207 87L218.5 83.5L222 72Z"
          fill="var(--dawn)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Gleam sparkle near center-right clean glass */}
        <path
          d="M376 118L381 135L398 140L381 145L376 162L371 145L354 140L371 135L376 118Z"
          fill="#FFFFFF"
          stroke="var(--aqua)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Small sparkle near sill */}
        <path
          d="M270 342L273.5 352.5L284 356L273.5 359.5L270 370L266.5 359.5L256 356L266.5 352.5L270 342Z"
          fill="#FFFFFF"
          stroke="var(--aqua)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Outer frame sparkle top-right */}
        <path
          d="M582 28L587 44L603 49L587 54L582 70L577 54L561 49L577 44L582 28Z"
          fill="var(--aqua)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </g>

      {/* === GLOVED HAND & WIDE SQUEEGEE WITH SOAP SUDS === */}
      <g transform="translate(362, 266) rotate(-28)">
        {/* Soapy foam ridge pushed along the top edge of the squeegee blade */}
        <path
          d="M-6 2 C2 -8, 16 -9, 26 -2 C36 -10, 52 -10, 62 -2 C74 -9, 90 -9, 102 -2 C114 -8, 130 -6, 136 2 Z"
          fill="#FFFFFF"
          stroke="var(--aqua)"
          strokeWidth="1.4"
        />
        {/* Wide rubber blade */}
        <rect x="-14" y="0" width="158" height="11" rx="3" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.85" />
        {/* Chrome channel */}
        <rect x="-8" y="9" width="146" height="10" rx="2" fill="var(--chrome)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <line x1="6" y1="13.5" x2="124" y2="13.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" opacity="0.85" />
        {/* Hanging aqua drip off blade tip */}
        <path
          d="M 134 19 C 134 19 141 30 141 36 C 141 40 137.9 43 134 43 C 130.1 43 127 40 127 36 C 127 30 134 19 134 19 Z"
          fill="var(--aqua)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="132" cy="34" r="1.8" fill="#FFFFFF" />
        {/* Handle */}
        <rect x="54" y="19" width="24" height="68" rx="8" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        {/* Bright aqua cleaning glove gripping handle */}
        <path
          d="M 46 38 C 46 30 55 26 66 26 C 77 26 86 31 86 40 L 89 82 C 89 93 80 100 66 100 C 52 100 44 92 44 82 Z"
          fill="var(--aqua)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        {/* Glove cuff & finger lines */}
        <path d="M 51 46 H 81 M 51 58 H 81 M 52 70 H 80" stroke="var(--ink-stroke)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 46 82 H 88" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Deep wooden window sill */}
      <rect
        x="34"
        y="424"
        width="586"
        height="26"
        rx="6"
        fill="var(--surface)"
        stroke="var(--ink-stroke)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="48" y1="433" x2="606" y2="433" stroke="var(--line)" strokeWidth="1.5" />

      {/* === FOREGROUND CLEANING KIT ON THE SILL === */}

      {/* 1. Trigger spray bottle on the left actively spritzing clean mist */}
      <g transform="translate(70, 306)">
        {/* Spray mist fan coming out of nozzle */}
        <g stroke="var(--aqua)" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
          <line x1="68" y1="12" x2="88" y2="4" strokeDasharray="3 4" />
          <line x1="70" y1="16" x2="94" y2="16" strokeDasharray="3 4" />
          <line x1="68" y1="20" x2="88" y2="28" strokeDasharray="3 4" />
          <circle cx="96" cy="9" r="2" fill="var(--aqua)" stroke="none" />
          <circle cx="101" cy="19" r="1.6" fill="var(--aqua)" stroke="none" />
          <circle cx="93" cy="27" r="1.8" fill="var(--aqua)" stroke="none" />
        </g>
        {/* Bottle body */}
        <path
          d="M 18 40 C 18 30 27 26 38 26 C 49 26 58 30 58 40 L 64 114 C 64 118 60 120 55 120 H 21 C 16 120 12 118 12 114 Z"
          fill="var(--surface)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        {/* Bright aqua cleaning solution inside */}
        <path
          d="M 14 78 C 28 74, 48 82, 62 78 L 63.5 114 C 63.5 117 60 119 55 119 H 21 C 16 119 12.5 117 12.5 114 Z"
          fill="var(--aqua)"
          fillOpacity="0.42"
        />
        {/* Printed bottle label with sparkle */}
        <rect x="20" y="54" width="36" height="38" rx="3" fill="var(--mist)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <path d="M38 61L39.8 66.2L45 68L39.8 69.8L38 75L36.2 69.8L31 68L36.2 66.2L38 61Z" fill="var(--accent)" />
        <line x1="26" y1="82" x2="50" y2="82" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Trigger head */}
        <rect x="28" y="15" width="20" height="11" rx="2" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <path d="M 20 7 H 60 L 68 15 H 20 Z" fill="var(--accent)" stroke="var(--ink-stroke)" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M 52 15 L 59 31" stroke="var(--ink-stroke)" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* 2. Folded white towel with crisp aqua stripe */}
      <g transform="translate(158, 386)">
        <rect x="0" y="20" width="124" height="19" rx="6" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="6" y="2" width="112" height="19" rx="6" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.75" />
        <rect x="14" y="9" width="96" height="5" rx="1.5" fill="var(--aqua)" />
        <rect x="8" y="28" width="108" height="4" rx="1.5" fill="var(--sea-glass)" />
      </g>

      {/* 3. Soapy cleaning bucket/caddy with overflowing white suds, bubbles & 4 colour-coded cloths */}
      <g transform="translate(410, 344)">
        {/* Rising soap bubbles above bucket */}
        <circle cx="24" cy="-10" r="8" fill="url(#bubble-fill)" stroke="var(--aqua)" strokeWidth="1.2" />
        <circle cx="46" cy="-22" r="5.5" fill="url(#bubble-fill)" stroke="var(--aqua)" strokeWidth="1.1" />
        <circle cx="116" cy="-12" r="6.5" fill="url(#bubble-fill)" stroke="var(--aqua)" strokeWidth="1.2" />

        {/* Four colour-coded microfibre cloths tucked into the caddy */}
        <rect x="66" y="6" width="14" height="32" rx="3" fill="var(--cloth-green)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="80" y="10" width="14" height="28" rx="3" fill="var(--cloth-yellow)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="94" y="7" width="14" height="31" rx="3" fill="var(--cloth-red)" stroke="var(--ink-stroke)" strokeWidth="1.6" />
        <rect x="108" y="12" width="13" height="26" rx="3" fill="var(--cloth-blue)" stroke="var(--ink-stroke)" strokeWidth="1.6" />

        {/* Fluffy white soap suds puffing over the left rim */}
        <circle cx="28" cy="24" r="14" fill="#FFFFFF" stroke="var(--aqua)" strokeWidth="1.5" />
        <circle cx="46" cy="18" r="16" fill="#FFFFFF" stroke="var(--aqua)" strokeWidth="1.5" />
        <circle cx="62" cy="25" r="12" fill="#FFFFFF" stroke="var(--aqua)" strokeWidth="1.5" />
        <circle cx="18" cy="30" r="10" fill="#FFFFFF" stroke="var(--aqua)" strokeWidth="1.5" />

        {/* Bucket/caddy body */}
        <path
          d="M 10 32 H 136 L 126 82 H 20 L 10 32 Z"
          fill="var(--mist)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <line x1="13" y1="45" x2="133" y2="45" stroke="var(--aqua)" strokeWidth="4" />
        <rect x="46" y="54" width="54" height="16" rx="3" fill="var(--surface)" stroke="var(--ink-stroke)" strokeWidth="1.4" />
        <line x1="54" y1="62" x2="92" y2="62" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
