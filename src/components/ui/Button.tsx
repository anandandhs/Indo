import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'lime' | 'ghost-light';

const base =
  'group inline-flex min-h-12 max-w-full items-center justify-center gap-3 px-6 py-3 text-label transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-quart) active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-midnight text-ivory hover:bg-forest',
  secondary: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  lime: 'bg-lime text-midnight hover:bg-lime-2',
  'ghost-light': 'border border-on-dark-subtle text-ivory hover:border-ivory hover:bg-ivory hover:text-midnight',
};

type Props = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Link styled as a button. The small square marker slides on hover. */
export function Button({ to, children, variant = 'primary', className = '' }: Props) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      <span className="min-w-0">{children}</span>
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 bg-current transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-1"
      />
    </Link>
  );
}

/** Underlined text link used for secondary pathways. */
export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center text-label underline decoration-current/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current ${className}`}
    >
      {children}
    </Link>
  );
}
