'use client'

import { getAllModules } from '@/lib/modules'
import { useProgress } from '@/lib/progress'
import Link from 'next/link'
import type { ModuleMeta } from '@/lib/modules'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

// We need client-only for progress, but getAllModules reads fs.
// Solution: pass modules as a serializable prop via a server wrapper.
// For now, hardcode the module list client-side to keep it simple.
import { MODULES_CLIENT } from '@/lib/modules-client'

const LEVEL_LABEL: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
}

export default function HomePage() {
  const { isCompleted, completedCount } = useProgress()
  const total = MODULES_CLIENT.length
  const pct   = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-16 pb-12 max-w-5xl mx-auto">
        <div className="animate-fade-up">
          {/* Decorative line */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-stone-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-stone-muted font-sans">
              A personal course on AI
            </span>
            <div className="h-px flex-1 bg-stone-border" />
          </div>

          {/* Title */}
          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-tight text-espresso mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
          >
            Understanding
            <br />
            <span className="text-terracotta italic">Artificial</span>
            <br />
            Intelligence.
          </h1>

          <p className="text-base text-stone-warm max-w-lg leading-relaxed font-sans mb-10">
            Ten modules. No jargon. No hype. Principles that will still be true in five years,
            explained through the lens of the work you already do.
          </p>

          {/* Progress strip */}
          {completedCount > 0 && (
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-0.5 bg-stone-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracotta rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-stone-muted tabular-nums whitespace-nowrap font-sans">
                {completedCount} of {total} complete
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Module grid ───────────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-border stagger">
          {MODULES_CLIENT.map((mod, i) => {
            const done = isCompleted(mod.slug)
            return (
              <Link
                key={mod.slug}
                href={`/learn/${mod.slug}`}
                className="group relative flex flex-col bg-parchment p-7 hover:bg-stone-surface transition-colors duration-300 animate-fade-up"
              >
                {/* Ordinal */}
                <div className="ordinal group-hover:text-stone-muted mb-2 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Status dot */}
                <div className="absolute top-6 right-6">
                  {done
                    ? <CheckCircle2 size={15} className="text-sage" />
                    : <Circle      size={15} className="text-stone-border" />
                  }
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 mt-auto">
                  <h2
                    className="text-xl leading-snug text-espresso group-hover:text-terracotta transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                  >
                    {mod.title}
                  </h2>
                  <p className="text-sm text-stone-warm leading-relaxed font-sans line-clamp-2">
                    {mod.summary}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-border">
                    <span className="text-xs text-stone-muted font-sans">
                      {LEVEL_LABEL[mod.level]}
                    </span>
                    <span className="text-stone-border">·</span>
                    <span className="flex items-center gap-1 text-xs text-stone-muted font-sans">
                      <Clock size={11} />
                      {mod.duration}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
