import Link from 'next/link'
import { getAllModules, getAdjacentModules } from '@/lib/modules'
import { LearnContent } from './LearnContent'

export function generateStaticParams() {
  return getAllModules().map((m) => ({ slug: m.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function LearnPage({ params }: Props) {
  const { slug } = await params
  const modules = getAllModules()
  const mod = modules.find((m) => m.slug === slug)

  if (!mod) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-stone-warm font-sans">Module not found.</p>
        <Link href="/" className="text-terracotta underline text-sm font-sans">← Back to modules</Link>
      </div>
    )
  }

  const { prev, next } = getAdjacentModules(slug)
  return <LearnContent mod={mod} modules={modules} prev={prev} next={next} />
}
