"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { MANUAL_DOWNLOAD } from "@/content/manual";

export function ManualDownload() {
  return (
    <section
      aria-labelledby="manual-download"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-96 w-[80%] rounded-full bg-flamingo-pink/10 blur-3xl"
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl"
        >
          <GlassCard className="relative overflow-hidden p-10 text-center sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-flamingo-pink/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-flamingo-violet/15 blur-3xl"
            />

            <span className="text-eyebrow text-flamingo-titanium">The Complete Manual</span>
            <h2
              id="manual-download"
              className="text-display mt-6 text-flamingo-soft"
            >
              DOWNLOAD COMPLETE <span className="text-gradient-pink">PRODUCT MANUAL.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
              Access the complete Flamingo Product Catalogue containing detailed product descriptions, specifications, application instructions, safety information, and technical references.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MANUAL_DOWNLOAD.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-flamingo-titanium/15 bg-flamingo-obsidian/40 p-4"
                >
                  <div className="display text-xl font-bold text-flamingo-soft">
                    {fact.value}
                  </div>
                  <div className="text-meta mt-1 text-flamingo-titanium">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href={MANUAL_DOWNLOAD.href}
              download={MANUAL_DOWNLOAD.filename}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-flamingo-pink px-9 py-4 text-sm font-bold uppercase tracking-ultra text-white shadow-glow"
            >
              <DownloadGlyph className="h-5 w-5" />
              Download PDF Manual
            </motion.a>

            <p className="text-meta mt-5 text-flamingo-titanium">
              {MANUAL_DOWNLOAD.pages} pages · 8.6 MB · Free
            </p>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}

function DownloadGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
