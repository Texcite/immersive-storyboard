/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '584762767-files.gitbook.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'ple1.nigelritfeld.nl',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'app.kaiber.ai',
        port: '',
        pathname: '/**'
      }
    ]
  }

}

module.exports = nextConfig
// (https://app.kaiber.ai/