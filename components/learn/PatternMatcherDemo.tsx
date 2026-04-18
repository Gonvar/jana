'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROUNDS = [
  {
    description: 'Whitewashed walls, oak floors, a single linen sofa, no clutter, morning light.',
    options: ['Coastal Mediterranean', 'Nordic Minimalist', 'Maximalist Victorian'],
    correct: 1,
    explanation:
      'Whitewashed + oak + linen + "no clutter" co-occur overwhelmingly with Nordic Minimalist in design writing. The AI learned this cluster from patterns — not from standing in the room.',
  },
  {
    description: 'Velvet drapes, gilded mirror, layered Persian rug, dark walls, multiple table lamps.',
    options: ['Industrial Loft', 'Nordic Minimalist', 'Maximalist Victorian'],
    correct: 2,
    explanation:
      'Velvet + gilded + Persian + dark walls form a textbook Maximalist Victorian cluster. Millions of similar descriptions trained the model to connect these words instantly.',
  },
  {
    description: 'Exposed brick, steel beams, bare concrete floor, Edison bulbs, open plan.',
    options: ['Industrial Loft', 'Coastal Mediterranean', 'Maximalist Victorian'],
    correct: 0,
    explanation:
      'Exposed brick + steel + concrete + Edison bulbs is one of the most consistent patterns in design writing. The AI matches it with high confidence because the cluster almost never appears in other contexts.',
  },
]

export function PatternMatcherDemo() {
  const [round, setRound] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = ROUNDS[round]
  const isCorrect = selected === current.correct

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === current.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (round < ROUNDS.length - 1) {
      setRound((r) => r + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const handleReset = () => {
    setRound(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Pattern matching — think like the AI
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Read the room description. Which style would a model trained on design writing classify it as?
        </p>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={round}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-stone-400 font-sans">
                  Round {round + 1} of {ROUNDS.length}
                </span>
                <div className="flex gap-1 ml-auto">
                  {ROUNDS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < round
                          ? 'bg-sage-400'
                          : i === round
                          ? 'bg-terracotta'
                          : 'bg-sand-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-stone-surface border border-stone-border px-5 py-4 mb-5 text-espresso font-sans leading-relaxed italic">
                &ldquo;{current.description}&rdquo;
              </div>

              <div className="grid gap-2 mb-4">
                {current.options.map((opt, i) => {
                  let cls =
                    'border-sand-200 text-espresso hover:border-terracotta hover:bg-sand-50 cursor-pointer'
                  if (selected !== null) {
                    if (i === current.correct)
                      cls = 'border-sage-400 bg-sage-50 text-sage-700 cursor-default'
                    else if (i === selected && !isCorrect)
                      cls = 'border-rose-300 bg-rose-50 text-rose-700 cursor-default'
                    else cls = 'border-sand-200 text-stone-muted opacity-50 cursor-default'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`rounded-lg border px-4 py-3 text-sm text-left transition-colors font-sans ${cls}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg border px-4 py-3 mb-5 text-sm font-sans ${
                      isCorrect
                        ? 'bg-sage-50 border-sage-200 text-sage-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    <span className="font-semibold">{isCorrect ? 'Correct. ' : 'Not quite. '}</span>
                    {current.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {selected !== null && (
                <button
                  onClick={handleNext}
                  className="rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-sm px-4 py-2 font-medium transition-colors font-sans"
                >
                  {round < ROUNDS.length - 1 ? 'Next →' : 'See result →'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <p
                className="text-5xl mb-3 text-espresso"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {score}/{ROUNDS.length}
              </p>
              <p className="text-sm text-stone-warm font-sans mb-6 max-w-sm mx-auto">
                {score === ROUNDS.length
                  ? 'You matched the pattern every time — exactly what the AI does, just at billions-of-examples scale.'
                  : 'The AI uses the same logic: find which words reliably co-occur, and use that as the answer. Scale that to billions of examples and it becomes very fast and usually right.'}
              </p>
              <button
                onClick={handleReset}
                className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
