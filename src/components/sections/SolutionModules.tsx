import type { SolutionId } from '../../data/workforce';
import { solutions } from '../../data/workforce';
import { TextLink } from '../ui/Button';

/**
 * A twelve-week strip showing the shape of each arrangement over time:
 * 0 = no cover, 1 = INDO workforce, 2 = moves to the client's permanent team.
 */
const rhythm: Record<SolutionId, number[]> = {
  temporary: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'temp-to-perm': [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
  seasonal: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  ongoing: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'shift-cover': [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
};

/**
 * States differ by shape as well as colour, so the strip reads without colour vision:
 * a week with no cover is a low baseline, a covered week is a full-height bar. Lime bars carry a
 * Forest edge (lime alone is 1.6:1 on ivory); lime against Forest is 3.5:1.
 */
const cell = {
  0: 'h-0.5 self-end bg-ink-faint/60',
  1: 'h-full bg-lime shadow-[inset_0_0_0_1px] shadow-forest',
  2: 'h-full bg-forest',
} as const;

/** One legend key, drawn exactly like a week in the strip. */
function Swatch({ state }: { state: 0 | 1 | 2 }) {
  return (
    <span aria-hidden="true" className="flex h-2.5 w-4 shrink-0">
      <span className={`w-full ${cell[state]}`} />
    </span>
  );
}

export function RhythmStrip({ id, className = '' }: { id: SolutionId; className?: string }) {
  return (
    <div aria-hidden="true" className={`flex h-2.5 gap-[3px] ${className}`}>
      {rhythm[id].map((v, i) => (
        <span key={i} className={`flex-1 ${cell[v as 0 | 1 | 2]}`} />
      ))}
    </div>
  );
}

/**
 * The five workforce supply arrangements as a modular grid: two wide modules over three,
 * sharing hairlines. Each module carries a rhythm strip showing its shape over time.
 */
export function SolutionModules({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <>
      <p className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-meta text-ink-soft">
        <span className="flex items-center gap-2">
          <Swatch state={1} /> INDO workforce in place
        </span>
        <span className="flex items-center gap-2">
          <Swatch state={2} /> Moves to your permanent team
        </span>
        <span className="flex items-center gap-2">
          <Swatch state={0} /> No cover
        </span>
        <span>Bars show an illustrative twelve-week pattern</span>
      </p>
      <ul className="grid gap-px bg-stone-2 md:grid-cols-6">
        {solutions.map((s, i) => (
          <li
            key={s.id}
            id={`solution-${s.id}`}
            className={`flex flex-col bg-ivory p-7 transition-colors duration-300 hover:bg-paper sm:p-8 lg:p-10 ${
              i < 2 ? 'md:col-span-3' : 'md:col-span-2'
            }`}
          >
            <span className="text-kicker text-ink-soft">{s.horizon}</span>
            <RhythmStrip id={s.id} className="mt-6" />
            <H className={`mt-8 text-midnight ${i < 2 ? 'text-h3 lg:text-statement' : 'text-h3'}`}>{s.title}</H>
            <p className="mt-4 text-ink">{s.summary}</p>
            <p className="mt-4 flex-1 text-small text-ink-soft">
              <span className="font-display font-bold text-ink">When it fits: </span>
              {s.whenItFits}
            </p>
            {s.id === 'shift-cover' && (
              <TextLink to="/contact#urgent" className="mt-6 self-start text-forest">
                Request Shift Cover
              </TextLink>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
