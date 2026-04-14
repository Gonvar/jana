'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@/lib/progress'
import { MODULES_CLIENT } from '@/lib/modules-client'
import { moduleMap } from '@/lib/module-map'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { use } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Analogy }           from '@/components/learn/Analogy'
import { KeyIdea }           from '@/components/learn/KeyIdea'
import { CanDo }             from '@/components/learn/CanDo'
import { CantDo }            from '@/components/learn/CantDo'
import { TryThis }           from '@/components/learn/TryThis'
import { Glossary }          from '@/components/learn/Glossary'
import { TokenDemo }         from '@/components/learn/TokenDemo'
import { ContextWindowDemo } from '@/components/learn/ContextWindowDemo'
import { TemperatureDemo }   from '@/components/learn/TemperatureDemo'
import { CompareProviders }  from '@/components/learn/CompareProviders'

const MDX_COMPONENTS = {
  Analogy, KeyIdea, CanDo, CantDo, TryThis, Glossary,
  TokenDemo, ContextWindowDemo, TemperatureDemo, CompareProviders,
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, letterSpacing: '-0.01em' }}
        className="text-3xl text-espresso leading-tight mt-12 mb-4 pb-2 border-b border-stone-border">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontStyle: 'italic' }}
        className="text-2xl text-espresso leading-snug mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[1.075rem] text-espresso leading-[1.9] my-5">{children}</p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-espresso">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-stone-warm">{children}</em>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-5 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-5 space-y-2 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-2.5 text-[1.075rem] text-espresso leading-relaxed">
      <span className="mt-[0.6rem] w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-[3px] border-terracotta pl-6 my-8"
      style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.25rem', lineHeight: '1.65', color: '#5a4a3a' }}>
      {children}
    </blockquote>
  ),
  hr: () => (
    <div className="flex items-center gap-4 my-12 text-stone-border">
      <div className="flex-1 h-px bg-stone-border" />
      <span style={{ fontFamily: 'var(--font-cormorant)' }} className="text-xl">✦</span>
      <div className="flex-1 h-px bg-stone-border" />
    </div>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[#EDE6D9] text-[#9E4E24] px-1.5 py-0.5 rounded text-[0.875em] font-mono">{children}</code>
  ),
}

type Props = { params: Promise<{ slug: string }> }

