import { site } from '../../config/site';

/**
 * Shown in place of an enquiry form when JavaScript is not running (blocked, or failed to load),
 * so the visitor still has a way to reach INDO instead of a form that cannot send.
 */
export function NoJsFallback({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { phone, email } = site.contact;
  const link = tone === 'dark' ? 'text-lime underline underline-offset-4' : 'text-forest underline underline-offset-4';
  return (
    <div className={`nojs-only p-6 ${tone === 'dark' ? 'bg-canopy text-ivory' : 'bg-paper text-ink'}`}>
      <p className="font-semibold">This form needs JavaScript, which isn’t running in your browser.</p>
      <p className={`mt-2 ${tone === 'dark' ? 'text-on-dark-muted' : 'text-ink-soft'}`}>
        {phone || email ? (
          <>
            Contact INDO directly
            {phone && (
              <>
                {' '}on{' '}
                <a href={`tel:${phone.replace(/\s/g, '')}`} className={link}>
                  {phone}
                </a>
              </>
            )}
            {phone && email && ' or'}
            {email && (
              <>
                {' '}at{' '}
                <a href={`mailto:${email}`} className={link}>
                  {email}
                </a>
              </>
            )}
            .
          </>
        ) : (
          'Turn JavaScript on and reload this page to send an enquiry.'
        )}
      </p>
    </div>
  );
}
