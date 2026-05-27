import Image from "next/image";
import { getProductImage } from "@/lib/product-images";

interface ProductArtProps {
  productId: string;
  productName: string;
  heroColor: string;
  className?: string;
  /** Whether the image is high priority (e.g. featured product on home) */
  priority?: boolean;
  /** Tailwind aspect-ratio class; defaults to square via parent sizing */
  rounded?: string;
}

/**
 * Renders the live-site product photograph if we have one saved
 * under /public/images/products/<F-code>.{jpg,png}. Otherwise renders
 * a stylized SVG bottle tinted with the product's hero color.
 *
 * Server-side rendered — image discovery happens at build/request time
 * via lib/product-images.ts (fs.readdir).
 */
export function ProductArt({
  productId,
  productName,
  heroColor,
  className,
  priority,
  rounded = "rounded-2xl",
}: ProductArtProps) {
  const imgSrc = getProductImage(productId);

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className ?? ""}`}
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${heroColor}40, transparent 65%), #050505`,
      }}
    >
      <div className="absolute inset-0 grid-noise opacity-25" />
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={productName}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 360px"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          priority={priority}
        />
      ) : (
        <BottleFallback color={heroColor} />
      )}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flamingo-pink/40 to-transparent" />
    </div>
  );
}

function BottleFallback({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      className="absolute left-1/2 top-1/2 h-[80%] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <defs>
        <linearGradient id="bottleBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#050505" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="bottleHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect x="42" y="6" width="36" height="22" rx="4" fill="#2a2a2a" />
      <rect x="46" y="24" width="28" height="10" fill="#1a1a1a" />
      <path
        d="M28 56 Q28 38 60 38 Q92 38 92 56 L92 200 Q92 214 78 214 L42 214 Q28 214 28 200 Z"
        fill="url(#bottleBody)"
        stroke={color}
        strokeWidth="1"
      />
      <rect x="28" y="80" width="64" height="80" fill={color} opacity="0.85" />
      <rect x="28" y="80" width="64" height="80" fill="url(#bottleHighlight)" />
      <text
        x="60"
        y="118"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-display)"
      >
        FLAMINGO
      </text>
      <text
        x="60"
        y="138"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontFamily="var(--font-display)"
        letterSpacing="2"
      >
        NOTHING BUT
      </text>
      <text
        x="60"
        y="148"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontFamily="var(--font-display)"
        letterSpacing="2"
      >
        THE BEST
      </text>
    </svg>
  );
}
