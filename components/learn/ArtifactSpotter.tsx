'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Hotspot = {
  id: string
  label: string
  explanation: string
}

type Scene = {
  title: string
  description: string // segments interspersed with hotspot IDs
  segments: (string | Hotspot)[]
}

const SCENES: Scene[] = [
  {
    title: 'Kitchen with peninsula',
    description: '',
    segments: [
      'A bright kitchen with white quartz countertops and integrated appliances. Three ',
      {
        id: 'pendant',
        label: 'pendant lights hang over the island, each with a different number of arms',
        explanation:
          'Diffusion models struggle with countable repeated elements. When asked for "three matching pendants," they often produce fixtures that vary subtly — an extra arm here, a missing one there.',
      },
      '. The ',
      {
        id: 'tiles',
        label: 'tile backsplash features decorative lettering that almost spells words',
        explanation:
          "Text generation is notoriously unreliable in image models. Characters look plausible from a distance but dissolve into near-letters up close — the model learned the visual pattern of text without learning to render real glyphs.",
      },
      '. Through the window, a garden with ',
      {
        id: 'hands',
        label: 'a person holding shears whose fingers seem to merge with the handle',
        explanation:
          'Hands are one of the most consistent failure points in image AI. The complex structure of fingers — how they overlap, grip, and articulate — is rarely rendered accurately.',
      },
      '.',
    ],
  },
  {
    title: 'Living room at dusk',
    description: '',
    segments: [
      'A serene living room with dark walls and warm lighting. A ',
      {
        id: 'reflection',
        label: 'mirror on the far wall reflects a room that looks slightly different from the one in the image',
        explanation:
          'Reflections require spatial reasoning — the model must understand what would actually be visible in a mirror at that position. Image models hallucinate plausible-looking reflections that are geometrically inconsistent.',
      },
      '. A coffee table book is open, its ',
      {
        id: 'pages',
        label: 'pages showing dense paragraphs of convincing but entirely illegible text',
        explanation:
          'The same text-rendering problem as tiles: the model has seen thousands of images of open books and learned the texture of pages with text — but not the actual characters.',
      },
      '. The sofa has ',
      {
        id: 'cushions',
        label: 'four matching cushions where the pattern on each is almost — but not quite — the same',
        explanation:
          'Repeated patterned elements rarely match exactly. The model generates each cushion independently from a concept of "striped cushion," so subtle differences appear between them.',
      },
      '.',
    ],
  },
]

export function ArtifactSpotter() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [found, setFound] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState<string | null>(null)

  const scene = SCENES[sceneIdx]
  const hotspots = scene.segments.filter((s): s is Hotspot => typeof s === 'object')
  const allFound = found.size === hotspots.length

  const handleClick = (id: string) => {
    setFound((prev) => new Set([...prev, id]))
    setActiveId(id)
  }

  const handleSceneChange = (idx: number) => {
    setSceneIdx(idx)
    setFound(new Set())
    setActiveId(null)
  }

  const activeHotspot = hotspots.find((h) => h.id === activeId)

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Spot the artifact — find the AI tells
        </p>
        <p className="text-sm text-stone-500 font-sans">
          These scenes describe typical AI-generated interiors. Click the underlined phrases to
          uncover what went wrong — and why.
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Scene tabs */}
        <div className="flex gap-2 mb-5">
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSceneChange(i)}
              className={`text-xs rounded-lg border px-3 py-1.5 transition-colors font-sans ${
                sceneIdx === i
                  ? 'bg-espresso text-parchment border-espresso'
                  : 'border-sand-300 text-stone-600 hover:bg-sand-50'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Scene description with clickable hotspots */}
        <div className="rounded-lg bg-stone-surface border border-stone-border px-5 py-4 mb-5 text-espresso font-sans leading-[1.85] text-[1.0625rem]">
          {scene.segments.map((seg, i) => {
            if (typeof seg === 'string') return <span key={i}>{seg}</span>
            const isFound = found.has(seg.id)
            const isActive = activeId === seg.id
            return (
              <button
                key={seg.id}
                onClick={() => handleClick(seg.id)}
                className={`inline underline underline-offset-2 decoration-dashed transition-colors font-sans text-left ${
                  isFound
                    ? isActive
                      ? 'text-terracotta decoration-terracotta'
                      : 'text-sage-600 decoration-sage-400'
                    : 'text-terracotta decoration-terracotta hover:text-terracotta-dark cursor-pointer'
                }`}
              >
                {seg.label}
              </button>
            )
          })}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            {hotspots.map((h) => (
              <div
                key={h.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  found.has(h.id) ? 'bg-terracotta' : 'bg-sand-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-stone-400 font-sans">
            {found.size}/{hotspots.length} artifacts found
          </span>
        </div>

        {/* Explanation panel */}
        <AnimatePresence mode="wait">
          {activeHotspot && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-terracotta/30 bg-sand-50 px-5 py-4 mb-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2 font-sans">
                Why this happens
              </p>
              <p className="text-sm text-espresso font-sans leading-relaxed">
                {activeHotspot.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {allFound && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-sage-50 border border-sage-200 px-4 py-3"
          >
            <p className="text-sm text-sage-800 font-sans">
              <span className="font-semibold">All found.</span> These patterns — text, hands,
              reflections, repeated elements — appear across virtually all current image models.
              They are not bugs to be patched; they reflect how diffusion works. Knowing them lets
              you prompt around them, or catch them before a client does.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
