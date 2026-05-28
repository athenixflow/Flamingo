import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  ABOUT_HERO,
  PHILOSOPHY,
  MISSION,
  MANUFACTURING,
  QUALITY,
  STATS_LIST,
} from "@/content/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Flamingo Car Care Tech Co., Ltd. — engineered in USA, manufactured at scale, trusted by 60+ OEM partners and distributors in 15+ countries.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-noise opacity-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-flamingo-pink/15 blur-3xl"
        />

        <Container className="relative">
          <ScrollReveal>
            <span className="text-eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
              {ABOUT_HERO.eyebrow}
            </span>
            <h1 className="text-mega mt-6 max-w-5xl text-flamingo-soft">
              {ABOUT_HERO.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base text-flamingo-titanium md:text-lg">
              {ABOUT_HERO.subline}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="stats">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS_LIST.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.05}>
                <GlassCard className="p-8">
                  <div className="display text-5xl text-gradient-pink">{s.value}</div>
                  <div className="text-meta mt-3 text-flamingo-soft">
                    {s.label}
                  </div>
                  {s.hint && (
                    <div className="mt-4 text-xs text-flamingo-titanium">
                      {s.hint}
                    </div>
                  )}
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="philosophy">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Philosophy"
              title="What we believe — and why we ship what we ship."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PHILOSOPHY.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <GlassCard className="h-full p-8">
                  <span className="text-eyebrow mb-3 block text-flamingo-titanium">
                    Pillar {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-xl text-flamingo-soft">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm text-flamingo-titanium md:text-base">
                    {p.body}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="mission">
        <Container>
          <ScrollReveal>
            <div className="rounded-3xl border border-flamingo-titanium/15 bg-flamingo-carbon/40 p-12 text-center sm:p-20">
              <span className="text-eyebrow text-flamingo-titanium">
                Our Mission
              </span>
              <h2 className="text-display mt-6 text-flamingo-soft">
                {MISSION.title}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base text-flamingo-titanium md:text-lg">
                {MISSION.body}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="manufacturing">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Manufacturing"
              title="Vertically integrated."
              accentTitle="OEM ready."
              description="The facility behind the catalog — and behind 60+ private-label brands worldwide."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {MANUFACTURING.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 0.08}>
                <GlassCard className="h-full p-8">
                  <span className="text-eyebrow text-flamingo-titanium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-2xl text-flamingo-soft">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-sm text-flamingo-titanium md:text-base">
                    {m.body}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="quality">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="Quality" title="Engineered. Tested. Documented." />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {QUALITY.map((q, i) => (
              <ScrollReveal key={q.title} delay={i * 0.08}>
                <GlassCard className="h-full p-8">
                  <h3 className="display text-xl text-flamingo-soft">
                    {q.title}
                  </h3>
                  <p className="mt-4 text-sm text-flamingo-titanium">
                    {q.body}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <SectionHeading
                eyebrow="Work With Us"
                title="Distributor. Manufacturer. Partner."
              />
              <div className="flex flex-wrap gap-3">
                <Button href="/contact?type=distributor">Distribution</Button>
                <Button href="/contact?type=oem" variant="ghost">
                  OEM / ODM
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
