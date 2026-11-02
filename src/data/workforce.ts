import { photos, type Photo } from './images';

/**
 * Workforce content shared by the homepage, Workforce Solutions (/what-we-do),
 * Our Expertise (/industries) and the enquiry form.
 *
 * Everything here comes from INDO's supplied positioning brief. Do not add
 * services, roles, statistics or accreditations that INDO has not confirmed.
 */

/* ------------------------------------------------------------------
   Frozen and processed food products INDO has workforce experience in
   ------------------------------------------------------------------ */

export type Product = { id: string; title: string; detail: string; photo: Photo; position?: string };

export const products: Product[] = [
  {
    id: 'frozen-pizza',
    title: 'Frozen pizzas',
    detail: 'Dough, topping, freezing and packing lines running at volume across every shift.',
    photo: photos.pizzaDetail,
  },
  {
    id: 'fries-potato',
    title: 'French fries and potato products',
    detail: 'Cutting, sorting, processing and packing for frozen potato production.',
    // Potato intake on a conveyor: the raw material of fries production. Replace with
    // INDO's own photo of a fries line when available.
    photo: photos.potatoConveyor,
  },
  {
    id: 'fish-fillets',
    title: 'Frozen fish and fillets',
    detail: 'Grading, weighing, processing and cold-chain handling in fish production.',
    photo: photos.fishCrates,
    position: 'center 60%',
  },
  {
    id: 'processed-prepared',
    title: 'Processed and prepared foods',
    detail: 'Mixing, cooking and preparation environments with strict hygiene routines.',
    photo: photos.kitchenVats,
  },
  {
    id: 'ready-meals',
    title: 'Ready-to-cook and ready-to-eat products',
    detail: 'Assembly, portioning, tray-filling and inspection for chilled and frozen ranges.',
    photo: photos.lineOperative,
    position: '62% center',
  },
];

/* ------------------------------------------------------------------
   Workforce capabilities — the operational roles INDO supplies
   ------------------------------------------------------------------ */

export type CapabilityId = 'production' | 'packing-quality' | 'warehouse-logistics' | 'supervision';

export type Capability = {
  id: CapabilityId;
  title: string;
  summary: string;
  roles: string[];
  /** Plain-language explanation for a production or operations manager. */
  inPractice: string;
  photo: Photo;
  position?: string;
};

export const capabilities: Capability[] = [
  {
    id: 'production',
    title: 'Production & Processing',
    summary: 'People for the line itself — operating, feeding and running production and processing equipment.',
    roles: [
      'Production Operatives',
      'Food Production Workers',
      'Machine Operatives',
      'Line Operatives',
      'Food Processing Operatives',
    ],
    inPractice:
      'People who can step onto a running line, follow the standard operating procedures for your site and hold the pace your production plan needs — on days, nights or rotating shifts.',
    photo: photos.productionWide,
  },
  {
    id: 'packing-quality',
    title: 'Packing & Quality',
    summary: 'Teams that pack, weigh, label and check product so it leaves the line right first time.',
    roles: [
      'Packing Operatives',
      'Quality Control Assistants',
      'Labelling and Inspection Operatives',
      'Weighing and Portioning Operatives',
    ],
    inPractice:
      'Packing and quality teams protect what the line has produced. We supply people who work accurately to specification, weight and labelling requirements, and who take hygiene seriously.',
    photo: photos.packingFloor,
    position: 'center 40%',
  },
  {
    id: 'warehouse-logistics',
    title: 'Warehouse & Logistics',
    summary: 'Operatives who receive, store, pick and dispatch finished product to keep orders moving.',
    roles: [
      'Warehouse Operatives',
      'Pickers and Packers',
      'Goods-In / Goods-Out Operatives',
      'Dispatch Operatives',
      'Stock and Inventory Support',
    ],
    inPractice:
      'Finished product still has to be received, stored, picked and loaded on time. We supply warehouse and dispatch teams that keep pace with production and customer order windows.',
    photo: photos.warehouseReachTruck,
  },
  {
    id: 'supervision',
    title: 'Supervision & Management',
    summary: 'Experienced people who lead shifts, organise teams and support day-to-day operational control.',
    roles: ['Team Leaders', 'Production Supervisors', 'Shift Supervisors', 'Operations Support'],
    inPractice:
      'Larger or multi-shift workforces need leadership on the floor. Team leaders and supervisors help organise people, keep communication clear and support your own operational managers.',
    photo: photos.supervisorWalkround,
    position: '40% center',
  },
];

