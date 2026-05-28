import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ACADEMY_LESSONS, getLesson } from "@/content/academy";
import { PRODUCTS } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ACADEMY_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return buildMetadata({ title: "Lesson not found" });
  return buildMetadata({
    title: lesson.title,
    description: lesson.summary,
    path: `/academy/${lesson.slug}`,
  });
}

export default async function AcademyLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const relatedProducts =
    lesson.relatedProducts
      ?.map((code) => PRODUCTS.find((p) => p.id === code))
      .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p)) ?? [];

  return (
    <>
      <section className="relative pb-12 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-noise opacity-15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${lesson.thumbColor}33` }}
        />
        <Container className="relative">
          <nav className="text-xs uppercase tracking-ultra text-flamingo-titanium">
            <Link href="/academy" className="hover:text-flamingo-pink">
              Academy
            </Link>
            {" / "}
            <span className="text-flamingo-soft">{lesson.topic}</span>
          </nav>

          <h1 className="text-mega mt-6 max-w-5xl text-flamingo-soft">
            {lesson.title}
          </h1>
          <p className="text-meta mt-6 text-flamingo-titanium">{lesson.duration}</p>
          <p className="mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg">
            {lesson.summary}
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-[1fr_3fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <span className="text-eyebrow text-flamingo-titanium">
                Chapters
              </span>
              <ol className="mt-4 flex flex-col gap-3 text-sm text-flamingo-titanium">
                {lesson.chapters.map((c, i) => (
                  <li key={i}>
                    <a
                      href={`#ch-${i}`}
                      className="block transition-colors hover:text-flamingo-pink"
                    >
                      {String(i + 1).padStart(2, "0")} · {c.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="flex flex-col gap-12">
            {lesson.chapters.map((c, i) => (
              <section key={i} id={`ch-${i}`}>
                <span className="text-eyebrow text-flamingo-titanium">
                  Chapter {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display mt-2 text-3xl text-flamingo-soft sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-flamingo-titanium md:text-lg">
                  {c.body}
                </p>
              </section>
            ))}

            {relatedProducts.length > 0 && (
              <section>
                <span className="text-eyebrow text-flamingo-titanium">
                  Related Products
                </span>
                <h2 className="display mt-2 text-2xl text-flamingo-soft">
                  The chemistry behind the technique.
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="group block"
                    >
                      <GlassCard className="p-6">
                        <div className="flex items-center justify-between">
                          <span className="display rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-[10px] tracking-ultra text-flamingo-titanium">
                            {p.id}
                          </span>
                          <span className="text-eyebrow text-flamingo-titanium">
                            {p.realCategory}
                          </span>
                        </div>
                        <h3 className="mt-4 display text-lg text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
                          {p.name}
                        </h3>
                        <p className="mt-2 text-sm text-flamingo-titanium">
                          {p.tagline}
                        </p>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-flamingo-titanium/10 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-eyebrow text-flamingo-titanium">
                  More Lessons
                </span>
                <h3 className="display mt-2 text-2xl text-flamingo-soft">
                  Keep going.
                </h3>
              </div>
              <Button href="/academy" variant="ghost">
                All lessons
              </Button>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
