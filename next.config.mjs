/** @type {import('next').NextConfig} */
// Custom domain: makeoversbybhuvita.com — no basePath needed (root domain)
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
}

export default nextConfig
