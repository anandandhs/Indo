import type { RouteObject } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { industries } from './data/industries';
import { RouteError } from './pages/RouteError';

/**
 * Shared by the browser router (main.tsx) and the build-time prerenderer (entry-server.tsx).
 * Each page is its own chunk, so a visitor downloads only the page they open. The prerenderer
 * resolves these before rendering, and main.tsx resolves the current page's chunk before
 * hydrating, so the static HTML and the first client render always match.
 */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        // Errors render inside the layout, so the header, footer and navigation keep working.
        // RouteError is bundled up front: it must be available when a page chunk fails to load.
        errorElement: <RouteError />,
        children: [
          { path: '/', lazy: () => import('./pages/Home').then((m) => ({ Component: m.Home })) },
          { path: '/about', lazy: () => import('./pages/About').then((m) => ({ Component: m.About })) },
          { path: '/what-we-do', lazy: () => import('./pages/WhatWeDo').then((m) => ({ Component: m.WhatWeDo })) },
          { path: '/industries', lazy: () => import('./pages/Industries').then((m) => ({ Component: m.Industries })) },
          {
            path: '/industries/:slug',
            lazy: () => import('./pages/IndustryDetail').then((m) => ({ Component: m.IndustryDetail })),
          },
          { path: '/contact', lazy: () => import('./pages/Contact').then((m) => ({ Component: m.Contact })) },
          {
            path: '/privacy-policy',
            lazy: () => import('./pages/Legal').then((m) => ({ element: <m.Legal kind="privacy" /> })),
          },
          {
            path: '/cookie-policy',
            lazy: () => import('./pages/Legal').then((m) => ({ element: <m.Legal kind="cookies" /> })),
          },
          { path: '*', lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })) },
        ],
      },
    ],
  },
];

/** Every page written to static HTML at build time. */
export const prerenderPaths = [
  '/',
  '/about',
  '/what-we-do',
  '/industries',
  ...industries.map((i) => `/industries/${i.slug}`),
  '/contact',
  '/privacy-policy',
  '/cookie-policy',
];

/** Source module behind each prerendered path, so the prerenderer can preload its chunk. */
export function pageModule(path: string) {
  if (path === '/') return 'src/pages/Home.tsx';
  if (path === '/about') return 'src/pages/About.tsx';
  if (path === '/what-we-do') return 'src/pages/WhatWeDo.tsx';
  if (path === '/industries') return 'src/pages/Industries.tsx';
  if (path.startsWith('/industries/')) return 'src/pages/IndustryDetail.tsx';
  if (path === '/contact') return 'src/pages/Contact.tsx';
  if (path === '/privacy-policy' || path === '/cookie-policy') return 'src/pages/Legal.tsx';
  return 'src/pages/NotFound.tsx';
}
