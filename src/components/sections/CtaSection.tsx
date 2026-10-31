import { photos, type Photo } from '../../data/images';
import { Button } from '../ui/Button';
import { Img } from '../ui/Img';

type Props = {
  title?: string;
  body?: string;
  cta?: string;
  photo?: Photo;
};

/** Closing enquiry section: forest panel with a cropped photograph. */
export function CtaSection({
  title = 'Let’s build the workforce your business needs.',
  body = 'Looking for an experienced workforce partner who understands your industry? Let’s start a conversation.',
  cta = 'Talk to Indo',
  photo = photos.retailProduce,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-canopy text-ivory">
      <div className="container-page grid items-stretch gap-0 lg:grid-cols-12">
        <div className="py-20 lg:col-span-7 lg:py-28 lg:pr-12">
          <h2 id="cta-title" className="text-h1 max-w-[16ch]">
            {title}
          </h2>
          <p className="text-lead mt-6 max-w-[46ch] text-on-dark-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Button to="/contact" variant="lime">
              {cta}
            </Button>
            <Button to="/what-we-do" variant="ghost-light">
              See How We Work
            </Button>
          </div>
        </div>
        <div className="relative -mx-4 min-h-72 sm:-mx-8 lg:col-span-5 lg:mx-0 lg:-mr-8 xl:-mr-[max(3.5rem,calc((100vw-88rem)/2+3.5rem))]">
          <div className="absolute inset-0">
            <Img photo={photo} sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
