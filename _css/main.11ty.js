const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../_includes/styles/main.scss`);
    return {
      permalink: `css/main.css`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      require('@csstools/postcss-sass'),
      require('autoprefixer'),
      require('cssnano')
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}
