import { site } from '../config/site';
import { Seo } from '../components/ui/Seo';
import { ContactForm } from '../components/sections/ContactForm';

const nextSteps = [
  'We review your enquiry and the workforce support you have described.',
  'A member of our team gets in touch to understand your operation in more detail.',
  'We talk through how Indo could support your workforce requirements.',
];

export function Contact() {
  const { contact } = site;
  const hasDetails = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <Seo
        title="Contact Indo — Discuss Your Workforce Needs"
        description="Talk to Indo about workforce procurement and management for your food production or retail business. Send us an enquiry today."
        path="/contact"
      />

      <section aria-labelledby="page-title" className="pb-24 pt-12 sm:pt-16 lg:pb-32 lg:pt-20">
        {/* DOM order is intro → form → supporting detail, so phones reach the form straight after
            the introduction. On desktop the form spans both rows on the right. */}
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-5">
            <h1 id="page-title" className="rise text-h1 max-w-[18ch] text-midnight">
              Let’s talk about your workforce requirements.
            </h1>
            <p className="rise text-lead mt-8 max-w-[46ch] text-ink-soft" style={{ animationDelay: '120ms' }}>
              Tell us a little about your business and the workforce support you are looking for. Our team would be
              happy to explore how Indo can help.
            </p>
          </div>

          <div className="-mx-4 sm:mx-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="bg-stone p-6 sm:p-10 lg:p-12">
              <h2 className="text-h3 text-midnight">Send an enquiry</h2>
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
            </div>

            {hasDetails && (
              <div className="mt-12 border-t border-stone-2 pt-10">
                <h2 className="text-title-s text-midnight">Contact Indo directly</h2>
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
