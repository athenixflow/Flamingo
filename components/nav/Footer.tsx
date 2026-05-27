import Link from "next/link";
import { FOOTER_LINKS } from "@/content/nav";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  logoSrc?: string | null;
}

export function Footer({ logoSrc }: FooterProps = {}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-flamingo-titanium/10 bg-flamingo-obsidian">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-flamingo-pink/60 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-[50%] bg-flamingo-pink/10 blur-3xl"
      />

      <Container className="relative grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo size="lg" src={logoSrc} />
          <p className="max-w-sm text-sm text-flamingo-titanium">
            Engineered automotive care for perfectionists. Nano ceramic
            coatings, polymer tire technology, and premium detailing systems —
            engineered in USA.
          </p>
          <p className="display text-[10px] uppercase tracking-ultra text-flamingo-pink">
            Protect The Machine.
          </p>
        </div>

        <FooterColumn title="Products" links={FOOTER_LINKS.product} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        <FooterColumn title="Contact" links={FOOTER_LINKS.contact} />
      </Container>

      <div className="hairline" />

      <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-flamingo-titanium sm:flex-row sm:items-center">
        <span>© {year} Flamingo Car Care Tech Co., Ltd. All rights reserved.</span>
        <span className="display tracking-ultra">Nothing But The Best</span>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="display mb-5 text-xs uppercase tracking-ultra text-flamingo-soft">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-sm text-flamingo-titanium">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition-colors hover:text-flamingo-pink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