/* ------------------------------------------------------------------
   Workforce solutions — the five supply arrangements
   ------------------------------------------------------------------ */

export type SolutionId = 'temporary' | 'temp-to-perm' | 'seasonal' | 'ongoing' | 'shift-cover';

export type Solution = {
  id: SolutionId;
  title: string;
  /** Short label used in the enquiry form. */
  formLabel: string;
  summary: string;
  whenItFits: string;
  /** A short "rhythm" label describing the duration of the arrangement. */
  horizon: string;
};

export const solutions: Solution[] = [
  {
    id: 'temporary',
    title: 'Temporary Workforce Solutions',
    formLabel: 'Temporary workforce',
    horizon: 'Immediate and short term',
    summary: 'Workers supplied for short-term or immediate operational requirements.',
    whenItFits:
      'A new order, a line restart, a short project or absence that needs covering now — without adding to your permanent headcount.',
  },
  {
    id: 'temp-to-perm',
    title: 'Temporary-to-Permanent',
    formLabel: 'Temporary-to-permanent',
    horizon: 'Flexible pathway',
    summary: 'Flexible arrangements where a temporary placement can become permanent, where appropriate for both the client and worker.',
    whenItFits:
      'When you want to see someone working in your environment first, and both sides can decide on a permanent role with confidence.',
  },
  {
    id: 'seasonal',
    title: 'Seasonal Workforce',
    formLabel: 'Seasonal workforce',
    horizon: 'Peak periods',
    summary: 'Additional people during periods of increased production and seasonal demand.',
    whenItFits:
      'Christmas and summer peaks, promotional runs and seasonal ranges that lift volumes for a defined period.',
  },
  {
    id: 'ongoing',
    title: 'Ongoing Workforce Provision',
    formLabel: 'Ongoing workforce provision',
    horizon: 'Long term',
    summary: 'Long-term workforce supply to support established production requirements.',
    whenItFits:
      'A steady, managed workforce that forms part of your regular operation, week after week, across agreed shifts.',
  },
  {
    id: 'shift-cover',
    title: 'Additional Shift Cover',
    formLabel: 'Additional shift cover',
    horizon: 'As required',
    summary: 'Workforce support for additional shifts, increased production or unexpected staffing shortages.',
    whenItFits:
      'An extra shift to meet an order, a weekend run or a sudden workforce gap that would otherwise slow the line.',
  },
];

/* ------------------------------------------------------------------
   Understanding the manufacturing environment
   ------------------------------------------------------------------ */

/** The production-line flow drawn on the homepage: where INDO's people fit in an operation. */
export const operationFlow = [
  { title: 'Workforce availability', note: 'The right people, confirmed for each shift' },
  { title: 'Production', note: 'Lines staffed and running to plan' },
  { title: 'Quality', note: 'Checks, inspection and hygiene routines' },
  { title: 'Packing', note: 'Weighing, labelling and packing to specification' },
  { title: 'Warehousing', note: 'Goods-in, storage, stock and picking' },
  { title: 'Dispatch', note: 'Orders loaded and out on time' },
];

export const environmentPriorities = [
  'Production continuity',
  'Reliable staffing levels',
  'Workforce flexibility',
  'Consistent productivity',
  'Food safety and hygiene expectations',
  'Quality and compliance requirements',
  'Effective shift coverage',
  'Seasonal and peak-period capacity',
];

/* ------------------------------------------------------------------
   Scalable capacity
   ------------------------------------------------------------------ */

export const capacityScenarios = [
  { title: 'Planned workforce requirements', note: 'Agreed numbers for your regular production schedule.' },
  { title: 'Seasonal demand', note: 'Additional people ahead of known peaks.' },
  { title: 'Additional shifts', note: 'Extra shifts staffed to meet orders.' },
  { title: 'Production increases', note: 'New lines, launches and promotional volumes.' },
  { title: 'Short-term workforce gaps', note: 'Cover for absence and unexpected shortages.' },
  { title: 'Changing operational requirements', note: 'Numbers and roles adjusted as needs move.' },
];

