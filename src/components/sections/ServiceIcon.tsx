import type { ServiceId } from '../../data/services';

/**
 * Custom geometric marks for each service, drawn on a 48px grid.
 * Ink strokes use currentColor; the single filled block is always lime.
 */
export function ServiceIcon({ id, className = 'size-12' }: { id: ServiceId; className?: string }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const;
  const accent = 'var(--color-lime)';

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      {id === 'procurement' && (
        <>
          {/* A row of people, one selected */}
          <circle cx="10" cy="17" r="5" {...stroke} />
          <path d="M2 38c0-6 3.6-10 8-10s8 4 8 10" {...stroke} />
          <circle cx="38" cy="17" r="5" {...stroke} />
          <path d="M30 38c0-6 3.6-10 8-10s8 4 8 10" {...stroke} />
          <circle cx="24" cy="13" r="6" fill={accent} />
          <path d="M14 38c0-8 4.5-13 10-13s10 5 10 13Z" fill={accent} />
        </>
      )}
      {id === 'deployment' && (
        <>
          {/* A block moving into its slot */}
          <path d="M28 8h16v32H28" {...stroke} />
          <path d="M4 24h14" {...stroke} />
          <path d="m13 19 5 5-5 5" {...stroke} />
          <rect x="24" y="17" width="14" height="14" fill={accent} />
        </>
      )}
      {id === 'management' && (
        <>
          {/* A coordinated grid with a central point of contact */}
          <path d="M10 10h28v28H10Z M24 10v28 M10 24h28" {...stroke} />
          {[10, 38].flatMap((x) => [10, 38].map((y) => <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="var(--color-ivory)" stroke="currentColor" strokeWidth="2" />))}
          <rect x="18" y="18" width="12" height="12" fill={accent} />
        </>
      )}
      {id === 'planning' && (
        <>
          {/* Capacity stepping up to meet demand */}
          <path d="M4 42h40" {...stroke} />
          <path d="M7 42V32h8v10 M19 42V24h8v18" {...stroke} />
          <rect x="31" y="10" width="9" height="32" fill={accent} />
          <path d="M4 20 18 12l8 4 14-10" {...stroke} strokeDasharray="3 3" />
        </>
      )}
    </svg>
  );
}
