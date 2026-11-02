import { capabilities } from '../../data/workforce';
import { Img } from '../ui/Img';

/**
 * Four image-backed capability panels. On desktop they sit in one row and the panel under
 * the pointer (or holding keyboard focus) widens while its photograph settles in.
 * Each panel carries its full role list at all times, so nothing depends on hover.
 */
export function CapabilityPanels() {
  return (
    // A minimum, not a fixed height: longer copy or enlarged text grows the row instead of being clipped.
    <ul className="grid gap-4 sm:grid-cols-2 lg:flex lg:min-h-[40rem] lg:gap-3">
      {capabilities.map((c) => (
        <li
          key={c.id}
          id={`capability-${c.id}`}
          className="group relative flex min-h-[28rem] flex-col justify-end overflow-hidden bg-midnight text-ivory transition-[flex-grow] duration-700 ease-(--ease-out-expo) lg:min-h-0 lg:flex-1 lg:hover:grow-[1.55] lg:focus-within:grow-[1.55]"
        >
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-(--ease-out-expo) motion-safe:group-hover:scale-[1.05]">
            <Img photo={c.photo} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" position={c.position} />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-midnight from-25% via-midnight/80 via-55% to-midnight/10"
          />
          <div className="relative p-6 sm:p-7">
            <h3 className="text-h3 text-ivory">{c.title}</h3>
            <p className="mt-3 max-w-[36ch] text-small text-on-dark-muted">{c.summary}</p>
            <ul className="mt-5 space-y-1.5 border-t border-on-dark-subtle/40 pt-5">
              {c.roles.map((r) => (
                <li key={r} className="flex items-start gap-3 text-small text-ivory">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-lime" />
                  <span className="min-w-0">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
