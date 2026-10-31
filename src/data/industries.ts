import { photos, type Photo } from './images';

export type Industry = {
  slug: 'food-manufacturing' | 'frozen-food-production' | 'retail';
  title: string;
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
};

export const industries: Industry[] = [
  {
    slug: 'food-manufacturing',
    title: 'Food Manufacturing',
    card: 'Supporting food production environments with dependable workforce solutions designed around the demands of modern manufacturing operations.',
    photo: photos.productionWide,
    gallery: [photos.kitchenVats, photos.qualityHands],
    ctaPhoto: photos.packingFloor,
    seoTitle: 'Food Manufacturing Staffing & Workforce Solutions',
    seoDescription:
      'Food production workforce solutions from Indo: sourcing, supplying and managing dependable labour for UK food manufacturing operations.',
    headline: 'Dependable people for production environments that cannot stand still.',
    intro:
      'Food manufacturing runs on schedules, hygiene standards and line speeds that leave little room for gaps. Indo supports production businesses with the people they need and the coordination to keep those teams working well.',
    sections: [
      {
        heading: 'Built around production schedules',
        body: 'Shift patterns, line changes and order volumes shape how many people a site needs and when. We take time to understand how your production runs before we source the workforce for it.',
      },
      {
        heading: 'Why dependable staffing matters',
        body: 'A missing operative on a line affects everyone on it. Reliable attendance and consistent cover protect output, product quality and the teams already on site.',
      },
      {
        heading: 'Managed, not just supplied',
        body: 'Our support continues once people are on site, with ongoing coordination of the supplied workforce alongside your production managers.',
      },
    ],
    roles: {
      // TO CONFIRM: the specific roles Indo supplies into food manufacturing.
      heading: 'Where our people support production',
      items: ['Production line operatives', 'Packing and labelling', 'Hygiene and sanitation support', 'Goods-in and dispatch'],
    },
  },
  {
    slug: 'frozen-food-production',
    title: 'Frozen Food Production',
    card: 'Specialist experience in supporting frozen food manufacturing, with workforce procurement and management experience across the production of pizzas, fries, fillets and more.',
    photo: photos.fishCrates,
    gallery: [photos.sortingLine, photos.pizzaDetail, photos.frozenFillets],
    ctaPhoto: photos.fishWeighing,
    seoTitle: 'Frozen Food Production Workforce Specialists',
    seoDescription:
      'Indo has specialist experience sourcing and managing workforces for frozen food production, including frozen pizzas, French fries and frozen fillets.',
    headline: 'Specialist workforce experience in frozen food production.',
    intro:
      'Frozen food is where Indo has some of its deepest experience. We have sourced and managed workforces involved in producing frozen pizzas, French fries, frozen fillets and other processed and frozen food products.',
    sections: [
      {
        heading: 'High volume, every shift',
        body: 'Frozen food lines often run at high volumes and across extended shift patterns. Workforce availability has to match that pace, or the whole line slows down.',
      },
      {
        heading: 'Coordination in demanding conditions',
        body: 'Cold environments, strict hygiene controls and fast-moving lines all place demands on the people working in them. Coordinating that workforce well keeps production moving.',
      },
      {
        heading: 'Experience across product types',
        body: 'Pizza, potato and fish production each have their own processes and rhythms. Our experience across them helps us understand what each operation needs from its people.',
      },
    ],
    roles: {
      heading: 'Products our workforces have helped produce',
      items: ['Frozen pizzas', 'French fries', 'Frozen fillets', 'Other processed and frozen food products'],
    },
  },
  {
    slug: 'retail',
    title: 'Retail',
    card: 'Helping retail businesses access and manage the people required to support their day-to-day operations.',
    photo: photos.retailStocking,
    gallery: [photos.retailCounter, photos.retailProduce],
    ctaPhoto: photos.retailAisle,
    seoTitle: 'Retail Workforce Management & Labour Supply',
    seoDescription:
      'Retail workforce management from Indo: helping UK retail businesses source, supply and manage the people behind day-to-day store operations.',
    headline: 'The people behind well-run stores.',
    intro:
      'Retail operations depend on having enough people on the floor, at the counters and behind the scenes. Indo helps retail businesses access and manage the workforce their day-to-day operations require.',
    sections: [
      {
        heading: 'Matched to trading patterns',
        body: 'Footfall, deliveries and seasonal peaks change the shape of every week. We support workforce supply that follows how your stores actually trade.',
      },
      {
        heading: 'Ready for the shop floor',
        body: 'Retail colleagues represent your business to customers. We focus on supplying people suited to customer-facing, fast-moving environments.',
      },
      {
        heading: 'Ongoing management support',
        body: 'From replenishment to counters, we help coordinate the supplied workforce so store managers can focus on running the store.',
      },
    ],
    roles: {
      // TO CONFIRM: the specific roles Indo supplies into retail.
      heading: 'Where our people support retail operations',
      items: ['Replenishment and stock handling', 'Fresh food counters', 'Store operations support', 'Seasonal peak cover'],
    },
  },
];

export const industryBySlug = (slug: string | undefined) => industries.find((i) => i.slug === slug);
