import { photos } from '../data/images';
import { complianceAreas, environmentPriorities, onboardingSupport, products, recruitmentCriteria } from '../data/workforce';
import { Button, TextLink } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { Journey } from '../components/sections/Journey';
import { PageHero } from '../components/sections/PageHero';
import { Stats } from '../components/sections/Stats';

const operationalPoints = [
  {
    title: 'Production and processing',
    body: 'Line speeds, changeovers, machine operation and the hygiene routines that come with food production.',
  },
  {
    title: 'Packing and quality',
    body: 'Weighing, labelling and inspection, where accuracy matters as much as pace.',
  },
  {
    title: 'Warehousing and logistics',
    body: 'Goods-in, stock, picking and dispatch — the work that turns production into delivered orders.',
  },
];

const partnershipPrinciples = [
  {
    title: 'We learn the operation first',
    body: 'Before we talk numbers, we want to understand how your site runs: the roles, the shifts and the pressure points.',
  },
  {
    title: 'We stay involved',
    body: 'Our work continues after people start, with ongoing coordination and a consistent point of contact.',
  },
  {
    title: 'We adapt as you change',
    body: 'Volumes, ranges and seasons move. Workforce arrangements should move with them.',
  },
];

export function About() {
  return (
    <>
      <Seo
        title="About INDO — Workforce Procurement & Management"
        description="INDO is an experienced UK workforce procurement and management partner specialising in frozen food manufacturing, food production, warehousing and logistics."
        path="/about"
      />

      <PageHero
        title="Understanding the people behind the process."
        intro="INDO is a UK workforce procurement and management partner for food manufacturing businesses — particularly frozen and processed food production — and the warehouse and logistics operations that support them."
        photo={photos.lineOperative}
        photoPosition="62% 40%"
      />

      {/* Who INDO is */}
      <section aria-labelledby="who-title" className="section-standard">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="who-title" className="text-h2 max-w-[15ch] text-midnight">
              More than a staffing supplier. A workforce partner.
            </h2>
          </div>
          <div className="space-y-6 text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className="text-lead text-ink">
              Our work rests on a simple understanding: in high-volume food manufacturing, the right people — available,
              prepared and well managed — are what keep production running.
            </p>
            <p>
              INDO sources, recruits, supplies and manages operational workforces. Over many years and more than ten
              client relationships, that work has given us a practical, on-the-ground view of what production lines,
              packing halls and warehouses need from the people working in them.
            </p>
            <p>
              We combine that operational understanding with the day-to-day work of workforce procurement and
              management, so our clients can focus on running their operations.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      {/* Frozen food spotlight */}
      <section aria-labelledby="frozen-title" className="section-generous on-dark bg-midnight text-ivory">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="frozen-title" className="text-h2 max-w-[16ch]">
              Experience built in frozen food manufacturing.
            </h2>
            <p className="text-lead mt-8 max-w-[48ch] text-on-dark-muted">
              Frozen food is where our experience runs deepest. We understand the production schedules, shift patterns,
              seasonal demand and quality expectations of high-volume frozen and processed food environments.
            </p>
            <ul className="mt-12 border-t border-rule-dark">
              {products.map((p) => (
                <li key={p.id} className="border-b border-rule-dark py-4 text-h3">
                  {p.title}
                </li>
              ))}
            </ul>
            <TextLink to="/industries/frozen-food-production" className="mt-10 text-lime">
              Our Frozen Food Expertise
            </TextLink>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8 lg:gap-5">
            <Reveal className="col-span-2 aspect-[4/3] overflow-hidden">
              <Img photo={photos.fishCrates} sizes="(min-width: 1024px) 40vw, 100vw" position="center 65%" />
            </Reveal>
            <Reveal className="aspect-[3/4] overflow-hidden">
              <Img photo={photos.pizzaDetail} sizes="(min-width: 1024px) 20vw, 50vw" />
            </Reveal>
            <Reveal className="aspect-[3/4] overflow-hidden">
              <Img photo={photos.sortingLine} sizes="(min-width: 1024px) 20vw, 50vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Understanding production and logistics */}
      <section aria-labelledby="operations-title" className="section-standard">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="operations-title" className="text-h2 max-w-[18ch] text-midnight">
                From the production line to the loading bay.
              </h2>
            </div>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Our understanding does not stop at the end of the line. Production, packing and logistics depend on one
              another, and so do the workforces behind them.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-12">
            <Reveal className="aspect-[4/3] overflow-hidden sm:col-span-7 sm:aspect-auto sm:min-h-[26rem]">
              <Img photo={photos.productionWide} sizes="(min-width: 640px) 58vw, 100vw" />
            </Reveal>
            <Reveal className="aspect-[4/3] overflow-hidden sm:col-span-5 sm:aspect-auto sm:min-h-[26rem]">
              <Img photo={photos.warehouseForklift} sizes="(min-width: 640px) 42vw, 100vw" />
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {operationalPoints.map((p) => (
              <li key={p.title} className="border-t-2 border-forest pt-6">
                <h3 className="text-h3 text-midnight">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 border-t border-stone-2 pt-12">
            <h3 className="text-title-s text-midnight">What we plan around</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {environmentPriorities.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-forest" />
                  <span className="min-w-0">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach to recruitment and management */}
      <section aria-labelledby="approach-title" className="section-standard bg-stone">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="approach-title" className="text-h2 max-w-[18ch] text-midnight">
                How we recruit and manage a workforce.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lead text-ink-soft">
                We recruit for the realities of food manufacturing — reliability, shift suitability, production
                targets and hygiene awareness — and stay involved once people are in place.
              </p>
              <Button to="/what-we-do#recruitment-management" variant="secondary" className="mt-8">
                Recruitment &amp; Workforce Management
              </Button>
            </div>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h3 className="text-title-s text-midnight">What we look for</h3>
              <ul className="mt-5 border-t border-stone-2">
                {recruitmentCriteria.map((c) => (
                  <li key={c} className="flex items-start gap-4 border-b border-stone-2 py-4 text-ink">
                    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-lime" />
                    <span className="min-w-0">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-start bg-midnight p-7 text-ivory sm:p-8 lg:col-span-5">
              <Eyebrow tone="dark" marker={false}>
                Where required, INDO supports
              </Eyebrow>
              <ul className="mt-5 space-y-2.5">
                {onboardingSupport.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-title-s">
                    <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 bg-lime" />
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-title-s text-midnight">From requirement to deployment</h3>
            <div className="mt-8">
              <Journey />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance (moved from Home) */}
      <section aria-labelledby="compliance-title" className="section-standard">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="compliance-title" className="text-h2 max-w-[16ch] text-midnight">
              A responsible approach to workforce management.
            </h2>
            <p className="text-lead mt-8 text-ink-soft">
              INDO understands the importance of compliance when supplying workers to the UK food manufacturing sector.
            </p>
          </div>
          <ul className="grid gap-px self-start bg-stone-2 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {complianceAreas.map((a) => (
              <li key={a.title} className="bg-ivory p-7 sm:p-8">
                <h3 className="text-title-s text-midnight">{a.title}</h3>
                <p className="mt-2 text-small text-ink-soft">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Long-term partnerships */}
      <section aria-labelledby="partnership-title" className="section-standard bg-stone">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="partnership-title" className="text-h2 max-w-[15ch] text-midnight">
              Built to last beyond the next shift.
            </h2>
            <Reveal className="mt-10 aspect-[4/3] overflow-hidden">
              <Img photo={photos.supervisorWalkround} sizes="(min-width: 1024px) 38vw, 100vw" position="40% center" />
            </Reveal>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            {partnershipPrinciples.map((p) => (
              <li key={p.title} className="border-t border-stone-2 py-8 first:border-t-0 first:pt-0">
                <h3 className="text-statement text-forest">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="Let’s talk about the people your operation needs."
        body="Whether you run a frozen food plant, a production site or the warehouse behind it, we would be glad to understand your workforce requirements."
        photo={photos.kitchenTeam}
      />
    </>
  );
}
