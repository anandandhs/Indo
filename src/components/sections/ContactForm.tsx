import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { solutions } from '../../data/workforce';
import { mailtoLink, useEnquirySubmit } from '../../lib/enquiry';
import { EnquiryStatus } from './EnquiryStatus';
import { NoJsFallback } from './NoJsFallback';

/**
 * Enquiry fields. These keys are the JSON property names POSTed to the endpoint
 * (plus `website`, the honeypot). Keep them stable once an endpoint is connected.
 */
type Fields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  businessType: string;
  workforceType: string;
  roles: string;
  workerCount: string;
  shiftPattern: string;
  location: string;
  startDate: string;
  message: string;
  /** 'yes' once the privacy notice is acknowledged. */
  consent: string;
};

type Key = keyof Fields;
type Errors = Partial<Record<Key, string>>;

const empty: Fields = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  businessType: '',
  workforceType: '',
  roles: '',
  workerCount: '',
  shiftPattern: '',
  location: '',
  startDate: '',
  message: '',
  consent: '',
};

const options = {
  businessType: [
    'Frozen food manufacturing',
    'Food production and processing',
    'Warehousing and logistics',
    'Retail',
    'Other',
  ],
  workforceType: [...solutions.map((s) => s.formLabel), 'Other / not sure yet'],
  workerCount: ['1–10 people', '11–25 people', '26–50 people', '51–100 people', 'More than 100 people', 'Not sure yet'],
  shiftPattern: [
    'Days',
    'Nights',
    'Rotating or continental shifts',
    'Weekends',
    'A mix of patterns',
    'To be confirmed',
  ],
} as const;

const labels: Record<Key, string> = {
  fullName: 'Full name',
  company: 'Company name',
  email: 'Business email',
  phone: 'Contact number',
  businessType: 'Business type / industry',
  workforceType: 'Type of workforce required',
  roles: 'Roles required',
  workerCount: 'Approximate number of workers',
  shiftPattern: 'Shift pattern',
  location: 'Location',
  startDate: 'Required start date',
  message: 'Additional information',
  consent: 'Privacy consent',
};

const optional: Key[] = ['shiftPattern', 'startDate', 'message'];

/** Short qualifiers shown in the label itself, so fields that share a row stay aligned. */
const notes: Partial<Record<Key, string>> = { location: 'town, city or site' };

/** Upper bounds keep pasted content and abuse from reaching the endpoint unchecked. */
const MAX_LENGTH: Partial<Record<Key, number>> = {
  fullName: 100,
  company: 120,
  email: 254,
  phone: 20,
  roles: 300,
  location: 120,
  message: 3000,
};

/** Today's date as YYYY-MM-DD in the visitor's own time zone. */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.company.trim()) e.company = 'Enter your company name.';
  if (!v.email.trim()) e.email = 'Enter your business email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter an email address in the format name@company.co.uk.';
  if (!v.phone.trim()) e.phone = 'Enter a contact number.';
  else if (!/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces and + only.';
  if (!v.businessType) e.businessType = 'Select the type of business you operate.';
  if (!v.workforceType) e.workforceType = 'Select the type of workforce you need.';
  if (!v.roles.trim()) e.roles = 'Enter the roles you need, for example “production operatives”.';
  if (!v.workerCount) e.workerCount = 'Select an approximate number of workers.';
  if (!v.location.trim()) e.location = 'Enter the town, city or site location.';
  if (v.startDate && v.startDate < today()) e.startDate = 'Choose a start date from today onwards, or leave it blank.';
  if (!v.consent) e.consent = 'Confirm you have read how we use your details.';
  // Length limits: only reported when exceeded, so they never get in the way of normal input.
  for (const key of Object.keys(MAX_LENGTH) as Key[]) {
    const max = MAX_LENGTH[key]!;
    const len = v[key].trim().length;
    if (!e[key] && len > max) {
      e[key] = `${labels[key]} must be ${max.toLocaleString('en-GB')} characters or fewer (currently ${len.toLocaleString('en-GB')}).`;
    }
  }
  return e;
}

