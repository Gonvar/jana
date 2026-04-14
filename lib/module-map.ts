// Explicit map of slug → dynamic MDX import.
// Webpack needs static strings for code-splitting — no computed paths.

export const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-ai':             () => import('@/content/modules/01-what-is-ai.mdx'),
  'how-llms-work':          () => import('@/content/modules/02-how-llms-work.mdx'),
  'tokens-and-context':     () => import('@/content/modules/03-tokens-and-context.mdx'),
  'prompting-for-designers':() => import('@/content/modules/04-prompting-for-designers.mdx'),
  'what-ai-can-and-cant-do':() => import('@/content/modules/05-what-ai-can-and-cant-do.mdx'),
  'provider-landscape':     () => import('@/content/modules/06-provider-landscape.mdx'),
  'agents-and-tools':       () => import('@/content/modules/07-agents-and-tools.mdx'),
  'image-models':           () => import('@/content/modules/08-image-models.mdx'),
  'design-workflows':       () => import('@/content/modules/09-design-workflows.mdx'),
  'staying-current':        () => import('@/content/modules/10-staying-current.mdx'),
  'copyright-disclosure':   () => import('@/content/modules/12-copyright-disclosure.mdx'),
  'client-communication':   () => import('@/content/modules/13-client-communication.mdx'),
  'sourcing-with-ai':       () => import('@/content/modules/14-sourcing-with-ai.mdx'),
}
