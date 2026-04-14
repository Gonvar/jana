'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DESK_CAPACITY = 7

const PRESET_ITEMS = [
  { id: 'a', label: 'Your design brief', emoji: '📋' },
  { id: 'b', label: 'Client preferences', emoji: '💬' },
  { id: 'c', label: 'Mood board desc.', emoji: '🖼' },
  { id: 'd', label: 'Colour palette', emoji: '🎨' },
  { id: 'e', label: 'Material list', emoji: '📦' },
  { id: 'f', label: 'Floor plan notes', emoji: '📐' },
  { id: 'g', label: 'Budget table', emoji: '💰' },
  { id: 'h', label: 'Supplier emails', emoji: '📧' },
  { id: 'i', label: 'Revision notes', emoji: '✏️' },
  { id: 'j', label: 'Final question', emoji: '❓' },
]

export function ContextWindowDemo() {
  const [desk, setDesk] = useState(PRESET_ITEMS.slice(0, 3))

  const addItem = () => {
    const next = PRESET_ITEMS[desk.length]
    if (!next) return
    setDesk((prev) => {
      if (prev.length >= DESK_CAPACITY) {
        // oldest falls off
        return [...prev.slice(1), next]
      }
      return [...prev, next]
    })
  }

  const reset = () => setDesk(PRESET_ITEMS.slice(0, 3))

  const full = desk.length >= DESK_CAPACITY
  const overflowing = PRESET_ITEMS.indexOf(desk[desk.length - 1]) >= DESK_CAPACITY

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Context window — the AI's "desk"
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Only {DESK_CAPACITY} things fit at once. When the desk is full, the oldest falls off.
        </p>
      </div>

      {/* Desk */}
      <div className="px-6 py-6">
        <div className="relative rounded-xl border-2 border-dashed border-sand-300 bg-sand-50 min-h-[140px] p-4">
          <p className="absolute top-2 right-3 text-xs text-stone-400 font-sans">
            {desk.length} / {DESK_CAPACITY}
          </p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {desk.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-center gap-1.5 rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm shadow-sm"
                >
                  <span>{item.emoji}</span>
                  <span className="text-espresso">{item.label}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {overflowing && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-amber-600 font-sans"
          >
            The oldest item fell off the desk — the AI can no longer see it.
          </motion.p>
        )}
      </div>

      <div className="px-6 pb-5 flex gap-2">
        <button
          onClick={addItem}
          disabled={desk.length >= PRESET_ITEMS.length}
          className="rounded-lg bg-sage-500 hover:bg-sage-600 disabled:opacity-40 text-white text-sm px-4 py-2 font-medium transition-colors font-sans"
        >
          Add message to conversation
        </button>
        <button
          onClick={reset}
          className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
