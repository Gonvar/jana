'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Very rough GPT-style tokenization for demo purposes
function naiveTokenize(text: string): string[] {
  if (!text.trim()) return []
  // Split on common boundaries: spaces, punctuation kept as separate tokens
  const raw = text.match(/\w+|[^\w\s]|\s+/g) ?? []
  // Merge short runs for a more realistic look
  const tokens: string[] = []
  for (const t of raw) {
    if (t.trim() === '' && tokens.length > 0) {
      // attach space to previous token like BPE does
      tokens[tokens.length - 1] += t
    } else {
      tokens.push(t)
    }
  }
  return tokens
}

const PALETTE = [
  'bg-rose-100 text-rose-800 border-rose-300',
  'bg-amber-100 text-amber-800 border-amber-300',
  'bg-lime-100 text-lime-800 border-lime-300',
  'bg-cyan-100 text-cyan-800 border-cyan-300',
  'bg-violet-100 text-violet-800 border-violet-300',
  'bg-pink-100 text-pink-800 border-pink-300',
  'bg-orange-100 text-orange-800 border-orange-300',
]

type Props = {
  defaultText?: string
}

export function TokenDemo({ defaultText = 'A warm terracotta wall with linen curtains.' }: Props) {
  const [text, setText] = useState(defaultText)
  const [tokens, setTokens] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setTokens([])
    setRevealed(false)
  }, [text])

  const handleTokenize = () => {
    setTokens(naiveTokenize(text))
    setRevealed(true)
  }

  return (
    <div className="my-8 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-3 font-sans">
          Token visualiser — type anything, then hit Tokenize
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-sage-300 font-sans"
            placeholder="Type a sentence..."
          />
          <button
            onClick={handleTokenize}
            className="shrink-0 rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-sm px-4 py-2 font-medium transition-colors font-sans"
          >
            Tokenize
          </button>
        </div>
      </div>

      <div className="px-6 py-5 min-h-[80px] flex flex-wrap gap-1.5 items-center">
        {!revealed && (
          <p className="text-stone-400 dark:text-stone-500 text-sm italic">
            Tokens will appear here.
          </p>
        )}
        <AnimatePresence>
          {revealed &&
            tokens.map((token, i) => (
              <motion.span
                key={`${token}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
                className={`inline-block border rounded px-1.5 py-0.5 text-sm font-mono ${PALETTE[i % PALETTE.length]}`}
              >
                {token.replace(/ /g, '·')}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {revealed && tokens.length > 0 && (
        <div className="px-6 pb-4 text-xs text-stone-500 font-sans">
          {tokens.length} tokens · Each coloured block = one token · Spaces are usually part of the next token (shown as ·)
        </div>
      )}
    </div>
  )
}
