// Writes static HTML for every route after `vite build`, so pages paint before JavaScript
// loads and link previews, crawlers and no-JS visitors get real content.
//   dist/index.html, dist/about.html, dist/industries/retail.html, …  (hydrated by src/main.tsx)
//   dist/404.html                               (served by Vercel for unknown URLs)
//   dist/sitemap.xml                            (only when the site URL is known)
import { readFile, writeFile, mkdir, rm, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SERVER = 'dist-server';
const { render, prerenderPaths, pageModule, siteUrl } = await import(pathToFileURL(path.resolve(SERVER, 'entry-server.js')).href);
const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

// Each page's code is a separate chunk. Preload it (and the chunks it imports) from the HTML so
// it downloads alongside the main script instead of after it.
const MANIFEST = path.join(DIST, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
/** Every chunk file reachable from a manifest key through static imports. */
function closure(key, files = new Set()) {
  const chunk = manifest[key];
  if (!chunk || files.has(chunk.file)) return files;
  files.add(chunk.file);
  (chunk.imports ?? []).forEach((k) => closure(k, files));
  return files;
}
// Vite already preloads the entry and its static imports in index.html; skip those.
const alreadyLoaded = closure('index.html');
function preloads(route) {
  const files = [...closure(pageModule(route))].filter((f) => !alreadyLoaded.has(f));
  if (!manifest[pageModule(route)]) throw new Error(`No chunk found in the manifest for ${route}`);
  return files.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join('');
}

const HEAD_BLOCK = /<!--head:start-->[\s\S]*?<!--head:end-->/;
const ROOT = '<div id="root"></div>';
if (!HEAD_BLOCK.test(template) || !template.includes(ROOT)) throw new Error('index.html is missing the prerender markers');

/** React 19 emits a page's hoistable tags (title, meta, preload links) ahead of its markup. */
function splitHead(html) {
  const hoistable = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
  let head = '';
  let rest = html;
  for (let m = rest.match(hoistable); m; m = rest.match(hoistable)) {
    head += m[0];
    rest = rest.slice(m[0].length);
  }
  return { head, body: rest };
}

async function page(route, file, rootAttrs = '') {
  const { head, body } = splitHead(await render(route));
  if (!/<title>/.test(head)) throw new Error(`No <title> rendered for ${route}`);
  const html = template
    .replace(HEAD_BLOCK, `<!--head:start-->${head}${preloads(route)}<!--head:end-->`)
    .replace(ROOT, `<div id="root"${rootAttrs}>${body}</div>`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  return Buffer.byteLength(html);
}

for (const route of prerenderPaths) {
  // /about → dist/about.html; Vercel serves it at /about via "cleanUrls" (vercel.json).
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route}.html`);
  const bytes = await page(route, file);
  console.log(`  ${route.padEnd(36)} ${(bytes / 1024).toFixed(1)} kB`);
}
// One 404 page for every unknown URL; rendered fresh on load because its URL varies.
await page('/__not-found__', path.join(DIST, '404.html'), ' data-fresh-render');
console.log(`  ${'404.html'.padEnd(36)} written`);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = prerenderPaths.map((r) => `  <url><loc>${siteUrl}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`);
  await writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  await appendFile(path.join(DIST, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`  sitemap.xml for ${siteUrl}`);
}

// The Content-Security-Policy in vercel.json allows inline scripts only by hash. If an inline
// script changes, fail the build here rather than ship pages whose script the browser blocks.
const { createHash } = await import('node:crypto');
const csp = JSON.stringify(JSON.parse(await readFile('vercel.json', 'utf8')).headers);
for (const m of template.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
  const hash = `sha256-${createHash('sha256').update(m[1]).digest('base64')}`;
  if (!csp.includes(hash)) throw new Error(`Inline script hash ${hash} is missing from the CSP in vercel.json`);
}

await rm(SERVER, { recursive: true, force: true });
await rm(path.dirname(MANIFEST), { recursive: true, force: true }); // build-time only; not for publishing
console.log(`Prerendered ${prerenderPaths.length} pages + 404.`);
