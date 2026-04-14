import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function KeyIdea({ children, className }: Props) {
  return (
    <div
      className={cn(
        'my-10 bg-sage-50 border-l-4 border-sage-400 rounded-r-xl px-6 py-5',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600 mb-3 font-sans">
        Key idea
      </p>
      <div
        className="text-espresso text-lg leading-snug"
        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}
      >
        {children}
      </div>
    </div>
  )
}
