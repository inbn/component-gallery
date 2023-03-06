const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('@tailwindcss/nesting');
const postcssPresetEnv = require('postcss-preset-env');
const postcssSVG = require('postcss-svg');

module.exports = {
  plugins: [
    postcssImport({ root: 'src/css/' }),
    postcssPresetEnv({
      stage: 0,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
    tailwindcssNesting(),
    tailwindcss('./tailwind.config.js'),
    postcssSVG({ dirs: ['./src/svg'] }),
  ],
};