/** Field order, used for the error summary so it lists problems top to bottom. */
const order = Object.keys(empty) as Key[];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-stone-2 pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-6 w-full text-title-s text-midnight">{title}</legend>
      <div className="clear-both grid gap-x-6 gap-y-7 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const { status, setStatus, failure, send } = useEnquirySubmit();
  // Honeypot: hidden from people, often filled by bots. Sent to the endpoint so it can discard spam.
  const [trap, setTrap] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const update = (name: Key, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  };

  const blur = (name: Key) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return; // ignore repeat clicks while a request is in flight
    const found = validate(values);
    setErrors(found);
    setSubmitted(true);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const ok = await send({ type: 'workforce-enquiry', ...values, website: trap });
    if (ok) {
      setValues(empty);
      setTouched({});
      setSubmitted(false);
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  // Used only when no endpoint is configured but INDO has published an email address.
  const mailto = mailtoLink(
    `Workforce enquiry — ${values.company || values.fullName || 'new enquiry'}`,
    order.filter((k) => k !== 'consent').map((k) => [labels[k], values[k]] as [string, string]),
  );

  const errorList = order.filter((k) => errors[k]);
  const showSummary = submitted && errorList.length > 0;
  const id = (name: Key) => `${uid}-${name}`;

  const describedBy = (name: Key, hint?: boolean) =>
    [hint ? `${id(name)}-hint` : '', errors[name] ? `${id(name)}-error` : ''].filter(Boolean).join(' ') || undefined;

  const fieldProps = (name: Key, hint = false) => ({
    id: id(name),
    name,
    value: values[name],
    'aria-required': optional.includes(name) ? undefined : true,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': describedBy(name, hint),
    onBlur: () => blur(name),
    'data-empty': values[name] ? undefined : '',
    className: 'field',
  });

  const renderLabel = (name: Key) => (
    <label htmlFor={id(name)} className="mb-2 block text-label text-midnight">
      {labels[name]}
      {notes[name] && <span className="ml-2 font-sans font-normal text-ink-soft">({notes[name]})</span>}
      {optional.includes(name) && <span className="ml-2 font-sans font-normal text-ink-soft">(optional)</span>}
    </label>
  );

  const renderHint = (name: Key, text: string) => (
    <p id={`${id(name)}-hint`} className="-mt-1 mb-2 text-meta text-ink-soft">
      {text}
    </p>
  );

  const renderError = (name: Key) =>
    errors[name] ? (
      <p id={`${id(name)}-error`} className="mt-2 flex gap-2 text-small text-error">
        <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 bg-error" />
        <span className="min-w-0">{errors[name]}</span>
      </p>
    ) : null;

  const text = (name: Key, extra: Record<string, string> = {}, hint?: string) => (
    <div>
      {renderLabel(name)}
      {hint && renderHint(name, hint)}
      <input type="text" dir="auto" {...extra} {...fieldProps(name, Boolean(hint))} onChange={(e) => update(name, e.target.value)} />
      {renderError(name)}
    </div>
  );

  const select = (name: 'businessType' | 'workforceType' | 'workerCount' | 'shiftPattern', placeholder: string) => (
    <div>
      {renderLabel(name)}
      <select {...fieldProps(name)} onChange={(e) => update(name, e.target.value)}>
        <option value="">{placeholder}</option>
        {options[name].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {renderError(name)}
    </div>
  );

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="bg-lime-soft p-8 outline-none">
        <h2 className="text-h3 text-midnight">Thank you — your enquiry has been sent.</h2>
        <p className="mt-3 text-ink-soft">
          A member of the INDO team will be in touch to talk through your workforce requirements.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-display font-bold text-forest underline decoration-2 underline-offset-[6px]"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <NoJsFallback />
      {/* method="post": if the form were ever submitted without JavaScript, details stay out of the URL. */}
      <form
        method="post"
        noValidate
        onSubmit={onSubmit}
        aria-describedby={`${uid}-required`}
        aria-busy={status === 'sending'}
        className="js-only"
      >
        {showSummary && (
          <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 bg-error-soft p-6 outline-none">
            <h2 className="text-title-s text-midnight">Check the following before sending:</h2>
            <ul className="mt-3 space-y-1.5">
              {errorList.map((k) => (
                <li key={k}>
                  <a
                    href={`#${id(k)}`}
                    onClick={(e) => {
                      // A plain fragment jump scrolls but leaves focus behind. Bring the field's label
                      // into view and put the cursor in the field, so it can be corrected straight away.
                      const field = document.getElementById(id(k));
                      if (!field) return;
                      e.preventDefault();
                      (field.closest('div')?.querySelector('label') ?? field).scrollIntoView({ block: 'start' });
                      field.focus({ preventScroll: true });
                    }}
                    className="text-error underline underline-offset-4"
                  >
                    {errors[k]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p id={`${uid}-required`} className="mb-8 text-small text-ink-soft">
          All fields are required unless marked optional.
        </p>

        <div className="space-y-10">
          <Group title="About you">
            {text('fullName', { autoComplete: 'name' })}
            {text('company', { autoComplete: 'organization' })}
            <div>
              {renderLabel('email')}
              <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} onChange={(e) => update('email', e.target.value)} />
              {renderError('email')}
            </div>
            <div>
              {renderLabel('phone')}
              <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} onChange={(e) => update('phone', e.target.value)} />
              {renderError('phone')}
            </div>
            <div className="sm:col-span-2">{select('businessType', 'Select your business type')}</div>
          </Group>

          <Group title="Your workforce requirement">
            {select('workforceType', 'Select a workforce type')}
            {select('workerCount', 'Select a range')}
            <div className="sm:col-span-2">
              {text('roles', {}, 'For example: production operatives, packing operatives, a shift supervisor.')}
            </div>
            {select('shiftPattern', 'Select a shift pattern')}
            {text('location', { autoComplete: 'address-level2' })}
            <div>
              {renderLabel('startDate')}
              {renderHint('startDate', 'Leave blank if your start date is flexible.')}
              <input type="date" {...fieldProps('startDate', true)} onChange={(e) => update('startDate', e.target.value)} />
              {renderError('startDate')}
            </div>
            <div className="sm:col-span-2">
              {renderLabel('message')}
              <textarea
                rows={5}
                dir="auto"
                placeholder="For example: site conditions, temperature-controlled areas, expected duration or anything else that would help."
                {...fieldProps('message')}
                onChange={(e) => update('message', e.target.value)}
              />
              {renderError('message')}
            </div>
          </Group>
        </div>

        {/* Honeypot for spam bots: off-screen, skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Leave this field empty</label>
          <input
            id={`${uid}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </div>

        <div className="mt-10 border-t border-stone-2 pt-8">
          <div className="flex items-start gap-4">
            <input
              id={id('consent')}
              name="consent"
              type="checkbox"
              checked={values.consent === 'yes'}
              aria-required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${id('consent')}-error` : undefined}
              onChange={(e) => {
                update('consent', e.target.checked ? 'yes' : '');
                setTouched((t) => ({ ...t, consent: true }));
                setErrors((prev) => ({ ...prev, consent: e.target.checked ? undefined : prev.consent }));
              }}
              className="check mt-0.5"
            />
            <label htmlFor={id('consent')} className="max-w-[60ch] cursor-pointer text-small text-ink">
              I agree that INDO may use the details in this form to respond to my enquiry, as described in the{' '}
              <Link to="/privacy-policy" className="text-forest underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {renderError('consent')}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group inline-flex min-h-13 items-center justify-center gap-3 border border-transparent bg-midnight px-8 py-3.5 text-label text-ivory transition-colors duration-300 hover:bg-forest active:translate-y-px disabled:cursor-progress disabled:opacity-70"
          >
            {status === 'sending' ? 'Sending Enquiry…' : 'Send Workforce Enquiry'}
            <span aria-hidden="true" className="size-1.5 bg-lime transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
          </button>
        </div>

        <EnquiryStatus ref={statusRef} status={status} failure={failure} mailto={mailto} />
      </form>
    </>
  );
}
