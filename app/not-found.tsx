import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flamingo-pink/15 blur-3xl"
      />

      <Container className="relative text-center">
        <span className="display text-[10px] tracking-ultra text-flamingo-pink">
          Error 404
        </span>
        <h1 className="display mt-6 text-7xl font-bold text-flamingo-soft sm:text-8xl lg:text-9xl">
          <span className="text-gradient-pink">Off Route.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-flamingo-titanium">
          The page you tried to reach isn&rsquo;t in the catalog. Try the
          showroom, or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/products" variant="ghost">
            Explore Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
