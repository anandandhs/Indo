import { Link } from 'react-router-dom';
import { primaryCta } from '../../config/site';
import { photos } from '../../data/images';
import { products } from '../../data/workforce';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Img } from '../ui/Img';

/**
 * Asymmetric home hero: headline on ivory to the left, a production-line photograph
 * that bleeds off the right edge of the viewport, and a product strip beneath that
 * names the frozen food sectors INDO works in.
 */
export function HomeHero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="relative overflow-hidden lg:min-h-[min(48rem,calc(100svh-8rem))]">
        <div className="container-page relative grid lg:min-h-[inherit] lg:grid-cols-12">
          <div className="flex flex-col justify-center pb-12 pt-10 sm:pt-16 lg:col-span-7 lg:py-20 lg:pr-10 xl:col-span-6 xl:pr-6">
            <h1 id="hero-title" className="text-display text-midnight">
              <span className="rise block" style={{ animationDelay: '80ms' }}>
                The people behind
              </span>
              <span className="rise block text-forest" style={{ animationDelay: '180ms' }}>
                every successful production line.
              </span>
            </h1>

            <p className="rise text-lead mt-8 max-w-[50ch] text-ink-soft" style={{ animationDelay: '300ms' }}>
              From food production and processing to packing, warehousing and logistics, INDO provides dependable
              workforce solutions for businesses operating in the frozen food manufacturing industry.
            </p>

            <div className="rise mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ animationDelay: '400ms' }}>
              <Button to="/contact#enquiry">{primaryCta.label}</Button>
              <Button to="/industries" variant="secondary">
                Explore Our Expertise
              </Button>
            </div>
          </div>
        </div>

        <div className="open-x relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[42vw] xl:w-[46vw]">
          <Img photo={photos.hero} sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 42vw, 100vw" priority position="40% center" />
          <Link
            to="/industries/frozen-food-production"
            className="group absolute bottom-0 left-0 m-4 max-w-[20rem] bg-ivory p-5 text-ink shadow-[0_18px_40px_-20px] shadow-midnight/50 transition-colors duration-300 hover:bg-lime sm:m-6 lg:m-8"
          >
            <span className="block text-kicker text-forest group-hover:text-midnight">Our specialism</span>
            <span className="mt-1 block text-title-s">Frozen food manufacturing — production line to dispatch</span>
          </Link>
        </div>
      </section>

      {/* Product strip: establishes the sector immediately below the fold line. */}
      <section aria-label="Frozen and processed food sectors we support" className="on-dark bg-midnight text-ivory">
        <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10 lg:py-7">
          <Eyebrow tone="dark" marker={false} className="shrink-0">
            Workforce experience in
          </Eyebrow>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-label text-on-dark-muted">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-lime" />
                <span>{p.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
