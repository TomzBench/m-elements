const PathResolver = require('../scripts/webpack/path-resolver');
const JsBundleFactory = require('../scripts/webpack/js-bundle-factory');
const merge = require('webpack-merge');

const pathResolver = new PathResolver();
const jsBundleFactory = new JsBundleFactory({ pathResolver });

module.exports = {
  stories: ['../components/**/*.stories.[tj]s'],
  webpackFinal: async (config, { configType }) => {
    //
    // We want to remove storybook file-loader so we can use url-loader
    //
    config.module.rules = config.module.rules.filter(obj => {
      return JSON.stringify(obj).includes('file-loader') ? false : true;
    });

    //
    // Now merge storybook webpack with our webpack.
    //
    return merge([config, jsBundleFactory.createJsBundle()]);
  }
};
