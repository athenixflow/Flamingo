"use client";

import { motion } from "framer-motion";

export type TechVizType = "molecular" | "hydrophobic" | "layered" | "uv";

interface TechVizProps {
  type: TechVizType;
  accent: string;
}

export function TechViz({ type, accent }: TechVizProps) {
  switch (type) {
    case "molecular":
      return <MolecularViz accent={accent} />;
    case "hydrophobic":
      return <HydrophobicViz accent={accent} />;
    case "layered":
      return <LayeredViz accent={accent} />;
    case "uv":
      return <UVViz accent={accent} />;
  }
}

function MolecularViz({ accent }: { accent: string }) {
  const nodes = Array.from({ length: 22 }, (_, i) => ({
    x: 8 + ((i * 31) % 84),
    y: 12 + ((i * 47) % 76),
    delay: (i % 8) * 0.15,
  }));

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full bg-flamingo-obsidian"
      aria-hidden
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#bgGlow)" />

      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => {
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d > 22) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke={accent}
              strokeOpacity={0.18}
              strokeWidth="0.3"
            />
          );
        }),
      )}

      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="1.1"
          fill={accent}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, delay: n.delay, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function HydrophobicViz({ accent }: { accent: string }) {
  const beads = Array.from({ length: 14 }, (_, i) => ({
    cx: 8 + (i * 11) % 86,
    cy: 30 + ((i * 29) % 50),
    r: 1.4 + ((i * 7) % 5) / 3,
    delay: (i * 0.15) % 2,
  }));

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full bg-flamingo-obsidian"
      aria-hidden
    >
      <defs>
        <linearGradient id="surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050505" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <radialGradient id="bead" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="40%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#surface)" />
      <line x1="0" y1="80" x2="100" y2="80" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      {beads.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r={b.r}
          fill="url(#bead)"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="0.15"
          animate={{ cy: [b.cy, b.cy + 2, b.cy] }}
          transition={{ duration: 3.2, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function LayeredViz({ accent }: { accent: string }) {
  const layers = [
    { y: 30, label: "SiO₂ ceramic", color: accent },
    { y: 45, label: "Polymer bridge", color: "#00CFFF" },
    { y: 60, label: "Clear coat", color: "#B8B8B8" },
    { y: 75, label: "Base paint", color: "#555" },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full bg-flamingo-obsidian"
      aria-hidden
    >
      <rect width="100" height="100" fill="#050505" />
      {layers.map((l, i) => (
        <motion.rect
          key={i}
          x="6"
          y={l.y}
          width="88"
          height="9"
          rx="1"
          fill={l.color}
          fillOpacity={0.12}
          stroke={l.color}
          strokeWidth="0.25"
          initial={{ width: 0, x: 50 }}
          whileInView={{ width: 88, x: 6 }}
          transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
      ))}
      {layers.map((l, i) => (
        <text
          key={i}
          x="50"
          y={l.y + 5.6}
          textAnchor="middle"
          fontSize="2.6"
          fill={l.color}
          fontFamily="var(--font-display)"
          letterSpacing="0.5"
        >
          {l.label.toUpperCase()}
        </text>
      ))}
      <motion.circle
        cx="20"
        cy="20"
        r="4"
        fill={accent}
        animate={{ cy: [20, 25, 20], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function UVViz({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full bg-flamingo-obsidian"
      aria-hidden
    >
      <defs>
        <radialGradient id="sun" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sun)" />
      <circle cx="50" cy="0" r="14" fill={accent} opacity="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const startX = 10 + i * 7;
        return (
          <motion.line
            key={i}
            x1={startX}
            y1="6"
            x2={startX + 6}
            y2="60"
            stroke={accent}
            strokeWidth="0.5"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 1.8, delay: i * 0.1, repeat: Infinity }}
          />
        );
      })}
      <rect x="0" y="60" width="100" height="40" fill="#050505" />
      <rect x="0" y="58" width="100" height="2" fill={accent} opacity="0.5" />
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fontSize="3.5"
        fill={accent}
        fontFamily="var(--font-display)"
        letterSpacing="1.5"
      >
        UV ABSORBED
      </text>
    </svg>
  );
}
