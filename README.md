# Morning Dew Cleaning (`next-cleaning-sparkle`)

A crisp aqua-and-white Next.js static website for home and office cleaning services, built with
Tailwind CSS v4, self-hosted typography, bespoke inline SVG artwork, an interactive squeegee
room-by-room checklist, a price estimator, live Melbourne office hours, and optional Jamstacks
hosted quote enquiries.

All business details, rates, suburbs and contact details in this template are fictitious sample data
for the Jamstacks gallery. Replace them with your own details before publishing.

## Local preview and checks

Requires Node 24+ and npm.

```sh
npm ci
npm run dev       # local dev server
npm run check     # unit tests, TypeScript check, static export to out/
npm start         # preview the static export locally
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Dawn-window hero, woven care-label trust strip, hanging-towel packages, squeegee checklist teaser, 4-step process, van-side suburb map, closing band and `LocalBusiness` JSON-LD |
| `/packages/` | Interactive price estimator (with spray-bottle readout & copy summary), Regular towel-stack rate shelf, End-of-lease key-tag band, Office shift directory board and Add-ons label sheet |
| `/whats-included/` | Full 6-room squeegee checklist (with URL hash state `#regular` / `#end-of-lease` / `#office` and printable 3-column table), four-colour cloth code, exclusions and pre-visit prep |
| `/promise/` | Full-size woven care labels, 72-hour re-clean timeline, van caddy kit and FAQ accordion |
| `/contact/` | Quote enquiry guidance, hosted `<jamstacks-support-form>` (when configured) or visible email fallback, live Melbourne office hours badge and suburb list |
| `/404.html` | Themed "Missed a spot" error page |

## Make it yours (file ownership)

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, email, phone, 24 Melbourne suburbs, office hours (`Australia/Melbourne`) and contact guidance |
| `content/home-sizes.ts` | Home sizes (`studio` through `five-bed`) and included bathroom counts |
| `content/packages.ts` | Regular, End-of-lease and Office package rates, crew sizes, hours and `available` flags |
| `content/frequencies.ts` | Regular clean frequency options and percentage adjustments (`-30%` to `+30%`) |
| `content/extras.ts` | Optional add-on prices, units, `includedIn`, `appliesTo` and `available` flags |
| `content/checklist.ts` | Four-colour cloth code, six rooms and room-by-room tasks linked to packages and add-ons |
| `content/badges.ts` | Eight woven trust badges (24-character max label) and detail copy |
| `app/**/page.tsx` | Page-specific headings, prose, FAQ answers and calls to action in page order |
| `site.config.json` | Provisioner-managed public `name`, `description`, `domain`, `timeZone` and `jamstacks` config |
| `app/tailwind.input.css` | Light ("first light") and dark ("pre-dawn shift") colour tokens, textures, motion and print rules |
| `lib/estimator.ts` | Price estimator math and plain-text summary formatter |
| `lib/structured-data.ts` | `LocalBusiness` JSON-LD derived from `content/business.ts` and `content/packages.ts` |
| `app/sitemap.ts` | Static sitemap listing all public routes |

### Common owner edits

- **Change a package rate:** Edit `content/packages.ts` (for example, change Regular `studio` from `129` to `135`). The hero "from $" fact, towel hang tag, rate shelf, estimator, meta description and `LocalBusiness` JSON-LD all update automatically on rebuild.
- **Pause an add-on:** Set `available: false` on an item in `content/extras.ts`. It displays **"Paused for now"** on `/packages/` and is removed from the price estimator.
- **Update suburbs or office hours:** Edit `business.suburbs` or `business.officeHours` in `content/business.ts`. Same-day intervals only (`HH:MM`, opening before closing); `OpenBadge` computes live status in `Australia/Melbourne`.
- **Edit page copy:** Update headings, paragraphs and FAQ entries directly inside the corresponding `app/**/page.tsx` route file.
- **Rename the business:** Update `business.name` in `content/business.ts` and `name` in `site.config.json`.

## Fonts and licences

All typography is self-hosted via npm packages (no external font requests):

- **Young Serif** (`@fontsource/young-serif`) — SIL Open Font License 1.1 (headings, prices, wordmark)
- **Lexend** (`@fontsource-variable/lexend`) — SIL Open Font License 1.1 (body copy, navigation, checklists)
- **Spline Sans Mono** (`@fontsource-variable/spline-sans-mono`) — SIL Open Font License 1.1 (care labels, cloth codes, hours, directory board)

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never place secrets or business collections there.

When `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is set, `/contact/` renders one `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap. Without a site ID, no embed host or script is rendered and the direct email fallback is shown. Public email remains visible in both states. All navigation to and from `/contact/` uses full-document loads via `SiteLink`.

```sh
# Test project-path export and configured Contact locally
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview JAMSTACKS_SITE=demo-site npm run build
npm start -- --base /preview --port 3000
```

## Gallery assets

`jamstacks/` contains gallery-only metadata and captures (`config.json`, `home-light.jpg`, `home-dark.jpg`, `screenshots.json`, `config.test.mjs`). Customer websites can delete `jamstacks/` safely — normal builds, tests and GitHub Pages deployment do not read it. Validate gallery assets separately with `node --test jamstacks/config.test.mjs`.