export default function LearnPage({ params }: Props) {
  const { slug } = use(params)
  const { markComplete, markVisited, isCompleted } = useProgress()

  const mod   = MODULES_CLIENT.find(m => m.slug === slug)
  const idx   = MODULES_CLIENT.findIndex(m => m.slug === slug)
  const prev  = idx > 0 ? MODULES_CLIENT[idx - 1] : null
  const next  = idx < MODULES_CLIENT.length - 1 ? MODULES_CLIENT[idx + 1] : null
  const done  = mod ? isCompleted(slug) : false

  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null)
  const [scrollPct, setScrollPct]   = useState(0)
  const articleRef = useRef<HTMLElement>(null)

  // Load MDX
  useEffect(() => {
    const loader = moduleMap[slug]
    if (!loader) return
    loader().then(m => setMDXContent(() => m.default))
  }, [slug])

  // Mark visited
  useEffect(() => {
    if (mod) markVisited(slug)
  }, [slug, mod, markVisited])

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const visible = window.innerHeight
      const pct = Math.min(100, Math.max(0, ((visible - top) / (height + visible)) * 100))
      setScrollPct(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mod) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-stone-warm font-sans">Module not found.</p>
        <Link href="/" className="text-terracotta underline text-sm font-sans">← Back to modules</Link>
      </div>
    )
  }

  return (
    <>
      {/* Reading progress line */}
      <div className="progress-bar" style={{ width: `${scrollPct}%` }} />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="lg:w-56 shrink-0 lg:sticky lg:top-24 lg:self-start">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-stone-warm hover:text-terracotta transition-colors text-sm font-sans mb-8"
            >
              <ArrowLeft size={14} />
              All modules
            </Link>

            {/* Module list */}
            <nav className="hidden lg:flex flex-col gap-1">
              {MODULES_CLIENT.map((m) => (
                <Link
                  key={m.slug}
                  href={`/learn/${m.slug}`}
                  className={`group flex items-start gap-2 py-1.5 text-sm font-sans transition-colors duration-150 ${
                    m.slug === slug
                      ? 'text-espresso font-medium'
                      : 'text-stone-muted hover:text-stone-warm'
                  }`}
                >
                  <span
                    className="shrink-0 mt-0.5 font-display text-xs"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {String(m.order).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{m.title}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* ── Main content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-12 pb-8 border-b border-stone-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-stone-muted font-sans uppercase tracking-widest">
                  Module {mod.order}
                </span>
                <span className="text-stone-border">·</span>
                <span className="flex items-center gap-1 text-xs text-stone-muted font-sans">
                  <Clock size={11} />
                  {mod.duration}
                </span>
                {done && (
                  <>
                    <span className="text-stone-border">·</span>
                    <span className="flex items-center gap-1 text-xs text-sage font-sans">
                      <CheckCircle2 size={11} />
                      Completed
                    </span>
                  </>
                )}
              </div>

              <h1
                className="text-[clamp(2.2rem,5vw,3.5rem)] leading-none tracking-tight text-espresso mb-4"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
              >
                {mod.title}
              </h1>
              <p className="text-stone-warm font-sans leading-relaxed max-w-xl">
                {mod.summary}
              </p>
            </header>

            {/* MDX article */}
            <article
              ref={articleRef}
              className="prose prose-jana max-w-none font-sans"
            >
              {MDXContent ? (
                <MDXProvider components={MDX_COMPONENTS}>
                  <MDXContent />
                </MDXProvider>
              ) : (
                <div className="space-y-4 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-stone-border rounded" style={{ width: `${75 + (i % 3) * 10}%` }} />
                  ))}
                </div>
              )}
            </article>

            {/* Mark complete */}
            {!done && MDXContent && (
              <div className="mt-16 pt-8 border-t border-stone-border">
                <button
                  onClick={() => markComplete(slug)}
                  className="group flex items-center gap-3 font-sans text-sm"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-border group-hover:border-terracotta group-hover:bg-terracotta transition-all duration-200">
                    <CheckCircle2 size={14} className="text-stone-muted group-hover:text-white transition-colors duration-200" />
                  </span>
                  <span className="text-stone-warm group-hover:text-espresso transition-colors duration-200">
                    Mark as complete
                  </span>
                </button>
              </div>
            )}

            {done && (
              <div className="mt-16 pt-8 border-t border-stone-border flex items-center gap-3">
                <CheckCircle2 size={16} className="text-sage" />
                <span className="text-sm text-stone-warm font-sans">
                  You&apos;ve completed this module.
                </span>
              </div>
            )}

            {/* Prev / Next */}
            <nav className="mt-12 grid grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/learn/${prev.slug}`}
                  className="group flex flex-col gap-1 p-4 border border-stone-border hover:border-terracotta transition-colors duration-200 rounded-sm"
                >
                  <span className="text-xs text-stone-muted font-sans flex items-center gap-1">
                    <ArrowLeft size={11} /> Previous
                  </span>
                  <span
                    className="text-base leading-snug text-espresso group-hover:text-terracotta transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}

              {next && (
                <Link
                  href={`/learn/${next.slug}`}
                  className="group flex flex-col gap-1 p-4 border border-stone-border hover:border-terracotta transition-colors duration-200 rounded-sm text-right ml-auto w-full"
                >
                  <span className="text-xs text-stone-muted font-sans flex items-center justify-end gap-1">
                    Next <ArrowRight size={11} />
                  </span>
                  <span
                    className="text-base leading-snug text-espresso group-hover:text-terracotta transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
