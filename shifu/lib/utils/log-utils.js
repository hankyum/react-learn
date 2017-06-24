var Config = require('../resources/config.json');

var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

var logLevel = _getLogLevel(Config.logLevel);

function _getLogLevel(logLevel) {
  if (typeof logLevel === 'undefined' || logLevel.toUpperCase() == 'OFF') {
    return 0;
  } else if (logLevel.toUpperCase() == 'ERROR') {
    return 1;
  } else if (logLevel.toUpperCase() == 'WARN') {
    return 2;
  } else if (logLevel.toUpperCase() == 'INFO') {
    return 3;
  } else if (logLevel.toUpperCase() == 'DEBUG') {
    return 4;
  } else {
    return 0;
  }
}

function _getLogTimeStamp() {
  var date = new Date(+new Date());
  var month = monthNames[date.getMonth()];
  var seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' ' + date.getHours() +
    ':' + date.getMinutes() + ':' + seconds;
}

function _getCallerFile() {
  try {
    var err = new Error();
    var caller = {};
    var currentfile;
    var base = process.env.PWD;

    Error.prepareStackTrace = function (err, stack) { // eslint-disable-line handle-callback-err
      return stack;
    };

    var current = err.stack.shift();
    currentfile = current.getFileName();

    while (err.stack.length) {
      caller = err.stack.shift();
      if (caller !== undefined) {
        caller.file = caller.getFileName();
        caller.line = caller.getLineNumber();
        caller.function = caller.getFunctionName();

        if (caller.file === null) {
          caller.file = 'UnknownFile';
        }

        if (caller.function === null) {
          caller.function = 'UnknownFunction';
        }

        if (currentfile !== caller.file) {
          caller.function = caller.function.replace('module.exports.', '');
          caller.file = caller.file.replace(base, '..');
          return caller;
        }
      }
    }
  } catch (err) {} // eslint-disable-line no-empty
  return undefined;
}

function getMessage(messageType, message) {
  var timeStamp = _getLogTimeStamp();
  var caller = _getCallerFile();

  if (caller === undefined) {
    return timeStamp + ' ' + messageType + ' - ' + message;
  } else {
    return timeStamp + ' ' + messageType + '[' + caller.file +
      ' - ' + caller.function + ' - ' + caller.line + '] - ' + message;
  }

}

module.exports = {
  debug: function (message) {
    if (logLevel >= 4) {
      console.log('\x1b[35m', getMessage('[DEBUG] - ', message), '\x1b[0m');
    }
  },

  info: function (message) {
    if (logLevel >= 3) {
      console.log('\x1b[32m', getMessage('[INFO]  - ', message), '\x1b[0m');
    }
  },

  warn: function (message) {
    if (logLevel >= 2) {
      console.log('\x1b[33m', getMessage('[WARN]  - ', message), '\x1b[0m');
    }
  },

  error: function (message) {
    if (logLevel >= 1) {
      console.log('\x1b[31m', getMessage('[ERROR] - ', message), '\x1b[0m');
    }
  },

  setLogLevel: function (level) {
    logLevel = _getLogLevel(level);
    console.log('Log level is set to: ' + logLevel);
  },

  getLogLevel: function () {
    return logLevel;
  },

  resetLogLevel: function () {
    logLevel = _getLogLevel(Config.logLevel);
  }

};
