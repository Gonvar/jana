type Row = {
  axis: string
  description: string
  picks: string
}

const ROWS: Row[] = [
  {
    axis: 'Long, nuanced writing',
    description: 'Client reports, mood board narratives, detailed briefs',
    picks: 'Claude, ChatGPT',
  },
  {
    axis: 'Generating images',
    description: 'Moodboard visuals, render concepts, texture studies',
    picks: 'Midjourney, ChatGPT Images, Flux, Firefly, Ideogram',
  },
  {
    axis: 'Speed over depth',
    description: 'Quick answers, one-liners, fast reformatting',
    picks: 'Any (use the one you already have open)',
  },
  {
    axis: 'Privacy-sensitive content',
    description: 'Client contracts, personal data, confidential briefs',
    picks: 'Check the provider\'s data policy — none are fully private by default',
  },
  {
    axis: 'Up-to-date info',
    description: 'Current product availability, recent news',
    picks: 'Perplexity, ChatGPT with search on',
  },
  {
    axis: 'Free tier good enough',
    description: 'Light daily use, occasional prompts',
    picks: 'Claude.ai free, ChatGPT free',
  },
  {
    axis: 'Multimodal (image + text)',
    description: 'Upload a photo of a space and ask questions about it',
    picks: 'Claude, ChatGPT-4o, Gemini',
  },
]

type Props = {
  highlight?: string
}

export function CompareProviders({ highlight }: Props) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-sand-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-sand-50 border-b border-sand-200">
            <th className="text-left px-5 py-3 font-semibold text-stone-500 w-1/4 font-sans text-xs uppercase tracking-[0.15em]">
              When you need…
            </th>
            <th className="text-left px-5 py-3 font-semibold text-stone-500 w-1/2 font-sans text-xs uppercase tracking-[0.15em]">
              Context
            </th>
            <th className="text-left px-5 py-3 font-semibold text-stone-500 font-sans text-xs uppercase tracking-[0.15em]">
              Good picks
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            const isHighlighted = highlight && row.axis.toLowerCase().includes(highlight.toLowerCase())
            return (
              <tr
                key={i}
                className={`border-b border-stone-100 dark:border-stone-800 last:border-0 transition-colors ${
                  isHighlighted
                    ? 'bg-sage-50'
                    : 'hover:bg-sand-50'
                }`}
              >
                <td className="px-5 py-3 font-medium text-espresso align-top text-sm font-sans">
                  {row.axis}
                </td>
                <td className="px-5 py-3 text-stone-500 align-top text-sm font-sans">
                  {row.description}
                </td>
                <td className="px-5 py-3 text-espresso align-top text-sm font-sans">
                  {row.picks}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="px-5 py-3 text-xs text-stone-400 border-t border-sand-100 font-sans">
        This table is about criteria, not features — the criteria stay true even as products change.
      </p>
    </div>
  )
}
