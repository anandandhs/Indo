import { Link } from 'react-router-dom';
import { photos } from '../data/images';
import { industryBySlug, type Industry } from '../data/industries';
import { capabilities } from '../data/workforce';
import { Button, TextLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';
import { ProductGallery } from '../components/sections/ProductGallery';

/** A primary sector shown as a split section: text and roles beside a pair of photographs. */
function SectorSection({ industry, flip = false }: { industry: Industry; flip?: boolean }) {
  const titleId = `${industry.slug}-title`;
  const related = capabilities.filter((c) => industry.capabilities.includes(c.id));
  return (
    <section id={industry.slug} aria-labelledby={titleId} className={`section-standard ${flip ? 'bg-stone' : ''}`}>
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className={`lg:col-span-6 ${flip ? '' : 'lg:col-start-7'}`}>
          {/* The sector name is the heading: each section must say which sector it covers. The fuller
              headline leads the sector's own page. */}
          <h2 id={titleId} className="text-h2 max-w-[18ch] text-midnight">
            {industry.title}
          </h2>
          <p className="text-lead mt-6 text-ink-soft">{industry.intro}</p>

          <h3 className="mt-10 text-title-s text-midnight">{industry.roles.heading}</h3>
          <ul className="mt-4 border-t border-stone-2">
            {industry.roles.items.map((r) => (
              <li key={r} className="flex items-start gap-4 border-b border-stone-2 py-3.5 font-display font-bold text-ink">
                <span aria-hidden="true" className="mt-[0.5em] size-2 shrink-0 bg-forest" />
                <span className="min-w-0">{r}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-small text-ink-soft">
            Related workforce capabilities:{' '}
            {related.map((c, i) => (
              <span key={c.id}>
                {i > 0 && ', '}
                <Link to={`/what-we-do#capability-${c.id}`} className="text-forest underline underline-offset-4">
                  {c.title}
                </Link>
              </span>
            ))}
          </p>

          <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
            <Button to={`/industries/${industry.slug}`}>{industry.title} in Detail</Button>
            <TextLink to="/contact#enquiry" className="text-forest">
              Discuss Your Requirements
            </TextLink>
          </div>
        </div>

        <div className={`grid grid-cols-5 gap-4 lg:col-span-5 ${flip ? 'lg:col-start-8' : 'lg:order-first'}`}>
          <Reveal className="col-span-3 aspect-[3/4] overflow-hidden">
            <Img photo={industry.photo} sizes="(min-width: 1024px) 25vw, 60vw" />
          </Reveal>
          <Reveal className="col-span-2 mt-16 aspect-[2/3] overflow-hidden">
            <Img photo={industry.gallery[0]} sizes="(min-width: 1024px) 17vw, 40vw" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const frozen = industryBySlug('frozen-food-production')!;
  const food = industryBySlug('food-manufacturing')!;
  const logistics = industryBySlug('warehousing-logistics')!;
  const retail = industryBySlug('retail')!;

  return (
    <>
      <Seo
        title="Our Expertise — Frozen Food, Food Production & Logistics Workforces"
        description="INDO’s workforce expertise: frozen food manufacturing, food production and processing, and warehousing and logistics. Specialist food factory staffing and workforce management across the UK."
        path="/industries"
      />

      <PageHero
        title="Workforce expertise built in frozen food manufacturing."
        intro="Our experience is rooted in food production environments — above all frozen and processed food — and extends from the production line through packing, warehousing and dispatch."
        photo={photos.productionWide}
      />

      {/* Frozen food — given the most space as INDO's specialism */}
      <section id={frozen.slug} aria-labelledby="frozen-title" className="section-generous on-dark mt-20 bg-midnight text-ivory lg:mt-28">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="inline-block bg-lime px-3 py-1.5 text-kicker text-midnight">Our specialism</p>
              <h2 id="frozen-title" className="text-h1 mt-6 max-w-[14ch]">
                {frozen.title}
              </h2>
            </div>
            <p className="text-lead text-on-dark-muted lg:col-span-5">{frozen.intro}</p>
          </div>

          <div className="mt-16">
            <ProductGallery tone="dark" />
          </div>

          <div className="mt-16 grid gap-10 border-t border-rule-dark pt-12 md:grid-cols-3">
            {frozen.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="text-title-s">{s.heading}</h3>
                <p className="mt-3 text-on-dark-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button to={`/industries/${frozen.slug}`} variant="lime">
              Frozen Food Manufacturing in Detail
            </Button>
            <Button to="/contact#enquiry" variant="ghost-light">
              Discuss Your Requirements
            </Button>
          </div>
        </div>
      </section>

      <SectorSection industry={food} />
      <SectorSection industry={logistics} flip />

      {/* Wider experience — retail kept, but below the primary sectors */}
      <section id={retail.slug} aria-labelledby="retail-title" className="section-tight border-t border-stone-2">
        <div className="container-page grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
          <Reveal className="aspect-[4/3] overflow-hidden md:col-span-4">
            <Img photo={retail.photo} sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <h2 id="retail-title" className="text-h3 text-midnight">
              {retail.title}
            </h2>
            <p className="mt-3 text-ink-soft">{retail.intro}</p>
            <TextLink to={`/industries/${retail.slug}`} className="mt-6 text-forest">
              Retail Workforce Experience
            </TextLink>
          </div>
        </div>
      </section>

      <CtaSection
        title="Tell us about your production environment."
        body="Whether you produce frozen, chilled or processed foods, or run the warehouse and logistics operation behind them, we would be glad to understand your workforce requirements."
        photo={frozen.ctaPhoto}
      />
    </>
  );
}
