var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var Github = require('../lib/github');
var git = require('../lib/git');

describe('gblo generator', function () {

  var expected = [
    'package.json',
    '.gitignore',
    '.csscomb.json',
    'gulpfile.js',
    'app/index.jade',
    'app/styles/style.scss',
    'app/scripts/script.coffee',
  ];

  var expectedContent = [
    ['package.json', /"name": "tmp"/],
    ['app/index.jade', /title\(tmp\)/]
  ];

  var expectedGit = 'notes.displayref refs/notes/*\nnotes.rewriteref refs/notes/*';

  var runGen;

  before(function() {
    runGen = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'));
  });

  describe('run generator', function () {

    describe('file', function () {
      it('create expexted files', function (done) {
        runGen.on('end', function () {
          assert.file(expected);
          assert.fileContent(expectedContent);
          done();
        });
      });
    });

    describe('git', function () {
      it('create expected notes config', function (done) {
        git(['config', '--get-regexp', 'notes'], function (res) {
          assert.deepEqual(res, expectedGit);
          done();
        });
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
