import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../config/site';

/** How long to wait for the enquiry endpoint before treating the request as failed. */
const SUBMIT_TIMEOUT_MS = 15000;

/** Upper bounds keep pasted content and abuse from reaching the endpoint unchecked. */
const MAX_LENGTH = { fullName: 100, company: 120, email: 254, phone: 20, message: 3000 } as const;

type Failure = 'offline' | 'timeout' | 'rate-limited' | 'rejected' | 'server';

const failureCopy: Record<Failure, { title: string; body: string }> = {
  offline: {
    title: 'Your enquiry could not be sent — you appear to be offline.',
    body: 'Check your internet connection and send it again. Your details are still in the form.',
  },
  timeout: {
    title: 'Your enquiry could not be sent — the connection timed out.',
    body: 'It may not have reached us. Please try again in a moment; your details are still in the form.',
  },
  'rate-limited': {
    title: 'Your enquiry could not be sent — too many attempts.',
    body: 'Please wait a few minutes before sending it again. Your details are still in the form.',
  },
  rejected: {
    title: 'Your enquiry could not be sent — some details were not accepted.',
    body: 'Check each field and try again. If it keeps happening, please contact Indo directly.',
  },
  server: {
    title: 'Your enquiry could not be sent.',
    body: 'Something went wrong on our side. Your details are still in the form — please try again in a few minutes.',
  },
};

type Fields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  workforceSize: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'not-configured';

const empty: Fields = { fullName: '', company: '', email: '', phone: '', industry: '', workforceSize: '', message: '' };

const industryOptions = ['Food manufacturing', 'Frozen food production', 'Retail', 'Other'];
const workforceOptions = ['1–10 people', '11–25 people', '26–50 people', '51–100 people', 'More than 100 people', 'Not sure yet'];

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.company.trim()) e.company = 'Enter your company name.';
  if (!v.email.trim()) e.email = 'Enter your business email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter an email address in the format name@company.co.uk.';
  if (v.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces and + only.';
  if (!v.industry) e.industry = 'Select the industry your business operates in.';
  if (!v.workforceSize) e.workforceSize = 'Select an approximate workforce requirement.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little about the support you need (at least 10 characters).';
  // Length limits: only reported when exceeded, so they never get in the way of normal input.
  for (const key of Object.keys(MAX_LENGTH) as (keyof typeof MAX_LENGTH)[]) {
    if (!e[key] && v[key].trim().length > MAX_LENGTH[key]) {
      e[key] = `${labels[key]} must be ${MAX_LENGTH[key].toLocaleString('en-GB')} characters or fewer (currently ${v[key].trim().length.toLocaleString('en-GB')}).`;
    }
  }
  return e;
}

const requiredFields: (keyof Fields)[] = ['fullName', 'company', 'email', 'industry', 'workforceSize', 'message'];

