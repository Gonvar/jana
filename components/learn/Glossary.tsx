'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  term: string
  definition: string
  children?: React.ReactNode
}

export function Glossary({ term, definition, children }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'border-b border-dashed border-stone-400 cursor-help transition-colors',
          open && 'border-terracotta text-terracotta'
        )}
        aria-label={`Definition of ${term}`}
      >
        {children ?? term}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <span
            ref={ref}
            role="tooltip"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-64 rounded-lg bg-espresso text-parchment text-sm px-4 py-3 shadow-xl"
          >
            <strong className="block text-xs uppercase tracking-widest mb-1 text-stone-400 font-sans">
              {term}
            </strong>
            {definition}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-espresso" />
          </span>
        </>
      )}
    </span>
  )
}
