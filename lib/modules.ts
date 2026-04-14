import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ModuleMeta = {
  slug: string
  title: string
  order: number
  level: 'beginner' | 'intermediate'
  duration: string
  summary: string
  tags: string[]
}

const MODULES_DIR = path.join(process.cwd(), 'content', 'modules')

export function getAllModules(): ModuleMeta[] {
  const files = fs.readdirSync(MODULES_DIR).filter((f) => f.endsWith('.mdx'))

  const modules = files.map((filename) => {
    const raw = fs.readFileSync(path.join(MODULES_DIR, filename), 'utf8')
    const { data } = matter(raw)
    return data as ModuleMeta
  })

  return modules.sort((a, b) => a.order - b.order)
}

export function getModuleBySlug(slug: string): ModuleMeta | undefined {
  return getAllModules().find((m) => m.slug === slug)
}

export function getAdjacentModules(slug: string): {
  prev: ModuleMeta | null
  next: ModuleMeta | null
} {
  const all = getAllModules()
  const idx = all.findIndex((m) => m.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getAllGlossaryTerms(): Record<string, string> {
  const files = fs.readdirSync(MODULES_DIR).filter((f) => f.endsWith('.mdx'))
  const terms: Record<string, string> = {}

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(MODULES_DIR, filename), 'utf8')
    // Extract <Glossary term="..." definition="..."> from MDX content
    const matches = raw.matchAll(/<Glossary\s+term="([^"]+)"\s+definition="([^"]+)"/g)
    for (const m of matches) {
      terms[m[1].toLowerCase()] = m[2]
    }
  }

  return terms
}
