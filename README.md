# Flamingo Car Care — Cinematic Digital Flagship

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/athenixflow/Flamingo)

Engineered automotive care for perfectionists. Eight-page cinematic experience built on Next.js 15 + React Three Fiber.

**Live brand:** [flamingocarcare.com](https://www.flamingocarcare.com)

---

## Stack

- **Framework:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 3
- **Motion:** Framer Motion · Lenis smooth scroll
- **3D:** Three.js · React Three Fiber · drei · postprocessing
- **Maps:** react-simple-maps · world-atlas TopoJSON
- **Forms:** Zod validation
- **Analytics:** Vercel Analytics

---

## Local development

Requires Node `>=20`. Recommended `22` (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Useful scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build (the same build Vercel runs) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (Next.js core-web-vitals + TS) |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run scrape` | Re-pull real product imagery from flamingocarcare.com |

---

## Deploy to Vercel

1. Push your fork to GitHub.
2. In the Vercel dashboard, click **New Project** → **Import** the repo.
3. Vercel auto-detects Next.js — no configuration needed. The build uses settings from `vercel.json` and `package.json`.
4. (Optional) Add a custom domain.

That's it. The first deploy runs `next build`, prerenders all 43 routes, and serves them from Vercel's edge cache.

### Environment variables

None required for V1. When you wire up an email provider for the contact form, add:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` (or similar) | API key for your transactional email provider. The handler is at [app/api/contact/route.ts](app/api/contact/route.ts) — currently it logs payloads to the server console. |

---

## Project structure

```
/app                       Next.js routes (App Router)
  /products/[slug]         Statically generated from /content/products.ts
  /academy/[slug]          Statically generated from /content/academy.ts
  /api/contact             Inquiry form route handler
  opengraph-image.tsx      Dynamic OG image
  icon.tsx, apple-icon.tsx Dynamic favicons
  manifest.ts              PWA manifest
  sitemap.ts, robots.ts    SEO

/components
  /sections                Per-page section components
  /three                   R3F scenes (lazy-loaded, ssr:false)
  /motion                  Lenis provider, magnetic hover, scroll reveal
  /nav                     Navbar, mobile menu, footer
  /maps                    react-simple-maps wrapper
  /ui                      Buttons, GlassCard, headings, ProductArt
  /tech                    SVG technology visualizations

/content                   Typed data (products, academy, technology, etc.)
  product-image-manifest.json   F-code → local image path map

/lib                       Hooks, utils, seo helpers, product-image lookup
/public                    Static assets (images, maps, brand)
/scripts                   Dev tools — not deployed
```

Content is seeded verbatim from the live flamingocarcare.com catalog:
real F-codes, application instructions, cautions, and volume specs.

---

## Performance

- All pages statically prerendered (43 routes); `/api/contact` is the only dynamic route
- Home first-load JS: ~210 KB (includes the R3F hero scene)
- Other pages: 145–165 KB
- R3F canvases use `next/dynamic({ ssr: false })` and adapt quality to device tier
- Lenis smooth scroll auto-disables under `prefers-reduced-motion`

---

## Open items

- Drop your logo JPEG at [public/images/brand/logo.jpg](public/images/brand/) (auto-detected; falls back to typographic wordmark)
- Wire an email provider into [app/api/contact/route.ts](app/api/contact/route.ts)
- Real UGC + campaign reel videos (Pexels stand-ins in `/components/sections/home/DetailingCinematics.tsx` + `/components/sections/media`)
- Real distributor country list — current set in [content/global-presence.ts](content/global-presence.ts) is representative
- Add remaining product photos via `npm run scrape` (currently 10 of 22 catalog SKUs have real photos)

---

## License

Brand assets © Flamingo Car Care Tech Co., Ltd. See [public/CREDITS.md](public/CREDITS.md) for asset attribution.
