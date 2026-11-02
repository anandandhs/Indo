import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tone?: 'light' | 'dark';
  /** Hide the leading square when the content that follows already carries square markers. */
  marker?: boolean;
  className?: string;
};

/**
 * Short label that names the section that follows. Set in tracked capitals like
 * industrial signage; Forest on light surfaces, Signal Lime on dark ones. Sections are not
 * numbered: numbering is reserved for real sequences (the recruitment journey, the production line).
 */
export function Eyebrow({ children, tone = 'light', marker = true, className = '' }: Props) {
  return (
    <p
      className={`flex max-w-none items-center gap-3 text-kicker uppercase tracking-[0.14em] ${
        tone === 'dark' ? 'text-lime' : 'text-forest'
      } ${className}`}
    >
      {marker && <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />}
      <span className="min-w-0">{children}</span>
    </p>
  );
}
