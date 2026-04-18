'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Field = {
  id: string
  label: string
  placeholder: string
}

type Recipe = {
  id: string
  name: string
  description: string
  fields: Field[]
  buildPrompt: (values: Record<string, string>) => string
}

const RECIPES: Recipe[] = [
  {
    id: 'palette',
    name: 'Palette name generator',
    description: 'Generate evocative names for a colour direction — useful before a client presentation.',
    fields: [
      { id: 'room', label: 'Room type', placeholder: 'e.g. master bedroom, kitchen, study' },
      { id: 'mood', label: 'Mood or feeling', placeholder: 'e.g. calm and grounding, warm and playful' },
      { id: 'colours', label: 'Key colours', placeholder: 'e.g. deep teal, warm ivory, brushed brass' },
    ],
    buildPrompt: ({ room, mood, colours }) =>
      `Generate five evocative names for a colour palette designed for a ${room || '[room type]'}. The mood is ${mood || '[mood]'}. The key colours are ${colours || '[colours]'}.\n\nEach name should:\n- Be 2–4 words\n- Feel poetic but not pretentious\n- Evoke the mood without describing the colours literally\n\nPresent them as a plain numbered list. No explanations.`,
  },
  {
    id: 'email',
    name: 'Client email draft',
    description: 'Draft a professional email to a client — you fill in the substance, AI handles the tone.',
    fields: [
      { id: 'project', label: 'Project name or type', placeholder: 'e.g. Kensington apartment, Shoreditch office fit-out' },
      { id: 'news', label: 'What do you need to tell them?', placeholder: 'e.g. lead times have extended by 3 weeks, we need sign-off on fabric' },
      { id: 'tone', label: 'Tone', placeholder: 'e.g. warm and reassuring, concise and professional' },
    ],
    buildPrompt: ({ project, news, tone }) =>
      `Draft a short email to a client about the ${project || '[project]'} project. The message to convey: ${news || '[news]'}.\n\nTone: ${tone || '[tone]'}. Address them as "Dear [Name]" and sign off as their designer.\n\nKeep it under 150 words. Be direct — do not bury the key information in pleasantries.`,
  },
  {
    id: 'spec',
    name: 'Spec sheet tidier',
    description: 'Clean up a rough specification before it goes to a contractor or supplier.',
    fields: [
      { id: 'room', label: 'Room or area', placeholder: 'e.g. master en suite, open-plan kitchen/dining' },
      { id: 'spec', label: 'Your rough specification', placeholder: 'Paste or type your rough notes here...' },
    ],
    buildPrompt: ({ room, spec }) =>
      `Tidy the following specification for a ${room || '[room]'}.\n\nRules:\n- Make format and language consistent\n- Do NOT change any design decisions or quantities — only clarify how they are expressed\n- Flag anything ambiguous that a contractor might misinterpret\n- Note any information that appears to be missing\n\nPresent the tidied spec first, then a short list of flagged issues.\n\nSpecification:\n${spec || '[paste specification here]'}`,
  },
]

const CLAUDE_BASE = 'https://claude.ai/new?q='

export function RecipeBuilder() {
  const [recipeId, setRecipeId] = useState(RECIPES[0].id)
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const recipe = RECIPES.find((r) => r.id === recipeId)!
  const prompt = recipe.buildPrompt(values)

  const handleChange = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }))
  }

  const handleRecipeChange = (id: string) => {
    setRecipeId(id)
    setValues({})
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  const claudeUrl = CLAUDE_BASE + encodeURIComponent(prompt)

  return (
    <div className="my-8 rounded-xl border border-sand-200 overflow-hidden">
      <div className="px-6 py-4 bg-sand-50 border-b border-sand-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 mb-1 font-sans">
          Recipe builder — fill in the brief, get the prompt
        </p>
        <p className="text-sm text-stone-500 font-sans">
          Choose a workflow recipe, fill in your specifics, and the prompt assembles itself.
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Recipe tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {RECIPES.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRecipeChange(r.id)}
              className={`text-xs rounded-lg border px-3 py-1.5 transition-colors font-sans ${
                recipeId === r.id
                  ? 'bg-espresso text-parchment border-espresso'
                  : 'border-sand-300 text-stone-600 hover:bg-sand-50'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <p className="text-sm text-stone-warm font-sans mb-5">{recipe.description}</p>

        {/* Fields */}
        <AnimatePresence mode="wait">
          <motion.div
            key={recipeId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4 mb-6"
          >
            {recipe.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand-700 mb-1.5 font-sans">
                  {field.label}
                </label>
                {field.id === 'spec' ? (
                  <textarea
                    value={values[field.id] ?? ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-lg border border-stone-border bg-white px-3 py-2 text-sm text-espresso placeholder:text-stone-muted focus:outline-none focus:ring-2 focus:ring-sage-300 font-sans resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.id] ?? ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-stone-border bg-white px-3 py-2 text-sm text-espresso placeholder:text-stone-muted focus:outline-none focus:ring-2 focus:ring-sage-300 font-sans"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Assembled prompt preview */}
        <div className="rounded-lg bg-espresso px-4 py-3 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-parchment/40 mb-2 font-sans">
            Assembled prompt
          </p>
          <pre className="text-xs font-mono text-parchment/80 leading-relaxed whitespace-pre-wrap break-words">
            {prompt}
          </pre>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="rounded-lg border border-sand-300 text-stone-600 text-sm px-4 py-2 font-medium hover:bg-sand-100 transition-colors font-sans"
          >
            {copied ? 'Copied ✓' : 'Copy prompt'}
          </button>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-sm px-4 py-2 font-medium transition-colors font-sans inline-block"
          >
            Open in Claude →
          </a>
        </div>
      </div>
    </div>
  )
}
