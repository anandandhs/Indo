/**
 * Indo logo (icon + wordmark lockup) from the supplied brand logoset.
 * Use `on="dark"` on midnight backgrounds for the white-wordmark version.
 * Source files: /brand-source; served copies: /public/brand.
 */
const files = {
  light: '/brand/indo-logo-on-light.svg',
  dark: '/brand/indo-logo-on-dark.svg',
};

/** Intrinsic ratio of the lockup artwork (505.74 × 167.86). */
const RATIO = 505.74 / 167.86;

export function Logo({ on = 'light', className = 'h-10' }: { on?: 'light' | 'dark'; className?: string }) {
  return (
    <img
      src={files[on]}
      alt="Indo"
      width={Math.round(40 * RATIO)}
      height={40}
      decoding="async"
      className={`block w-auto ${className}`}
    />
  );
}
