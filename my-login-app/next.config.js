/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://54.210.221.206:3004/api/:path*',
        },
      ]
    },
  }
  
  module.exports = nextConfig