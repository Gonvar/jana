'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Answer = 'reliable' | 'unreliable' | 'depends'

type Card = {
  task: string
  correct: Answer
  explanation: string
}

const CARDS: Card[] = [
  {
    task: 'Rewrite this client email in a warmer, more personal tone.',
    correct: 'reliable',
    explanation:
      'Tone editing is a pure language task — exactly where AI is strongest. It has read millions of emails and knows the difference between formal and warm.',
  },
  {
    task: "Tell me the current price of this sofa from the supplier's website.",
    correct: 'unreliable',
    explanation:
      "AI doesn't have live web access unless given a specific tool. It may recall a price from training data — which could be years out of date. Always verify pricing directly.",
  },
  {
    task: 'Suggest five colour direction names for a quiet Nordic kitchen.',
    correct: 'reliable',
    explanation:
      'Naming and language generation is a core strength. The model can synthesise from thousands of colour naming conventions it has seen in design writing.',
  },
  {
    task: 'Confirm this upholstered sofa meets current UK fire safety regulations.',
    correct: 'unreliable',
    explanation:
      'Regulations change, and errors here have real consequences. AI may give a confident but outdated or simply wrong answer. Always verify from the authoritative source.',
  },
  {
    task: 'Summarise these three client meeting notes into a single action list.',
    correct: 'reliable',
    explanation:
      'Summarisation and synthesis of text you provide is reliable — the model only needs to process what you give it, not recall external facts.',
  },
  {
    task: 'Generate an accurate floor plan render from my room dimensions.',
    correct: 'unreliable',
    explanation:
      'Spatial accuracy and technical drawing are not language tasks. AI image models generate plausible-looking plans but will get dimensions, proportions, and details wrong.',
  },
  {
    task: 'List the categories of items I need to specify for a kitchen project.',
    correct: 'reliable',
    explanation:
      'This is a language and knowledge synthesis task — the model has read thousands of kitchen specifications and can produce a reliable category list for you to verify and refine.',
  },
  {
    task: 'Tell me which specific fabric swatch from Dedar is best for this chair.',
    correct: 'depends',
    explanation:
      'If you describe the chair and brief in detail, AI can reason about material properties well. But for current stock availability or exact product codes, verify with the supplier — the catalogue data may be outdated.',
  },
]

const ANSWER_LABELS: Record<Answer, string> = {
  reliable: 'Reliable',
  depends: 'It depends',
  unreliable: 'Unreliable',
}

const ANSWER_STYLES: Record<Answer, string> = {
  reliable: 'border-sage-300 bg-sage-50 text-sage-700',
  depends: 'border-amber-300 bg-amber-50 text-amber-700',
  unreliable: 'border-rose-300 bg-rose-50 text-rose-700',
}

const BUTTON_IDLE: Record<Answer, string> = {
  reliable: 'hover:border-sage-400 hover:bg-sage-50 hover:text-sage-700',
  depends: 'hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700',
  unreliable: 'hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700',
}

const ANSWERS: Answer[] = ['reliable', 'depends', 'unreliable']

export function CanItQuiz() {
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<Answer | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const card = CARDS[index]
  const isCorrect = chosen === card.correct

  const handleAnswer = (ans: Answer) => {
    if (chosen !== null) return
    setChosen(ans)
    if (ans === card.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (index < CARDS.length - 1) {
      setIndex((i) => i + 1)
      setChosen(null)
    } else {
      setDone(true)
    }
  }

  const handleReset = () => {
    setIndex(0)
    setChosen(null)
    setScore(0)
    setDone(false)
  }

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Can AI do this? — {CARDS.length}-question quiz
        </p>
        <p className="text-sm text-stone-500 font-sans">
          For each design task, decide whether AI is Reliable, Unreliable, or whether It depends on
          how you use it.
        </p>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs text-stone-400 font-sans">
                  {index + 1} / {CARDS.length}
                </span>
                <div className="flex-1 h-1 bg-sand-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta rounded-full transition-all duration-300"
                    style={{ width: `${((index) / CARDS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-stone-400 font-sans tabular-nums">
                  {score} correct
                </span>
              </div>

              {/* Task card */}
              <div className="rounded-lg bg-stone-surface border border-stone-border px-5 py-4 mb-5">
                <p className="text-espresso font-sans leading-relaxed">{card.task}</p>
              </div>

              {/* Answer buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {ANSWERS.map((ans) => {
                  let cls = `border-sand-200 text-stone-600 ${BUTTON_IDLE[ans]}`
                  if (chosen !== null) {
                    if (ans === card.correct)
                      cls = ANSWER_STYLES[card.correct]
                    else if (ans === chosen && !isCorrect)
                      cls = 'border-stone-border bg-sand-50 text-stone-muted line-through opacity-60'
                    else
                      cls = 'border-sand-100 text-stone-muted opacity-40'
                  }
                  return (
                    <button
                      key={ans}
                      onClick={() => handleAnswer(ans)}
                      disabled={chosen !== null}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors font-sans ${cls}`}
                    >
                      {ANSWER_LABELS[ans]}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg border px-4 py-3 mb-5 text-sm font-sans ${ANSWER_STYLES[card.correct]}`}
                  >
                    <span className="font-semibold">
                      {isCorrect ? 'Correct. ' : `It's ${ANSWER_LABELS[card.correct].toLowerCase()}. `}
                    </span>
                    {card.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {chosen !== null && (
                <button
                  onClick={handleNext}
                  className="rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-sm px-4 py-2 font-medium transition-colors font-sans"
                >
                  {index < CARDS.length - 1 ? 'Next →' : 'See results →'}
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
                className="text-5xl mb-2 text-espresso"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {score}/{CARDS.length}
              </p>
              <p className="text-sm text-stone-warm font-sans mb-2">
                {score >= 7
                  ? 'Strong instincts. The pattern is: language tasks reliable, real-world facts unreliable.'
                  : score >= 5
                  ? 'Getting there. The clearest rule: if it requires current or factual data, verify.'
                  : 'The key distinction is language vs. facts — AI is fluent, not accurate.'}
              </p>
              <p className="text-xs text-stone-muted font-sans mb-6">
                The &ldquo;it depends&rdquo; cases are usually about how much specific context you give.
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
