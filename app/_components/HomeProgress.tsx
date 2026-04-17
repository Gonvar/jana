'use client'

import { useProgress } from '@/lib/progress'

export function HomeProgress({ total }: { total: number }) {
  const { completedCount } = useProgress()
  if (completedCount === 0) return null
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  return (
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
  )
}
