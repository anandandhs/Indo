import { Link } from 'react-router-dom';
import type { Service } from '../../data/services';
import { ServiceIcon } from './ServiceIcon';

/** Service summary card. The lime rule along the top extends on hover. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/what-we-do#${service.id}`}
      className="group relative flex h-full flex-col bg-ivory p-7 transition-colors duration-300 hover:bg-paper sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] bg-lime transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-x-100"
      />
      <ServiceIcon id={service.id} className="size-12 text-midnight" />
      <h3 className="text-h3 mt-10 text-midnight">{service.title}</h3>
      <p className="mt-4 flex-1 text-ink-soft">{service.summary}</p>
      <span className="mt-8 text-label text-forest underline decoration-forest/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-forest">
        How It Works
      </span>
    </Link>
  );
}
