// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    '@storybook/addon-postcss'
  ]
};
