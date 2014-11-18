var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  packageJson: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
  },

  gulp: function () {
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('csscomb.json', '.csscomb.json');
  }
});
