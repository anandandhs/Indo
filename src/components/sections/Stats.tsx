import { site } from '../../config/site';

export type Stat = { value: string; label: string };

/** Experience strip. Only confirmed figures are shown as numbers. */
const experienceStats: Stat[] = [
  { value: site.facts.clients, label: 'Client relationships built through workforce partnerships' },
  { value: 'Frozen food', label: 'Specialist experience in frozen and processed food manufacturing' },
  { value: 'Line to load', label: 'Production, packing, warehouse and logistics workforces' },
  { value: 'Flexible', label: 'From immediate shift cover to ongoing workforce provision' },
];

export function Stats({ stats = experienceStats, className = '' }: { stats?: Stat[]; className?: string }) {
  return (
    <section aria-label="INDO at a glance" className={`on-dark bg-midnight text-ivory ${className}`}>
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
