import { Link } from 'react-router-dom';
import type { Industry } from '../../data/industries';
import { Img } from '../ui/Img';

type Props = { industry: Industry; tag?: string; className?: string };

/** Tall photographic card. The photo slowly zooms and the panel lifts on hover. */
export function IndustryCard({ industry, tag, className = '' }: Props) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className={`group on-dark relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-midnight text-ivory sm:aspect-[3/4] ${className}`}
    >
      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-(--ease-out-expo) group-hover:scale-[1.05]">
        <Img photo={industry.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-midnight/95 via-midnight/70 via-38% to-transparent to-70%"
      />
      {tag && (
        <span className="absolute left-0 top-0 bg-lime px-4 py-2 text-kicker text-midnight">
          {tag}
        </span>
      )}
      <div className="relative p-6 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1.5 sm:p-8">
        <h3 className="text-h3 text-ivory">{industry.title}</h3>
        <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-on-dark-muted">{industry.card}</p>
        <span className="mt-6 inline-block text-label text-lime underline decoration-lime/40 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-lime">
          Explore {industry.title}
        </span>
      </div>
    </Link>
  );
}
