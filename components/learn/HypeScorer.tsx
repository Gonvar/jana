'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Option = { label: string; value: number; hint?: string }
type Question = { id: string; text: string; options: Option[] }

const QUESTIONS: Question[] = [
  {
    id: 'task',
    text: 'Does it solve a specific task you already do in your practice?',
    options: [
      { label: 'Yes, clearly', value: 2 },
      { label: 'Maybe, with effort', value: 1 },
      { label: 'Not really', value: 0 },
    ],
  },
  {
    id: 'demo',
    text: "Does the product demo show realistic input — or cherry-picked perfection?",
    options: [
      { label: 'Realistic and honest', value: 2 },
      { label: 'Hard to tell', value: 1 },
      { label: 'Clearly cherry-picked', value: 0 },
    ],
  },
  {
    id: 'limits',
    text: 'Does the product page admit what the tool cannot do?',
    options: [
      { label: 'Yes, explicitly', value: 2 },
      { label: "Can't find it", value: 1 },
      { label: 'No — it claims to do everything', value: 0 },
    ],
  },
  {
    id: 'test',
    text: 'Could you run a real task through it yourself in under 10 minutes?',
    options: [
      { label: 'Yes, no friction', value: 2 },
      { label: 'Needs sign-up or waiting list', value: 1 },
      { label: 'No way to try it', value: 0 },
    ],
  },
  {
    id: 'category',
    text: "What kind of task is it solving?",
    options: [
      { label: 'Language or writing', value: 2, hint: 'AI is most reliable here' },
      { label: 'Mixed', value: 1 },
      { label: 'Facts, visuals, or spatial', value: 0, hint: 'AI is least reliable here' },
    ],
  },
]

type Verdict = { label: string; colour: string; bg: string; advice: string }

function getVerdict(score: number): Verdict {
  if (score >= 8)
    return {
      label: 'Likely worth a proper test',
      colour: 'text-sage-700',
      bg: 'bg-sage-50 border-sage-200',
      advice:
        'The fundamentals are there: it solves a real problem, is honest about limits, and you can test it yourself. Run it through a real task from your own practice — not the demo task — and judge from there.',
    }
  if (score >= 5)
    return {
      label: 'Proceed with caution',
      colour: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      advice:
        "There are some red flags. Consider whether the friction to test it is worth your time right now. If it's free to try, a 10-minute experiment is still the most useful data point.",
    }
  return {
    label: 'High hype-to-substance ratio',
    colour: 'text-rose-700',
    bg: 'bg-rose-50 border-rose-200',
    advice:
      "The signals aren't good: cherry-picked demos, vague claims, and no honest accounting of limits. That's worth noting. Tools that hide their weaknesses tend to disappoint in practice.",
  }
}

export function HypeScorer() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)

  const question = QUESTIONS[current]
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const maxScore = QUESTIONS.length * 2
  const verdict = getVerdict(totalScore)

  const handleAnswer = (value: number) => {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1)
    } else {
      setDone(true)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrent(0)
    setDone(false)
  }

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Hype vs. substance — tool evaluation scorecard
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Five questions to run any new AI tool through before deciding if it deserves your attention.
        </p>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i < current
                          ? 'w-6 bg-sage-400'
                          : i === current
                          ? 'w-6 bg-terracotta'
                          : 'w-4 bg-sand-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-400 font-sans ml-auto">
                  {current + 1} / {QUESTIONS.length}
                </span>
              </div>

              <p className="text-base text-espresso font-sans mb-5 leading-relaxed">
                {question.text}
              </p>

              <div className="space-y-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left rounded-lg border border-sand-200 px-4 py-3 hover:border-terracotta hover:bg-sand-50 transition-colors group"
                  >
                    <span className="text-sm text-espresso group-hover:text-terracotta transition-colors font-sans">
                      {opt.label}
                    </span>
                    {opt.hint && (
                      <span className="block text-xs text-stone-muted mt-0.5 font-sans">
                        {opt.hint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Score bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-stone-400 mb-1.5 font-sans">
                  <span>Hype</span>
                  <span>Substance</span>
                </div>
                <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-terracotta rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalScore / maxScore) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1 text-right font-sans tabular-nums">
                  {totalScore} / {maxScore}
                </p>
              </div>

              {/* Verdict */}
              <div className={`rounded-lg border px-5 py-4 mb-5 ${verdict.bg}`}>
                <p className={`text-sm font-semibold mb-2 font-sans ${verdict.colour}`}>
                  {verdict.label}
                </p>
                <p className="text-sm text-espresso font-sans leading-relaxed">{verdict.advice}</p>
              </div>

              {/* Per-question breakdown */}
              <div className="space-y-2 mb-5">
                {QUESTIONS.map((q) => {
                  const ans = answers[q.id]
                  const opt = q.options.find((o) => o.value === ans)
                  return (
                    <div
                      key={q.id}
                      className="flex items-start gap-3 text-sm text-stone-warm font-sans"
                    >
                      <div
                        className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                          ans === 2 ? 'bg-sage-400' : ans === 1 ? 'bg-amber-400' : 'bg-rose-400'
                        }`}
                      />
                      <span className="text-stone-muted">{q.text.replace('?', '')} →</span>
                      <span className="text-espresso ml-auto shrink-0">{opt?.label}</span>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={handleReset}
                className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
              >
                Evaluate another tool
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
