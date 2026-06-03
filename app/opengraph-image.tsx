import { ImageResponse } from "next/og";

export const alt = "Flamingo Car Care — Protect The Machine.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#050505",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 25% 70%, rgba(229,9,130,0.35), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(138,46,255,0.25), transparent 60%)",
            display: "flex",
          }}
        />

        {/* top row — logo + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#E50982",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(229,9,130,0.55)",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: "#050505",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#E50982",
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Flamingo
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#E50982",
              display: "flex",
            }}
          >
            Engineered in Nigeria · Nothing But The Best
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -2,
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Protect</span>
            <span style={{ color: "#E50982" }}>The Machine.</span>
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#B8B8B8",
            position: "relative",
          }}
        >
          <span>flamingocarcare.com</span>
          <span>Nano Ceramic · Polymer Tire · OEM/ODM</span>
        </div>
      </div>
    ),
    size,
  );
}
