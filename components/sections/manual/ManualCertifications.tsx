"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { MANUAL_CERTIFICATIONS, type ManualCertification } from "@/content/manual";

export function ManualCertifications() {
  return (
    <section
      aria-labelledby="manual-certs"
      className="relative py-24 sm:py-28"
    >
      <Container className="relative">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="text-eyebrow flex items-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          Certifications
        </motion.span>

        <motion.h2
          id="manual-certs"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mt-6 max-w-3xl text-flamingo-soft"
        >
          CERTIFIED <span className="text-gradient-pink">QUALITY.</span>
        </motion.h2>

        <p className="mt-4 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          Independently audited quality and environmental management systems — every batch, every line, every shift.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {MANUAL_CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} delay={0.1 + i * 0.12} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CertCard({ cert, delay }: { cert: ManualCertification; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <GlassCard className="group relative overflow-hidden p-8 transition-shadow duration-500 hover:shadow-glow">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-flamingo-pink/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />

        <div className="flex items-start gap-5">
          <Seal title={cert.title} />
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-meta text-flamingo-pink">{cert.badge}</span>
            <h3 className="display text-2xl font-bold text-flamingo-soft">{cert.title}</h3>
            <p className="text-sm text-flamingo-titanium">{cert.issuer}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-flamingo-titanium">
          {cert.body}
        </p>
      </GlassCard>
    </motion.div>
  );
}

function Seal({ title }: { title: string }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0">
        <defs>
          <linearGradient id={`seal-${title}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E50982" />
            <stop offset="100%" stopColor="#8A2EFF" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke={`url(#seal-${title})`} strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgb(229 9 130 / 0.45)" strokeWidth="0.6" strokeDasharray="2 3" />
      </svg>
      <span className="display relative text-[10px] font-bold uppercase tracking-ultra text-flamingo-soft">
        {title.replace("ISO ", "")}
      </span>
    </div>
  );
}
