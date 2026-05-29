"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MANIFESTO } from "@/content/about";

export function BrandManifesto({ logoSrc }: { logoSrc?: string | null }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative min-h-[100svh] w-full overflow-hidden bg-flamingo-obsidian"
    >
      <Particles count={isMobile ? 8 : 16} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(229,9,130,0.10) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-12 py-32 text-center">
        <LogoReveal logoSrc={logoSrc} />

        <motion.h2
          id="manifesto-heading"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-mega max-w-5xl text-flamingo-soft"
        >
          {MANIFESTO.headline[0]}
          <br />
          {MANIFESTO.headline[1]}
          <br />
          <span className="text-gradient-pink">{MANIFESTO.headline[2]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto max-w-2xl text-base text-flamingo-titanium md:text-lg"
        >
          {MANIFESTO.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href={MANIFESTO.primaryCta.href} size="lg">
            {MANIFESTO.primaryCta.label}
          </Button>
          <Button href={MANIFESTO.secondaryCta.href} size="lg" variant="ghost">
            {MANIFESTO.secondaryCta.label}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

function LogoReveal({ logoSrc }: { logoSrc?: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Soft halo glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(229,9,130,0.30), transparent 65%)",
        }}
      />
      {/* Light sweep */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: [0, 0.7, 0], x: 200 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay"
      />

      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-flamingo-titanium/20 bg-flamingo-carbon/60 sm:h-28 sm:w-28">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt="Flamingo"
            fill
            sizes="120px"
            className="object-contain p-3"
            priority
          />
        ) : (
          <span className="display absolute inset-0 flex items-center justify-center text-2xl text-flamingo-pink">
            F
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Particles({ count = 16 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 41) % 100;
        const top = ((i * 73) % 90) + 5;
        const delay = (i % 6) * 1.6;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.4, 0.1, 0], y: [0, -200] }}
            transition={{
              duration: 22,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inline-block h-[2px] w-[2px] rounded-full bg-white/70"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
    </div>
  );
}
