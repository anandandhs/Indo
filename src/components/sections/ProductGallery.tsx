import { useEffect, useRef, useState } from 'react';
import { products } from '../../data/workforce';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';

/**
 * Editorial gallery of the frozen and processed food sectors INDO has workforce experience in.
 * Phones and tablets scroll it sideways (snap points); desktop shows a staggered five-column grid.
 */
export function ProductGallery({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const ref = useRef<HTMLDivElement>(null);
  // Keyboard users need a tab stop to scroll the strip sideways, but only while it actually
  // scrolls. On desktop the grid fits, and an inert tab stop would just be noise.
  // Starts true so the prerendered (phone-first) markup matches the first client render.
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('ResizeObserver' in window)) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 1);
    const observer = new ResizeObserver(check);
    observer.observe(el);
    check();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Food products our workforces have helped produce"
      tabIndex={scrollable ? 0 : undefined}
      className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:thin] sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      <ol className="flex snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-5 lg:gap-5">
        {products.map((p, i) => (
          <li
            key={p.id}
            className={`w-[72vw] max-w-[20rem] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:max-w-none ${
              i % 2 === 1 ? 'lg:mt-16' : ''
            }`}
          >
            <Reveal className="aspect-[3/4] overflow-hidden">
              <Img photo={p.photo} sizes="(min-width: 1024px) 19vw, (min-width: 640px) 42vw, 72vw" position={p.position} />
            </Reveal>
            <h3 className={`mt-5 text-title-s ${dark ? 'text-ivory' : 'text-midnight'}`}>{p.title}</h3>
            <p className={`mt-2 text-small ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>{p.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
