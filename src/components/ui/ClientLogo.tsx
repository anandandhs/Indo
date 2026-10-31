import { useState } from 'react';

/**
 * A supplied client logo. If the file is missing or fails to load, the client's
 * name is shown in its place rather than a broken image.
 */
export function ClientLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="text-center text-title-s text-ink-soft">{name}</span>;
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="max-h-10 w-auto max-w-full object-contain opacity-80 grayscale"
    />
  );
}
