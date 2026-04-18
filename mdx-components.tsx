import type { MDXComponents } from 'mdx/types'
import { Analogy }            from '@/components/learn/Analogy'
import { KeyIdea }            from '@/components/learn/KeyIdea'
import { CanDo }              from '@/components/learn/CanDo'
import { CantDo }             from '@/components/learn/CantDo'
import { TryThis }            from '@/components/learn/TryThis'
import { Glossary }           from '@/components/learn/Glossary'
import { TokenDemo }          from '@/components/learn/TokenDemo'
import { ContextWindowDemo }  from '@/components/learn/ContextWindowDemo'
import { TemperatureDemo }    from '@/components/learn/TemperatureDemo'
import { CompareProviders }   from '@/components/learn/CompareProviders'
import { PatternMatcherDemo } from '@/components/learn/PatternMatcherDemo'
import { NextWordDemo }       from '@/components/learn/NextWordDemo'
import { CanItQuiz }          from '@/components/learn/CanItQuiz'
import { AgentLoopDemo }      from '@/components/learn/AgentLoopDemo'
import { DiffusionDemo }      from '@/components/learn/DiffusionDemo'
import { ArtifactSpotter }    from '@/components/learn/ArtifactSpotter'
import { RecipeBuilder }      from '@/components/learn/RecipeBuilder'
import { HypeScorer }         from '@/components/learn/HypeScorer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom vocabulary
    Analogy,
    KeyIdea,
    CanDo,
    CantDo,
    TryThis,
    Glossary,
    TokenDemo,
    ContextWindowDemo,
    TemperatureDemo,
    CompareProviders,
    PatternMatcherDemo,
    NextWordDemo,
    CanItQuiz,
    AgentLoopDemo,
    DiffusionDemo,
    ArtifactSpotter,
    RecipeBuilder,
    HypeScorer,

    // Override default HTML elements for the editorial feel
    h1: ({ children }) => (
      <h1
        className="text-4xl md:text-5xl text-espresso leading-none tracking-tight mt-12 mb-4"
        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-3xl text-espresso leading-tight tracking-tight mt-10 mb-3"
        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl text-espresso leading-snug mt-8 mb-2"
        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontStyle: 'italic' }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[1.0625rem] text-espresso leading-[1.85] my-6 font-sans">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terracotta pl-6 my-8 text-xl text-stone-warm leading-relaxed"
        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
      >
        {children}
      </blockquote>
    ),
    hr: () => (
      <div className="ornament-rule my-12">
        <span
          className="text-stone-border text-xl"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          ✦
        </span>
      </div>
    ),
    ul: ({ children }) => (
      <ul className="my-6 space-y-2 font-sans text-espresso">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 space-y-2 font-sans text-espresso list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2 text-[1.0625rem] leading-relaxed">
        <span className="mt-2.5 w-1 h-1 rounded-full bg-terracotta shrink-0" />
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-espresso">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="bg-[#EDE6D9] text-terracotta-dark px-1.5 py-0.5 rounded text-[0.875em] font-mono">
        {children}
      </code>
    ),
    ...components,
  }
}
