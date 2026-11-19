import { business } from '../content/business';
import { SiteLink } from './site-link';
import { Wordmark } from './art/wordmark';
import { BubbleCluster, LemonWheel, WholeLemon } from './art/cleaning-props';

export function SiteFooter() {
  return (
    <footer className="terry-footer relative mt-0 overflow-hidden">
      <WholeLemon className="cleaning-prop top-12 -right-4 hidden w-24 rotate-[-14deg] xl:block" />
      <LemonWheel className="cleaning-prop top-32 right-10 hidden w-12 rotate-12 xl:block" />
      <BubbleCluster className="cleaning-prop prop-bob top-48 right-6 hidden w-12 opacity-70 xl:block" />
      {/* Woven aqua towel stripe across top */}
      <div className="h-2.5 w-full bg-aqua/80" aria-hidden="true" />
      <div className="h-1 w-full bg-surface/70" aria-hidden="true" />

      <div className="wrap relative py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_1fr]">
          {/* Brand & service area */}
          <div>
            <SiteLink href="/" className="inline-block no-underline hover:no-underline">
              <Wordmark />
            </SiteLink>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Regular home cleans, end-of-lease cleans and after-hours office cleans across{' '}
              {business.suburbs.length} inner and middle Melbourne suburbs.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {business.officeHoursSummary}
            </p>
          </div>

          {/* Direct contact */}
          <div>
            <p className="care-label mb-4">Direct contact</p>
            <ul className="space-y-2.5 text-sm list-none m-0 p-0">
              <li>
                <a className="text-link font-medium wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </li>
              <li>
                <a className="text-link font-medium" href={`tel:${business.phoneE164}`}>
                  {business.phone}
                </a>
              </li>
              <li className="text-muted">
                No shopfront — we clean at your home or office.
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="care-label mb-4">Pages</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm list-none m-0 p-0">
              <li><SiteLink href="/" className="text-ink hover:text-accent-ink">Home</SiteLink></li>
              <li><SiteLink href="/packages/" className="text-ink hover:text-accent-ink">Packages</SiteLink></li>
              <li><SiteLink href="/whats-included/" className="text-ink hover:text-accent-ink">What&apos;s included</SiteLink></li>
              <li><SiteLink href="/promise/" className="text-ink hover:text-accent-ink">Our promise</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-ink hover:text-accent-ink">Request a quote</SiteLink></li>
            </ul>
          </div>
        </div>

        <hr className="chrome-rule my-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[0.74rem] text-muted">
          <p>
            {business.name} · Inner Melbourne · Prices in AUD incl. GST · Enquiries confirmed by reply
          </p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="no-underline hover:text-accent-ink hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
