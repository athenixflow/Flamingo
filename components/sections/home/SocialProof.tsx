"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";

const PLATFORM_ACCENT: Record<Testimonial["platform"], string> = {
  Instagram: "#F5F5F5",
  TikTok: "#00CFFF",
  YouTube: "#FF3D45",
  Distributor: "#FFA55A",
};

const PLATFORM_ICON: Record<Testimonial["platform"], React.ReactNode> = {
  Instagram: <DotPattern />,
  TikTok: <WavePattern />,
  YouTube: <PlayPattern />,
  Distributor: <BadgePattern />,
};

export function SocialProof() {
  // Bento layout: pick 2 "feature" tiles and 6 regular tiles
  const feature = TESTIMONIALS.slice(0, 2);
  const regular = TESTIMONIALS.slice(2, 8);

  return (
    <section
      aria-labelledby="social-heading"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Social Proof"
            title="The detailing world"
            accentTitle="has been talking."
            description="Creators, professionals, and distributors who've put the catalog to work."
          />
        </ScrollReveal>

        <div className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 0 — spans 2 cols, 2 rows on lg */}
          <FeatureTile testimonial={feature[0]} index={0} className="lg:col-span-2 lg:row-span-2" />

          {/* Two small tiles on the right column at lg, stacked above feature 1 */}
          <RegularTile testimonial={regular[0]} index={2} />
          <RegularTile testimonial={regular[1]} index={3} />

          {/* Feature 1 — spans 2 cols at lg, below feature 0 */}
          <FeatureTile testimonial={feature[1]} index={1} className="lg:col-span-2" />

          {/* Remaining 4 regular tiles */}
          {regular.slice(2).map((t, i) => (
            <RegularTile key={t.id} testimonial={t} index={4 + i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureTile({
  testimonial: t,
  index,
  className,
}: {
  testimonial: Testimonial;
  index: number;
  className?: string;
}) {
  const accent = PLATFORM_ACCENT[t.platform];
  return (
    <ScrollReveal delay={(index % 4) * 0.06} className={className}>
      <GlassCard
        className="group relative h-full overflow-hidden p-8 sm:p-10"
      >
        {/* Vertical accent bar — left edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-6 left-0 w-px transition-all duration-500 group-hover:w-1"
          style={{ background: accent }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 60%)`,
          }}
        />

        <div className="relative flex h-full flex-col gap-6 pl-3 sm:pl-4">
          <div className="flex items-center justify-between">
            <span className="text-meta text-flamingo-titanium" style={{ color: accent }}>
              {t.platform}
            </span>
            <motion.span
              aria-hidden
              style={{ color: accent }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {PLATFORM_ICON[t.platform]}
            </motion.span>
          </div>

          <p className="text-display flex-1 text-flamingo-soft">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
            <span className="display text-sm text-flamingo-soft">{t.handle}</span>
            {t.context && (
              <span className="text-meta text-flamingo-titanium">
                {t.context}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

function RegularTile({
  testimonial: t,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const accent = PLATFORM_ACCENT[t.platform];
  return (
    <ScrollReveal delay={(index % 4) * 0.06}>
      <GlassCard className="group relative h-full overflow-hidden p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-5 left-0 w-px transition-all duration-500 group-hover:w-[3px]"
          style={{ background: accent }}
        />

        <div className="relative flex h-full flex-col gap-5 pl-3">
          <div className="flex items-center justify-between">
            <span className="text-meta" style={{ color: accent }}>
              {t.platform}
            </span>
            <span aria-hidden style={{ color: accent }}>
              {PLATFORM_ICON[t.platform]}
            </span>
          </div>

          <p className="flex-1 text-sm text-flamingo-soft">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
            <span className="display text-xs" style={{ color: accent }}>
              {t.handle}
            </span>
            {t.context && (
              <span className="text-meta text-flamingo-titanium">
                {t.context}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

function DotPattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="2" />
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function WavePattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 8 Q5 4 8 8 T14 8" />
    </svg>
  );
}
function PlayPattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3l8 5-8 5V3z" />
    </svg>
  );
}
function BadgePattern() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 1l2 2 3-1-1 3 2 3-2 3 1 3-3-1-2 2-2-2-3 1 1-3-2-3 2-3-1-3 3 1z" />
    </svg>
  );
}
