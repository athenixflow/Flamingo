"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/content/products";

export function UsageGuide({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="usage" className="py-24" aria-labelledby="usage-heading">
      <Container>
        <SectionHeading
          eyebrow="How To Apply"
          title="The professional technique, step by step."
          description={`Application instructions for ${product.name} as documented on the production label.`}
        />

        <div ref={ref} className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="hidden lg:block">
            <ProgressRail progress={scrollYProgress} steps={product.application.length} />
          </div>

          <ol className="flex flex-col gap-6">
            {product.application.map((step, i) => (
              <Step key={i} index={i + 1} body={step} total={product.application.length} />
            ))}
          </ol>
        </div>

        {product.cautions.length > 0 && (
          <div className="mt-14 rounded-3xl border border-flamingo-pink/30 bg-flamingo-pink/5 p-8">
            <h3 className="text-eyebrow text-flamingo-pink">
              Cautions
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-flamingo-titanium">
              {product.cautions.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1.5 h-1 w-3 shrink-0 bg-flamingo-pink" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProgressRail({
  progress,
  steps,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  steps: number;
}) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="sticky top-32 h-fit">
      <div className="relative h-96 w-px overflow-hidden bg-flamingo-titanium/15">
        <motion.div
          style={{ height }}
          className="absolute inset-x-0 top-0 bg-flamingo-pink shadow-glow"
        />
      </div>
      <p className="display mt-6 text-[10px] tracking-ultra text-flamingo-titanium">
        {steps} steps · scroll to advance
      </p>
    </div>
  );
}

function Step({
  index,
  body,
  total,
}: {
  index: number;
  body: string;
  total: number;
}) {
  return (
    <motion.li
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-6 rounded-2xl border border-flamingo-titanium/10 bg-flamingo-carbon/30 p-8"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-meta text-flamingo-titanium">
          {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
        <span className="h-12 w-px bg-flamingo-titanium/20" />
      </div>
      <p className="flex-1 text-base text-flamingo-soft">{body}</p>
    </motion.li>
  );
}
