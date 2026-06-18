"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { HQ, SOCIAL_LINKS } from "@/content/contact";

export function ManualFooter() {
  return (
    <section
      aria-labelledby="manual-footer"
      className="relative pb-24 pt-16 sm:pt-24"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-4xl"
        >
          <GlassCard className="grid gap-8 p-8 sm:grid-cols-2 sm:p-10">
            <div>
              <span className="text-eyebrow text-flamingo-titanium">
                Contact
              </span>
              <h2
                id="manual-footer"
                className="display mt-3 text-2xl text-flamingo-soft sm:text-3xl"
              >
                Flamingo Car Care Tech <span className="text-gradient-pink">Limited.</span>
              </h2>

              <address className="mt-5 not-italic text-sm leading-relaxed text-flamingo-titanium">
                {HQ.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5">
                <SocialIcons links={SOCIAL_LINKS} size="md" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
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
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}
