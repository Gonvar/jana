type Props = {
  items: string[]
  title?: string
}

export function CantDo({ items, title = 'AI struggles with this' }: Props) {
  return (
    <div className="my-6 rounded-xl border border-red-200 bg-red-50 px-6 py-5 dark:border-red-800 dark:bg-red-900/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-3 dark:text-red-400">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-700 dark:text-stone-300">
            <span className="mt-0.5 text-red-500 dark:text-red-400 shrink-0">✕</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
