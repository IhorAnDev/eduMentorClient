/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/login',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXTAUTH_URL_INTERNAL,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
