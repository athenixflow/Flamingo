import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flamingo: {
          pink: "#E50982",
          obsidian: "#050505",
          carbon: "#111111",
          titanium: "#B8B8B8",
          soft: "#F5F5F5",
          violet: "#8A2EFF",
          cyan: "#00CFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        cinematic: "0.04em",
        ultra: "0.18em",
      },
      boxShadow: {
        glow: "0 0 40px rgba(229, 9, 130, 0.35)",
        "glow-soft": "0 0 24px rgba(229, 9, 130, 0.18)",
        cinema: "0 30px 80px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 50%, rgba(229,9,130,0.18), transparent 60%)",
        "metal-sweep":
          "linear-gradient(110deg, transparent 35%, rgba(245,245,245,0.55) 50%, transparent 65%)",
      },
      animation: {
        "metal-sweep": "metal-sweep 2.6s linear infinite",
        "slow-float": "slow-float 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3.6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        "metal-sweep": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slow-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
