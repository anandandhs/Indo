import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, primaryCta } from '../../config/site';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // The menu panel only exists below the desktop breakpoint. If the window grows past it
  // while the menu is open (rotation, resize), close it so page scrolling is restored.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      // Keep focus inside the open menu.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('a, button');
        const all = [toggleRef.current!, ...Array.from(items)];
        const i = all.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? all.length - 1 : i - 1) : i === all.length - 1 ? 0 : i + 1;
        e.preventDefault();
        all[next].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open
          ? 'bg-midnight text-ivory on-dark'
          : scrolled
            ? 'bg-ivory/92 shadow-[0_1px_0] shadow-ink/10 backdrop-blur-md'
            : 'bg-ivory'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold focus:text-midnight"
      >
        Skip to content
      </a>

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link to="/" aria-label="Indo home" className="min-w-0">
          <Logo on={open ? 'dark' : 'light'} className="h-10 max-w-full object-contain object-left lg:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative block px-3 py-2 text-label font-semibold transition-colors duration-200 hover:text-forest ${
                      isActive ? 'text-ink' : 'text-ink-soft'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-0.5 h-[3px] bg-lime transition-transform duration-300 ease-(--ease-out-quart) ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        } origin-left`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button to={primaryCta.to} variant={open ? 'lime' : 'primary'}>
              {primaryCta.label}
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${
                  open ? 'top-1.5 w-6 -rotate-45' : 'top-3 w-4'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-midnight text-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6">
          <ul className="border-t border-rule-dark">
            {nav.map((item, i) => (
              <li key={item.to} className="rise border-b border-rule-dark" style={{ animationDelay: `${i * 45}ms` }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-5 text-statement ${
                      isActive ? 'text-lime' : 'text-ivory'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button to={primaryCta.to} variant="lime" className="w-full">
              {primaryCta.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
