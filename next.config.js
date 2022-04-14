/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
// }

// module.exports = nextConfig

const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  assetPrefix: ".",
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    };
  }
});