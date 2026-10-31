import { srcSet, src, type Photo } from '../../data/images';

type Props = {
  photo: Photo;
  /** The `sizes` attribute — how wide the image renders at each breakpoint. */
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
};

/**
 * Responsive photo that fills its container (object-cover).
 * The stone background holds the space while the file loads; if it fails, the alt text
 * shows on that surface instead of a transparent hole.
 */
export function Img({ photo, sizes, className = '', priority = false, position = 'center' }: Props) {
  return (
    <img
      src={src(photo)}
      srcSet={srcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ objectPosition: position }}
      className={`size-full bg-stone-2 object-cover text-meta text-ink-soft ${className}`}
    />
  );
}
