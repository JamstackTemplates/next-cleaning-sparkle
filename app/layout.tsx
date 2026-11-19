import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/young-serif/400.css';
import '@fontsource-variable/lexend';
import '@fontsource-variable/spline-sans-mono';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business, businessMetaDescription } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = businessMetaDescription();

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    images: [{ url: asset('/og.png'), width: 1200, height: 630, alt: 'Morning Dew Cleaning — Regular, End-of-lease and Office cleaning in Melbourne' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description,
    images: [asset('/og.png')],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
