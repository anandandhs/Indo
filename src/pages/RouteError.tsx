import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { site } from '../config/site';
import { Button } from '../components/ui/Button';
import { buttonClass } from '../components/ui/buttonStyles';

const RELOAD_KEY = 'indo:reloaded-for-update';

/**
 * A page's code failed to download. Almost always this means the site was updated while the
 * visitor had it open, so the file their tab asked for no longer exists.
 */
function isChunkLoadError(error: unknown) {
  return (
    error instanceof Error &&
    /dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      error.message,
    )
  );
}

/** Reload once to pick up the new version. Returns false if we already tried for this page. */
function reloadForUpdate() {
  try {
    const last = JSON.parse(sessionStorage.getItem(RELOAD_KEY) ?? 'null') as { path: string; at: number } | null;
    if (last && last.path === location.pathname && Date.now() - last.at < 30_000) return false;
    sessionStorage.setItem(RELOAD_KEY, JSON.stringify({ path: location.pathname, at: Date.now() }));
  } catch {
    // Storage blocked (private mode, strict settings): reloading without a guard could loop.
    return false;
  }
  window.location.reload();
  return true;
}

/**
 * Shown inside the site layout when a page cannot be displayed, in place of React Router's
 * developer error screen. Header, footer and navigation stay usable.
 */
export function RouteError() {
  const error = useRouteError();
  const chunk = isChunkLoadError(error);
  const phone = site.contact.phone;

  useEffect(() => {
    if (chunk) reloadForUpdate();
  }, [chunk]);

  useEffect(() => {
    if (!chunk) console.error(error);
  }, [chunk, error]);

  return (
    <section aria-labelledby="error-title" className="py-28 lg:py-40">
      <title>Page did not load | INDO</title>
      <meta name="robots" content="noindex" />
      <div className="container-page">
        <h1 id="error-title" className="text-h1 max-w-[16ch] text-midnight">
          This page didn’t load.
        </h1>
        <p className="text-lead mt-6 max-w-[48ch] text-ink-soft">
          {chunk
            ? 'The site has been updated since you opened it, or your connection dropped. Reloading the page fetches the latest version.'
            : 'Something went wrong while showing this page. Reloading usually fixes it; if not, the homepage and the rest of the site still work.'}
        </p>
        {phone && (
          <p className="mt-4 text-ink-soft">
            Need cover urgently? Call{' '}
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-forest underline underline-offset-4">
              {phone}
            </a>
            .
          </p>
        )}
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <button type="button" onClick={() => window.location.reload()} className={buttonClass()}>
            <span className="min-w-0">Reload Page</span>
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 bg-current transition-transform duration-300 ease-(--ease-out-quart) motion-safe:group-hover:translate-x-1"
            />
          </button>
          <Button to="/" variant="secondary">
            Back to the Homepage
          </Button>
        </div>
      </div>
    </section>
  );
}
