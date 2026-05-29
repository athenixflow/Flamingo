"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CERTIFICATIONS, CERTIFICATIONS_INTRO } from "@/content/about";

export function Certifications() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const particleCount = isMobile ? 6 : 14;

  return (
    <section
      aria-labelledby="cert-heading"
      className="relative overflow-hidden bg-flamingo-obsidian py-32 sm:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-noise opacity-15" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-flamingo-pink/8 blur-[140px]"
      />

      <Container className="relative flex flex-col gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {CERTIFICATIONS_INTRO.eyebrow}
            </span>
            <h2 id="cert-heading" className="text-display max-w-4xl text-flamingo-soft">
              {CERTIFICATIONS_INTRO.title}
              <br />
              <span className="text-gradient-pink">{CERTIFICATIONS_INTRO.accentTitle}</span>
            </h2>
            <div className="grid max-w-3xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {CERTIFICATIONS_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} particleCount={particleCount} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CertCard({
  cert,
  index,
  particleCount,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  index: number;
  particleCount: number;
}) {
  // Pseudo-random scatter origins for the particle-converge effect (deterministic)
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const angle = (i / particleCount) * Math.PI * 2 + index;
    const radius = 90 + (i % 5) * 18;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative overflow-hidden rounded-3xl p-8"
    >
      {/* Particle converge */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: [0, 0.7, 0] }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 inline-block h-1 w-1 rounded-full bg-flamingo-pink/80"
          />
        ))}
      </div>

      {/* Seal */}
      <div aria-hidden className="relative mx-auto h-24 w-24">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(229,9,130,0.5), rgba(199,0,111,0.2), rgba(255,77,184,0.4), rgba(229,9,130,0.5))",
          }}
        />
        <div className="absolute inset-2 rounded-full bg-flamingo-obsidian" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#E50982" strokeWidth="1.6" aria-hidden>
            <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="relative mt-6 text-center">
        <h3 className="display text-xl text-flamingo-soft">{cert.name}</h3>
        <p className="text-meta mt-2 text-flamingo-titanium">{cert.subtitle}</p>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flamingo-pink/60 to-transparent"
      />
    </motion.div>
  );
}
