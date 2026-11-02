import { forwardRef } from 'react';
import { site } from '../../config/site';
import { failureCopy, type Failure, type SendStatus } from '../../lib/enquiry';

type Props = {
  status: SendStatus;
  failure: Failure;
  /** Pre-filled mailto: link carrying this enquiry (when an email address is configured). */
  mailto: string | null;
  tone?: 'light' | 'dark';
};

/**
 * Live status under an enquiry form. With no endpoint it never pretends to send: it hands the
 * visitor a pre-filled email or the phone number when INDO has published one, and otherwise says
 * plainly that the enquiry was not sent.
 */
export const EnquiryStatus = forwardRef<HTMLDivElement, Props>(function EnquiryStatus(
  { status, failure, mailto, tone = 'light' },
  ref,
) {
  const dark = tone === 'dark';
  const panel = dark ? 'bg-canopy text-ivory' : 'bg-paper';
  const title = dark ? 'text-title-s text-ivory' : 'text-title-s text-midnight';
  const body = dark ? 'mt-2 text-on-dark-muted' : 'mt-2 text-ink-soft';
  const link = dark ? 'text-lime underline underline-offset-4' : 'text-forest underline underline-offset-4';
  const { phone } = site.contact;

  return (
    <div ref={ref} tabIndex={-1} aria-live="polite" className="outline-none">
      {status === 'sending' && <p className="sr-only">Sending your enquiry…</p>}
      {status === 'not-configured' && (
        <div className={`mt-6 p-6 ${panel}`}>
          {mailto || phone ? (
            <>
              <p className={title}>Online sending isn’t connected yet — your enquiry is ready to send another way.</p>
              <p className={body}>
                {mailto && (
                  <a href={mailto} className={link}>
                    Email This Enquiry to INDO
                  </a>
                )}
                {mailto && phone && ' or call '}
                {!mailto && phone && 'Call '}
                {phone && (
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className={link}>
                    {phone}
                  </a>
                )}
                .
              </p>
            </>
          ) : (
            <>
              <p className={title}>Your enquiry has not been sent.</p>
              <p className={body}>
                Online enquiries are not connected yet, so this form cannot deliver messages at the moment. Please try
                again soon.
              </p>
            </>
          )}
        </div>
      )}
      {status === 'failed' && (
        <div role="alert" className={`mt-6 p-6 ${dark ? 'bg-canopy text-ivory' : 'bg-error-soft'}`}>
          <p className={title}>{failureCopy[failure].title}</p>
          <p className={body}>{failureCopy[failure].body}</p>
        </div>
      )}
    </div>
  );
});
