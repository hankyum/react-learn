var PsTree = require('ps-tree');

module.exports = function (pid, signal, callback) {
  signal = signal || 'SIGKILL';
  PsTree(pid, function (err, children) { // eslint-disable-line handle-callback-err
    [pid].concat(
      children.map(function (p) {
        return p.PID;
      })
    ).forEach(function (tpid) {
      try {
        process.kill(tpid, signal);
      } catch (ex) {
        console.log('Failed to kill process: ' + ex);
      }
    });
    if (callback) {
      return callback();
    }
  });
};
