'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

type Props = {
  prompt: string
  context?: string
}

export function TryThis({ prompt, context }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`

  return (
    <div className="my-8 rounded-xl border border-sand-200 bg-sand-50 dark:border-sand-700 dark:bg-sand-900/20 overflow-hidden">
      <div className="px-6 py-3 border-b border-sand-200 dark:border-sand-700 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-sand-600 dark:text-sand-400">
          Try this prompt
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <ExternalLink size={12} />
            Open in Claude
          </a>
        </div>
      </div>
      {context && (
        <p className="px-6 pt-4 text-sm text-stone-500 dark:text-stone-400 italic">{context}</p>
      )}
      <p className="px-6 py-4 text-stone-800 dark:text-stone-200 font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {prompt}
      </p>
    </div>
  )
}
