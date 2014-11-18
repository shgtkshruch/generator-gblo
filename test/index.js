var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('gblo generator', function () {

  var expected = [
    'package.json',
    '.gitignore',
    '.csscomb.json',
    'gulpfile.js'
  ];

  var expectedContent = [
    ['package.json', /"name": "tmp"/]
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
