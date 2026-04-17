import { getAllModules } from '@/lib/modules'
import { HomeGrid } from './_components/HomeGrid'
import { HomeProgress } from './_components/HomeProgress'

export default function HomePage() {
  const modules = getAllModules()

  return (
    <div className="min-h-screen">
      <section className="px-6 md:px-12 pt-16 pb-12 max-w-5xl mx-auto">
        <div className="animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-stone-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-stone-muted font-sans">
              A personal course on AI
            </span>
            <div className="h-px flex-1 bg-stone-border" />
          </div>

          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-tight text-espresso mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
          >
            Understanding
            <br />
            <span className="text-terracotta italic">Artificial</span>
            <br />
            Intelligence.
          </h1>

          <p className="text-base text-stone-warm max-w-lg leading-relaxed font-sans mb-10">
            Practical modules. No jargon. No hype. Principles that will still be true in five years,
            explained through the lens of the work you already do.
          </p>

          <HomeProgress total={modules.length} />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-5xl mx-auto">
        <HomeGrid modules={modules} />
      </section>
    </div>
  )
}
