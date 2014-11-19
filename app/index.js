var generators = require('yeoman-generator');
var Github = require('../lib/github');
var cp = require('../lib/cp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  packageJson: function () {
    this.template('_package.json', 'package.json');
  },

  // git
  init: function () {
    var done = this.async();
    cp('git', ['init'], function (res) {
      done();
    });
  },

  ignore: function () {
    this.copy('gitignore', '.gitignore');
  },

  user: function () {
    cp('git', ['config', '--get', 'github.user'], function (user) {
      this.user = user || '';
    }.bind(this));
  },

  notes: function () {
    this.spawnCommand('git', [
        'config',
        '--local',
        '--add',
        'notes.displayref',
        'refs/notes/*'
    ]);
    this.spawnCommand('git', [
        'config',
        '--local',
        '--add',
        'notes.rewriteref',
        'refs/notes/*'
    ]);
  },

  repo: function () {
    if (process.env.GITHUB_TOKEN) {
      var done = this.async();
      new Github(this.user, this.appname).create(function (err, res) {
        if (err) throw new Error(err);
        this.spawnCommand('git', [
            'config',
            '--local',
            '--add',
            'remote.origin.url',
            res.ssh_url
        ]);
        this.spawnCommand('git', [
            'config',
            '--local',
            '--add',
            'remote.origin.fetch',
            '+refs/heads/*:refs/remotes/origin/*'
        ]);
        done();
      }.bind(this));
    }
  },

  gulp: function () {
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('csscomb.json', '.csscomb.json');
  },

  app: function () {
    this.template('README.md', 'README.md');
    this.template('index.jade', 'app/index.jade');
    this.copy('style.scss', 'app/styles/style.scss');
    this.copy('script.coffee', 'app/scripts/script.coffee');
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {
    if (!this.options['skip-install']) {
      var done = this.async();
      cp('gulp', ['build'], function (res) {
        cp('git', ['add', '.'], function (res) {
          cp('git', ['commit', '-m', 'Initial commit'], function (res) {
            done();
          });
        });
      });
    }
  }
});
