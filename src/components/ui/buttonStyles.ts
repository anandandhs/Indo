export type ButtonVariant = 'primary' | 'secondary' | 'lime' | 'ghost-light';

const base =
  'group inline-flex min-h-12 max-w-full items-center justify-center gap-3 px-6 py-3 text-label transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-quart) active:translate-y-px';

// Filled variants carry a transparent border: invisible normally, but Windows High Contrast
// draws it, so the button keeps its outline when backgrounds are removed.
const variants: Record<ButtonVariant, string> = {
  primary: 'border border-transparent bg-midnight text-ivory hover:bg-forest',
  secondary: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  lime: 'border border-transparent bg-lime text-midnight hover:bg-lime-2',
  'ghost-light': 'border border-on-dark-subtle text-ivory hover:border-ivory hover:bg-ivory hover:text-midnight',
};

/** Button classes, shared by <Button> links and the rare real <button> that must match them. */
export function buttonClass(variant: ButtonVariant = 'primary') {
  return `${base} ${variants[variant]}`;
}
