import { Link, useParams } from 'react-router-dom';
import { industries, industryBySlug } from '../data/industries';
import { services } from '../data/services';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';
import { ServiceIcon } from '../components/sections/ServiceIcon';
import { NotFound } from './NotFound';

export function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);
  if (!industry) return <NotFound />;

  const others = industries.filter((i) => i.slug !== industry.slug);
  const isFrozen = industry.slug === 'frozen-food-production';

  return (
    <>
      <Seo title={industry.seoTitle} description={industry.seoDescription} path={`/industries/${industry.slug}`} />

      <PageHero
        breadcrumb={[{ label: 'Industries', to: '/industries' }, { label: industry.title }]}
        title={industry.headline}
        intro={industry.intro}
        photo={industry.gallery[0]}
      >
        <div className="mt-8">
          <Button to="/contact">Discuss Your Workforce Needs</Button>
        </div>
      </PageHero>

      {/* Key points */}
      <section aria-label={`Workforce support for ${industry.title.toLowerCase()}`} className="section-tight">
        <div className="container-page grid md:grid-cols-3">
          {industry.sections.map((s) => (
            <div
              key={s.heading}
              className="border-stone-2 py-8 first:pt-0 last:pb-0 not-first:border-t md:px-8 md:py-0 md:first:pl-0 md:last:pr-0 md:not-first:border-l md:not-first:border-t-0"
            >
              <h2 className="text-h3 text-midnight">{s.heading}</h2>
              <p className="mt-4 text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles / products */}
      <section
        aria-labelledby="roles-title"
        className={isFrozen ? 'section-generous on-dark bg-midnight text-ivory' : 'section-standard bg-stone'}
      >
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="roles-title" className={`text-h2 max-w-[16ch] ${isFrozen ? '' : 'text-midnight'}`}>
              {industry.roles.heading}
            </h2>
            <ul className={`mt-10 border-t ${isFrozen ? 'border-rule-dark' : 'border-stone-2'}`}>
              {industry.roles.items.map((item) => (
                <li
                  key={item}
                  className={`flex items-center gap-4 border-b py-5 text-statement ${
                    isFrozen ? 'border-rule-dark' : 'border-stone-2 text-ink'
                  }`}
                >
                  <span aria-hidden="true" className="size-2.5 shrink-0 bg-lime" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            {[industry.photo, ...industry.gallery.slice(1)].slice(0, 2).map((p, i) => (
              <Reveal key={p.name} className={`aspect-[3/4] overflow-hidden ${i === 1 ? 'mt-12' : ''}`}>
                <Img photo={p} sizes="(min-width: 1024px) 20vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services in this industry */}
      <section aria-labelledby="services-title" className="section-standard">
        <div className="container-page">
          <h2 id="services-title" className="text-h2 max-w-[20ch] text-midnight">
            How we support {industry.title.toLowerCase()} businesses
          </h2>
          {/* A compact linked list: the full service cards live on Home and What We Do. */}
          <ul className="mt-12 border-t border-stone-2">
            {services.map((s) => (
              <li key={s.id} className="border-b border-stone-2">
                <Link
                  to={`/what-we-do#${s.id}`}
                  className="group grid gap-x-8 gap-y-2 py-6 transition-colors duration-300 hover:bg-paper md:grid-cols-12 md:items-center md:px-4 lg:py-7"
                >
                  <span className="flex items-center gap-4 md:col-span-5">
                    <ServiceIcon id={s.id} className="size-8 shrink-0 text-midnight" />
                    <span className="min-w-0 text-title-s text-midnight">{s.title}</span>
                  </span>
                  <span className="text-small text-ink-soft md:col-span-5">{s.summary}</span>
                  <span className="text-label text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-forest md:col-span-2 md:justify-self-end">
                    How It Works
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <nav aria-label="Other industries" className="mt-20 border-t border-stone-2 pt-10">
            <p className="text-label text-ink-soft">Other industries</p>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-10">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/industries/${o.slug}`}
                    className="text-statement text-midnight underline decoration-transparent decoration-[3px] underline-offset-8 transition-[text-decoration-color] duration-300 hover:decoration-lime"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <CtaSection
        title={`Let’s talk about your ${industry.title.toLowerCase()} workforce.`}
        body="Tell us about your operation and the people you need. We will start by understanding your requirements."
        photo={industry.ctaPhoto}
      />
    </>
  );
}
