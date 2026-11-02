import { site } from '../../config/site';

type Props = { title: string; description: string; path: string; noindex?: boolean };

const shareImage = { path: '/images/hero-production-line-1600.webp', width: 1600, height: 1067 };

/**
 * Page metadata. React 19 hoists these tags into <head>, and the build-time prerender
 * writes them into each page's static HTML so link previews and crawlers see them.
 */
export function Seo({ title, description, path, noindex = false }: Props) {
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const base = site.url?.replace(/\/$/, '') ?? '';
  const url = base && !noindex ? `${base}${path}` : null;
  // Social crawlers need an absolute image URL; fall back to a relative one in local builds.
  const image = `${base}${shareImage.path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(shareImage.width)} />
      <meta property="og:image:height" content={String(shareImage.height)} />
      <meta property="og:image:alt" content="Operatives working along a food production line" />
      <meta name="twitter:card" content="summary_large_image" />
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
    </>
  );
}
