"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  MANUFACTURING_INTRO,
  MANUFACTURING_STATS,
  MANUFACTURING_STATIONS,
  type ManufacturingStat,
} from "@/content/about";

export function Manufacturing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      aria-labelledby="manufacturing-heading"
      className="relative overflow-hidden py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-flamingo-pink/8 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-flamingo-cyan/8 blur-[140px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-noise opacity-20" />

      <Container className="relative flex flex-col gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {MANUFACTURING_INTRO.eyebrow}
            </span>
            <h2 id="manufacturing-heading" className="text-display max-w-4xl text-flamingo-soft">
              {MANUFACTURING_INTRO.title}
              <br />
              <span className="text-gradient-pink">{MANUFACTURING_INTRO.accentTitle}</span>
            </h2>
            <div className="grid max-w-4xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {MANUFACTURING_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MANUFACTURING_STATS.map((stat) => (
            <StatTile key={stat.label} stat={stat} progress={scrollYProgress} />
          ))}
        </div>

        <ScrollReveal>
          <FactorySchematic />
        </ScrollReveal>
      </Container>
    </section>
  );
}

function StatTile({ stat, progress }: { stat: ManufacturingStat; progress: MotionValue<number> }) {
  // Numeric counter — drives 0 -> stat.value as the section enters
  const raw = useTransform(progress, [0.05, 0.4], [0, 1]);
  const smoothed = useSpring(raw, { stiffness: 80, damping: 20 });
  const numeric = useTransform(smoothed, (v) => {
    if (stat.value === 0) return stat.display;
    return Math.round(v * stat.value).toLocaleString();
  });

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-flamingo-pink/15 blur-2xl"
      />
      <div className="flex flex-col gap-2">
        <span className="display text-4xl text-flamingo-soft sm:text-5xl">
          {stat.value > 0 ? <Counter value={numeric} fallback={stat.display} /> : stat.display}
          {stat.unit && (
            <span className="ml-1 text-xl text-flamingo-titanium">{stat.unit}</span>
          )}
          {stat.suffix && (
            <span className="ml-2 text-sm text-flamingo-titanium">{stat.suffix}</span>
          )}
        </span>
        <span className="text-meta mt-2 text-flamingo-titanium">{stat.label}</span>
      </div>
    </div>
  );
}

function Counter({ value, fallback }: { value: MotionValue<string>; fallback: string }) {
  const [text, setText] = useState(fallback);
  useMotionValueEvent(value, "change", (v) => setText(v));
  return <>{text}</>;
}

function FactorySchematic() {
  const stations = MANUFACTURING_STATIONS;
  // Six stations arranged on a hex-grid-style flow
  const positions = [
    { x: 80, y: 110 },
    { x: 220, y: 75 },
    { x: 360, y: 110 },
    { x: 360, y: 240 },
    { x: 220, y: 280 },
    { x: 80, y: 240 },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-flamingo-titanium/12 bg-flamingo-carbon/40 p-8">
      <span className="text-meta text-flamingo-titanium">
        Production Flow · Schematic Floor Plan
      </span>
      <div className="mt-6 aspect-[16/10] w-full">
        <svg viewBox="0 0 440 350" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(229,9,130,0)" />
              <stop offset="50%" stopColor="#E50982" />
              <stop offset="100%" stopColor="rgba(229,9,130,0)" />
            </linearGradient>
            <radialGradient id="stationGlow">
              <stop offset="0%" stopColor="#E50982" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E50982" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Connecting flow lines between stations */}
          {positions.map((p, i) => {
            if (i === positions.length - 1) return null;
            const next = positions[i + 1];
            return (
              <line
                key={`line-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(184,184,184,0.18)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Pulse animations traveling along the path */}
          {positions.map((p, i) => {
            if (i === positions.length - 1) return null;
            const next = positions[i + 1];
            return (
              <motion.line
                key={`pulse-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke="url(#pulse)"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
                viewport={{ once: false, margin: "-25%" }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Station nodes */}
          {positions.map((p, i) => (
            <g key={`station-${i}`}>
              <circle cx={p.x} cy={p.y} r={32} fill="url(#stationGlow)" />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={14}
                fill="#0a0a0a"
                stroke="#E50982"
                strokeWidth={1.4}
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-25%" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              <text
                x={p.x}
                y={p.y - 28}
                fill="#F5F5F5"
                fontSize={11}
                fontWeight={600}
                fontFamily="var(--font-display)"
                textAnchor="middle"
              >
                {stations[i].name}
              </text>
              <text
                x={p.x}
                y={p.y + 36}
                fill="#B8B8B8"
                fontSize={9}
                fontFamily="var(--font-display)"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                {stations[i].note.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
