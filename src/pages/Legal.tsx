import { Seo } from '../components/ui/Seo';
import { Placeholder } from '../components/ui/Placeholder';

type Props = { kind: 'privacy' | 'cookies' };

const copy = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    description: 'How INDO collects, uses and protects personal information.',
  },
  cookies: {
    title: 'Cookie Policy',
    path: '/cookie-policy',
    description: 'How the INDO website uses cookies and similar technologies.',
  },
};

/**
 * Legal pages. The policy wording must be supplied by Indo (or its legal
 * adviser) — it is deliberately not drafted here. TO CONFIRM
 */
export function Legal({ kind }: Props) {
  const page = copy[kind];
  return (
    <>
      <Seo title={page.title} description={page.description} path={page.path} />
      <section aria-labelledby="page-title" className="py-20 lg:py-28">
        <div className="container-page max-w-[52rem]">
          <h1 id="page-title" className="text-h1 text-midnight">
            {page.title}
          </h1>
          <p className="text-lead mt-6 text-ink-soft">{page.description}</p>
          <div className="mt-12 border-t border-stone-2 pt-10 text-ink-soft">
            <Placeholder>{`${page.title} wording to be supplied by INDO`}</Placeholder>
          </div>
        </div>
      </section>
    </>
  );
}
