'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Step = {
  label: string
  icon: string
  title: string
  body: string
  code?: string
}

const STEPS: Step[] = [
  {
    label: 'Perceive',
    icon: '👁',
    title: 'The agent reads the situation',
    body: 'It takes in the task and any available context. In this case: check whether the palette used across a project meets WCAG AA contrast requirements.',
    code: 'Task: "Check palette accessibility"\nInput: #F7F2E9, #1C1410, #C4622D, #4A6741',
  },
  {
    label: 'Reason',
    icon: '🧠',
    title: 'The agent plans what to do',
    body: "Before acting, it reasons through the steps. It knows WCAG AA requires a 4.5:1 contrast ratio for body text. It decides which colour pairs are most likely used as text-on-background.",
    code: 'Plan:\n1. Test espresso (#1C1410) on parchment (#F7F2E9)\n2. Test terracotta (#C4622D) on parchment\n3. Test sage (#4A6741) on parchment\n4. Flag any pair below 4.5:1',
  },
  {
    label: 'Act',
    icon: '⚡',
    title: 'The agent calls a tool',
    body: "It doesn't guess — it invokes the contrast-checking tool with the exact colour pairs. This is what separates an agent from a conversation: it does something, not just talks about it.",
    code: 'contrast_check(\n  fg="#1C1410", bg="#F7F2E9"\n) → 14.8:1 ✓ PASS\n\ncontrast_check(\n  fg="#C4622D", bg="#F7F2E9"\n) → 3.2:1 ✗ FAIL\n\ncontrast_check(\n  fg="#4A6741", bg="#F7F2E9"\n) → 5.1:1 ✓ PASS',
  },
  {
    label: 'Reflect',
    icon: '✦',
    title: 'The agent checks the result',
    body: 'It reviews what happened. Two pairs pass, one fails. It decides the task is complete and composes a clear report — including a specific recommendation, not just the raw numbers.',
    code: 'Report:\n✓ Espresso on parchment: 14.8:1 (PASS)\n✗ Terracotta on parchment: 3.2:1 (FAIL)\n  → Use #9E4E24 for body text instead\n✓ Sage on parchment: 5.1:1 (PASS)',
  },
]

export function AgentLoopDemo() {
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setComplete(true)
    }
  }

  const handleReset = () => {
    setStep(0)
    setComplete(false)
  }

  const current = STEPS[step]

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Agent loop — step by step
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Watch an agent run an accessibility check, one loop stage at a time.
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Loop stage indicators */}
        <div className="flex items-center gap-0 mb-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    i < step
                      ? 'bg-sage-400 text-white'
                      : i === step && !complete
                      ? 'bg-terracotta text-white shadow-sm ring-2 ring-terracotta ring-offset-2'
                      : complete
                      ? 'bg-sage-400 text-white'
                      : 'bg-sand-100 text-stone-muted'
                  }`}
                >
                  {i < step || complete ? '✓' : s.icon}
                </div>
                <span
                  className={`text-[10px] font-sans uppercase tracking-wider transition-colors ${
                    i === step && !complete
                      ? 'text-terracotta font-semibold'
                      : i < step || complete
                      ? 'text-sage-600'
                      : 'text-stone-muted'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-1 mb-5 transition-colors duration-300 ${
                    i < step || complete ? 'bg-sage-300' : 'bg-sand-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!complete ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <p className="text-base font-semibold text-espresso mb-1 font-sans">
                  {current.title}
                </p>
                <p className="text-sm text-stone-warm font-sans leading-relaxed">{current.body}</p>
              </div>

              {current.code && (
                <div className="rounded-lg bg-espresso px-4 py-3 mb-5 overflow-x-auto">
                  <pre className="text-xs font-mono text-parchment/80 leading-relaxed whitespace-pre">
                    {current.code}
                  </pre>
                </div>
              )}

              <button
                onClick={handleNext}
                className="rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-sm px-4 py-2 font-medium transition-colors font-sans"
              >
                {step < STEPS.length - 1 ? `Next: ${STEPS[step + 1].label} →` : 'Complete loop →'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-lg bg-sage-50 border border-sage-200 px-5 py-4 mb-5">
                <p className="text-sm text-sage-800 font-sans">
                  <span className="font-semibold">Loop complete.</span> The agent moved through all
                  four stages once. If the task had been more complex — say, the failing pair had
                  multiple valid fixes — it would have looped again: reason about options, act on the
                  best one, reflect on the result. It keeps going until done or genuinely stuck.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
              >
                Run again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
