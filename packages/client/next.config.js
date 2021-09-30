const withPWA = require('next-pwa');

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
        source: '/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://offers-backend.herokuapp.com/:path*'
            : 'http://localhost:5000/:path*',
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
