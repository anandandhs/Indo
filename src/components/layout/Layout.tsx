import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

/**
 * Scrolls to the top on navigation, or to the #section named in the URL. After an in-app page
 * change it also moves focus to the main content and announces the new page title, which is what
 * a full page load would do for screen-reader and keyboard users. The first load is left alone.
 */
function RouteChangeManager() {
  const { pathname, hash } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const firstLoad = useRef(true);

  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page has rendered before looking for the target.
      const id = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    // A frame later the new page's <title> is in place.
    const id = requestAnimationFrame(() => {
      if (!hash) document.getElementById('main')?.focus({ preventScroll: true });
      setAnnouncement(document.title.replace(/\s*\|\s*INDO$/, ''));
    });
    return () => cancelAnimationFrame(id);
    // Announce page changes only, not jumps between sections of the same page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <p aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </p>
  );
}

export function Layout() {
  return (
    <>
      <RouteChangeManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
