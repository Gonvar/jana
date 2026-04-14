import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Keep options minimal — frontmatter is read by gray-matter in lib/modules.ts,
  // not via remark plugins (avoids serialization issues with Turbopack).
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
