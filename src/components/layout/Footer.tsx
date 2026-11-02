import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { nav, site } from '../../config/site';
import { primaryIndustries } from '../../data/industries';
import { solutions } from '../../data/workforce';
import { Logo } from '../ui/Logo';

const linkClass = 'text-on-dark-muted transition-colors duration-200 hover:text-lime';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-label text-ivory">{title}</h2>
      <ul className="mt-5 space-y-3 text-small">{children}</ul>
    </div>
  );
}

export function Footer() {
  const { contact, legal, social } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-midnight text-ivory">
      <div className="container-page pb-10 pt-20 lg:pt-24">
        <div className="grid gap-14 xl:grid-cols-12 xl:gap-8">
          <div className="xl:col-span-4">
            <Link to="/" aria-label="INDO home" className="inline-block">
              <Logo on="dark" className="h-16" lazy />
            </Link>
            <p className="mt-6 max-w-[34ch] text-on-dark-muted">
              Workforce procurement and management for frozen food manufacturing, food production, warehousing and
              logistics operations across the UK.
            </p>
            <p className="mt-6 text-label text-lime">{site.positioning}.</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:col-span-8">
            <Column title="Company">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </Column>

            <Column title="Workforce solutions">
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link to={`/what-we-do#solution-${s.id}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </Column>

            <Column title="Our expertise">
              {primaryIndustries.map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries/${i.slug}`} className={linkClass}>
                    {i.title}
                  </Link>
                </li>
              ))}
            </Column>

            {/* Only confirmed details are shown publicly; missing ones are tracked in the README checklist. */}
            <Column title="Contact">
              {contact.email && (
                <li className="text-on-dark-muted">
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li className="text-on-dark-muted">
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="text-on-dark-muted">
                  <address className="not-italic">
                    {contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
              <li>
                <Link to="/contact#urgent" className={linkClass}>
                  Need Cover This Week?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-semibold text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime">
                  Discuss Your Workforce Needs
                </Link>
              </li>
            </Column>
          </div>
        </div>

        {social.length > 0 && (
          <ul className="mt-14 flex flex-wrap gap-6 text-small">
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 flex flex-col gap-4 border-t border-rule-dark pt-8 text-meta text-on-dark-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legal.companyName ?? site.name}. All rights reserved.
            {legal.companyNumber && <> Registered in England and Wales, company no. {legal.companyNumber}.</>}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link to="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className={linkClass}>
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
