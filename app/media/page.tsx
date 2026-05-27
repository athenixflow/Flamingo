import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaReels } from "@/components/sections/media/MediaReels";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Media",
  description:
    "Brand films, product macro reels, behind-the-scenes from the manufacturing studio, and distributor launches.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <section className="relative pb-12 pt-40 sm:pt-48">
        <Container>
          <ScrollReveal>
            <span className="display flex items-center gap-3 text-xs tracking-ultra text-flamingo-pink">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink" />
              Media
            </span>
            <h1 className="display mt-6 max-w-4xl text-5xl font-bold leading-[0.95] text-flamingo-soft sm:text-6xl lg:text-7xl">
              The film. The chemistry.
              <br />
              <span className="text-gradient-pink">The brand on screen.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
              Brand films, macro product reels, manufacturing studio footage,
              and distributor launches.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <MediaReels />
    </>
  );
}
