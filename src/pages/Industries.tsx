import { photos } from '../data/images';
import { industries } from '../data/industries';
import { Button, TextLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { Seo } from '../components/ui/Seo';
import { CtaSection } from '../components/sections/CtaSection';
import { PageHero } from '../components/sections/PageHero';

export function Industries() {
  const [food, frozen, retail] = industries;

  return (
    <>
      <Seo
        title="Industries — Food Manufacturing, Frozen Food & Retail"
        description="Indo provides workforce procurement and management for food manufacturing, frozen food production and retail businesses across the UK."
        path="/industries"
      />

      <PageHero
        title="Specialists in food production and retail workforces."
        intro="We focus on sectors where people are central to output and service. Our experience across these industries means we understand the work before we supply the workforce."
        photo={photos.produceLine}
      />

      {/* Food manufacturing */}
      <section id={food.slug} aria-labelledby="food-title" className="section-standard">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="aspect-[4/3] overflow-hidden lg:col-span-6">
            <Img photo={food.photo} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="food-title" className="text-h2 text-midnight">
              {food.title}
            </h2>
            <p className="text-lead mt-6 text-ink-soft">{food.intro}</p>
            <ul className="mt-8 space-y-3">
              {food.sections.map((s) => (
                <li key={s.heading} className="flex gap-4 font-display font-bold text-ink">
                  <span aria-hidden="true" className="mt-[0.5em] size-2 shrink-0 bg-forest" />
                  <span className="min-w-0">{s.heading}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
              <Button to={`/industries/${food.slug}`}>Food Manufacturing in Detail</Button>
              <TextLink to="/contact" className="text-forest">
                Discuss Your Requirements
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Frozen food — given the most space as Indo's specialism */}
      <section id={frozen.slug} aria-labelledby="frozen-title" className="section-generous on-dark bg-midnight text-ivory">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="inline-block bg-lime px-3 py-1.5 text-kicker text-midnight">
                Our specialism
              </p>
              <h2 id="frozen-title" className="text-h1 mt-6 max-w-[14ch]">
                {frozen.title}
              </h2>
            </div>
            <p className="text-lead text-on-dark-muted lg:col-span-5">{frozen.intro}</p>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {[
              { label: 'Frozen pizzas', photo: photos.pizzaDetail },
              { label: 'French fries', photo: photos.sortingLine },
              { label: 'Frozen fillets', photo: photos.frozenFillets },
              { label: 'Other frozen products', photo: photos.fishCrates },
            ].map((p) => (
              <li key={p.label}>
                <Reveal className="aspect-[3/4] overflow-hidden">
                  <Img photo={p.photo} sizes="(min-width: 1024px) 25vw, 50vw" />
                </Reveal>
                <p className="mt-4 text-title-s">{p.label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-10 border-t border-rule-dark pt-12 md:grid-cols-3">
            {frozen.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="text-title-s">{s.heading}</h3>
                <p className="mt-3 text-on-dark-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 xs:flex-row">
            <Button to={`/industries/${frozen.slug}`} variant="lime">
              Frozen Food Production in Detail
            </Button>
            <Button to="/contact" variant="ghost-light">
              Discuss Your Requirements
            </Button>
          </div>
        </div>
      </section>

      {/* Retail */}
      <section id={retail.slug} aria-labelledby="retail-title" className="section-standard">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="retail-title" className="text-h2 text-midnight">
              {retail.title}
            </h2>
            <p className="text-lead mt-6 text-ink-soft">{retail.intro}</p>
            <ul className="mt-8 space-y-3">
              {retail.sections.map((s) => (
                <li key={s.heading} className="flex gap-4 font-display font-bold text-ink">
                  <span aria-hidden="true" className="mt-[0.5em] size-2 shrink-0 bg-forest" />
                  <span className="min-w-0">{s.heading}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
              <Button to={`/industries/${retail.slug}`}>Retail in Detail</Button>
              <TextLink to="/contact" className="text-forest">
                Discuss Your Requirements
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-5 gap-4">
              <Reveal className="col-span-3 aspect-[3/4] overflow-hidden">
                <Img photo={retail.photo} sizes="(min-width: 1024px) 30vw, 60vw" />
              </Reveal>
              <Reveal className="col-span-2 mt-16 aspect-[2/3] overflow-hidden">
                <Img photo={photos.retailAisle} sizes="(min-width: 1024px) 20vw, 40vw" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Working in a sector we have not mentioned?"
        body="Our experience is rooted in food production and retail, but if your operation has similar workforce demands, we would be glad to talk."
        cta="Talk to Indo"
        photo={photos.retailCounter}
      />
    </>
  );
}
