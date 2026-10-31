import { Link } from 'react-router-dom';
import { photos } from '../data/images';
import { services } from '../data/services';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';
import { ServiceIcon } from '../components/sections/ServiceIcon';

/** The four services drawn as a continuous cycle: planning feeds back into sourcing. */
function ProcessDiagram() {
  return (
    <figure className="mt-16">
      <ol className="relative grid sm:grid-cols-2 sm:gap-px sm:bg-stone-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.id} className="relative border-b border-stone-2 last:border-b-0 sm:border-0 sm:bg-ivory">
            <Link to={`#${s.id}`} className="group flex h-full flex-col py-6 transition-colors duration-300 hover:bg-paper sm:px-6 lg:p-8">
              <div className="flex items-center justify-between">
                <ServiceIcon id={s.id} className="size-10 text-midnight" />
                <span className="text-kicker text-ink-soft">Stage {i + 1}</span>
              </div>
              <h3 className="mt-8 text-title-s text-midnight">
                {s.short}
              </h3>
              <p className="mt-2 text-small text-ink-soft">{s.summary}</p>
            </Link>
            {i < services.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-2.5 top-10 z-10 hidden size-5 items-center justify-center bg-lime lg:flex"
              >
                <svg viewBox="0 0 10 10" className="size-2.5">
                  <path d="M2 1l4 4-4 4" fill="none" stroke="var(--color-midnight)" strokeWidth="1.8" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* Return path: planning informs the next round of sourcing. */}
      <div aria-hidden="true" className="relative mx-[12.5%] hidden h-10 border-x-2 border-b-2 border-dashed border-forest/40 lg:block">
        <span className="absolute -left-[7px] -top-1 size-3 rotate-45 border-l-2 border-t-2 border-forest/60 bg-ivory" />
      </div>
      <figcaption className="mt-6 max-w-[64ch] text-small text-ink-soft lg:mt-4 lg:text-center lg:mx-auto">
        Each stage informs the next. What we learn from managing and planning your workforce shapes how we source for
        you next.
      </figcaption>
    </figure>
  );
}

export function WhatWeDo() {
  return (
    <>
      <Seo
        title="What We Do — Workforce Procurement & Management"
        description="Workforce procurement, deployment, management and planning for UK food production and retail businesses. Labour supply and workforce management from Indo."
        path="/what-we-do"
      />

      <PageHero
        title="Workforce procurement and management, built around your operation."
        intro="We are a hands-on workforce partner — not a software platform or payroll provider. We find, place and manage the people that food production and retail businesses depend on."
      />

      <section aria-labelledby="process-title" className="pb-8 pt-4">
        <div className="container-page">
          {/* Gives the stage titles (h3) a parent heading for screen-reader navigation. */}
          <h2 id="process-title" className="sr-only">
            How our services connect
          </h2>
          <ProcessDiagram />
        </div>
      </section>

      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`section-standard ${i % 2 === 0 ? 'bg-stone' : ''} ${i === 0 ? 'mt-16' : ''}`}
          >
            {/* Text comes first in the DOM so phones (and anchor links) land on the heading;
                on desktop the photo is placed beside it, alternating sides. */}
            <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className={`lg:col-span-6 ${flip ? '' : 'lg:col-start-7'}`}>
                <ServiceIcon id={s.id} className="size-11 text-midnight" />
                <h2 id={`${s.id}-title`} className="text-h2 mt-6 text-midnight">
                  {s.title}
                </h2>
                <p className="text-lead mt-6 text-ink">{s.summary}</p>

                <dl className="mt-12 space-y-10">
                  <div>
                    <dt className="text-title-s text-midnight">The business challenge</dt>
                    <dd className="mt-3 text-ink-soft">{s.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-title-s text-midnight">What it involves</dt>
                    <dd className="mt-4">
                      <ul className="space-y-3">
                        {s.involves.map((item) => (
                          <li key={item} className="flex gap-4 text-ink-soft">
                            <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 bg-forest" />
                            <span className="min-w-0">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-title-s text-midnight">In food and retail operations</dt>
                    <dd className="mt-3 text-ink-soft">{s.inPractice}</dd>
                  </div>
                </dl>

                <div className="mt-12 bg-midnight p-7 text-ivory">
                  <p className="text-kicker text-lime">The value to you</p>
                  <p className="text-h3 mt-3">{s.value}</p>
                </div>
              </div>

              <div className={`lg:col-span-5 ${flip ? 'lg:col-start-8' : 'lg:order-first'}`}>
                <Reveal className="aspect-[4/3] overflow-hidden lg:sticky lg:top-28 lg:aspect-[4/5]">
                  <Img photo={s.photo} sizes="(min-width: 1024px) 40vw, 100vw" />
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <CtaSection
        title="Tell us what your operation needs."
        body="Whether you need people for a single line or ongoing support across several sites, we will start by understanding your requirements."
        cta="Discuss Your Workforce Needs"
        photo={photos.fishLineTeam}
      />
    </>
  );
}
