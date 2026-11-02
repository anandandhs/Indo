# Indo — corporate website

React 19 + TypeScript + Vite + Tailwind CSS v4, with React Router.

```bash
npm install
npm run dev        # local development
npm run build      # type-check, build and prerender every page to /dist
npm run preview    # serve the production build
npm run lint
npm run images     # regenerate responsive WebP images (400–1600px) from /images-source
```

## Where things live

| What | Where |
| --- | --- |
| Company facts, contact details, form endpoint, client logos | `src/config/site.ts` |
| Workforce solutions, capabilities, roles, products, recruitment journey, Why INDO | `src/data/workforce.ts` |
| Sector copy for Our Expertise (including `/industries/:slug` pages) | `src/data/industries.ts` |
| Photography and alt text | `src/data/images.ts` |
| Logos (served) / original logoset | `public/brand/`, `public/favicon.svg` / `brand-source/` |
| Design tokens (colours, fonts, type scale, motion) | `src/index.css` |
| Reusable components | `src/components/` |
| Pages | `src/pages/` |

## Design system (src/index.css)

Use the named roles rather than one-off values, so the site stays consistent. The full design record, with rules, component specs and do's and don'ts, is in [DESIGN.md](DESIGN.md); product context is in [PRODUCT.md](PRODUCT.md).

- **Colour:** brand tokens (`midnight` deep green, `forest`, `lime`, `canopy`, `ivory`, `stone`, `paper`) plus semantic text tokens for dark surfaces (`on-dark-muted`, `on-dark-subtle`, `rule-dark`) and states (`error`, `error-soft`, `lime-soft`). Every text pairing is checked to WCAG AA.
- **Type roles:** `text-display`, `text-h1`, `text-h2`, `text-statement`, `text-h3`, `text-title-s`, `text-lead`, body (default), `text-small`, `text-label` (buttons, nav, form labels), `text-meta`, `text-kicker` (short sentence-case tags), `text-stat`.
- **Section spacing:** `section-tight`, `section-standard`, `section-generous`.
- **Copy conventions:** headings in sentence case; button and link labels in Title Case, matching the brief's calls to action. British English throughout.

## Content awaiting confirmation (search the code for `TO CONFIRM`)

- [ ] **Years of experience** — `site.facts.yearsOfExperience`. Shows "Years" until a number is set.
- [ ] **Contact email and hours** (phone and address added 2026-11-02) — `site.contact`. Hidden everywhere until supplied (the footer shows only the two enquiry links). Once an email is set, the forms can hand visitors a pre-filled email while the endpoint is not connected.
- [ ] **Urgent-cover response time** — `site.contact.urgentResponseTime` (e.g. "the same working day"). While empty, the urgent-cover form makes no promise.
- [ ] **Enquiry form endpoint** — set `VITE_ENQUIRY_ENDPOINT` (see `.env.example`). Two forms post to it — the full enquiry (`type: "workforce-enquiry"`) and the four-field urgent cover request (`type: "urgent-cover"`); `.env.example` lists the fields. Until it is set, the forms validate but never claim to have sent anything.
- [ ] **Client logos** — `site.clientLogos`. Add only real logos with permission.
- [ ] **Social links** — `site.social`.
- [ ] **Registered company name / number** — `site.legal`.
- [ ] **Privacy and cookie policy wording** — `src/pages/Legal.tsx`.
- [ ] **Workforce copy** — the short product descriptions, "when it fits" lines and capability explanations in `src/data/workforce.ts` are written from the positioning brief; INDO should review the wording.
- [ ] **Retail roles** — `roles.items` for retail in `src/data/industries.ts` (retail is kept as secondary experience).
- [ ] **Tagline logo** — the confirmed tagline is "People Powering Business", but the supplied "Base w Tag" logo reads "// PEOPLE POWERING ORG.". The tagline lockup stays unused until a corrected version is exported.
- [ ] **Custom domain** — set `VITE_SITE_URL` in Vercel if the site uses a domain other than its Vercel production domain.

## Deployment (Vercel)

`npm run build` builds the app, then prerenders every route to static HTML (`scripts/prerender.mjs`): `dist/index.html`, `dist/about.html`, `dist/industries/retail.html` and so on, plus `dist/404.html`. Pages paint before JavaScript loads, link previews and crawlers see each page's own title and description, and React then takes over in the browser. `vercel.json` enables `cleanUrls` (so `/about` serves `about.html`), lets Vercel return a real 404 for unknown addresses, and sets long-lived caching for hashed assets and fonts. It also sends security headers, including a Content-Security-Policy that allows the one inline script by hash; the build fails if that script changes without the hash in `vercel.json` being updated. `connect-src` allows any https endpoint for the enquiry form; narrow it to the endpoint domain once `VITE_ENQUIRY_ENDPOINT` is known.

1. Import the GitHub repository in Vercel; the Vite framework preset is detected automatically.
2. In **Project Settings → Environment Variables**, add `VITE_ENQUIRY_ENDPOINT` once the enquiry endpoint exists (it is read at build time, so redeploy after changing it).
3. The site URL for canonical links, `og:url`, absolute share images and `sitemap.xml` is taken from Vercel's production domain automatically. To use a custom domain, set `VITE_SITE_URL` (for example `https://www.indo.co.uk`) and redeploy.

When adding a page, add its path to `prerenderPaths` in `src/routes.tsx` so it is prerendered.

Original photographs (`images-source/`) and the original logoset (`brand-source/`) are kept out of the repository; the site uses the optimised copies in `public/`. Keep them locally (or in shared storage) to regenerate images with `npm run images`.
