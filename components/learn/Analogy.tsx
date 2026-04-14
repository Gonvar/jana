import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  title?: string
  className?: string
}

export function Analogy({ children, title = 'Think of it this way', className }: Props) {
  return (
    <aside
      className={cn(
        'my-8 border-l-4 border-sand-400 bg-sand-50 px-6 py-5 rounded-r-xl dark:bg-sand-900/20 dark:border-sand-500',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-sand-500 mb-2 dark:text-sand-400">
        {title}
      </p>
      <div className="text-stone-700 dark:text-stone-300 leading-relaxed">{children}</div>
    </aside>
  )
}
