import Link from 'next/link'
import { Clock, CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModuleMeta } from '@/lib/modules'

type Props = {
  module: ModuleMeta
  completed: boolean
  index: number
}

const LEVEL_STYLES = {
  beginner: 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export function ModuleCard({ module, completed, index }: Props) {
  return (
    <Link
      href={`/learn/${module.slug}`}
      className={cn(
        'group relative flex flex-col gap-3 rounded-2xl border p-6 transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        completed
          ? 'border-sage-200 bg-sage-50/50 dark:border-sage-800 dark:bg-sage-900/10'
          : 'border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900'
      )}
    >
      {/* Order + completion */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        {completed ? (
          <CheckCircle2 size={16} className="text-sage-500 dark:text-sage-400" />
        ) : (
          <Circle size={16} className="text-stone-300 dark:text-stone-600" />
        )}
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg leading-snug text-stone-900 dark:text-stone-100 group-hover:text-sage-700 dark:group-hover:text-sage-400 transition-colors">
        {module.title}
      </h2>

      {/* Summary */}
      <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
        {module.summary}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-2 mt-1">
        <span
          className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            LEVEL_STYLES[module.level]
          )}
        >
          {module.level}
        </span>
        <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
          <Clock size={11} />
          {module.duration}
        </span>
      </div>
    </Link>
  )
}
