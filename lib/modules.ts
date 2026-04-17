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

  const tagRe = /<Glossary\b([^>]*?)\/?>/g
  const attrRe = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(MODULES_DIR, filename), 'utf8')
    for (const tag of raw.matchAll(tagRe)) {
      const attrs: Record<string, string> = {}
      for (const a of tag[1].matchAll(attrRe)) {
        attrs[a[1]] = a[2] ?? a[3] ?? a[4] ?? ''
      }
      if (attrs.term && attrs.definition) {
        terms[attrs.term.toLowerCase()] = attrs.definition
      }
    }
  }

  return terms
}
