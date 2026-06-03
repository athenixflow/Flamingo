import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { GlobalPresence } from "@/components/sections/contact/GlobalPresence";
import { SocialIcons } from "@/components/ui/SocialIcons";
import {
  CONTACT_PAGE,
  HQ,
  WHATSAPP_URL,
  SOCIAL_LINKS,
} from "@/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "General product questions, distributor partnerships, business partnerships — get in touch with Flamingo Car Care Tech from our Lagos, Nigeria headquarters.",
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
              {CONTACT_PAGE.eyebrow}
            </span>
            <h1 className="text-mega mt-6 max-w-4xl text-flamingo-soft">
              {CONTACT_PAGE.headline}
              <br />
              <span className="text-gradient-pink">{CONTACT_PAGE.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
              {CONTACT_PAGE.subhead}
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

            <aside className="flex flex-col gap-4" aria-labelledby="reach-us">
              <h2 id="reach-us" className="text-eyebrow text-flamingo-titanium">
                Reach Us Directly
              </h2>

              <GlassCard className="flex flex-col gap-5 p-6">
                <div>
                  <h3 className="display text-sm uppercase tracking-ultra text-flamingo-soft">
                    {HQ.region}
                  </h3>
                  <p className="mt-1 text-flamingo-cyan">{HQ.city}</p>
                  <p className="text-meta mt-2 text-flamingo-titanium">
                    {HQ.role}
                  </p>
                </div>

                <div>
                  <p className="text-meta text-flamingo-titanium">Address</p>
                  <address className="mt-1 not-italic text-sm leading-relaxed text-flamingo-soft">
                    {HQ.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div>
                  <p className="text-meta text-flamingo-titanium">Phone</p>
                  <ul className="mt-1 flex flex-col gap-1 text-sm text-flamingo-soft">
                    {HQ.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="underline-offset-4 hover:text-flamingo-pink hover:underline"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-meta text-flamingo-titanium">Email</p>
                  <a
                    href={`mailto:${HQ.email}`}
                    className="mt-1 inline-block text-sm text-flamingo-soft underline-offset-4 hover:text-flamingo-pink hover:underline"
                  >
                    {HQ.email}
                  </a>
                </div>

                <div>
                  <p className="text-meta text-flamingo-titanium">Hours</p>
                  <ul className="mt-1 flex flex-col gap-0.5 text-sm text-flamingo-soft">
                    {HQ.hours.map((h) => (
                      <li key={h.days} className="flex items-baseline justify-between gap-3">
                        <span className="text-flamingo-titanium">{h.days}</span>
                        <span>{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-flamingo-titanium/15 pt-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-meta inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-flamingo-obsidian transition-transform hover:scale-[1.03]"
                  >
                    <WhatsAppGlyph className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                  <SocialIcons links={SOCIAL_LINKS} size="md" />
                </div>
              </GlassCard>
            </aside>
          </div>
        </Container>
      </section>

      <GlobalPresence />
    </>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.272l-.999 3.648 3.97-1.619zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}
