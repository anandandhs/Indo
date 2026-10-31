import { photos } from '../data/images';
import { industries } from '../data/industries';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { TextLink } from '../components/ui/Button';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';
import { Stats } from '../components/sections/Stats';

const frozenProducts = ['Frozen pizzas', 'French fries', 'Frozen fillets', 'Other processed and frozen foods'];

const approach = [
  {
    title: 'Understand the operation',
    body: 'We start with how your site or store actually runs: the roles, the shift patterns, the pressure points.',
  },
  {
    title: 'Source the right people',
    body: 'We find and supply people suited to the work and the environment, at the volumes you need.',
  },
  {
    title: 'Place and prepare',
    body: 'People are placed into the right roles and shifts, ready to contribute from the start.',
  },
  {
    title: 'Manage and adapt',
    body: 'We stay involved, coordinating the workforce and adjusting as your demands change.',
  },
];

export function About() {
  return (
    <>
      <Seo
        title="About Indo"
        description="Indo is an experienced UK workforce partner, procuring and managing labour for food production, frozen food manufacturing and retail businesses."
        path="/about"
      />

      <PageHero
        title="We understand people. We understand operations."
        intro="Indo is a workforce partner for businesses in the food production and retail industries. For years, we have procured, supplied and managed the labour that keeps demanding operations running."
        photo={photos.productionWide}
      />

      {/* Background */}
      <section aria-labelledby="background-title" className="section-standard">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h2 id="background-title" className="text-h2 text-midnight lg:col-span-5">
            A workforce partner, not just a supplier.
          </h2>
          <div className="space-y-6 text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="text-lead text-ink">
              Our work rests on a simple understanding: in high-volume food and retail operations, the right people —
              available, prepared and well managed — are what keep the business moving.
            </p>
            <p>
              Over many years, we have worked with more than ten clients to source, supply and manage their workforces.
              That experience has given us a practical, on-the-ground view of what production lines and retail floors
              need from the people working on them.
            </p>
            <p>
              We combine that operational understanding with the day-to-day work of workforce procurement and
              management, so our clients can focus on running their operations.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      {/* Experience across food and retail */}
      <section aria-labelledby="sectors-title" className="section-standard">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="sectors-title" className="text-h2 max-w-[16ch] text-midnight lg:col-span-7">
              Experience across food production and retail.
            </h2>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Our clients operate in sectors where output, hygiene and service all depend on having dependable people in
              place.
            </p>
          </div>

          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Reveal className="aspect-[4/3] overflow-hidden">
                  <Img photo={industry.gallery[0]} sizes="(min-width: 768px) 33vw, 100vw" />
                </Reveal>
                <h3 className="text-h3 mt-6 text-midnight">{industry.title}</h3>
                <p className="mt-3 text-ink-soft">{industry.card}</p>
                <TextLink to={`/industries/${industry.slug}`} className="mt-5 text-forest">
                  More on {industry.title}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Frozen food spotlight */}
      <section aria-labelledby="frozen-title" className="section-generous on-dark bg-midnight text-ivory">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="frozen-title" className="text-h2 max-w-[16ch]">
              Specialist experience in frozen food manufacturing.
            </h2>
            <p className="text-lead mt-8 max-w-[48ch] text-on-dark-muted">
              Frozen food is where our experience runs deepest. We have sourced and managed workforces involved in
              producing a range of processed and frozen food products.
            </p>
            <ul className="mt-12 border-t border-rule-dark">
              {frozenProducts.map((p) => (
                <li
                  key={p}
                  className="border-b border-rule-dark py-5 text-statement"
                >
                  {p}
                </li>
              ))}
            </ul>
            <TextLink to="/industries/frozen-food-production" className="mt-10 text-lime">
              Our Frozen Food Experience
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
              <Img photo={photos.fishLineTeam} sizes="(min-width: 1024px) 20vw, 50vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="section-standard">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="approach-title" className="text-h2 max-w-[18ch] text-midnight lg:col-span-7">
              How we approach every workforce partnership.
            </h2>
            <p className="text-lead text-ink-soft lg:col-span-5">
              Every client relationship follows the same practical path, adapted to the operation in front of us.
            </p>
          </div>

          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {approach.map((step, i) => (
              <li key={step.title}>
                <span className="text-kicker text-forest">Step {i + 1}</span>
                <div aria-hidden="true" className="mt-4 flex h-1 gap-1">
                  {approach.map((s, j) => (
                    <span key={s.title} className={`flex-1 ${j <= i ? 'bg-lime' : 'bg-stone-2'}`} />
                  ))}
                </div>
                <h3 className="text-h3 mt-8 text-midnight">{step.title}</h3>
                <p className="mt-3 text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        title="Let’s talk about the people your operation needs."
        body="Whether you run a production site or a retail operation, we would be glad to understand your workforce requirements."
        photo={photos.kitchenTeam}
      />
    </>
  );
}
