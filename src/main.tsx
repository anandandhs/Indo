import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, matchRoutes, type RouteObject } from 'react-router-dom';
import { App } from './App';
import { routes } from './routes';
import './index.css';

/**
 * Load the current page's chunk before the first render. Without this the router would render
 * nothing while the chunk downloads, which would not match the prerendered HTML.
 */
async function resolveLazy(matches: { route: RouteObject }[] | null) {
  await Promise.all(
    (matches ?? [])
      .filter((m) => typeof m.route.lazy === 'function')
      .map(async ({ route }) => {
        const loaded = await (route.lazy as () => Promise<Partial<RouteObject>>)();
        Object.assign(route, { ...loaded, lazy: undefined });
      }),
  );
}

/** Fetch a page's chunk when a link to it is hovered or focused, so navigation feels instant. */
function prefetchOnIntent() {
  const done = new Set<string>();
  const prefetch = (e: Event) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="/"]');
    const path = link?.getAttribute('href')?.split('#')[0];
    if (!path || done.has(path)) return;
    done.add(path);
    for (const { route } of matchRoutes(routes, path) ?? []) {
      if (typeof route.lazy === 'function') void (route.lazy as () => Promise<unknown>)();
    }
  };
  document.addEventListener('pointerover', prefetch, { passive: true });
  document.addEventListener('focusin', prefetch);
}

await resolveLazy(matchRoutes(routes, window.location));
const router = createBrowserRouter(routes);
const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App router={router} />
  </StrictMode>
);

// Prerendered pages are hydrated. The shared 404 page (served for any unknown URL) and
// the dev server have no matching markup for the current route, so they render fresh.
if (container.firstElementChild && !container.hasAttribute('data-fresh-render')) {
  hydrateRoot(container, app);
} else {
  removePrerenderedHead();
  createRoot(container).render(app);
}

/**
 * A fresh render adds the page's own <title> and meta tags, so drop the ones written into the
 * HTML at build time (between the head:start/head:end markers) rather than ship duplicates.
 */
function removePrerenderedHead() {
  let inBlock = false;
  for (const node of [...document.head.childNodes]) {
    if (node.nodeType === Node.COMMENT_NODE) {
      if (node.nodeValue === 'head:start') inBlock = true;
      if (node.nodeValue === 'head:end') inBlock = false;
      continue;
    }
    if (inBlock && node instanceof Element && /^(TITLE|META)$/.test(node.tagName)) node.remove();
  }
}
prefetchOnIntent();
