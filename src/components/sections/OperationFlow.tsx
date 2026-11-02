import { useEffect, useRef, useState } from 'react';
import { operationFlow } from '../../data/workforce';

/**
 * A production-line-inspired flow: workforce availability feeding production, quality,
 * packing, warehousing and dispatch. A lime pulse travels the line on desktop while the
 * figure is on screen (paused offscreen, removed for reduced motion). Phones show the same
 * stations as a vertical line.
 */
export function OperationFlow() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} data-in-view={inView || undefined}>
      <ol className="relative grid gap-0 lg:grid-cols-6">
        {/* Desktop conveyor line */}
        <span aria-hidden="true" className="absolute inset-x-0 top-[1.375rem] hidden h-0.5 overflow-hidden bg-stone-2 lg:block">
          <span className="flow-pulse absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-transparent via-lime to-transparent" />
        </span>
        {/* Phone line */}
        <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-0.5 bg-stone-2 lg:hidden" />

        {operationFlow.map((step, i) => (
          <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0 lg:pr-6">
            <span
              className={`relative z-10 flex size-11 shrink-0 items-center justify-center text-kicker tabular-nums ${
                i === 0 ? 'bg-lime text-midnight' : 'border-2 border-midnight bg-ivory text-midnight'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 pt-2 lg:pt-6">
              <h3 className="text-title-s text-midnight">{step.title}</h3>
              <p className="mt-1.5 text-small text-ink-soft">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-10 max-w-[31em] text-small text-ink-soft">
        Every stage depends on the one before it. When workforce availability slips, the effect travels down the line —
        which is why INDO plans people around the whole operation, not one role at a time.
      </figcaption>
    </figure>
  );
}
