import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  ACADEMY_LESSONS,
  ACADEMY_TOPICS,
  getLessonsByTopic,
  type AcademyLesson,
} from "@/content/academy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Detailing Academy",
  description:
    "Tutorials, maintenance routines, ceramic guides, and restoration techniques — built on the Flamingo Expert Tips library and product catalog.",
  path: "/academy",
});

export default function AcademyPage() {
  return (
    <>
      <section className="relative pb-12 pt-40 sm:pt-48">
        <Container>
          <ScrollReveal>
            <span className="text-eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
              Detailing Academy
            </span>
            <h1 className="text-mega mt-6 max-w-4xl text-flamingo-soft">
              The technique behind
              <br />
              <span className="text-gradient-pink">the chemistry.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base text-flamingo-titanium md:text-lg">
              Every Flamingo product is engineered around a workflow.
              Understand the workflow, and the product performs the way it&rsquo;s
              supposed to. {ACADEMY_LESSONS.length} lessons across five topic
              areas.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-12">
        <Container className="flex flex-col gap-20">
          {ACADEMY_TOPICS.map((topic) => {
            const lessons = getLessonsByTopic(topic.id);
            if (lessons.length === 0) return null;
            return (
              <div key={topic.id}>
                <ScrollReveal>
                  <h2 className="display text-2xl text-flamingo-soft sm:text-3xl">
                    {topic.label}
                  </h2>
                  <div className="hairline mt-4" />
                </ScrollReveal>
                <div className="mt-8 -mx-3 overflow-x-auto pb-3">
                  <ul className="flex w-max gap-5 px-3 sm:w-auto sm:grid sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.map((l, i) => (
                      <li key={l.slug} className="w-[20rem] shrink-0 sm:w-auto">
                        <ScrollReveal delay={i * 0.04}>
                          <LessonCard lesson={l} />
                        </ScrollReveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}

function LessonCard({ lesson }: { lesson: AcademyLesson }) {
  return (
    <Link href={`/academy/${lesson.slug}`} className="group block h-full">
      <GlassCard className="h-full overflow-hidden">
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${lesson.thumbColor}55, transparent 60%), #050505`,
          }}
        >
          <div className="absolute inset-0 grid-noise opacity-30" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-flamingo-obsidian to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-[10px] uppercase tracking-ultra text-flamingo-titanium">
            {lesson.duration}
          </span>
          <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-flamingo-pink text-white shadow-glow transition-transform group-hover:scale-110">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M3 1l8 5-8 5V1z" />
            </svg>
          </span>
        </div>
        <div className="p-6">
          <h3 className="display text-xl text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
            {lesson.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm text-flamingo-titanium">
            {lesson.summary}
          </p>
        </div>
      </GlassCard>
    </Link>
  );
}
