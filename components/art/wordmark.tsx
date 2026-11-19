export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 leading-none select-none">
      <svg
        width={compact ? 30 : 36}
        height={compact ? 32 : 38}
        viewBox="0 0 42 44"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Main dewdrop */}
        <path
          d="M19 5C19 5 6.5 19.5 6.5 28.2C6.5 35.4 12.1 40.5 19 40.5C25.9 40.5 31.5 35.4 31.5 28.2C31.5 19.5 19 5 19 5Z"
          fill="var(--mist)"
          stroke="var(--ink-stroke)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Sunrise arc inside drop */}
        <path
          d="M12.5 30C13.9 26.4 16.2 24.8 19 24.8C21.8 24.8 24.1 26.4 25.5 30"
          stroke="var(--dawn)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M11 32.2H27"
          stroke="var(--aqua)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Specular gloss highlight */}
        <path
          d="M13.2 18.5C11.9 21 11.2 23.5 11.2 25.8"
          stroke="#FFFFFF"
          strokeWidth="2.1"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* Crisp 4-point sparkle stars */}
        <path
          d="M34 6L35.4 10.6L40 12L35.4 13.4L34 18L32.6 13.4L28 12L32.6 10.6L34 6Z"
          fill="var(--aqua)"
        />
        <path
          d="M6 10L6.9 12.6L9.5 13.5L6.9 14.4L6 17L5.1 14.4L2.5 13.5L5.1 12.6L6 10Z"
          fill="var(--dawn)"
        />
      </svg>
      <span className="flex flex-col">
        <span
          className={`font-display tracking-tight text-ink ${compact ? 'text-[1.15rem]' : 'text-[1.35rem]'}`}
          style={{ lineHeight: 1.05 }}
        >
          Morning Dew
        </span>
        <span className="mt-0.5 font-mono text-[0.62rem] font-semibold tracking-[0.22em] text-accent-ink uppercase">
          Cleaning
        </span>
      </span>
    </span>
  );
}
