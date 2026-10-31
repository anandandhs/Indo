import { Link } from 'react-router-dom';
import { primaryCta } from '../../config/site';
import { photos } from '../../data/images';
import { Button } from '../ui/Button';
import { Img } from '../ui/Img';

/**
 * Asymmetric home hero: headline on ivory to the left, a production-line
 * photograph that bleeds off the right edge of the viewport.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden lg:min-h-[min(46rem,calc(100svh-5rem))]">
      <div className="container-page relative grid lg:min-h-[inherit] lg:grid-cols-12">
        <div className="flex flex-col justify-center pb-12 pt-10 sm:pt-16 lg:col-span-7 lg:py-20 lg:pr-12 xl:pr-16">
          <h1 id="hero-title" className="text-display text-midnight">
            <span className="rise block" style={{ animationDelay: '80ms' }}>
              The right people.
            </span>
            <span className="rise block text-forest" style={{ animationDelay: '180ms' }}>
              Ready for the work that matters.
            </span>
          </h1>

          <p className="rise text-lead mt-8 max-w-[52ch] text-ink-soft" style={{ animationDelay: '300ms' }}>
            Indo helps businesses in the food production and retail industries source, supply and manage dependable
            workforces. Backed by years of industry experience, we understand the people and operational requirements
            that keep businesses moving.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ animationDelay: '400ms' }}>
            <Button to={primaryCta.to}>{primaryCta.label}</Button>
            <Button to="/what-we-do" variant="secondary">
              Explore What We Do
            </Button>
          </div>
        </div>
      </div>

      <div className="open-x relative -mx-0 aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[40vw]">
        <Img photo={photos.hero} sizes="(min-width: 1024px) 40vw, 100vw" priority position="40% center" />
        <Link
          to="/industries/frozen-food-production"
          className="group absolute bottom-0 left-0 m-4 max-w-[19rem] bg-ivory p-5 text-ink shadow-[0_18px_40px_-20px] shadow-midnight/50 transition-colors duration-300 hover:bg-lime sm:m-6 lg:m-8"
        >
          <span className="block text-kicker text-forest group-hover:text-midnight">
            Our specialism
          </span>
          <span className="mt-1 block text-title-s">
            Frozen food production — pizzas, fries, fillets and more
          </span>
        </Link>
      </div>
    </section>
  );
}
