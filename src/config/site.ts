/**
 * Central site configuration.
 *
 * Every company fact used on the website lives here so it can be updated
 * without touching page layouts. Values set to `null` are unconfirmed and
 * render as clearly marked placeholders (see <Placeholder />) or are hidden.
 * Search the codebase for "TO CONFIRM" to find all items awaiting sign-off.
 */

export const site = {
  name: 'Indo',
  tagline: 'People Powering Business',
  description:
    'Indo is a UK workforce partner that sources, supplies and manages dependable labour for food manufacturing, frozen food production and retail businesses.',

  /** Public URL once the site is live — used for metadata. TO CONFIRM */
  url: null as string | null,

  facts: {
    /** Confirmed by Indo. */
    clients: '10+',
    /** Exact number of years in operation. TO CONFIRM — leave null until verified. */
    yearsOfExperience: null as number | null,
  },

  contact: {
    /** TO CONFIRM — shown only once supplied. */
    email: null as string | null,
    phone: null as string | null,
    address: null as string[] | null,
    hours: null as string | null,
  },

  /**
   * Client logos — add only real logos supplied by Indo, with the client's permission.
   * Place files in /public/logos and list them here, e.g. { name: 'Client Ltd', src: '/logos/client.svg' }.
   * While empty, the homepage shows a typographic presentation instead.
   */
  clientLogos: [] as { name: string; src: string }[],

  /** Social profiles. Leave empty to hide the social links. TO CONFIRM */
  social: [] as { label: string; href: string }[],

  /**
   * Enquiry form endpoint. TO CONFIGURE.
   * Set VITE_ENQUIRY_ENDPOINT at build time (see .env.example), e.g. a Formspree,
   * HubSpot or in-house API URL. The form POSTs JSON there, including an empty
   * `website` honeypot field the endpoint should use to discard spam.
   * While unset, the form validates input but clearly tells the visitor that
   * online enquiries are not yet connected — it never fakes a success message.
   */
  enquiryEndpoint: (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() ?? '',

  /** Registered company details for the footer. TO CONFIRM */
  legal: {
    companyName: null as string | null,
    companyNumber: null as string | null,
  },
};

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Indo', to: '/about' },
  { label: 'What We Do', to: '/what-we-do' },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact', to: '/contact' },
];

export const primaryCta = { label: 'Discuss Your Workforce Needs', to: '/contact' };

/** Text used when the number of years is not yet confirmed. */
export function yearsLabel() {
  const years = site.facts.yearsOfExperience;
  return years ? `${years}+ years` : 'Years';
}
