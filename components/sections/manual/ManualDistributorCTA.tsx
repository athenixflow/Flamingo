"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ManualDistributorCTA() {
  return (
    <section
      aria-labelledby="manual-distributor"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[60vh] w-[80vh] -translate-y-1/2 rounded-full bg-flamingo-pink/12 blur-3xl"
      />

      <Container className="relative text-center">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="text-eyebrow inline-flex items-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          Partnership
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
        </motion.span>

        <motion.h2
          id="manual-distributor"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mx-auto mt-6 max-w-4xl text-flamingo-soft"
        >
          BECOME A FLAMINGO <span className="text-gradient-pink">DISTRIBUTOR.</span>
        </motion.h2>

        <p className="mx-auto mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          Join our growing distribution network and bring premium automotive care products to your market.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 inline-flex"
        >
          <Button href="/contact?type=distributor" size="lg" magnetic={false}>
            Apply Now
            <Arrow />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
