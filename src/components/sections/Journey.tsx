import { journey } from '../../data/workforce';

/** Recruitment-to-deployment journey: six stages with a stepped progress bar. */
export function Journey({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6">
      {journey.map((step, i) => (
        <li key={step.title}>
          <span className={`text-kicker tabular-nums ${dark ? 'text-lime' : 'text-forest'}`}>
            Stage {String(i + 1).padStart(2, '0')}
          </span>
          <div aria-hidden="true" className="mt-4 flex h-1 gap-1">
            {journey.map((s, j) => (
              <span
                key={s.title}
                // Done stages must stand apart from pending ones: lime on Stone Rule is only 1.1:1,
                // so on light surfaces completed stages use Forest (4.7:1 on Stone).
                className={`flex-1 ${j <= i ? (dark ? 'bg-lime' : 'bg-forest') : dark ? 'bg-rule-dark' : 'bg-stone-2'}`}
              />
            ))}
          </div>
          <h3 className={`mt-6 text-title-s ${dark ? 'text-ivory' : 'text-midnight'}`}>{step.title}</h3>
          <p className={`mt-2 text-small ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
