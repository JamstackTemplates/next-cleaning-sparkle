import type { ReactNode } from 'react';
import { BubbleCluster, LemonWheel, RubberGlove, ScourSponge, SudsBucket } from './art/cleaning-props';
import { WipeEdgeDivider } from './art/dividers';
import { PageHeadMotif } from './art/package-art';

/**
 * Themed inner-page head:
 * Misted glass pane with a stitched woven care-label tab for the page name,
 * display heading on a wiped diagonal stripe, a small page-specific motif,
 * and a WipeEdgeDivider below.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif = 'towel',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  motif?: 'towel' | 'cloths' | 'care-label' | 'spray-bottle';
}) {
  return (
    <header className="mist-pane wiped-stripe rounded-none border-x-0 border-t-0">
      <PageHeadProps motif={motif} />
      <div className="wrap pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <span className="care-label">{eyebrow}</span>
            <h1
              id={id}
              className="mt-4 text-[clamp(2.3rem,5.5vw,3.9rem)] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 max-w-(--measure) text-[clamp(1.02rem,1.5vw,1.16rem)] text-muted">
                {children}
              </div>
            ) : null}
          </div>
          <div className="hidden sm:block pt-2">
            <PageHeadMotif motif={motif} />
          </div>
        </div>
      </div>
      <WipeEdgeDivider />
    </header>
  );
}

/** Large background prop per page, with a lemon wheel and bubbles for freshness (desktop only). */
function PageHeadProps({ motif }: { motif: 'towel' | 'cloths' | 'care-label' | 'spray-bottle' }) {
  const main = 'cleaning-prop prop-bob bottom-12 right-[5%] hidden lg:block';
  return (
    <>
      {motif === 'towel' ? <SudsBucket className={`${main} w-32 -rotate-3`} /> : null}
      {motif === 'cloths' ? <ScourSponge className={`${main} w-36 rotate-[-5deg]`} /> : null}
      {motif === 'care-label' ? <RubberGlove className={`${main} w-20 rotate-[14deg]`} /> : null}
      {motif === 'spray-bottle' ? <ScourSponge className={`${main} w-32 rotate-[4deg]`} /> : null}
      <LemonWheel className="cleaning-prop bottom-10 right-[17%] hidden w-14 rotate-[18deg] lg:block" />
      <BubbleCluster className="cleaning-prop prop-bob prop-bob-late top-6 right-[24%] hidden w-14 opacity-75 xl:block" />
    </>
  );
}
