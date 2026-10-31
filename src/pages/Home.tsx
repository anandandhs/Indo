import { site } from '../config/site';
import { photos } from '../data/images';
import { industries } from '../data/industries';
import { services } from '../data/services';
import { Button, TextLink } from '../components/ui/Button';
import { ClientLogo } from '../components/ui/ClientLogo';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { HomeHero } from '../components/sections/HomeHero';
import { IndustryCard } from '../components/sections/IndustryCard';
import { ServiceCard } from '../components/sections/ServiceCard';
import { Stats } from '../components/sections/Stats';

const reasons = [
  {
    title: 'Industry experience',
    body: 'Years of experience working with food production and retail businesses, including specialist frozen food manufacturing.',
  },
  {
    title: 'A practical approach',
    body: 'We start from the actual workforce requirements of your operation — the lines, the shifts, the store rota.',
  },
  {
    title: 'People-focused',
    body: 'Dependable teams are central to successful operations, so we treat the people we supply as the core of the service.',
  },
  {
    title: 'A workforce partner',
    body: 'Professional, long-term client relationships built through sourcing and ongoing workforce management.',
  },
];

const relationshipTypes = ['Frozen food manufacturers', 'Food production businesses', 'Retail operators'];

export function Home() {
  const [food, frozen, retail] = industries;

  return (
    <>
      <Seo
        title="Indo | Workforce Procurement & Management for Food and Retail"
        description="Indo is a UK workforce partner that sources, supplies and manages dependable labour for food manufacturing, frozen food production and retail businesses."
        path="/"
      />

      <HomeHero />
      <Stats />

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="section-standard">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:pt-6">
            <h2 id="intro-title" className="text-h2 max-w-[14ch] text-midnight">
              More than manpower. A workforce partner.
            </h2>
            <p className="text-lead mt-8 text-ink-soft">
              Every operation has its own workforce demands. From food production lines to fast-moving retail
              environments, having the right people in the right roles makes a difference.
            </p>
            <p className="mt-5 text-ink-soft">
              Indo combines industry experience with a practical understanding of workforce procurement and management
              to support the businesses we work with.
            </p>
            <div className="mt-10">
              <Button to="/about" variant="secondary">
                Discover Indo
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <Reveal className="aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Img photo={photos.lineOperative} sizes="(min-width: 1024px) 45vw, 100vw" position="62% center" />
            </Reveal>
            <Reveal className="absolute -bottom-10 -left-4 hidden aspect-square w-[38%] overflow-hidden border-8 border-ivory sm:block lg:-left-24">
              <Img photo={photos.qualityHands} sizes="20vw" position="center 30%" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="services-title" className="section-standard bg-stone">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h2 id="services-title" className="text-h2 max-w-[18ch] text-midnight lg:col-span-7">
              From finding the right people to keeping them working well.
            </h2>
            <div className="lg:col-span-5">
              <p className="text-lead text-ink-soft">
                Four connected areas of support, shaped around how food production and retail operations really run.
              </p>
              <Button to="/what-we-do" className="mt-8">
                Explore Our Services
              </Button>
            </div>
          </div>

          <ul className="mt-14 grid gap-px bg-stone-2 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries */}
      <section aria-labelledby="industries-title" className="section-generous">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="industries-title" className="text-h2 text-midnight lg:col-span-6">
              Industries we serve
            </h2>
            <p className="text-lead text-ink-soft lg:col-span-5 lg:col-start-8">
              We specialise in operationally demanding sectors where workforce availability directly affects output and
              service.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <li>
              <IndustryCard industry={food} />
            </li>
            <li className="lg:mt-20">
              <IndustryCard industry={frozen} tag="Our specialism" />
            </li>
            <li className="sm:col-span-2 lg:col-span-1">
              <IndustryCard industry={retail} className="sm:aspect-[16/9] lg:aspect-[3/4]" />
            </li>
          </ul>

          <div className="mt-12 lg:-mt-6">
            <TextLink to="/industries" className="text-forest">
              Explore Our Industries
            </TextLink>
          </div>
        </div>
      </section>

      {/* Why Indo */}
      <section aria-labelledby="why-title" className="section-standard border-t border-stone-2">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 id="why-title" className="text-h2 max-w-[15ch] text-midnight">
                Experience that understands the work behind the work.
              </h2>
              <Reveal className="mt-10 hidden aspect-[4/3] overflow-hidden lg:block">
                <Img photo={photos.kitchenVats} sizes="40vw" />
              </Reveal>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {reasons.map((r) => (
              <li key={r.title} className="grid gap-4 border-t border-stone-2 py-10 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_1.1fr] sm:gap-10 lg:py-12">
                <h3 className="text-statement text-forest">
                  {r.title}
                </h3>
                <p className="text-ink-soft sm:pt-2">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client relationships */}
      <section aria-labelledby="clients-title" className="section-standard bg-stone">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="clients-title" className="text-h2 max-w-[16ch] text-midnight">
              Built on experience. Strengthened by partnerships.
            </h2>
            <p className="text-lead mt-8 max-w-[50ch] text-ink-soft">
              Every client has different operational demands. Our experience across food production and retail has
              helped us understand the importance of dependable workforce partnerships.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-midnight pb-6">
              <span className="font-display text-[clamp(4rem,3rem+4vw,7rem)] font-extrabold leading-none tracking-[-0.05em] text-midnight">
                {site.facts.clients}
              </span>
              <span className="max-w-[16ch] text-title-s text-midnight">
                client relationships and counting
              </span>
            </p>
            <ul className="mt-2">
              {relationshipTypes.map((t) => (
                <li key={t} className="flex items-center gap-4 border-b border-stone-2 py-5 text-title-s text-ink">
                  <span aria-hidden="true" className="size-2 shrink-0 bg-forest" />
                  <span className="min-w-0">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {site.clientLogos.length > 0 && (
            // Each tile draws its own border, so a partly filled last row leaves no empty block.
            <ul aria-label="Clients we have worked with" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-12 lg:grid-cols-6">
              {site.clientLogos.map((logo) => (
                <li key={logo.name} className="flex h-28 items-center justify-center border border-stone-2 p-6">
                  <ClientLogo name={logo.name} src={logo.src} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
