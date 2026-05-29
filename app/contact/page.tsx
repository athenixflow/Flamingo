import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { GlobalPresence } from "@/components/sections/contact/GlobalPresence";
import { OFFICES } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Consumer questions. Distributor partnerships. OEM/ODM manufacturing. Get in touch with Flamingo Car Care across five regional offices.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative pb-12 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-noise opacity-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-flamingo-pink/15 blur-3xl"
        />

        <Container className="relative">
          <ScrollReveal>
            <span className="text-eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
              Contact
            </span>
            <h1 className="text-mega mt-6 max-w-4xl text-flamingo-soft">
              Three doors in.
              <br />
              <span className="text-gradient-pink">One brand.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
              Whether you&rsquo;re a consumer with a product question, a distributor
              opening a market, or an OEM/ODM partner exploring private-label
              manufacturing — we route your inquiry to the right team.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="inquiry-form">
        <Container>
          <div className="mb-10 flex flex-col gap-2">
            <span className="text-eyebrow text-flamingo-titanium">
              The Inquiry Form
            </span>
            <h2
              id="inquiry-form"
              className="display text-3xl text-flamingo-soft sm:text-4xl"
            >
              What brings you in?
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-flamingo-carbon/40" />}>
              <ContactForm />
            </Suspense>

            <div className="flex flex-col gap-4" aria-labelledby="regional-offices">
              <h2 id="regional-offices" className="text-eyebrow text-flamingo-titanium">
                Regional Offices
              </h2>
              {OFFICES.map((o) => (
                <GlassCard key={`${o.region}-${o.city}`} className="p-6">
                  <h3 className="display text-sm text-flamingo-soft">
                    {o.region}
                  </h3>
                  <p className="mt-1 text-flamingo-cyan">{o.city}</p>
                  <p className="text-meta mt-3 text-flamingo-titanium">
                    {o.role}
                  </p>
                  {o.email && (
                    <a
                      href={`mailto:${o.email}`}
                      className="mt-3 inline-block text-sm text-flamingo-soft underline-offset-4 hover:text-flamingo-pink hover:underline"
                    >
                      {o.email}
                    </a>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GlobalPresence />
    </>
  );
}
