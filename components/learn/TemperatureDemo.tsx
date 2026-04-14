'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Output = { label: string; text: string }

type Preset = {
  prompt: string
  outputs: [Output, Output, Output] // low, mid, high
}

const PRESETS: Preset[] = [
  {
    prompt: 'Suggest a name for a new terracotta paint colour.',
    outputs: [
      { label: 'Precise (temp 0)', text: 'Terracotta Red' },
      { label: 'Balanced (temp 1)', text: 'Sunbaked Sienna' },
      { label: 'Creative (temp 2)', text: 'Pompeii at Dusk' },
    ],
  },
  {
    prompt: 'Write a one-sentence tagline for a minimalist interior studio.',
    outputs: [
      { label: 'Precise (temp 0)', text: 'Clean spaces designed for calm living.' },
      { label: 'Balanced (temp 1)', text: 'Where less becomes everything.' },
      { label: 'Creative (temp 2)', text: 'Silence, styled.' },
    ],
  },
  {
    prompt: 'Describe this room: white walls, oak floor, one linen sofa.',
    outputs: [
      { label: 'Precise (temp 0)', text: 'A bright room with white walls, an oak wood floor, and a linen sofa.' },
      { label: 'Balanced (temp 1)', text: 'Pale walls catch the morning light over warm oak floors, anchored by a single linen sofa.' },
      { label: 'Creative (temp 2)', text: 'A breath held in a room. The sofa waits like a thought you almost said out loud.' },
    ],
  },
]

const COLORS = [
  { bar: 'bg-sky-400', bg: 'bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-700', label: 'text-sky-700 dark:text-sky-400' },
  { bar: 'bg-sage-500', bg: 'bg-sage-50 border-sage-200 dark:bg-sage-900/20 dark:border-sage-700', label: 'text-sage-700 dark:text-sage-400' },
  { bar: 'bg-amber-400', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700', label: 'text-amber-700 dark:text-amber-400' },
]

export function TemperatureDemo() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [temp, setTemp] = useState(1) // 0, 1, 2
  const preset = PRESETS[presetIdx]
  const c = COLORS[temp]

  return (
    <div className="my-8 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">
          Temperature — how creative should the AI be?
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setPresetIdx(i)}
              className={`text-xs rounded-lg border px-3 py-1.5 transition-colors ${
                presetIdx === i
                  ? 'bg-stone-800 text-white border-stone-800 dark:bg-stone-200 dark:text-stone-900 dark:border-stone-200'
                  : 'border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              Prompt {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm font-mono text-stone-500 dark:text-stone-400 mb-5 italic">
          &ldquo;{preset.prompt}&rdquo;
        </p>

        {/* Slider */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-stone-400 mb-1">
            <span>Precise</span>
            <span>Creative</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full accent-sage-600 cursor-pointer"
          />
        </div>

        {/* Output */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${presetIdx}-${temp}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border px-5 py-4 ${c.bg}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${c.label}`}>
              {preset.outputs[temp].label}
            </p>
            <p className="text-stone-800 dark:text-stone-200">
              {preset.outputs[temp].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
