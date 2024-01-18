/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