const labels: Record<keyof Fields, string> = {
  fullName: 'Full name',
  company: 'Company name',
  email: 'Business email',
  phone: 'Phone number',
  industry: 'Industry',
  workforceSize: 'Approximate workforce requirement',
  message: 'Message',
};

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<Failure>('server');
  // Honeypot: hidden from people, often filled by bots. Sent to the endpoint so it can discard spam.
  const [trap, setTrap] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const uid = useId();

  // Cancel an in-flight request if the visitor leaves the page.
  useEffect(() => () => requestRef.current?.abort(), []);

  const update = (name: keyof Fields, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  };

  const blur = (name: keyof Fields) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return; // ignore repeat clicks while a request is in flight
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // No endpoint configured yet: say so plainly rather than pretending to send.
    if (!site.enquiryEndpoint) {
      setStatus('not-configured');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    if (!navigator.onLine) {
      fail('offline');
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    requestRef.current = controller;
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, SUBMIT_TIMEOUT_MS);

    const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));

    try {
      const res = await fetch(site.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, website: trap }),
        signal: controller.signal,
      });
      if (res.ok) {
        setStatus('sent');
        setValues(empty);
        setTouched({});
        requestAnimationFrame(() => statusRef.current?.focus());
      } else if (res.status === 429) fail('rate-limited');
      else if (res.status >= 400 && res.status < 500) fail('rejected');
      else fail('server');
    } catch {
      // An abort without a timeout means the visitor navigated away: nothing to show.
      if (controller.signal.aborted && !timedOut) return;
      fail(timedOut ? 'timeout' : navigator.onLine ? 'server' : 'offline');
    } finally {
      window.clearTimeout(timer);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  function fail(reason: Failure) {
    setFailure(reason);
    setStatus('failed');
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const errorList = (Object.keys(errors) as (keyof Fields)[]).filter((k) => errors[k]);
  const showSummary = errorList.length > 0 && Object.keys(touched).length === Object.keys(empty).length;
  const id = (name: keyof Fields) => `${uid}-${name}`;

  const fieldProps = (name: keyof Fields) => ({
    id: id(name),
    name,
    value: values[name],
    'aria-required': requiredFields.includes(name) ? true : undefined,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
    onBlur: () => blur(name),
    className: `block w-full border bg-paper px-4 py-3.5 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-faint focus:border-midnight focus:outline-none focus:ring-2 focus:ring-forest ${
      errors[name] ? 'border-error' : 'border-stone-2 hover:border-ink-soft'
    }`,
  });

  const renderLabel = (name: keyof Fields, optional = false) => (
    <label htmlFor={id(name)} className="mb-2 block text-label text-midnight">
      {labels[name]}
      {optional && <span className="ml-2 font-sans font-normal text-ink-soft">(optional)</span>}
    </label>
  );

  const renderError = (name: keyof Fields) =>
    errors[name] ? (
      <p id={`${id(name)}-error`} className="mt-2 flex gap-2 text-small text-error">
        <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 bg-error" />
        <span className="min-w-0">{errors[name]}</span>
      </p>
    ) : null;

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="bg-lime-soft p-8 outline-none">
        <h2 className="text-h3 text-midnight">Thank you — your enquiry has been sent.</h2>
        <p className="mt-3 text-ink-soft">A member of the Indo team will be in touch to talk through your workforce requirements.</p>
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
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-required`} aria-busy={status === 'sending'}>
      {showSummary && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 bg-error-soft p-6 outline-none">
          <h2 className="text-title-s text-midnight">Check the following before sending:</h2>
          <ul className="mt-3 space-y-1.5">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="text-error underline underline-offset-4">
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

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          {renderLabel('fullName')}
          <input type="text" autoComplete="name" dir="auto" {...fieldProps('fullName')} onChange={(e) => update('fullName', e.target.value)} />
          {renderError('fullName')}
        </div>
        <div>
          {renderLabel('company')}
          <input type="text" autoComplete="organization" dir="auto" {...fieldProps('company')} onChange={(e) => update('company', e.target.value)} />
          {renderError('company')}
        </div>
        <div>
          {renderLabel('email')}
          <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} onChange={(e) => update('email', e.target.value)} />
          {renderError('email')}
        </div>
        <div>
          {renderLabel('phone', true)}
          <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} onChange={(e) => update('phone', e.target.value)} />
          {renderError('phone')}
        </div>
        <div>
          {renderLabel('industry')}
          <select {...fieldProps('industry')} onChange={(e) => update('industry', e.target.value)}>
            <option value="">Select an industry</option>
            {industryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {renderError('industry')}
        </div>
        <div>
          {renderLabel('workforceSize')}
          <select {...fieldProps('workforceSize')} onChange={(e) => update('workforceSize', e.target.value)}>
            <option value="">Select a range</option>
            {workforceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {renderError('workforceSize')}
        </div>
        <div className="sm:col-span-2">
          {renderLabel('message')}
          <textarea
            rows={6}
            dir="auto"
            placeholder="For example: the roles you need, shift patterns, start dates or the site location."
            {...fieldProps('message')}
            onChange={(e) => update('message', e.target.value)}
          />
          {renderError('message')}
        </div>
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

      <p className="mt-8 max-w-[60ch] text-small text-ink-soft">
        We use the details you provide only to respond to your enquiry. See our{' '}
        <Link to="/privacy-policy" className="text-forest underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex min-h-13 items-center justify-center gap-3 bg-midnight px-8 py-3.5 text-label text-ivory transition-colors duration-300 hover:bg-forest active:translate-y-px disabled:cursor-progress disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending Enquiry…' : 'Send Enquiry'}
          <span aria-hidden="true" className="size-1.5 bg-lime transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === 'sending' && <p className="sr-only">Sending your enquiry…</p>}
        {status === 'not-configured' && (
          <div className="mt-8 bg-paper p-6">
            <p className="text-title-s text-midnight">Your enquiry has not been sent.</p>
            <p className="mt-2 text-ink-soft">
              {site.contact.email || site.contact.phone
                ? 'Online enquiries are not connected yet. Please contact Indo directly using the details on this page in the meantime.'
                : 'Online enquiries are not connected yet, so this form cannot deliver messages at the moment. Please try again soon.'}
            </p>
          </div>
        )}
        {status === 'failed' && (
          <div role="alert" className="mt-8 bg-error-soft p-6">
            <p className="text-title-s text-midnight">{failureCopy[failure].title}</p>
            <p className="mt-2 text-ink-soft">{failureCopy[failure].body}</p>
          </div>
        )}
      </div>
    </form>
  );
}
