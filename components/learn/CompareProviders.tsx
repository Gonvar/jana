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
    picks: 'Midjourney, DALL·E, Ideogram',
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
    <div className="my-8 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
            <th className="text-left px-5 py-3 font-semibold text-stone-600 dark:text-stone-300 w-1/4">
              When you need…
            </th>
            <th className="text-left px-5 py-3 font-semibold text-stone-600 dark:text-stone-300 w-1/2">
              Context
            </th>
            <th className="text-left px-5 py-3 font-semibold text-stone-600 dark:text-stone-300">
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
                    ? 'bg-sage-50 dark:bg-sage-900/10'
                    : 'hover:bg-stone-50 dark:hover:bg-stone-800/30'
                }`}
              >
                <td className="px-5 py-3 font-medium text-stone-800 dark:text-stone-200 align-top">
                  {row.axis}
                </td>
                <td className="px-5 py-3 text-stone-500 dark:text-stone-400 align-top">
                  {row.description}
                </td>
                <td className="px-5 py-3 text-stone-700 dark:text-stone-300 align-top">
                  {row.picks}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="px-5 py-3 text-xs text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-800">
        This table is about criteria, not features — the criteria stay true even as products change.
      </p>
    </div>
  )
}
