import { getAllGlossaryTerms } from '@/lib/modules'

export const metadata = {
  title: 'Glossary — Jana',
  description: 'Every AI term used in the course, defined plainly.',
}

export default async function GlossaryPage() {
  const terms = getAllGlossaryTerms()
  const sorted = Object.entries(terms).sort(([a], [b]) => a.localeCompare(b))

  // Group by first letter
  const groups: Record<string, [string, string][]> = {}
  for (const [term, def] of sorted) {
    const letter = term[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push([term, def])
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
      <header className="mb-16 pb-8 border-b border-stone-border">
        <p className="text-xs tracking-widest uppercase text-stone-muted font-sans mb-4">Reference</p>
        <h1
          className="text-5xl md:text-6xl text-espresso leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
        >
          Glossary
        </h1>
        <p className="mt-4 text-stone-warm font-sans leading-relaxed">
          Every term used in the course, defined without jargon.
        </p>
      </header>

      {sorted.length === 0 ? (
        <p className="text-stone-muted font-sans italic">
          Glossary terms are collected from each module as you read through them.
          Start with{' '}
          <a href="/learn/what-is-ai" className="text-terracotta underline underline-offset-2">
            Module 1
          </a>.
        </p>
      ) : (
        <div className="space-y-12">
          {Object.entries(groups).map(([letter, entries]) => (
            <section key={letter}>
              <h2
                className="text-4xl text-stone-border mb-6"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {letter}
              </h2>
              <dl className="space-y-6">
                {entries.map(([term, def]) => (
                  <div key={term} className="flex flex-col gap-1">
                    <dt className="font-sans font-medium text-espresso capitalize">{term}</dt>
                    <dd className="font-sans text-stone-warm leading-relaxed pl-4 border-l-2 border-stone-border">
                      {def}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
