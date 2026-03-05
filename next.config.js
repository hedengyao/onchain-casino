/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['web3.okx.com', 'assets.coingecko.com', 'img.youtube.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'OnChain Casino',
    NEXT_PUBLIC_CHAIN: 'solana',
  },
}

module.exports = nextConfig
