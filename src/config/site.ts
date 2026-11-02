/**
 * Central site configuration.
 *
 * Every company fact used on the website lives here so it can be updated
 * without touching page layouts. Values set to `null` are unconfirmed and
 * render as clearly marked placeholders (see <Placeholder />) or are hidden.
 * Search the codebase for "TO CONFIRM" to find all items awaiting sign-off.
 */

export const site = {
  name: 'INDO',
  tagline: 'People Powering Business',
  /** Central positioning line, used in the footer and metadata. */
  positioning: 'Frozen Food Workforce Solutions & Industry Expertise',
  description:
    'INDO provides specialist workforce procurement and management for frozen food manufacturing, food production, packing, warehousing and logistics operations across the UK.',

  /**
   * Public URL, used for canonical links, og:url, absolute share images and the sitemap.
   * Comes from VITE_SITE_URL, or automatically from Vercel's production domain (vite.config.ts).
   */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) || null) as string | null,

  facts: {
    /** Confirmed by Indo. */
    clients: '10+',
    /** Exact number of years in operation. TO CONFIRM — leave null until verified. */
    yearsOfExperience: null as number | null,
  },

  contact: {
    /** Email and hours: TO CONFIRM — each is shown only once supplied. */
    email: null as string | null,
    phone: '07424 907169' as string | null,
    address: ['17 Bergamot Place', 'Oxford', 'OX4 7GL'] as string[] | null,
    hours: null as string | null,
    /**
     * Response time INDO commits to for urgent cover requests, e.g. "the same working day".
     * TO CONFIRM — while null, the urgent-cover form makes no promise.
     */
    urgentResponseTime: null as string | null,
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

/**
 * Main navigation. Route paths are unchanged from the original site so existing links keep
 * working; only the labels reflect the updated positioning.
 */
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Expertise', to: '/industries' },
  { label: 'Workforce Solutions', to: '/what-we-do' },
  { label: 'Contact', to: '/contact' },
];

export const primaryCta = { label: 'Discuss Your Workforce Needs', to: '/contact#enquiry' };