/* ------------------------------------------------------------------
   Recruitment and workforce management
   ------------------------------------------------------------------ */

export const recruitmentCriteria = [
  'Reliability and attendance',
  'Previous manufacturing or food production experience',
  'Ability to work shifts',
  'Ability to work within production targets',
  'Understanding of workplace procedures',
  'Health, safety and hygiene awareness',
  'Ability to work effectively as part of a team',
];

export const journey = [
  {
    title: 'Understand requirements',
    body: 'Roles, numbers, shift patterns, start dates and the specific demands of your site.',
  },
  {
    title: 'Source suitable workers',
    body: 'Finding people whose experience and availability match the environment.',
  },
  {
    title: 'Recruitment & assessment',
    body: 'Assessing reliability, shift suitability, experience and hygiene awareness.',
  },
  {
    title: 'Onboarding',
    body: 'Right-to-work checks, induction and client-specific preparation where required.',
  },
  {
    title: 'Workforce deployment',
    body: 'People placed into the agreed roles and shifts, ready to start.',
  },
  {
    title: 'Ongoing support',
    body: 'Continued coordination and management as your requirements change.',
  },
];

/** Recruitment & Workforce Management — the third service area on /what-we-do. */
export const managementServices = [
  {
    title: 'Candidate sourcing',
    body: 'We find people with the right experience and availability for food production, packing and warehouse environments, at the numbers your operation needs.',
  },
  {
    title: 'Recruitment assessment',
    body: 'Candidates are assessed for reliability, attendance, relevant experience and their understanding of workplace procedures before they are put forward.',
  },
  {
    title: 'Shift and operational suitability',
    body: 'We check that people can work your shift patterns and production targets, and that they are suited to cold, fast-moving or hygiene-controlled areas where relevant.',
  },
  {
    title: 'Onboarding and induction support',
    body: 'Where required, we support right-to-work checks, onboarding, induction and any client-specific preparation so people arrive ready for your site.',
  },
  {
    title: 'Ongoing workforce management',
    body: 'Once people are in place, we stay involved: coordinating the workforce, keeping shifts covered and adjusting supply as your requirements change.',
  },
];

/* ------------------------------------------------------------------
   Why INDO
   ------------------------------------------------------------------ */

export const reasons = [
  {
    title: 'Experience',
    body: 'Specialist experience supporting frozen and processed food manufacturing environments.',
  },
  {
    title: 'Flexibility',
    body: 'Workforce solutions designed around changing production requirements.',
  },
  {
    title: 'Scalability',
    body: 'Support for regular workforce needs and peak-period demand.',
  },
  {
    title: 'Operational understanding',
    body: 'Practical knowledge of production, processing, packing and warehouse environments.',
  },
  {
    title: 'Compliance focus',
    body: 'A structured approach to workforce onboarding and client requirements.',
  },
  {
    title: 'Partnership approach',
    body: 'Working as an extension of your operation rather than simply supplying people.',
  },
  {
    title: 'Client partnership',
    body: 'Understanding each client’s business and developing solutions around its operational needs.',
  },
];

/** Onboarding support INDO provides where a client requires it (shown on About). */
export const onboardingSupport = [
  'Workforce onboarding',
  'Induction',
  'Client-specific workforce preparation',
  'Ongoing workforce management',
];

/** Compliance areas (shown on About). Describes the approach; no accreditation is claimed. */
export const complianceAreas = [
  {
    title: 'Employment and right to work',
    body: 'Workforce arrangements structured around appropriate employment and right-to-work requirements.',
  },
  {
    title: 'Onboarding to client requirements',
    body: 'Onboarding and induction shaped by each client’s site rules and operational requirements.',
  },
  {
    title: 'Health and safety',
    body: 'Awareness of relevant workplace health and safety standards built into recruitment and preparation.',
  },
  {
    title: 'Hygiene and operational standards',
    body: 'An understanding of the hygiene and operational expectations of food production environments.',
  },
];
