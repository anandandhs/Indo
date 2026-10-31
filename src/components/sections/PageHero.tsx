import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Photo } from '../../data/images';
import { Img } from '../ui/Img';

type Crumb = { label: string; to?: string };

type Props = {
  title: ReactNode;
  intro: ReactNode;
  /** Trail back to a parent page — only where the page sits below another one. */
  breadcrumb?: Crumb[];
  photo?: Photo;
  photoPosition?: string;
  children?: ReactNode;
};

/** Inner-page hero: headline and intro side by side, wide photograph beneath. */
export function PageHero({ title, intro, breadcrumb, photo, photoPosition, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="pt-12 sm:pt-16 lg:pt-20">
      <div className="container-page">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="rise mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-ink-soft">
              {breadcrumb.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="size-1 bg-ink-soft/60" />}
                  {c.to ? (
                    <Link to={c.to} className="underline decoration-ink-soft/40 underline-offset-4 hover:text-forest hover:decoration-forest">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 id="page-title" className="rise text-h1 text-midnight lg:col-span-7" style={{ animationDelay: '80ms' }}>
            {title}
          </h1>
          <div className="rise lg:col-span-5 lg:pb-2" style={{ animationDelay: '200ms' }}>
            <p className="text-lead text-ink-soft">{intro}</p>
            {children}
          </div>
        </div>
      </div>
      {photo && (
        <div className="container-page mt-12 lg:mt-16">
          <div className="open-x aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
            <Img photo={photo} sizes="(min-width: 1408px) 1296px, 100vw" priority position={photoPosition} />
          </div>
        </div>
      )}
    </section>
  );
}
