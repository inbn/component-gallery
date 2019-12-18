const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssSVG = require('postcss-svg');

module.exports = {
  plugins: [
    postcssImport({ root: 'src/css/' }),
    tailwindcss('./tailwind.config.js'),
    postcssPresetEnv({
      stage: 0
    }),
    postcssSVG({ dirs: ['./src/svg'] })
  ]
};
