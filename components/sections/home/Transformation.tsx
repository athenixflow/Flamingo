"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function Transformation() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClient = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClient(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClient]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <section
      aria-labelledby="transformation-heading"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Transformation"
            title="Before. After."
            accentTitle="Engineered in between."
            description="The hydrophobic polymer + ozone formula at the heart of our tire chemistry — visible in slow motion."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            ref={ref}
            className="relative mt-12 aspect-[3/4] w-full select-none overflow-hidden rounded-3xl border border-flamingo-titanium/10 shadow-cinema sm:aspect-[4/3] lg:aspect-[16/9]"
            onPointerDown={(e) => {
              dragging.current = true;
              updateFromClient(e.clientX);
            }}
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKey}
          >
            <BeforePanel />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <AfterPanel />
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 flex w-px items-center justify-center bg-flamingo-pink shadow-glow"
              style={{ left: `${pos}%` }}
            >
              <span className="text-eyebrow absolute -top-7 -translate-x-1/2 text-flamingo-pink">
                Before / After
              </span>
              <span className="flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-flamingo-pink shadow-glow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M1 8H15M1 8L5 4M1 8L5 12M15 8L11 4M15 8L11 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <CornerLabel className="left-6 top-6">Before</CornerLabel>
            <CornerLabel className="right-6 top-6" accent>
              After · F010
            </CornerLabel>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function CornerLabel({
  className,
  accent,
  children,
}: {
  className?: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`pointer-events-none absolute inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-ultra ${
        accent
          ? "bg-flamingo-pink/90 text-white"
          : "bg-flamingo-obsidian/70 text-flamingo-titanium"
      } ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function BeforePanel() {
  return (
    <div className="absolute inset-0 bg-flamingo-carbon">
      <div className="absolute inset-0 grid-noise opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120,80,60,0.4), transparent 60%), linear-gradient(180deg, #1d1410 0%, #0a0807 100%)",
        }}
      />
      <FauxTire dull />
    </div>
  );
}

function AfterPanel() {
  return (
    <div className="absolute inset-0 bg-flamingo-obsidian">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,9,130,0.25), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
        }}
      />
      <FauxTire />
      <WaterBeads />
    </div>
  );
}

function FauxTire({ dull }: { dull?: boolean }) {
  return (
    <svg
      className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2"
      viewBox="0 0 400 400"
      aria-hidden
    >
      <defs>
        <radialGradient id="tireGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={dull ? "#3a2a22" : "#1a1a1a"} />
          <stop offset="60%" stopColor={dull ? "#1c130f" : "#050505"} />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cfcfcf" />
          <stop offset="60%" stopColor="#8a8a8a" />
          <stop offset="100%" stopColor="#3a3a3a" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#tireGrad)" />
      <circle cx="200" cy="200" r="170" fill="none" stroke={dull ? "#604838" : "#0a0a0a"} strokeWidth="2" opacity="0.6" />
      <circle cx="200" cy="200" r="90" fill="url(#hub)" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const x1 = 200 + Math.cos(a) * 30;
        const y1 = 200 + Math.sin(a) * 30;
        const x2 = 200 + Math.cos(a) * 86;
        const y2 = 200 + Math.sin(a) * 86;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1a1a1a"
            strokeWidth="14"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="200" cy="200" r="18" fill="#1a1a1a" />
      {!dull && (
        <circle
          cx="200"
          cy="200"
          r="172"
          fill="none"
          stroke="#E50982"
          strokeWidth="2"
          opacity="0.6"
        />
      )}
    </svg>
  );
}

function WaterBeads() {
  const beads = Array.from({ length: 24 }, (_, i) => ({
    cx: 12 + ((i * 37) % 78),
    cy: 18 + ((i * 53) % 70),
    r: 0.7 + ((i * 7) % 6) / 4,
  }));
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {beads.map((b, i) => (
        <circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r={b.r}
          fill="rgba(255,255,255,0.7)"
          opacity={0.5}
        />
      ))}
    </svg>
  );
}
