'use client'

import { useState, useMemo } from 'react'

const COLS = 14
const ROWS = 7

// Target image: a simplified room cross-section
// ceiling | terracotta wall (left) | window (centre) | cream wall (right) | floor
function targetColor(row: number, col: number): string {
  if (row === 0) return '#EDEAE4' // ceiling
  if (row === ROWS - 1) return '#9A7C57' // floor
  if (row >= 1 && row <= ROWS - 2) {
    if (col >= 5 && col <= 8) return '#D4EBF0' // window
    if (col < 5) return '#C4622D' // terracotta feature wall
    return '#F5EDE0' // cream wall
  }
  return '#F5EDE0'
}

const NOISE_PALETTE = [
  '#8B5E3C', '#A67C52', '#5C8B7A', '#3B6E8C', '#9E7B4A',
  '#C4A882', '#6B8F71', '#7A6B5A', '#B8A090', '#4A7B8C',
  '#8C6B4A', '#D4B896', '#5A7A6B', '#9C8472', '#B07060',
  '#7A9080', '#C4987A', '#4E6A5C', '#A89070', '#6E8090',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0
    return (s >>> 0) / 0x100000000
  }
}

// Pre-generate 11 frames (step 0 = pure noise, step 10 = pure image)
const FRAMES: string[][] = Array.from({ length: 11 }, (_, step) => {
  const rng = seededRandom(step * 31337 + 42)
  const noiseRatio = 1 - step / 10
  return Array.from({ length: COLS * ROWS }, (_, idx) => {
    const row = Math.floor(idx / COLS)
    const col = idx % COLS
    if (rng() < noiseRatio) {
      const ni = Math.floor(rng() * NOISE_PALETTE.length)
      return NOISE_PALETTE[ni]
    }
    return targetColor(row, col)
  })
})

const STEP_LABELS = [
  'Pure noise — no structure yet',
  'Step 1 — barely any signal',
  'Step 2 — faint structure emerging',
  'Step 3 — rough shapes visible',
  'Step 4 — regions starting to form',
  'Step 5 — halfway resolved',
  'Step 6 — main areas clear',
  'Step 7 — mostly resolved',
  'Step 8 — almost there',
  'Step 9 — nearly clean',
  'Fully resolved — the final image',
]

export function DiffusionDemo() {
  const [step, setStep] = useState(0)
  const frame = FRAMES[step]

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Diffusion process — noise becomes image
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Drag the slider to watch a diffusion model resolve pure noise into a structured image.
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Grid */}
        <div
          className="rounded-lg overflow-hidden mb-5 border border-stone-border"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: 1,
            backgroundColor: '#E5DBCC',
          }}
        >
          {frame.map((color, i) => (
            <div
              key={i}
              style={{
                backgroundColor: color,
                aspectRatio: '1',
                transition: 'background-color 0.15s ease',
              }}
            />
          ))}
        </div>

        {/* Slider */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-stone-400 mb-1.5 font-sans">
            <span>Noise</span>
            <span>Resolved image</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-full accent-terracotta cursor-pointer"
          />
        </div>

        <p className="text-sm text-stone-warm font-sans text-center">
          {STEP_LABELS[step]}
        </p>

        {step === 10 && (
          <div className="mt-4 rounded-lg bg-sand-50 border border-sand-200 px-4 py-3">
            <p className="text-xs text-stone-warm font-sans leading-relaxed">
              Each coloured block started as random noise. The model repeatedly applied a learned
              denoising function — slightly adjusting each cell toward a plausible image — until
              structure emerged. This is why diffusion models can produce vivid results but
              struggle with precise details: they are resolving probability, not drawing a plan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
