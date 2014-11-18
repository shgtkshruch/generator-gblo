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
  },

  app: function () {
    this.mkdir('app');
    this.template('index.jade', 'app/index.jade');
    this.copy('style.scss', 'app/styles/style.scss');
    this.copy('script.coffee', 'app/scripts/script.coffee');
  }
});
