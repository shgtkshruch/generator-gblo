var spawn = require('child_process').spawn;

module.exports = function git (cmd, cb) {
  var _git = spawn('git', cmd);
  var buf = '';

  _git.stdout.on('data', function (data) {
    buf += data;
  });

  _git.on('close', function (code) {
    if (code !== 0) console.log('code', code);
    var data = new Buffer(buf).toString().trim();
    cb(data);
  });
};
