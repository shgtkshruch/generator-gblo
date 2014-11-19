var spawn = require('child_process').spawn;

module.exports = function (cmd, arg, cb) {
  var cp = spawn(cmd, arg);
  var buf = '';

  cp.stdout.on('data', function (data) {
    buf += data;
  });

  cp.on('close', function (code) {
    var data = new Buffer(buf).toString().trim();
    cb(data);
  });
};
