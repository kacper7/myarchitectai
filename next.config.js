/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["upcdn.io", "replicate.delivery"],
  },

  async rewrites() {
    return [
      {
        source: '/signup',
        destination: '/exterior'
      }
    ]
  }
};
