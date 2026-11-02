import { Link, useParams } from 'react-router-dom';
import { primaryCta } from '../config/site';
import { industries, industryBySlug } from '../data/industries';
import { capabilities, solutions } from '../data/workforce';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';
import { ProductGallery } from '../components/sections/ProductGallery';
import { NotFound } from './NotFound';

export function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);
  if (!industry) return <NotFound />;

  const others = industries.filter((i) => i.slug !== industry.slug);
  const related = capabilities.filter((c) => industry.capabilities.includes(c.id));
  const isFrozen = industry.slug === 'frozen-food-production';

  return (
    <>
      <Seo title={industry.seoTitle} description={industry.seoDescription} path={`/industries/${industry.slug}`} />

      <PageHero
        breadcrumb={[{ label: 'Our Expertise', to: '/industries' }, { label: industry.title }]}
        title={industry.headline}
        intro={industry.intro}
        photo={industry.gallery[0]}
      >
        <div className="mt-8">
          <Button to="/contact#enquiry">{primaryCta.label}</Button>
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

      {isFrozen && (
        <section aria-labelledby="products-title" className="section-standard">
          <div className="container-page">
            <h2 id="products-title" className="text-h2 max-w-[20ch] text-midnight">
              Experience across frozen and processed food production
            </h2>
            <div className="mt-14">
              <ProductGallery />
            </div>
          </div>
        </section>
      )}

      {/* Workforce capabilities and arrangements for this sector */}
      <section aria-labelledby="capabilities-title" className={`section-standard ${isFrozen ? 'border-t border-stone-2' : ''}`}>
        <div className="container-page">
          <h2 id="capabilities-title" className="text-h2 max-w-[22ch] text-midnight">
            How we support {industry.title.toLowerCase()} operations
          </h2>
          {/* A compact linked list: full detail lives on Workforce Solutions. */}
          <ul className="mt-12 border-t border-stone-2">
            {related.map((c) => (
              <li key={c.id} className="border-b border-stone-2">
                <Link
                  to={`/what-we-do#capability-${c.id}`}
                  className="group grid gap-x-8 gap-y-2 py-6 transition-colors duration-300 hover:bg-paper md:grid-cols-12 md:items-center md:px-4 lg:py-7"
                >
                  <span className="flex items-center gap-4 md:col-span-5">
                    <span aria-hidden="true" className="size-2.5 shrink-0 bg-lime" />
                    <span className="min-w-0 text-title-s text-midnight">{c.title}</span>
                  </span>
                  <span className="text-small text-ink-soft md:col-span-5">{c.roles.join(' · ')}</span>
                  <span className="text-label text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-forest md:col-span-2 md:justify-self-end">
                    Role Details
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-16 text-title-s text-midnight">Available as</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {solutions.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/what-we-do#solution-${s.id}`}
                  className="inline-flex min-h-11 items-center border border-ink/25 px-4 py-2 text-label text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          <nav aria-label="Other sectors" className="mt-20 border-t border-stone-2 pt-10">
            <p className="text-label text-ink-soft">Other sectors</p>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-10">
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
        secondary={{ label: 'Explore Workforce Solutions', to: '/what-we-do' }}
        photo={industry.ctaPhoto}
      />
    </>
  );
}
