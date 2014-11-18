var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

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

  var runGen;

  beforeEach(function() {
    runGen = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'));
  });

  it('create expexted files', function (done) {
    runGen.on('end', function () {
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });
  });
});
