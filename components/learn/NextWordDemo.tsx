'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Prediction = { word: string; prob: number }

type Node = {
  stem: string
  predictions: Prediction[]
  next: Record<string, string>
}

// A branching sentence tree. 'end' means the sentence is complete.
const TREE: Record<string, Node> = {
  root: {
    stem: 'The designer chose a',
    predictions: [
      { word: 'warm', prob: 0.34 },
      { word: 'neutral', prob: 0.22 },
      { word: 'bold', prob: 0.18 },
      { word: 'muted', prob: 0.14 },
      { word: 'deep', prob: 0.12 },
    ],
    next: { warm: 'warm', neutral: 'neutral', bold: 'bold', muted: 'muted', deep: 'deep' },
  },
  warm: {
    stem: 'The designer chose a warm',
    predictions: [
      { word: 'terracotta', prob: 0.38 },
      { word: 'palette', prob: 0.27 },
      { word: 'ochre', prob: 0.17 },
      { word: 'linen', prob: 0.11 },
      { word: 'sand', prob: 0.07 },
    ],
    next: {
      terracotta: 'warm_terra',
      palette: 'end',
      ochre: 'end',
      linen: 'end',
      sand: 'end',
    },
  },
  neutral: {
    stem: 'The designer chose a neutral',
    predictions: [
      { word: 'palette', prob: 0.42 },
      { word: 'tone', prob: 0.28 },
      { word: 'grey', prob: 0.16 },
      { word: 'base', prob: 0.09 },
      { word: 'scheme', prob: 0.05 },
    ],
    next: { palette: 'end', tone: 'end', grey: 'end', base: 'end', scheme: 'end' },
  },
  bold: {
    stem: 'The designer chose a bold',
    predictions: [
      { word: 'statement', prob: 0.35 },
      { word: 'accent', prob: 0.29 },
      { word: 'colour', prob: 0.21 },
      { word: 'contrast', prob: 0.10 },
      { word: 'move', prob: 0.05 },
    ],
    next: { statement: 'end', accent: 'end', colour: 'end', contrast: 'end', move: 'end' },
  },
  muted: {
    stem: 'The designer chose a muted',
    predictions: [
      { word: 'palette', prob: 0.38 },
      { word: 'green', prob: 0.24 },
      { word: 'tone', prob: 0.19 },
      { word: 'blue-grey', prob: 0.13 },
      { word: 'clay', prob: 0.06 },
    ],
    next: { palette: 'end', green: 'end', tone: 'end', 'blue-grey': 'end', clay: 'end' },
  },
  deep: {
    stem: 'The designer chose a deep',
    predictions: [
      { word: 'navy', prob: 0.33 },
      { word: 'forest', prob: 0.27 },
      { word: 'charcoal', prob: 0.23 },
      { word: 'burgundy', prob: 0.11 },
      { word: 'plum', prob: 0.06 },
    ],
    next: { navy: 'end', forest: 'end', charcoal: 'end', burgundy: 'end', plum: 'end' },
  },
  warm_terra: {
    stem: 'The designer chose a warm terracotta',
    predictions: [
      { word: 'wall', prob: 0.31 },
      { word: 'accent', prob: 0.27 },
      { word: 'palette', prob: 0.22 },
      { word: 'tile', prob: 0.13 },
      { word: 'finish', prob: 0.07 },
    ],
    next: {
      wall: 'warm_terra_wall',
      accent: 'end',
      palette: 'end',
      tile: 'end',
      finish: 'end',
    },
  },
  warm_terra_wall: {
    stem: 'The designer chose a warm terracotta wall',
    predictions: [
      { word: 'finish.', prob: 0.35 },
      { word: 'colour.', prob: 0.29 },
      { word: 'treatment.', prob: 0.21 },
      { word: 'texture.', prob: 0.10 },
      { word: 'paint.', prob: 0.05 },
    ],
    next: {
      'finish.': 'end',
      'colour.': 'end',
      'treatment.': 'end',
      'texture.': 'end',
      'paint.': 'end',
    },
  },
}

export function NextWordDemo() {
  const [nodeKey, setNodeKey] = useState('root')
  const [lastWord, setLastWord] = useState<string | null>(null)
  const [ended, setEnded] = useState(false)

  const node = TREE[nodeKey]

  const handlePick = (word: string) => {
    const nextKey = node.next[word]
    setLastWord(word)
    if (!nextKey || nextKey === 'end' || !TREE[nextKey]) {
      setEnded(true)
    } else {
      setNodeKey(nextKey)
    }
  }

  const reset = () => {
    setNodeKey('root')
    setLastWord(null)
    setEnded(false)
  }

  const finalSentence = ended && lastWord ? `${node.stem} ${lastWord}` : node.stem

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Next-token prediction — you are the model
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Pick the next word. The AI does the same thing, using probabilities learned from billions
          of training examples.
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Sentence display */}
        <div className="mb-6 min-h-[36px]">
          <p className="text-xl text-espresso font-sans leading-relaxed">
            {ended ? finalSentence : node.stem}
            {!ended && (
              <span className="inline-block w-[2px] h-5 ml-1.5 bg-terracotta animate-pulse rounded-sm align-middle" />
            )}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!ended ? (
            <motion.div
              key={nodeKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-stone-400 uppercase tracking-widest mb-3 font-sans">
                Top predictions for next word
              </p>
              <div className="space-y-2">
                {node.predictions.map(({ word, prob }) => (
                  <button
                    key={word}
                    onClick={() => handlePick(word)}
                    className="w-full flex items-center gap-3 rounded-lg border border-sand-200 px-4 py-2.5 hover:border-terracotta hover:bg-sand-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-espresso font-sans font-medium group-hover:text-terracotta transition-colors">
                          {word}
                        </span>
                        <span className="text-xs text-stone-muted font-sans tabular-nums">
                          {Math.round(prob * 100)}%
                        </span>
                      </div>
                      <div className="h-1 bg-sand-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-terracotta rounded-full"
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-lg bg-sage-50 border border-sage-200 px-5 py-4 mb-5">
                <p className="text-sm text-sage-800 font-sans">
                  <span className="font-semibold">Sentence complete.</span> You just did what a
                  language model does — one token at a time, picking from probability distributions
                  shaped by training. The model repeats this for every word in every response, across
                  every conversation happening simultaneously.
                </p>
              </div>
              <button
                onClick={reset}
                className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
              >
                Try a different path
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
