var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var Github = require('../lib/github');
var cp = require('../lib/cp');

describe('gblo generator', function () {

  var expected = [
    'package.json',
    '.gitignore',
    '.csscomb.json',
    'README.md',
    'gulpfile.js',
    'app/index.jade',
    'app/styles/style.scss',
    'app/scripts/script.coffee',
  ];

  var expectedContent = [
    ['README.md', /# tmp/],
    ['package.json', /"name": "tmp"/],
    ['app/index.jade', /title tmp/]
  ];

  var expectedGit = 'notes.displayref refs/notes/*\nnotes.rewriteref refs/notes/*';

  before(function(done) {
    helpers.testDirectory(path.join(__dirname, '.tmp'), function () {
      this.gblo = helpers.createGenerator('gblo', ['../../app']);
      this.gblo.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('should create expexted files', function (done) {
    this.gblo.run({}, function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      cp('git', ['config', '--get-regexp', 'notes'], function (res) {
        assert.deepEqual(res, expectedGit);
        done();
      });
    });
  });

  after(function (done) {
    if (process.env.GITHUB_TOKEN) {
      new Github('shgtkshruch', 'tmp').delete(function (err, res) {
        if (err) throw new Error(err);
        done();
      });
    } else {
      done();
    }
  });
});
