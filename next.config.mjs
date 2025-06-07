import 'dotenv/config'; // ✅ this automatically loads `.env.local`

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.rawg.io'],
  },
}

export default nextConfig
