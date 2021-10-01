const withPWA = require('next-pwa');
const path = require('path');

/** @type {import('next').NextConfig} */

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://offers-backend.herokuapp.com/api/:path*'
            : 'http://localhost:5000/api/:path*',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  reactStrictMode: true,
});
