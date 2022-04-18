/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
// }

// module.exports = nextConfig

const withTM = require('next-transpile-modules')(['echarts', 'zrender', 'vconsole']);

const myModule = module.exports = withTM({
  assetPrefix: './',
  trailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    };
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  experimental: {
    outputStandalone: true,
  },
});

myModule.rewrites = async () => {
  return [
    {
      source: "/jason/apps/covidData.json",
      destination: "http://qianke.xyz/jason/apps/covidData.json",
    },
    {
      source: "/h5_gallery_api/wx_config",
      destination: "http://gallery-test.qianke.xyz/h5_gallery_api/wx_config",
    },
  ];
};