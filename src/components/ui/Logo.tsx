/**
 * Indo base logo (wordmark with the lime leaf) from the supplied brand logoset.
 * Use `on="dark"` on dark green backgrounds for the white-wordmark version.
 * Source files: /brand-source (kept locally); served copies: /public/brand.
 */
const files = {
  light: '/brand/indo-logo-base-on-light.svg',
  dark: '/brand/indo-logo-base-on-dark.svg',
};

/** Intrinsic ratio of the base logo artwork (352.01 × 147.28). */
const RATIO = 352.01 / 147.28;

type Props = { on?: 'light' | 'dark'; className?: string; lazy?: boolean };

/** Set `lazy` below the fold (footer) so the logo is not preloaded ahead of the page's own images. */
export function Logo({ on = 'light', className = 'h-10', lazy = false }: Props) {
  return (
    <img
      src={files[on]}
      alt="INDO"
      width={Math.round(40 * RATIO)}
      height={40}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      className={`block w-auto ${className}`}
    />
  );
}
