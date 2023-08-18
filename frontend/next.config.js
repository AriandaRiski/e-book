/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ik.imagekit.io',
            // port: '',
            pathname: '/riskiebook/tr:n-ik_ml_thumbnail/**',
          },
        ],
      },
}

module.exports = nextConfig
