/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
     BASE_URL: 'https://tmerchant.tastee.vn/api',
  },
  images: {
    domains: ['i.pinimg.com'],
  },
}

module.exports = nextConfig
