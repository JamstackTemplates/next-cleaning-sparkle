import { MissedSpotPane } from '../components/art/scenes';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="mist-pane rounded-none border-x-0 border-t-0 py-16 sm:py-24">
      <div className="wrap flex flex-col items-center text-center">
        <span className="care-label">Error 404</span>
        <div className="mt-8 w-full flex justify-center">
          <MissedSpotPane />
        </div>
        <h1 className="mt-8 text-[clamp(2.4rem,5.5vw,3.8rem)] text-ink">Missed a spot</h1>
        <p className="mt-3 max-w-md text-base text-muted">
          That page isn&apos;t on our checklist. Try heading back to the home page, checking what&apos;s
          included, or requesting a quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink href="/" className="button">
            Go home
          </SiteLink>
          <SiteLink href="/whats-included/" className="button button-quiet">
            What&apos;s included
          </SiteLink>
          <SiteLink href="/contact/" className="button button-quiet">
            Contact
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
