'use client'

import Link from 'next/link'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { useProgress } from '@/lib/progress'
import type { ModuleMeta } from '@/lib/modules'

const LEVEL_LABEL: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
}

export function HomeGrid({ modules }: { modules: ModuleMeta[] }) {
  const { isCompleted } = useProgress()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-border stagger">
      {modules.map((mod) => {
        const done = isCompleted(mod.slug)
        return (
          <Link
            key={mod.slug}
            href={`/learn/${mod.slug}`}
            className="group relative flex flex-col bg-parchment p-7 hover:bg-stone-surface transition-colors duration-300 animate-fade-up"
          >
            <div className="ordinal group-hover:text-stone-muted mb-2 select-none">
              {String(mod.order).padStart(2, '0')}
            </div>

            <div className="absolute top-6 right-6">
              {done
                ? <CheckCircle2 size={15} className="text-sage" />
                : <Circle      size={15} className="text-stone-border" />
              }
            </div>

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
  )
}
