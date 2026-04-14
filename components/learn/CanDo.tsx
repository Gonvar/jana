type Props = {
  items: string[]
  title?: string
}

export function CanDo({ items, title = 'AI is good at this' }: Props) {
  return (
    <div className="my-6 rounded-xl border border-green-200 bg-green-50 px-6 py-5 dark:border-green-800 dark:bg-green-900/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3 dark:text-green-400">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-700 dark:text-stone-300">
            <span className="mt-0.5 text-green-600 dark:text-green-400 shrink-0">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
