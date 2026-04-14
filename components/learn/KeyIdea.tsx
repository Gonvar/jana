import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function KeyIdea({ children, className }: Props) {
  return (
    <div
      className={cn(
        'my-8 bg-sage-50 border border-sage-200 rounded-xl px-6 py-5 dark:bg-sage-900/20 dark:border-sage-700',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-sage-600 mb-2 dark:text-sage-400">
        Key idea
      </p>
      <div className="text-stone-800 dark:text-stone-200 font-serif text-lg leading-snug">
        {children}
      </div>
    </div>
  )
}
