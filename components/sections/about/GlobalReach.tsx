"use client";

import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoEqualEarth } from "d3-geo";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ClientErrorBoundary } from "@/components/motion/ClientErrorBoundary";
import { REACH_INTRO, REACH_ROUTES } from "@/content/about";
import { STATS } from "@/content/global-presence";

const TOPOJSON_URL = "/maps/world-110m.json";
const MAP_WIDTH = 980;
const MAP_HEIGHT = 520;

export function GlobalReach() {
  return (
    <section
      aria-labelledby="reach-heading"
      className="relative overflow-hidden bg-flamingo-obsidian py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-[50%] bg-flamingo-violet/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-14">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {REACH_INTRO.eyebrow}
            </span>
            <h2 id="reach-heading" className="text-display max-w-4xl text-flamingo-soft">
              {REACH_INTRO.title}
              <br />
              <span className="text-gradient-pink">{REACH_INTRO.accentTitle}</span>
            </h2>
            <div className="grid max-w-3xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {REACH_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-4">
            <StatPill value={`${STATS.countries}+`} label="Active countries" accent="#E50982" />
            <StatPill value={`${STATS.regions}`} label="World regions" accent="#00CFFF" />
            <StatPill value={STATS.oemPartners} label="OEM partners" accent="#8A2EFF" />
            <StatPill value="5" label="Trade-route corridors" accent="#FF4DB8" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-flamingo-titanium/12 bg-flamingo-carbon/40 p-6 sm:p-10">
            <ClientErrorBoundary
              name="GlobalReachMap"
              fallback={
                <div className="aspect-[16/10] w-full" />
              }
            >
              <ReachMap />
            </ClientErrorBoundary>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function StatPill({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="display text-3xl text-flamingo-soft sm:text-4xl">{value}</div>
      <div className="text-meta mt-2 text-flamingo-titanium">{label}</div>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: accent, opacity: 0.6 }}
      />
    </div>
  );
}

function ReachMap() {
  const projection = geoEqualEarth()
    .scale(175)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

  // Project the trade routes from [lon, lat] to pixel coords + interpolate midpoint for curve
  const routes = REACH_ROUTES.map((r, i) => {
    const from = projection(r.from) as [number, number];
    const to = projection(r.to) as [number, number];
    if (!from || !to) return null;
    // Curve midpoint biased upward for a great-circle feel
    const mx = (from[0] + to[0]) / 2;
    const my = (from[1] + to[1]) / 2 - 60;
    return { from, to, mx, my, region: r.region, i };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  // The China HQ origin
  const origin = projection([104.1, 35.8]) as [number, number];

  return (
    <div className="relative aspect-[16/10] w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175 }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={TOPOJSON_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#111111"
                stroke="#1c1c1c"
                strokeWidth={0.6}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Trade-route arcs */}
        {routes.map(({ from, to, mx, my, i }) => {
          const d = `M ${from[0]} ${from[1]} Q ${mx} ${my} ${to[0]} ${to[1]}`;
          return (
            <motion.path
              key={`route-${i}`}
              d={d}
              fill="none"
              stroke="#E50982"
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, delay: 0.25 + i * 0.2, ease: "easeInOut" }}
            />
          );
        })}

        {/* Destination pulse pins */}
        {routes.map(({ to, i }) => (
          <g key={`pin-${i}`}>
            <motion.circle
              cx={to[0]}
              cy={to[1]}
              r={4}
              fill="#FF4DB8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.2 }}
            />
            <motion.circle
              cx={to[0]}
              cy={to[1]}
              r={4}
              fill="none"
              stroke="#FF4DB8"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 + i * 0.3, ease: "easeOut" }}
            />
          </g>
        ))}

        {/* Origin (China HQ) */}
        {origin && (
          <g>
            <circle cx={origin[0]} cy={origin[1]} r={6} fill="#E50982" />
            <circle cx={origin[0]} cy={origin[1]} r={3} fill="#FFFFFF" />
            <text
              x={origin[0] + 10}
              y={origin[1] - 6}
              fill="#F5F5F5"
              fontSize={11}
              fontWeight={600}
              fontFamily="var(--font-display)"
            >
              HQ
            </text>
          </g>
        )}
      </ComposableMap>
    </div>
  );
}
