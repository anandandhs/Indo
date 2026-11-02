import { Link } from 'react-router-dom';
import { primaryCta } from '../config/site';
import { photos } from '../data/images';
import { capabilities, capacityScenarios, managementServices } from '../data/workforce';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { Journey } from '../components/sections/Journey';
import { PageHero } from '../components/sections/PageHero';
import { SolutionModules } from '../components/sections/SolutionModules';

const areas = [
  {
    id: 'workforce-supply',
    title: 'Workforce Supply',
    summary: 'How we provide people: temporary, temporary-to-permanent, seasonal, ongoing and additional shift cover.',
  },
  {
    id: 'operational-workforce',
    title: 'Operational Workforce',
    summary: 'Who we provide: production, packing and quality, warehouse and logistics, supervision and management.',
  },
  {
    id: 'recruitment-management',
    title: 'Recruitment & Workforce Management',
    summary: 'How we recruit, prepare and manage the workforce once it is in place.',
  },
];

export function WhatWeDo() {
  return (
    <>
      <Seo
        title="Workforce Solutions — Food Manufacturing, Warehouse & Logistics"
        description="Temporary, seasonal and ongoing workforce solutions for UK food manufacturing, warehouse and logistics operations. Production operatives, packing, quality and dispatch teams, recruited and managed by INDO."
        path="/what-we-do"
      />

      <PageHero
        title="Workforce solutions built around your production demands."
        intro="INDO is a hands-on workforce partner, not a software platform or payroll provider. We source, recruit, supply and manage the operational workforce that food manufacturing, warehouse and logistics businesses depend on."
        photo={photos.produceLine}
      />

      {/* Overview of the three areas */}
      <nav aria-label="Workforce solution areas" className="section-tight">
        <div className="container-page">
          <ol className="grid gap-px bg-stone-2 md:grid-cols-3">
            {areas.map((a) => (
              <li key={a.id}>
                <Link
                  to={`#${a.id}`}
                  className="group flex h-full flex-col bg-ivory p-7 transition-colors duration-300 hover:bg-paper sm:p-8"
                >
                  <span aria-hidden="true" className="block size-3 bg-lime" />
                  <span className="mt-8 text-h3 text-midnight">{a.title}</span>
                  <span className="mt-3 flex-1 text-small text-ink-soft">{a.summary}</span>
                  <span className="mt-6 text-label text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-forest">
                    Go to {a.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Workforce supply */}
      <section id="workforce-supply" aria-labelledby="supply-title" className="section-standard bg-stone">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="supply-title" className="text-h2 max-w-[18ch] text-midnight">
                Five ways to bring the right people into your operation.
              </h2>
            </div>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Every operation has a different rhythm. Some need a steady workforce all year; others need extra people
              for a week, a season or a single shift. We agree the arrangement that fits, and adjust it as your
              requirements change.
            </p>
          </div>
          <div className="mt-14">
            <SolutionModules />
          </div>

          {/* Scaling up (moved from Home): when clients typically need extra capacity. */}
          <div className="mt-16 border-t border-stone-2 pt-12">
            <h3 className="text-title-s text-midnight">When clients scale up</h3>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {capacityScenarios.map((c) => (
                <li key={c.title} className="border-t border-stone-2 py-5">
                  <p className="text-title-s text-ink">{c.title}</p>
                  <p className="mt-1 text-small text-ink-soft">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Operational workforce */}
      <section id="operational-workforce" aria-labelledby="operational-title" className="section-standard">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="operational-title" className="text-h2 max-w-[18ch] text-midnight">
                The roles we supply, from the production floor to dispatch.
              </h2>
            </div>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Four areas of operational workforce, each recruited with the realities of food manufacturing and
              logistics environments in mind.
            </p>
          </div>

          <div className="mt-16 space-y-20 lg:space-y-28">
            {capabilities.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={c.id}
                  id={`capability-${c.id}`}
                  aria-labelledby={`${c.id}-title`}
                  className="grid gap-10 border-t border-stone-2 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14"
                >
                  {/* Text first in the DOM; on desktop the photo alternates sides. */}
                  <div className={`lg:col-span-6 ${flip ? '' : 'lg:col-start-7'}`}>
                    <span aria-hidden="true" className="block size-3 bg-lime" />
                    <h3 id={`${c.id}-title`} className="text-h2 mt-6 text-midnight">
                      {c.title}
                    </h3>
                    <p className="text-lead mt-5 text-ink">{c.summary}</p>
                    <p className="mt-5 text-ink-soft">{c.inPractice}</p>

                    <h4 className="mt-10 text-title-s text-midnight">Roles we supply</h4>
                    <ul className="mt-4 grid border-t border-stone-2 sm:grid-cols-2 sm:gap-x-8">
                      {c.roles.map((r) => (
                        <li key={r} className="flex items-start gap-3 border-b border-stone-2 py-3.5 text-ink">
                          <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-forest" />
                          <span className="min-w-0">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`lg:col-span-5 ${flip ? 'lg:col-start-8' : 'lg:order-first'}`}>
                    <Reveal className="aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
                      <Img photo={c.photo} sizes="(min-width: 1024px) 40vw, 100vw" position={c.position} />
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="on-dark mt-20 flex flex-col gap-6 bg-midnight p-8 text-ivory sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-h3 max-w-[30ch]">Need a mix of roles across production, packing and dispatch?</p>
            <Button to="/contact#enquiry" variant="lime" className="shrink-0">
              Discuss Your Workforce Requirements
            </Button>
          </div>
        </div>
      </section>

      {/* Recruitment and workforce management */}
      <section
        id="recruitment-management"
        aria-labelledby="management-title"
        className="section-standard on-dark bg-midnight text-ivory"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 id="management-title" className="text-h2 max-w-[16ch]">
                  Recruited for your environment. Managed once they are in it.
                </h2>
                <p className="text-lead mt-8 text-on-dark-muted">
                  Supplying people is only part of the job. We assess candidates for the realities of production and
                  warehouse work, prepare them for your site and stay involved once they start.
                </p>
                <Reveal className="mt-10 hidden aspect-[4/3] overflow-hidden lg:block">
                  <Img photo={photos.supervisorWalkround} sizes="40vw" position="40% center" />
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-6 lg:col-start-7">
              {managementServices.map((m, i) => (
                <li key={m.title} className="border-t border-rule-dark py-8 first:border-t-0 first:pt-0 lg:py-10">
                  <span className="text-kicker tabular-nums text-lime">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-h3">{m.title}</h3>
                  <p className="mt-3 text-on-dark-muted">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20 border-t border-rule-dark pt-12 lg:mt-24">
            <h3 className="text-h3">From requirement to deployment</h3>
            <div className="mt-10">
              <Journey tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Tell us what your operation needs."
        body="Whether you need people for a single line, an extra shift or ongoing support across several sites, we start by understanding your requirements."
        primary={{ label: primaryCta.label, to: '/contact#enquiry' }}
        secondary={{ label: 'Explore Our Expertise', to: '/industries' }}
        photo={photos.fishLineTeam}
      />
    </>
  );
}
