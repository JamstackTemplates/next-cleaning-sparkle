'use client';

import { useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { SiteLink } from './site-link';
import { Wordmark } from './art/wordmark';

const NAV_ITEMS = [
  { href: '/packages/', label: 'Packages' },
  { href: '/whats-included/', label: "What's included" },
  { href: '/promise/', label: 'Our promise' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm">
      <div className="wrap flex min-h-18 items-center justify-between gap-3 py-2.5 sm:min-h-20">
        <SiteLink
          href="/"
          className="shrink-0 no-underline hover:no-underline"
          aria-label="Morning Dew Cleaning — Home"
        >
          <Wordmark compact />
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className="text-[0.94rem] font-medium text-ink transition-colors hover:text-accent-ink"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
          <SiteLink href="/contact/" className="button text-sm">
            Get a quote
          </SiteLink>
          <DarkModeToggle />
        </nav>

        {/* Mobile actions: Get a quote + Menu disclosure */}
        <div className="flex items-center gap-2 md:hidden">
          <SiteLink href="/contact/" className="button px-3 py-1.5 text-xs min-h-10">
            Get a quote
          </SiteLink>
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-ui border border-line bg-mist px-3 text-xs font-mono font-semibold uppercase tracking-wider text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen(open => !open)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              )}
            </svg>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile disclosure panel */}
      {menuOpen ? (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile"
          className="border-t border-line bg-surface px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-ui px-3 py-2.5 text-base font-medium text-ink hover:bg-mist"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3 px-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Appearance</span>
            <DarkModeToggle />
          </div>
        </nav>
      ) : null}

      {/* Chrome towel rail with soap suds hanging below and two slow drips */}
      <div className="header-rail" aria-hidden="true" />
      <div className="suds-fringe" aria-hidden="true" />
      <span className="suds-drip left-[356px]" aria-hidden="true" />
      <span className="suds-drip suds-drip-late hidden left-[884px] md:block" aria-hidden="true" />
    </header>
  );
}
