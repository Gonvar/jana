type Props = {
  completed: number
  total: number
}

export function ProgressBadge({ completed, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-sage-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-stone-500 dark:text-stone-400 tabular-nums shrink-0">
        {completed} / {total}
      </span>
    </div>
  )
}
