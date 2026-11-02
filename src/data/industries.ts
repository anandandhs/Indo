import { photos, type Photo } from './images';
import type { CapabilityId } from './workforce';

/**
 * Sectors served, in order of priority. Frozen food manufacturing leads; retail remains
 * part of INDO's wider experience but sits below production and logistics.
 * Slugs match the original site's URLs so existing links keep working.
 */
export type IndustrySlug = 'frozen-food-production' | 'food-manufacturing' | 'warehousing-logistics' | 'retail';

export type Industry = {
  slug: IndustrySlug;
  title: string;
  /** Primary sectors appear across the site; secondary ones only on Our Expertise. */
  priority: 'primary' | 'secondary';
  card: string;
  photo: Photo;
  /** Secondary photography used on the industry page. */
  gallery: Photo[];
  ctaPhoto: Photo;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  roles: { heading: string; items: string[] };
  /** Workforce capability areas most relevant to this sector. */
  capabilities: CapabilityId[];
};

export const industries: Industry[] = [
  {
    slug: 'frozen-food-production',
    title: 'Frozen Food Manufacturing',
    priority: 'primary',
    card: 'Specialist workforce experience across frozen pizzas, French fries and potato products, frozen fish and fillets, prepared foods and ready meals.',
    photo: photos.fishCrates,
    gallery: [photos.sortingLine, photos.pizzaDetail, photos.frozenFillets],
    ctaPhoto: photos.fishWeighing,
    seoTitle: 'Frozen Food Production Staffing & Workforce Solutions UK',
    seoDescription:
      'Frozen food workforce solutions from INDO: specialist experience sourcing and managing production workforces for frozen pizza, French fry, frozen fish and ready meal manufacturing.',
    headline: 'Specialist workforce experience in frozen food manufacturing.',
    intro:
      'Frozen food is where INDO’s experience runs deepest. We have sourced, recruited and managed workforces for businesses producing frozen pizzas, French fries and potato products, frozen fish and fillets, and other processed, prepared and frozen foods.',
    sections: [
      {
        heading: 'High volume, every shift',
        body: 'Frozen food lines often run at high volumes across extended shift patterns. Workforce availability has to match that pace, or the whole line slows down.',
      },
      {
        heading: 'Demanding conditions',
        body: 'Cold environments, strict hygiene controls and fast-moving lines all place demands on the people working in them. We recruit with those conditions in mind.',
      },
      {
        heading: 'Experience across product types',
        body: 'Pizza, potato and fish production each have their own processes and rhythms. Our experience across them helps us understand what each operation needs from its people.',
      },
    ],
    roles: {
      heading: 'Products our workforces have helped produce',
      items: [
        'Frozen pizzas',
        'French fries and potato products',
        'Frozen fish and fillets',
        'Processed and prepared foods',
        'Ready-to-cook and ready-to-eat products',
      ],
    },
    capabilities: ['production', 'packing-quality', 'warehouse-logistics', 'supervision'],
  },
  {
    slug: 'food-manufacturing',
    title: 'Food Production & Processing',
    priority: 'primary',
    card: 'Production line, machine, processing, packing and quality workforces for food manufacturing environments.',
    photo: photos.productionWide,
    gallery: [photos.kitchenVats, photos.qualityHands],
    ctaPhoto: photos.packingFloor,
    seoTitle: 'Food Manufacturing Workforce & Food Factory Staffing',
    seoDescription:
      'Food production workforce solutions from INDO: production operatives, machine and line operatives, packing and quality teams for UK food manufacturing.',
    headline: 'Dependable people for production environments that cannot stand still.',
    intro:
      'Food manufacturing runs on schedules, hygiene standards and line speeds that leave little room for gaps. INDO supports production businesses with the operational workforce they need, and the management to keep those teams working well.',
    sections: [
      {
        heading: 'Built around production schedules',
        body: 'Shift patterns, line changes and order volumes shape how many people a site needs and when. We understand how your production runs before we source the workforce for it.',
      },
      {
        heading: 'Why dependable staffing matters',
        body: 'A missing operative on a line affects everyone on it. Reliable attendance and consistent cover protect output, product quality and the teams already on site.',
      },
      {
        heading: 'Managed, not just supplied',
        body: 'Our support continues once people are on site, with ongoing coordination of the workforce alongside your production managers.',
      },
    ],
    roles: {
      heading: 'Where our people support production',
      items: [
        'Production and line operatives',
        'Machine operatives',
        'Food processing operatives',
        'Packing, weighing and labelling',
        'Quality control assistance',
      ],
    },
    capabilities: ['production', 'packing-quality', 'supervision'],
  },
  {
    slug: 'warehousing-logistics',
    title: 'Warehousing & Logistics',
    priority: 'primary',
    card: 'Warehouse, picking, stock, goods-in/goods-out and dispatch workforces that keep finished product moving.',
    photo: photos.warehouseReachTruck,
    gallery: [photos.warehouseForklift, photos.warehouseTeam],
    ctaPhoto: photos.supervisorWalkround,
    seoTitle: 'Warehouse & Logistics Workforce Solutions',
    seoDescription:
      'Logistics workforce solutions from INDO: warehouse operatives, pickers and packers, goods-in/goods-out and dispatch teams for food and manufacturing supply chains.',
    headline: 'The people who keep product moving from line to load.',
    intro:
      'Production only creates value once product is stored, picked and dispatched on time. INDO supplies and manages warehouse and logistics workforces for food manufacturers and the operations that support them.',
    sections: [
      {
        heading: 'Matched to order flow',
        body: 'Inbound deliveries, order cut-offs and dispatch windows shape every day. We build workforce cover around how your warehouse actually runs.',
      },
      {
        heading: 'Connected to production',
        body: 'When production volumes rise, warehouse and dispatch teams feel it next. Planning both together keeps the whole operation in step.',
      },
      {
        heading: 'Ready for busy periods',
        body: 'Seasonal peaks, promotions and additional shifts need extra people at short notice. We help you scale up without losing control.',
      },
    ],
    roles: {
      heading: 'Where our people support logistics',
      items: [
        'Warehouse operatives',
        'Pickers and packers',
        'Goods-in / goods-out',
        'Dispatch operatives',
        'Stock and inventory support',
      ],
    },
    capabilities: ['warehouse-logistics', 'supervision'],
  },
  {
    slug: 'retail',
    title: 'Retail',
    priority: 'secondary',
    card: 'Part of INDO’s wider experience: helping retail businesses access and manage the people behind day-to-day operations.',
    photo: photos.retailStocking,
    gallery: [photos.retailCounter, photos.retailProduce],
    ctaPhoto: photos.retailAisle,
    seoTitle: 'Retail Workforce Solutions',
    seoDescription:
      'Retail workforce solutions from INDO: helping UK retail businesses source, supply and manage the people behind day-to-day store operations.',
    headline: 'The people behind well-run stores.',
    intro:
      'Alongside our food manufacturing and logistics work, INDO has experience helping retail businesses access and manage the workforce their day-to-day operations require.',
    sections: [
      {
        heading: 'Matched to trading patterns',
        body: 'Footfall, deliveries and seasonal peaks change the shape of every week. We support workforce provision that follows how your stores actually trade.',
      },
      {
        heading: 'Ready for the shop floor',
        body: 'Retail colleagues represent your business to customers. We focus on supplying people suited to customer-facing, fast-moving environments.',
      },
      {
        heading: 'Ongoing management support',
        body: 'From replenishment to counters, we help coordinate the workforce so store managers can focus on running the store.',
      },
    ],
    roles: {
      // TO CONFIRM: the specific roles INDO supplies into retail.
      heading: 'Where our people support retail operations',
      items: ['Replenishment and stock handling', 'Fresh food counters', 'Store operations support', 'Seasonal peak cover'],
    },
    capabilities: ['warehouse-logistics', 'supervision'],
  },
];

export const primaryIndustries = industries.filter((i) => i.priority === 'primary');

export const industryBySlug = (slug: string | undefined) => industries.find((i) => i.slug === slug);
