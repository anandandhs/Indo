import { site } from '../config/site';
import { Seo } from '../components/ui/Seo';
import { ContactForm } from '../components/sections/ContactForm';
import { UrgentCoverForm } from '../components/sections/UrgentCoverForm';

const nextSteps = [
  'We review your enquiry and the workforce requirement you have described.',
  'A member of our team gets in touch to understand your operation, roles and shift patterns in more detail.',
  'We talk through a suitable workforce solution and how INDO could put it in place.',
];

const helpfulDetails = ['Roles and approximate numbers', 'Shift patterns and site location', 'Start date and expected duration'];

export function Contact() {
  const { contact } = site;
  const hasDetails = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <Seo
        title="Contact INDO — Discuss Your Workforce Needs"
        description="Tell INDO what your operation needs. Enquire about temporary, seasonal or ongoing workforce solutions for food manufacturing, warehouse and logistics operations."
        path="/contact"
      />

      <section aria-labelledby="page-title" className="pb-24 pt-12 sm:pt-16 lg:pb-32 lg:pt-20">
        {/* DOM order is intro → form → supporting detail, so phones reach the form straight after
            the introduction. On desktop the form spans both rows on the right. */}
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-5">
            <h1 id="page-title" className="rise text-h1 max-w-[14ch] text-midnight">
              Tell us what your operation needs.
            </h1>
            <p className="rise text-lead mt-8 max-w-[46ch] text-ink-soft" style={{ animationDelay: '120ms' }}>
              Every business has different workforce requirements. Share some details about your operation, and our
              team can explore a suitable workforce solution with you.
            </p>
            <ul className="rise mt-8 space-y-2.5" style={{ animationDelay: '200ms' }} aria-label="Helpful details to include">
              {helpfulDetails.map((d) => (
                <li key={d} className="flex items-start gap-3 text-ink">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-lime" />
                  <span className="min-w-0">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="-mx-4 sm:mx-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            {/* Short-notice route first: four fields for a manager who needs people for the coming shifts. */}
            <section id="urgent" aria-labelledby="urgent-title" className="on-dark bg-midnight p-6 text-ivory sm:p-10 lg:p-12">
              <h2 id="urgent-title" className="text-h3">
                Need cover this week?
              </h2>
              <p className="mt-3 max-w-[52ch] text-on-dark-muted">
                Short on people for upcoming shifts? Send the essentials and we’ll call you back
                {site.contact.urgentResponseTime ? ` within ${site.contact.urgentResponseTime}` : ''} to arrange cover.
              </p>
              <div className="mt-8">
                <UrgentCoverForm />
              </div>
            </section>

            <div id="enquiry" className="bg-stone p-6 sm:p-10 lg:p-12">
              <h2 className="text-h3 text-midnight">Planning ahead? Send a full workforce enquiry</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div className="border-t border-stone-2 pt-10 lg:mt-14">
              <h2 className="text-title-s text-midnight">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-5">
                    <span className="flex size-8 shrink-0 items-center justify-center bg-midnight text-kicker text-lime">
                      {i + 1}
                    </span>
                    <p className="min-w-0 pt-1 text-ink-soft">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-10 text-small text-ink-soft">
                This form is for businesses enquiring about workforce solutions. INDO does not take job applications
                through this website.
              </p>
            </div>

            {hasDetails && (
              <div className="mt-12 border-t border-stone-2 pt-10">
                <h2 className="text-title-s text-midnight">Contact INDO directly</h2>
                <dl className="mt-6 space-y-5">
                  {contact.email && (
                    <div>
                      <dt className="text-meta text-ink-soft">Email</dt>
                      <dd>
                        <a href={`mailto:${contact.email}`} className="text-title-s text-forest underline underline-offset-4">
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {contact.phone && (
                    <div>
                      <dt className="text-meta text-ink-soft">Phone</dt>
                      <dd>
                        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-title-s text-forest underline underline-offset-4">
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <dt className="text-meta text-ink-soft">Office</dt>
                      <dd>
                        <address className="not-italic text-ink">
                          {contact.address.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </dd>
                    </div>
                  )}
                  {contact.hours && (
                    <div>
                      <dt className="text-meta text-ink-soft">Hours</dt>
                      <dd className="text-ink">{contact.hours}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
