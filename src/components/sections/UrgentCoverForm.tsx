import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { mailtoLink, useEnquirySubmit } from '../../lib/enquiry';
import { EnquiryStatus } from './EnquiryStatus';
import { NoJsFallback } from './NoJsFallback';

/**
 * Short route for short-notice cover: four fields instead of the full enquiry, so a manager
 * who needs people for the coming shifts can ask in under a minute. Posts to the same endpoint
 * as the full form with `type: "urgent-cover"`.
 */

type Fields = { fullName: string; phone: string; location: string; requirement: string };
type Key = keyof Fields;

const empty: Fields = { fullName: '', phone: '', location: '', requirement: '' };

const labels: Record<Key, string> = {
  fullName: 'Your name',
  phone: 'Contact number',
  location: 'Site location',
  requirement: 'What you need',
};

const MAX: Record<Key, number> = { fullName: 100, phone: 20, location: 120, requirement: 500 };

function validate(v: Fields) {
  const e: Partial<Record<Key, string>> = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your name.';
  if (!v.phone.trim()) e.phone = 'Enter a number we can call you back on.';
  else if (!/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces and + only.';
  if (!v.location.trim()) e.location = 'Enter the town, city or site.';
  if (!v.requirement.trim()) e.requirement = 'Tell us the roles, how many people and when you need them.';
  for (const k of Object.keys(MAX) as Key[]) {
    if (!e[k] && v[k].trim().length > MAX[k]) e[k] = `${labels[k]} must be ${MAX[k]} characters or fewer.`;
  }
  return e;
}

export function UrgentCoverForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [trap, setTrap] = useState('');
  const { status, setStatus, failure, send } = useEnquirySubmit();
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (k: Key) => `${uid}-${k}`;

  const update = (k: Key, value: string) => {
    const next = { ...values, [k]: value };
    setValues(next);
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(empty) as Key[]).find((k) => found[k]);
    if (first) {
      setStatus('idle');
      // Wait a frame so the field already carries its error (aria-invalid, aria-describedby)
      // when focus lands; a screen reader announces it on arrival rather than missing it.
      requestAnimationFrame(() => document.getElementById(id(first))?.focus());
      return;
    }
    const ok = await send({ type: 'urgent-cover', ...values, website: trap });
    if (ok) setValues(empty);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const mailto = mailtoLink(
    `Urgent cover request — ${values.location || 'site to confirm'}`,
    (Object.keys(empty) as Key[]).map((k) => [labels[k], values[k]] as [string, string]),
  );

  const field = (k: Key, input: ReactNode, hint?: string) => (
    <div className={k === 'requirement' ? 'sm:col-span-2' : ''}>
      <label htmlFor={id(k)} className="mb-2 block text-label text-ivory">
        {labels[k]}
      </label>
      {hint && (
        <p id={`${id(k)}-hint`} className="-mt-1 mb-2 text-meta text-on-dark-muted">
          {hint}
        </p>
      )}
      {input}
      {errors[k] && (
        <p id={`${id(k)}-error`} className="mt-2 flex gap-2 text-small text-error-soft">
          <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 bg-error-soft" />
          <span className="min-w-0">{errors[k]}</span>
        </p>
      )}
    </div>
  );

  const props = (k: Key, hint = false) => ({
    id: id(k),
    name: k,
    value: values[k],
    'aria-required': true as const,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': [hint ? `${id(k)}-hint` : '', errors[k] ? `${id(k)}-error` : ''].filter(Boolean).join(' ') || undefined,
    onChange: (e: { target: { value: string } }) => update(k, e.target.value),
    className: 'field field-dark',
  });

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="outline-none">
        <p className="text-h3 text-ivory">Thank you — your cover request has been sent.</p>
        <p className="mt-3 text-on-dark-muted">
          {site.contact.urgentResponseTime
            ? `We aim to call you back within ${site.contact.urgentResponseTime}.`
            : 'A member of the INDO team will call you back to talk through the cover you need.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <NoJsFallback tone="dark" />
      {/* method="post": if the form were ever submitted without JavaScript, details stay out of the URL. */}
      <form method="post" noValidate onSubmit={onSubmit} aria-busy={status === 'sending'} className="js-only">
        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          {field('fullName', <input type="text" autoComplete="name" dir="auto" {...props('fullName')} />)}
          {field('phone', <input type="tel" autoComplete="tel" inputMode="tel" {...props('phone')} />)}
          {field('location', <input type="text" autoComplete="address-level2" dir="auto" {...props('location')} />)}
          {field(
            'requirement',
            <textarea rows={3} dir="auto" placeholder="For example: 8 packing operatives, nights, from Monday." {...props('requirement', true)} />,
            'Roles, how many people and when.',
          )}
        </div>

        {/* Honeypot for spam bots: off-screen, skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Leave this field empty</label>
          <input id={`${uid}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>

        <p className="mt-6 max-w-[60ch] text-meta text-on-dark-muted">
          INDO uses these details only to respond to this request — see the{' '}
          <Link to="/privacy-policy" className="text-ivory underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group mt-6 inline-flex min-h-13 w-full items-center justify-center gap-3 border border-transparent bg-lime px-8 py-3.5 text-label text-midnight transition-colors duration-300 hover:bg-lime-2 active:translate-y-px disabled:cursor-progress disabled:opacity-70 sm:w-auto"
        >
          {status === 'sending' ? 'Sending Request…' : 'Request Cover'}
          <span aria-hidden="true" className="size-1.5 bg-midnight transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
        </button>

        <EnquiryStatus ref={statusRef} status={status} failure={failure} mailto={mailto} tone="dark" />
      </form>
    </>
  );
}
