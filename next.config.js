/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
// }

// module.exports = nextConfig

const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

const myModule = module.exports = withTM({
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

myModule.rewrites = async () => {
  return [
    {
      source: "/jason/apps/covidData.json",
      destination: "http://qianke.xyz/jason/apps/covidData.json",
    },
  ];
};