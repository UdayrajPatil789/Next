// next.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["mongoose"]
    },
    images: {
      domains: ['occ-0-3933-116.1.nflxso.net']
    }
  };

  if (phase === PHASE_PRODUCTION_BUILD) {
    // Add the BundleAnalyzerPlugin only during the production build phase
    nextConfig.webpack = (config, options) => {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './bundles.html',
        })
      );

      return config;
    };
  }

  return nextConfig;
};
