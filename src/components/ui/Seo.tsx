import { site } from '../../config/site';

type Props = { title: string; description: string; path: string };

/** Page metadata. React 19 hoists these tags into <head>. */
export function Seo({ title, description, path }: Props) {
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const url = site.url ? `${site.url.replace(/\/$/, '')}${path}` : null;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="/images/hero-production-line-1600.webp" />
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
    </>
  );
}
