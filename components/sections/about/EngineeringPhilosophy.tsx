"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PHILOSOPHY_INTRO, PHILOSOPHY_FORCES } from "@/content/about";

export function EngineeringPhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Per-layer separation (each layer translates outward as scroll advances)
  const t = useTransform(scrollYProgress, [0.12, 0.85], [0, 1]);

  // Outward translation amounts (px)
  const bodyY = useTransform(t, [0, 1], [0, -90]);
  const glassY = useTransform(t, [0, 1], [0, -160]);
  const wheelsY = useTransform(t, [0, 1], [0, 60]);
  const suspensionY = useTransform(t, [0, 1], [0, 130]);
  const brakesY = useTransform(t, [0, 1], [0, 200]);
  const engineX = useTransform(t, [0, 1], [0, -180]);

  const labelOpacity = useTransform(scrollYProgress, [0.18, 0.4, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="philosophy-heading"
      className="relative w-full bg-flamingo-obsidian"
      style={{ minHeight: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-noise opacity-15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(229,9,130,0.10) 0%, transparent 70%)",
          }}
        />

        <Container className="relative z-10 flex h-full flex-col justify-center gap-10 py-20">
          <div className="flex flex-col gap-5">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {PHILOSOPHY_INTRO.eyebrow}
            </span>
            <h2 id="philosophy-heading" className="text-display max-w-4xl text-flamingo-soft">
              {PHILOSOPHY_INTRO.title}
              <br />
              <span className="text-gradient-pink">{PHILOSOPHY_INTRO.accentTitle}</span>
            </h2>
          </div>

          {/* Exploded view stage */}
          <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl flex-1">
            <ExplodedCoupe
              bodyY={bodyY}
              glassY={glassY}
              wheelsY={wheelsY}
              suspensionY={suspensionY}
              brakesY={brakesY}
              engineX={engineX}
            />
            {/* Floating force labels appear around the layers */}
            <ForceLabels opacity={labelOpacity} />
          </div>
        </Container>
      </div>
    </section>
  );
}

interface ExplodedProps {
  bodyY: MotionValue<number>;
  glassY: MotionValue<number>;
  wheelsY: MotionValue<number>;
  suspensionY: MotionValue<number>;
  brakesY: MotionValue<number>;
  engineX: MotionValue<number>;
}

function ExplodedCoupe({
  bodyY,
  glassY,
  wheelsY,
  suspensionY,
  brakesY,
  engineX,
}: ExplodedProps) {
  return (
    <div className="relative h-full w-full">
      {/* Glass / roof — top layer */}
      <motion.svg
        style={{ y: glassY }}
        className="absolute left-1/2 top-[18%] w-[55%] -translate-x-1/2"
        viewBox="0 0 400 80"
        aria-hidden
      >
        <path
          d="M40,75 Q70,15 200,10 Q330,15 360,75 Z"
          fill="rgba(184,184,184,0.18)"
          stroke="#B8B8B8"
          strokeWidth="1.2"
        />
      </motion.svg>

      {/* Body — main silhouette */}
      <motion.svg
        style={{ y: bodyY }}
        className="absolute left-1/2 top-[34%] w-[80%] -translate-x-1/2"
        viewBox="0 0 600 130"
        aria-hidden
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
        </defs>
        <path
          d="M30,90 Q70,40 140,30 L260,28 Q310,25 380,40 Q470,55 560,80 L580,90 Q575,115 540,118 L80,118 Q35,115 30,90 Z"
          fill="url(#bodyGrad)"
          stroke="#E50982"
          strokeWidth="1.5"
        />
        <line x1="240" y1="38" x2="240" y2="118" stroke="rgba(184,184,184,0.25)" strokeWidth="0.7" />
      </motion.svg>

      {/* Wheels */}
      <motion.svg
        style={{ y: wheelsY }}
        className="absolute left-1/2 top-[58%] w-[78%] -translate-x-1/2"
        viewBox="0 0 600 80"
        aria-hidden
      >
        <g>
          <circle cx="120" cy="38" r="30" fill="#0a0a0a" stroke="#00CFFF" strokeWidth="1.6" />
          <circle cx="120" cy="38" r="14" fill="none" stroke="#00CFFF" strokeWidth="0.8" opacity="0.6" />
          <circle cx="480" cy="38" r="30" fill="#0a0a0a" stroke="#00CFFF" strokeWidth="1.6" />
          <circle cx="480" cy="38" r="14" fill="none" stroke="#00CFFF" strokeWidth="0.8" opacity="0.6" />
        </g>
      </motion.svg>

      {/* Suspension struts */}
      <motion.svg
        style={{ y: suspensionY }}
        className="absolute left-1/2 top-[68%] w-[65%] -translate-x-1/2"
        viewBox="0 0 480 60"
        aria-hidden
      >
        <line x1="90" y1="10" x2="90" y2="50" stroke="#FFA55A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="390" y1="10" x2="390" y2="50" stroke="#FFA55A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="90" cy="10" r="4" fill="#FFA55A" />
        <circle cx="390" cy="10" r="4" fill="#FFA55A" />
      </motion.svg>

      {/* Brake discs */}
      <motion.svg
        style={{ y: brakesY }}
        className="absolute left-1/2 top-[78%] w-[55%] -translate-x-1/2"
        viewBox="0 0 400 40"
        aria-hidden
      >
        <circle cx="60" cy="20" r="14" fill="none" stroke="#8A2EFF" strokeWidth="1.6" />
        <circle cx="60" cy="20" r="7" fill="#8A2EFF" opacity="0.4" />
        <circle cx="340" cy="20" r="14" fill="none" stroke="#8A2EFF" strokeWidth="1.6" />
        <circle cx="340" cy="20" r="7" fill="#8A2EFF" opacity="0.4" />
      </motion.svg>

      {/* Engine block — to the left */}
      <motion.svg
        style={{ x: engineX }}
        className="absolute left-1/2 top-[44%] w-[15%] -translate-x-1/2"
        viewBox="0 0 100 60"
        aria-hidden
      >
        <rect x="10" y="12" width="80" height="36" rx="4" fill="rgba(255,77,184,0.16)" stroke="#FF4DB8" strokeWidth="1.3" />
        <line x1="25" y1="12" x2="25" y2="48" stroke="#FF4DB8" strokeWidth="0.7" opacity="0.7" />
        <line x1="50" y1="12" x2="50" y2="48" stroke="#FF4DB8" strokeWidth="0.7" opacity="0.7" />
        <line x1="75" y1="12" x2="75" y2="48" stroke="#FF4DB8" strokeWidth="0.7" opacity="0.7" />
      </motion.svg>
    </div>
  );
}

function ForceLabels({ opacity }: { opacity: MotionValue<number> }) {
  // 5 corner / edge slots around the exploded stage
  const slots = [
    { className: "left-2 top-2" },
    { className: "right-2 top-8" },
    { className: "left-6 bottom-12" },
    { className: "right-6 bottom-20" },
    { className: "left-1/2 bottom-2 -translate-x-1/2" },
  ];

  return (
    <>
      {PHILOSOPHY_FORCES.map((f, i) => (
        <motion.div
          key={f.label}
          style={{ opacity }}
          className={`glass absolute hidden max-w-[200px] rounded-2xl px-4 py-3 sm:block ${slots[i].className}`}
        >
          <div className="text-meta text-flamingo-pink">{f.label}</div>
          <div className="mt-1 text-[11px] leading-snug text-flamingo-titanium">
            {f.blurb}
          </div>
        </motion.div>
      ))}
    </>
  );
}
