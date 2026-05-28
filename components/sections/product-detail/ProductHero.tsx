"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ClientErrorBoundary } from "@/components/motion/ClientErrorBoundary";
import type { Product } from "@/content/products";
import type { Category } from "@/content/categories";

const ProductRenderScene = dynamic(
  () => import("@/components/three/ProductRenderScene").then((m) => m.ProductRenderScene),
  { ssr: false, loading: () => <div className="h-full w-full bg-flamingo-carbon" /> },
);

interface ProductHeroProps {
  product: Product;
  category?: Category;
  realImageSrc?: string | null;
}

export function ProductHero({ product, category, realImageSrc }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: `${product.heroColor}33` }}
      />

      <Container>
        <nav className="text-xs uppercase tracking-ultra text-flamingo-titanium">
          <Link href="/products" className="hover:text-flamingo-pink">Products</Link>
          {" / "}
          {category && (
            <>
              <Link href={`/products?filter=${category.id}`} className="hover:text-flamingo-pink">
                {category.shortName}
              </Link>
              {" / "}
            </>
          )}
          <span className="text-flamingo-soft">{product.id}</span>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-meta inline-flex w-fit items-center gap-3 rounded-full border border-flamingo-titanium/30 px-4 py-1.5 text-flamingo-titanium"
            >
              <span className="h-1 w-1 rounded-full bg-flamingo-cyan" />
              {product.id} · {product.realCategory}
            </motion.span>

            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="display text-5xl font-bold leading-[0.95] text-flamingo-soft sm:text-6xl lg:text-7xl"
            >
              {product.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gradient-pink"
            >
              {product.tagline}
            </motion.p>

            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base text-flamingo-titanium md:text-lg"
            >
              {product.shortBlurb}
            </motion.p>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              <Button href="/contact?type=distributor">Wholesale Inquiry</Button>
              <Button href="#usage" variant="ghost" magnetic={false}>
                See How To Apply
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center gap-4 border-t border-flamingo-titanium/10 pt-4 text-xs uppercase tracking-ultra text-flamingo-titanium"
            >
              <span>{product.specs.volume}</span>
              {product.specs.volumePerCarton && (
                <>
                  <span aria-hidden>·</span>
                  <span>{product.specs.volumePerCarton}</span>
                </>
              )}
            </motion.div>
          </div>

          <div
            className="relative aspect-square overflow-hidden rounded-3xl border border-flamingo-titanium/10 shadow-cinema"
            style={{
              background: realImageSrc
                ? `radial-gradient(ellipse at 30% 25%, ${product.heroColor}33, transparent 60%), #050505`
                : undefined,
            }}
          >
            {realImageSrc ? (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                  style={{ background: product.heroColor }}
                />
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={realImageSrc}
                    alt={`${product.name} — ${product.id}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-contain p-8"
                    priority
                  />
                </motion.div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-ultra text-flamingo-titanium">
                  <span>Live catalog photo</span>
                  <span>{product.id}</span>
                </div>
              </>
            ) : (
              <>
                <ClientErrorBoundary
                  name="ProductRenderScene"
                  fallback={
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 30% 25%, ${product.heroColor}55, transparent 60%), #050505`,
                      }}
                    >
                      <div className="grid-noise absolute inset-0 opacity-30" />
                      <span className="display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl tracking-ultra text-flamingo-soft">
                        {product.id}
                      </span>
                    </div>
                  }
                >
                  <ProductRenderScene color={product.heroColor} />
                </ClientErrorBoundary>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-ultra text-flamingo-titanium">
                  <span>Drag to rotate</span>
                  <span>{product.id}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
