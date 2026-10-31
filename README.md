# Indo — corporate website

React 19 + TypeScript + Vite + Tailwind CSS v4, with React Router.

```bash
npm install
npm run dev        # local development
npm run build      # type-check and production build to /dist
npm run preview    # serve the production build
npm run lint
npm run images     # regenerate responsive WebP images from /images-source
```

## Where things live

| What | Where |
| --- | --- |
| Company facts, contact details, form endpoint, client logos | `src/config/site.ts` |
| Service copy | `src/data/services.ts` |
| Industry copy (including `/industries/:slug` pages) | `src/data/industries.ts` |
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
- [ ] **Contact email, phone, office address, hours** — `site.contact`. The footer shows dashed placeholders; the contact page hides them until supplied.
- [ ] **Enquiry form endpoint** — set `VITE_ENQUIRY_ENDPOINT` (see `.env.example`). Until set, the form validates but tells visitors their enquiry was *not* sent. When set, it POSTs JSON (`fullName, company, email, phone, industry, workforceSize, message`) and shows success only on a 2xx response.
- [ ] **Client logos** — `site.clientLogos`. Add only real logos with permission.
- [ ] **Social links** — `site.social`.
- [ ] **Registered company name / number** — `site.legal`.
- [ ] **Privacy and cookie policy wording** — `src/pages/Legal.tsx`.
- [ ] **Service activities** — the bullet points under each service in `src/data/services.ts` are proposed wording.
- [ ] **Roles supplied** per industry — `roles.items` for food manufacturing and retail in `src/data/industries.ts`.
- [ ] **Tagline logo** — the confirmed tagline is "People Powering Business", but the supplied "Base w Tag" logo reads "// PEOPLE POWERING ORG.". The tagline lockup stays unused until a corrected version is exported.
- [ ] **Live site URL** — `site.url` (enables canonical and `og:url` tags).

## Deployment (Vercel)

`vercel.json` configures the build (`npm run build` → `dist`), rewrites every route to `index.html` so deep links such as `/industries/retail` work on reload, and sets long-lived caching for hashed assets.

1. Import the GitHub repository in Vercel; the Vite framework preset is detected automatically.
2. In **Project Settings → Environment Variables**, add `VITE_ENQUIRY_ENDPOINT` once the enquiry endpoint exists (it is read at build time, so redeploy after changing it).
3. Once the domain is live, set `site.url` in `src/config/site.ts` so canonical and `og:url` tags are emitted.

Original photographs (`images-source/`) and the original logoset (`brand-source/`) are kept out of the repository; the site uses the optimised copies in `public/`. Keep them locally (or in shared storage) to regenerate images with `npm run images`.
