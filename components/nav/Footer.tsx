import Link from "next/link";
import { FOOTER_LINKS } from "@/content/nav";
import { HQ, SOCIAL_LINKS } from "@/content/contact";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  logoSrc?: string | null;
}

export function Footer({ logoSrc }: FooterProps = {}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-flamingo-titanium/10 bg-flamingo-obsidian">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-flamingo-titanium/40 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-[50%] bg-flamingo-violet/8 blur-3xl"
      />

      <Container className="relative grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <Logo size="lg" src={logoSrc} />
          <p className="max-w-sm text-sm text-flamingo-titanium">
            Engineered automotive care for perfectionists. Nano ceramic
            coatings, polymer tire technology, and premium detailing systems —
            engineered in Nigeria, trusted worldwide.
          </p>
          <p className="text-eyebrow text-flamingo-titanium">
            Protect The Machine.
          </p>
          <SocialIcons links={SOCIAL_LINKS} size="md" className="pt-2" />
        </div>

        <FooterColumn title="Products" links={FOOTER_LINKS.product} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />

        <div>
          <h3 className="display mb-5 text-xs uppercase tracking-ultra text-flamingo-soft">
            Reach Us
          </h3>
          <address className="not-italic text-sm text-flamingo-titanium">
            <p className="leading-relaxed">
              {HQ.addressLines.map((line, i) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <ul className="mt-4 flex flex-col gap-1">
              {HQ.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="transition-colors hover:text-flamingo-pink"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${HQ.email}`}
                  className="transition-colors hover:text-flamingo-pink"
                >
                  {HQ.email}
                </a>
              </li>
            </ul>

            <ul className="mt-4 flex flex-col gap-0.5 text-xs">
              {HQ.hours.map((h) => (
                <li key={h.days} className="flex items-baseline justify-between gap-3">
                  <span>{h.days}</span>
                  <span className="text-flamingo-soft">{h.hours}</span>
                </li>
              ))}
            </ul>
          </address>
        </div>
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
