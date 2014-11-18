var Github = require('github');

var github = function (user, repo) {
  this.user= user;
  this.repo= repo;
  this.password = process.env.GITHUB_TOKEN;
  this._github = new Github({
    version: '3.0.0'
  });
  this._auth();
};

github.prototype._auth = function () {
  this._github.authenticate({
    type: "basic",
    username: this.user,
    password: this.password
  });
};

github.prototype.create = function (cb) {
  this._github.repos.create({
    name: this.repo
  }, function (err, res) {
    cb(err, res);
  });
};

github.prototype.delete = function (cb) {
  this._github.repos.delete({
    user: this.user,
    repo: this.repo
  }, function (err, res) {
    cb(err, res);
  });
};

module.exports = github;

