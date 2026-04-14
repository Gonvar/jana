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
    <div className="my-8 rounded-xl border border-sand-300 bg-sand-50 overflow-hidden">
      <div className="px-6 py-3 border-b border-sand-200 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700 font-sans">
          Try this prompt
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-espresso transition-colors font-sans"
          >
            {copied ? <Check size={12} className="text-sage-500" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-terracotta hover:text-terracotta-dark transition-colors font-sans"
          >
            <ExternalLink size={12} />
            Open in Claude
          </a>
        </div>
      </div>
      {context && (
        <p className="px-6 pt-4 pb-1 text-sm text-stone-500 italic font-sans leading-relaxed">{context}</p>
      )}
      <p className="px-6 py-4 text-espresso font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {prompt}
      </p>
    </div>
  )
}
