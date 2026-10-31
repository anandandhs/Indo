import { photos, type Photo } from './images';

/**
 * Service content. These four categories are proposed from Indo's stated
 * business (procuring, supplying and managing labour). The specific
 * activities listed under `involves` are TO CONFIRM with Indo before launch.
 */

export type ServiceId = 'procurement' | 'deployment' | 'management' | 'planning';

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  summary: string;
  involves: string[];
  challenge: string;
  inPractice: string;
  value: string;
  photo: Photo;
};

export const services: Service[] = [
  {
    id: 'procurement',
    title: 'Workforce Procurement & Sourcing',
    short: 'Sourcing',
    summary:
      'Finding and supplying suitable people based on the operational and workforce requirements of each client.',
    involves: [
      'Understanding the roles, shift patterns and numbers each operation needs',
      'Sourcing people with the right fit for production and retail environments',
      'Supplying labour at the volumes the operation requires',
    ],
    challenge:
      'Production lines and stores depend on having enough of the right people, on the right shifts. Gaps on the floor slow output, stretch existing teams and put service levels at risk.',
    inPractice:
      'In food production, that means people ready for hygiene-controlled, line-based work. In retail, it means people who can support store operations and customers from the first shift.',
    value: 'A dependable source of labour shaped around how your operation actually runs.',
    photo: photos.productionWide,
  },
  {
    id: 'deployment',
    title: 'Workforce Deployment',
    short: 'Deployment',
    summary: 'Supporting the process of getting people placed and ready to meet business requirements.',
    involves: [
      'Coordinating placement of workers into the right roles and shifts',
      'Preparing people for the site and the work before they arrive',
      'Responding as requirements change from week to week',
    ],
    challenge:
      'Sourcing people is only half the job. If workers arrive unprepared or in the wrong place, the operation still loses time.',
    inPractice:
      'We plan placements around production schedules and store rotas, so people arrive where they are needed and ready to start.',
    value: 'People placed quickly and correctly, with less disruption to your managers.',
    photo: photos.packingFloor,
  },
  {
    id: 'management',
    title: 'Workforce Management',
    short: 'Management',
    summary: 'Supporting the coordination and management of supplied workforces within operational environments.',
    involves: [
      'Ongoing coordination of the supplied workforce on site',
      'A consistent point of contact for your operational team',
      'Keeping attendance and cover under control across shifts',
    ],
    challenge:
      'A supplied workforce still needs organising. Without coordination, managers spend their time chasing cover instead of running the operation.',
    inPractice:
      'Across food production lines and retail sites, we help keep teams organised, shifts covered and communication clear between Indo and your managers.',
    value: 'A workforce that is managed, not just supplied — so your team can focus on output.',
    photo: photos.lineOperative,
  },
  {
    id: 'planning',
    title: 'Workforce Planning & Support',
    short: 'Planning',
    summary: 'Understanding workforce requirements and supporting changing operational demands.',
    involves: [
      'Reviewing your workforce requirements with your operations team',
      'Preparing for seasonal peaks, new lines and changing volumes',
      'Adjusting supply as your operational demands change',
    ],
    challenge:
      'Demand in food and retail rarely stands still. Seasonal peaks, new product lines and changing order volumes all change how many people an operation needs.',
    inPractice:
      'We work with you to anticipate changes in production and trading patterns, so workforce supply keeps pace with the business.',
    value: 'Fewer surprises, and a workforce that flexes with your operation.',
    photo: photos.kitchenTeam,
  },
];
