import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechViz } from "@/components/tech/TechViz";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TECH_PILLARS } from "@/content/technology";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology",
  description:
    "Nano particle restoration. Waterproof polymer + ozone tire chemistry. 9H SiO₂ ceramic. UV-stable protection. The engineering behind Flamingo.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-noise opacity-25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-[50%] bg-flamingo-violet/15 blur-3xl"
        />

        <Container className="relative">
          <ScrollReveal>
            <span className="text-eyebrow flex items-center gap-3" style={{ color: "rgb(255 165 90)" }}>
              <span aria-hidden className="h-px w-10" style={{ background: "rgba(255,165,90,0.7)" }} />
              Engineering
            </span>
            <h1 className="text-mega mt-6 max-w-5xl text-flamingo-soft">
              We treat surfaces like
              <br />
              <span className="text-gradient-pink">
                engineered systems.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-base text-flamingo-titanium md:text-lg">
              Paint chalks. Plastic oxidizes. Rubber cracks. Leather dries.
              Different surfaces fail differently — and every Flamingo formula
              is engineered back from a specific failure mode the field has
              shown us. This is the chemistry behind the catalog.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="pillars">
        <Container>
          <div className="flex flex-col gap-24">
            {TECH_PILLARS.map((pillar, index) => (
              <ScrollReveal key={pillar.id}>
                <GlassCard className="overflow-hidden">
                  <div
                    className={
                      index % 2 === 1
                        ? "flex flex-col lg:flex-row-reverse"
                        : "flex flex-col lg:flex-row"
                    }
                  >
                    <div className="aspect-[16/10] w-full lg:aspect-auto lg:w-1/2">
                      <TechViz type={pillar.vizType} accent={pillar.accent} />
                    </div>
                    <div className="flex flex-col gap-6 p-10 lg:w-1/2 lg:p-14">
                      <span
                        className="text-eyebrow"
                        style={{ color: pillar.accent }}
                      >
                        Pillar 0{index + 1} · {pillar.name}
                      </span>
                      <h2 className="text-display text-flamingo-soft">
                        {pillar.hero}
                      </h2>
                      <p className="text-sm text-flamingo-titanium md:text-base">
                        {pillar.scienceCopy}
                      </p>
                      <ul className="mt-2 flex flex-col gap-3 text-sm text-flamingo-soft">
                        {pillar.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className="mt-1.5 inline-block h-1 w-4 shrink-0 rounded-full"
                              style={{ background: pillar.accent }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Build with us"
              title="The same chemistry,"
              accentTitle="under your brand."
              description="Our OEM/ODM facility produces private-label chemistry for 60+ global automotive brands. The same engineering discipline applied to every contract."
            />
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact?type=oem">OEM / ODM Inquiry</Button>
              <Button href="/products" variant="ghost">
                View the Full Catalog
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
