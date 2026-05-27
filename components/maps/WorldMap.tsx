"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import type { Country } from "@/content/global-presence";

interface WorldMapProps {
  countries: Country[];
  activeCode: string | null;
  onHover: (code: string | null) => void;
}

const TOPOJSON_URL = "/maps/world-110m.json";

export function WorldMap({ countries, activeCode, onHover }: WorldMapProps) {
  return (
    <div className="relative aspect-[16/10] w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175 }}
        width={980}
        height={520}
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
                  hover: { outline: "none", fill: "#1a1a1a" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {countries.map((c) => {
          const active = c.code === activeCode;
          const available = c.status === "available";
          return (
            <Marker
              key={c.code}
              coordinates={c.coords}
              onMouseEnter={() => onHover(c.code)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onHover(c.code)}
              style={{
                default: { cursor: "pointer" },
                hover: { cursor: "pointer" },
                pressed: { cursor: "pointer" },
              }}
            >
              <motion.circle
                r={active ? 10 : 6}
                fill={available ? "#E50982" : "#00CFFF"}
                fillOpacity={active ? 0.25 : 0.15}
                animate={{ scale: active ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
              />
              <circle
                r={3}
                fill={available ? "#E50982" : "#00CFFF"}
                stroke="#050505"
                strokeWidth={0.5}
              />
              {active && (
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fill: "#F5F5F5",
                    fontSize: 10,
                    fontFamily: "var(--font-display)",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {c.name}
                </text>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px] uppercase tracking-ultra text-flamingo-titanium">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-flamingo-pink" />
          Active
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-flamingo-cyan" />
          Coming Soon
        </span>
      </div>
    </div>
  );
}
