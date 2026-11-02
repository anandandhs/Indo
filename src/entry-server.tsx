import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { site } from './config/site';
import { pageModule, prerenderPaths, routes } from './routes';

export { pageModule, prerenderPaths };
export const siteUrl = site.url ?? '';

/** Renders one route to HTML at build time (used by scripts/prerender.mjs). */
export async function render(path: string) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`https://prerender.local${path}`));
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${path}`);
  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  );
}
