import { Button } from '../components/ui/Button';
import { Seo } from '../components/ui/Seo';

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." path="/404" noindex />
      <section aria-labelledby="page-title" className="py-28 lg:py-40">
        <div className="container-page">
          <h1 id="page-title" className="text-h1 max-w-[16ch] text-midnight">
            This page is not on the rota.
          </h1>
          <p className="text-lead mt-6 max-w-[48ch] text-ink-soft">
            The page may have moved or the link may be mistyped. Head back to the homepage or get in touch with our team.
          </p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Button to="/">Back to the Homepage</Button>
            <Button to="/contact" variant="secondary">
              Contact INDO
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
