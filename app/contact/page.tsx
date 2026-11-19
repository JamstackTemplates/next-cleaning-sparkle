import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Quote enquiry" title={business.enquiries.title} motif="spray-bottle">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left column: message guidance + hosted form or email fallback */}
          <section aria-label="Enquiry form" className="space-y-6">
            <div className="mist-pane p-6">
              <h2 className="font-display text-2xl text-ink">What to put in your message</h2>
              <p className="mt-2 text-sm text-muted">
                Used the price estimator? Paste your copied estimate straight into the message box,
                or include these details:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink list-disc pl-5">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            {hosted ? (
              <div className="rounded-ui border border-line bg-surface p-6 shadow-xs">
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              </div>
            ) : (
              <div className="rounded-ui border border-line bg-surface p-6 shadow-xs">
                <span className="care-label">Direct email</span>
                <h2 className="mt-4 font-display text-2xl text-ink">Write to us directly</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The online enquiry form is not connected in this preview. Send your cleaning
                  details straight to{' '}
                  <a className="text-link font-medium wrap-anywhere" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  or call{' '}
                  <a className="text-link font-medium" href={`tel:${business.phoneE164}`}>
                    {business.phone}
                  </a>
                  .
                </p>
              </div>
            )}

            <p className="rounded-ui border border-line bg-mist/60 px-4 py-3 font-mono text-xs leading-relaxed text-muted">
              Enquiry notice: Every message is a quote enquiry. Estimates on this site are guides
              only, and a clean is booked only when we confirm a date and written quote by reply.
            </p>
          </section>

          {/* Right column: woven care-label contact card */}
          <aside
            aria-label="Contact details and service area"
            className="care-label-stitched p-6 sm:p-8 space-y-6"
          >
            <div>
              <span className="eyebrow">Office desk</span>
              <div className="mt-2">
                <OpenBadge hours={business.officeHours} />
              </div>
              <p className="mt-3 font-mono text-xs text-muted">{business.officeHoursSummary}</p>
            </div>

            <hr className="chrome-rule" />

            <div className="space-y-3">
              <h2 className="font-display text-xl text-ink">Email</h2>
              <p>
                <a className="text-link text-base font-medium wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
            </div>

            <div className="space-y-2 border-t border-line pt-5">
              <h2 className="font-display text-xl text-ink">Phone</h2>
              <p>
                <a className="text-link text-base font-medium" href={`tel:${business.phoneE164}`}>
                  {business.phone}
                </a>
              </p>
              <p className="text-xs text-muted">
                Home cleans run Mon–Sat; office cleans also run weekday evenings until 22:00.
              </p>
            </div>

            <div className="space-y-2 border-t border-line pt-5">
              <h2 className="font-display text-xl text-ink">
                Suburbs we clean ({business.suburbs.length})
              </h2>
              <p className="text-xs leading-relaxed text-muted">
                {business.suburbs.join(' · ')}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Single full-bleed deep-aqua band on Contact */}
      <section className="deep-band py-12 sm:py-14">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl text-deep-band-ink">
              Want to double-check rates or what&apos;s included first?
            </h2>
            <p className="mt-2 text-sm text-deep-band-muted">
              Build a quick estimate on Packages and paste it into your message above, or review the
              room-by-room checklist.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SiteLink href="/packages/" className="button button-on-deep">
              Open price estimator
            </SiteLink>
            <SiteLink
              href="/whats-included/"
              className="button border-deep-band-muted/50 bg-transparent text-deep-band-ink hover:bg-deep-band-surface"
            >
              What&apos;s included
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
