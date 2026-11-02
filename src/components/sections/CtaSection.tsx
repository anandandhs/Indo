import { primaryCta } from '../../config/site';
import { photos, type Photo } from '../../data/images';
import { Button } from '../ui/Button';
import { Img } from '../ui/Img';

type Link = { label: string; to: string };

type Props = {
  title?: string;
  body?: string;
  primary?: Link;
  secondary?: Link | null;
  photo?: Photo;
  photoPosition?: string;
};

/** Closing enquiry section: canopy-green panel with a full-height industrial photograph. */
export function CtaSection({
  title = 'Your production needs the right people. Let’s find the right workforce solution.',
  body = 'Whether you need ongoing workforce provision, additional production capacity or support with warehouse and logistics operations, INDO is ready to understand your requirements.',
  primary = { label: primaryCta.label, to: '/contact#enquiry' },
  secondary = { label: 'Contact INDO', to: '/contact' },
  photo = photos.warehouseForklift,
  photoPosition,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="on-dark overflow-x-clip bg-canopy text-ivory">
      <div className="container-page grid items-stretch gap-0 lg:grid-cols-12">
        <div className="py-20 lg:col-span-7 lg:py-32 lg:pr-12">
          <h2 id="cta-title" className="text-h1 max-w-[18ch]">
            {title}
          </h2>
          <p className="text-lead mt-6 max-w-[46ch] text-on-dark-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button to={primary.to} variant="lime">
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="ghost-light">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
        <div className="relative -mx-4 min-h-80 sm:-mx-8 lg:col-span-5 lg:mx-0 lg:-mr-8 xl:-mr-[max(3.5rem,calc((100vw-88rem)/2+3.5rem))]">
          <div className="absolute inset-0">
            <Img photo={photo} sizes="(min-width: 1024px) 42vw, 100vw" position={photoPosition} />
          </div>
        </div>
      </div>
    </section>
  );
}
