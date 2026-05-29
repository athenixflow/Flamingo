"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WHY_INTRO, WHY_VIGNETTES, type WhyVignette } from "@/content/about";
import { getProductImage } from "@/lib/product-images";

export function WhyWeExist() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-flamingo-obsidian py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-15"
      />

      <Container className="relative flex flex-col gap-20">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {WHY_INTRO.eyebrow}
              <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
            </span>
            <h2 id="why-heading" className="text-display max-w-4xl text-flamingo-soft">
              {WHY_INTRO.title}
              <br />
              <span className="text-gradient-pink">{WHY_INTRO.accentTitle}</span>
            </h2>
            <div className="mx-auto grid max-w-3xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {WHY_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-28">
          {WHY_VIGNETTES.map((v, i) => (
            <Vignette key={v.imageSlug} vignette={v} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Vignette({ vignette, index }: { vignette: WhyVignette; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Wipe progress drives the after-image's clip-path width
  const wipe = useTransform(scrollYProgress, [0.2, 0.75], [0, 100]);
  const reverse = index % 2 === 1;
  const img = getProductImage(vignette.imageSlug);

  return (
    <div
      ref={ref}
      className={
        reverse
          ? "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>:first-child]:lg:order-2"
          : "grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
      }
    >
      <BeforeAfter src={img} wipe={wipe} caption={vignette.caption} />
      <div className="flex flex-col justify-center gap-5">
        <span className="text-eyebrow text-flamingo-pink">0{index + 1} · Before → After</span>
        <h3 className="display text-3xl text-flamingo-soft sm:text-4xl">{vignette.title}</h3>
        <p className="text-base text-flamingo-titanium md:text-lg">{vignette.body}</p>
      </div>
    </div>
  );
}

function BeforeAfter({
  src,
  wipe,
  caption,
}: {
  src: string | null;
  wipe: MotionValue<number>;
  caption: string;
}) {
  // Hooks must be called unconditionally before any early return.
  const wipeClip = useTransform(wipe, (v) => `inset(0 ${100 - v}% 0 0)`);
  const railLeft = useTransform(wipe, (v) => `${v}%`);

  if (!src) {
    return (
      <div className="aspect-[4/3] w-full rounded-3xl border border-flamingo-titanium/10 bg-flamingo-carbon/40" />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-flamingo-titanium/12 bg-flamingo-carbon/60">
      {/* Before — dull / desaturated */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={`${caption} before`}
          fill
          sizes="(max-width: 1024px) 90vw, 540px"
          className="object-contain p-10"
          style={{ filter: "grayscale(0.75) brightness(0.55) contrast(0.9)" }}
        />
        <span className="text-meta absolute left-4 top-4 text-flamingo-titanium">Before</span>
      </div>

      {/* After — vibrant, revealed by clip-path on scroll */}
      <motion.div
        style={{ clipPath: wipeClip as unknown as string }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={`${caption} after`}
          fill
          sizes="(max-width: 1024px) 90vw, 540px"
          className="object-contain p-10"
          style={{ filter: "saturate(1.15) contrast(1.05)" }}
        />
        <span className="text-meta absolute right-4 top-4 text-flamingo-pink">After</span>
      </motion.div>

      {/* Wipe rail */}
      <motion.div
        style={{ left: railLeft }}
        className="absolute inset-y-0 z-10 w-px bg-gradient-to-b from-transparent via-flamingo-pink to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-flamingo-obsidian/90 to-transparent p-4">
        <span className="text-meta text-flamingo-titanium">{caption}</span>
        <span className="text-meta text-flamingo-titanium">Scroll to reveal →</span>
      </div>
    </div>
  );
}
