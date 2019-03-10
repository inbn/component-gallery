const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssImport({ root: 'src/css/' }),
    tailwindcss('./tailwind.config.js'),
    postcssPresetEnv({
      stage: 0
    })
  ]
};
