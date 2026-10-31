import { site, yearsLabel } from '../../config/site';

export type Stat = { value: string; label: string };

/** Experience strip. Only confirmed figures are shown as numbers. */
const experienceStats: Stat[] = [
  { value: site.facts.clients, label: 'Clients supported across food production and retail' },
  { value: yearsLabel(), label: 'Of experience procuring and managing labour' },
  { value: 'Food & retail', label: 'Specialist workforce knowledge, including frozen food' },
  { value: 'End-to-end', label: 'Support from sourcing through to ongoing management' },
];

export function Stats({ stats = experienceStats, className = '' }: { stats?: Stat[]; className?: string }) {
  return (
    <section aria-label="Indo at a glance" className={`on-dark bg-midnight text-ivory ${className}`}>
      {/* Two-up from phone width so the strip reads as one band, four-up on desktop.
          Hairlines come from the 1px gap over the rule colour. */}
      <div className="container-page">
        <dl className="-mx-4 grid grid-cols-2 gap-px bg-rule-dark sm:-mx-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-3 bg-midnight px-4 py-7 sm:px-6 lg:py-12">
              <dt className="max-w-[24ch] text-small text-on-dark-muted">{s.label}</dt>
              <dd className="text-stat text-lime">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
