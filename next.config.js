/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,

  // Set the static page generation timeout (in seconds)
  staticPageGenerationTimeout: 180, // Adjust as needed

  // Enable SWC minification for faster builds
  swcMinify: true,
};

module.exports = nextConfig;
