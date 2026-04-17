import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jana — Understanding AI',
  description: 'A private course on AI for designers. No hype, no jargon — just clarity.',
  openGraph: {
    title: 'Jana — Understanding AI',
    description: 'A private course on AI for designers.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">
        {/* Top nav */}
        <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-espresso hover:text-terracotta transition-colors duration-200"
            style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '-0.02em' }}
          >
            Jana
          </Link>
          <nav className="flex items-center gap-6 text-sm text-stone-warm font-sans">
            <Link href="/" className="hover:text-espresso transition-colors duration-200">Modules</Link>
            <Link href="/glossary" className="hover:text-espresso transition-colors duration-200">Glossary</Link>
          </nav>
        </header>

        <main className="pt-16">{children}</main>

        <footer className="mt-24 border-t border-stone-border px-6 py-10 md:px-12">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p
              className="text-2xl text-stone-muted"
              style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
            >
              Made with care, for Jana.
            </p>
            <p className="text-xs text-stone-muted">
              Principles, not products. Content that ages well.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
