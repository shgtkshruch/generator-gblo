var generators = require('yeoman-generator');
var Github = require('../lib/github');
var git = require('../lib/git');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  packageJson: function () {
    this.template('_package.json', 'package.json');
  },

  config: function () {
    git(['config', '--get', 'github.user'], function (user) {
      this.user = user || '';
    }.bind(this));
  },

  git: function () {
    this.spawnCommand('git', ['init']);
    this.copy('gitignore', '.gitignore');
  },

  gitConfig: function () {
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

  createRepo: function () {
    if (this.user) {
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
    this.template('index.jade', 'app/index.jade');
    this.copy('style.scss', 'app/styles/style.scss');
    this.copy('script.coffee', 'app/scripts/script.coffee');
  }
});
