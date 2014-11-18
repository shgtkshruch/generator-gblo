var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('gblo generator', function () {

  var runGen;

  beforeEach(function(done) {
    runGen = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .on('end', done);
  });

  it('should has name property with gblo', function () {
    assert.deepEqual(runGen.generator.config.name, 'generator-gblo');
  });
});
