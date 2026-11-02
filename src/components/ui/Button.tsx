import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonClass, type ButtonVariant } from './buttonStyles';

type Props = {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/** Link styled as a button. The small square marker slides on hover. */
export function Button({ to, children, variant = 'primary', className = '' }: Props) {
  return (
    <Link to={to} className={`${buttonClass(variant)} ${className}`}>
      <span className="min-w-0">{children}</span>
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 bg-current transition-transform duration-300 ease-(--ease-out-quart) motion-safe:group-hover:translate-x-1"
      />
    </Link>
  );
}

/**
 * Underlined text link used for secondary pathways. An invisible pseudo-element extends the
 * touch target to ~45px tall without changing the layout, so callers keep their own margins.
 */
export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`relative inline-flex items-center text-label after:absolute after:inset-x-0 after:-inset-y-3 after:content-[''] underline decoration-current/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current ${className}`}
    >
      {children}
    </Link>
  );
}
