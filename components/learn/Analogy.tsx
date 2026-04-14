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
        'my-8 border border-sand-300 bg-sand-50 px-6 py-5 rounded-xl',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-600 mb-3 font-sans">
        {title}
      </p>
      <div className="text-espresso leading-relaxed" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
        {children}
      </div>
    </aside>
  )
}
