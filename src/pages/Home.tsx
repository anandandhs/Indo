import { site } from '../config/site';
import { reasons } from '../data/workforce';
import { Button, TextLink } from '../components/ui/Button';
import { ClientLogo } from '../components/ui/ClientLogo';
import { Seo } from '../components/ui/Seo';
import { CapabilityPanels } from '../components/sections/CapabilityPanels';
import { CtaSection } from '../components/sections/CtaSection';
import { HomeHero } from '../components/sections/HomeHero';
import { OperationFlow } from '../components/sections/OperationFlow';
import { ProductGallery } from '../components/sections/ProductGallery';
import { SolutionModules } from '../components/sections/SolutionModules';

/**
 * Home is kept to six sections: what INDO does, for whom, how, and why — then the enquiry.
 * Recruitment criteria, onboarding support, compliance and the recruitment journey live on About;
 * capacity scenarios live on What We Do.
 */

/** Client sectors confirmed in INDO's existing approved content. */
const relationshipTypes = ['Frozen food manufacturers', 'Food production businesses', 'Retail operators'];

/**
 * Reasons that add something new on Home. Flexibility and scalability are already shown by the
 * workforce solutions above, and "Client partnership" is this section's own subject.
 */
const homeReasons = reasons.filter((r) =>
  ['Experience', 'Operational understanding', 'Compliance focus', 'Partnership approach'].includes(r.title),
);

export function Home() {
  return (
    <>
      <Seo
        title="INDO | Frozen Food Workforce Solutions & Labour Supply UK"
        description={site.description}
        path="/"
      />

      <HomeHero />

      {/* Experience and expertise */}
      <section aria-labelledby="expertise-title" className="section-generous">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="expertise-title" className="text-h1 max-w-[17ch] text-midnight">
                Specialist workforce expertise. Built around food manufacturing.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lead text-ink-soft">
                Frozen food manufacturing requires dependable people, consistent staffing and an understanding of
                demanding production environments. INDO brings experience in sourcing, recruiting and managing
                workforces for businesses producing frozen and processed food products.
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <ProductGallery />
          </div>

          <div className="mt-12 lg:mt-6">
            <TextLink to="/industries/frozen-food-production" className="text-forest">
              Our Frozen Food Manufacturing Expertise
            </TextLink>
          </div>
        </div>
      </section>

      {/* Workforce capabilities */}
      <section aria-labelledby="capabilities-title" className="section-standard on-dark bg-midnight text-ivory">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="capabilities-title" className="text-h2 max-w-[20ch]">
                From production floor to dispatch. We help keep operations moving.
              </h2>
            </div>
            <p className="text-lead text-on-dark-muted lg:col-span-5">
              Four areas of operational workforce that INDO sources, supplies and manages for food manufacturing,
              warehouse and logistics businesses.
            </p>
          </div>

          <div className="mt-14">
            <CapabilityPanels />
          </div>

          <div className="mt-12 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
            <Button to="/contact#enquiry" variant="lime">
              Discuss Your Workforce Requirements
            </Button>
            <TextLink to="/what-we-do#operational-workforce" className="text-lime">
              Operational Workforce in Detail
            </TextLink>
          </div>
        </div>
      </section>

      {/* Workforce solutions */}
      <section aria-labelledby="solutions-title" className="section-standard bg-stone">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="solutions-title" className="text-h2 max-w-[19ch] text-midnight">
                Workforce solutions that adapt to your production demands.
              </h2>
            </div>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Workforce requirements vary from one business to the next — and from one month to the next. INDO
              provides flexible arrangements built around each client’s needs, from immediate cover to long-term
              provision.
            </p>
          </div>

          <div className="mt-14">
            <SolutionModules />
          </div>

          <div className="mt-12 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
            <Button to="/contact#urgent">Request Cover This Week</Button>
            <TextLink to="/what-we-do" className="text-forest">
              Explore Workforce Solutions
            </TextLink>
          </div>
        </div>
      </section>

      {/* Understanding the manufacturing environment */}
      <section aria-labelledby="environment-title" className="section-standard">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="environment-title" className="text-h2 max-w-[19ch] text-midnight">
                We understand what keeps a production environment running.
              </h2>
            </div>
            <p className="text-lead text-ink-soft lg:col-span-5 lg:pt-12">
              Food manufacturing is a demanding, highly structured environment where workforce availability,
              productivity, quality and consistency all play an important role.
            </p>
          </div>

          <div className="mt-16 lg:mt-20">
            <OperationFlow />
          </div>

          <div className="mt-12">
            <TextLink to="/about" className="text-forest">
              How We Recruit and Manage a Workforce
            </TextLink>
          </div>
        </div>
      </section>

      {/* Why INDO and client partnerships */}
      <section aria-labelledby="why-title" className="section-standard bg-stone">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="why-title" className="text-h1 max-w-[13ch] text-midnight">
              A workforce partner. Not just a labour supplier.
            </h2>
            <p className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-midnight pb-6">
              <span className="text-display leading-none text-midnight">
                {site.facts.clients}
              </span>
              <span className="max-w-[16ch] text-title-s text-midnight">client relationships and counting</span>
            </p>
            <ul className="mt-2">
              {relationshipTypes.map((t) => (
                <li key={t} className="flex items-center gap-4 border-b border-stone-2 py-4 text-title-s text-ink">
                  <span aria-hidden="true" className="size-2 shrink-0 bg-forest" />
                  <span className="min-w-0">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            {homeReasons.map((r) => (
              <li key={r.title} className="border-t border-stone-2 py-8 first:border-t-0 first:pt-0 lg:py-10">
                <h3 className="text-statement text-forest">{r.title}</h3>
                <p className="mt-3 text-ink-soft">{r.body}</p>
              </li>
            ))}
          </ul>

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
