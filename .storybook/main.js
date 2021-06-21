const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-postcss',
  ],
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule?.test?.toString().includes('svg')) {
        const test = rule.test
          .toString()
          .replace('svg|', '')
          .replace(/\//g, '');
        return { ...rule, test: new RegExp(test) };
      } else {
        return rule;
      }
    });

    config.module.rules.push({
      test: /\.svg$/i,
      loader: require.resolve('svg-sprite-loader'),
      options: {
        extract: true,
        esModule: false,
        spriteFilename: 'icons.svg',
        outputPath: '../public/',
        publicPath: '/',
      },
    });

    config.plugins.push(new SpriteLoaderPlugin({ plainSprite: true }));

    return {
      ...config,
    };
  },
};
