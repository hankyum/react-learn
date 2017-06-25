var FileHandler;
var KillProcess = require('./kill-process');
var Fs = require('fs');
var _ = require('lodash');
var Log = require('./log-utils');

module.exports = {

  initFileHandler: function (fileHandler) {
    FileHandler = fileHandler;
  },

  respondWithFile: function (route, reply, options) {
    if (!this.urlCalls) {
      this.urlCalls = {};
    }
    options = options || {};
    Log.debug('Debug: The current Mock Id is: ' + this.mockId);
    FileHandler({
      options: options,
      reply: reply,
      route: route.variant._route || {},
      variant: route.variant || {},
      mockId: this.mockId || undefined,
      urlCalls: this.urlCalls
    });
  },

  killProcess: function (pid, signal, callback) {
    return KillProcess(pid, signal, callback);
  },

  // Should be discontinued later for transpose data
  // and when customers are migrated to transpose data
  substituteData: function (object, valueToSubstitute) {
    for (var key in object) {
      if (typeof (object[key]) == 'object') {
        this.substituteData(object[key], valueToSubstitute);
      } else {
        if (valueToSubstitute[key]) {
          object[key] = valueToSubstitute[key];
        }
      }
    }
    return object;
  },

  writeFile: function (fileLocation, fileData, callback) {
    Fs.writeFile(fileLocation, fileData, function (err) {
      if (err) {
        callback(err);
      }
    });
  },

  deleteFile: function (filepath, callback) {
    Fs.unlink(filepath, function (err) {
      if (err) {
        callback(err);
      }
    });
  },

  // this function is exposed as a api method to customers
  readJsonFile: function (fileLocation) {
    var data = this.readFileSynchronously(fileLocation);
    try {
      var jsonData = JSON.parse(data);
      return jsonData;
    } catch (e) {
      Log.error('Not a json file!', e);
      return null;
    }
  },

  transposeData: function (object, valueToSubstitute) {

    _substitueAllElementsForAstric(object, valueToSubstitute);

    for (var prop in valueToSubstitute) {
      if (valueToSubstitute.hasOwnProperty(prop)) {
        _.set(object, prop, valueToSubstitute[prop]);
      }
    }
    return object;
  },

  readDirectory: function (dirLocation, callback) {
    Fs.readdir(dirLocation, function (err, files) {
      if (err) {
        if (err.code === 'ENOENT') {
          var errorMsg = 'Directory not found at: ' + dirLocation;
          Log.error(errorMsg);
          callback(errorMsg);
        } else {
          return callback(err);
        }
      } else {
        Log.debug('Read files are: ' + files);
        callback(files);
      }
    });
  },

  readAndFilterDirectory: function (dirLocation, fileName, callback) {
    this.readDirectory(dirLocation, function readAndFilterDirectory(files) {
      if (files.indexOf('Directory not found at') > -1) {
        Log.debug('Files: ' + files);
        callback(files);
      } else {
        Log.debug('fileName: ' + fileName);
        var filteredFile = files.filter(function (file) {
          Log.debug('File to match: ' + file);
          var foundFiles = file.match(fileName);
          Log.debug('foundFiles: ' + foundFiles);
          if (foundFiles && file.indexOf(foundFiles + '.') > -1) {
            Log.debug('Selected file: ' + file);
            return true;
          } else {
            return false;
          }
        });
        Log.debug('filteredFile: ' + filteredFile);
        callback(filteredFile);
      }
    });
  },

  readFile: function (fileLocation, callback) {
    Fs.readFile(fileLocation, 'utf8', function (err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          var errorMsg = 'File not found at: ' + fileLocation;
          Log.warn(errorMsg);
          return callback(errorMsg);
        } else {
          return callback(err);
        }
      } else {
        callback(err, data);
      }
    });
  },

  readFileSynchronously: function (fileLocation) {
    var data;
    try {
      data = Fs.readFileSync(fileLocation, 'utf8');
    } catch (e) {
      if (e.code === 'ENOENT') {
        data = 'File not found at: ' + fileLocation;
        Log.warn(data);
        return data;
      } else {
        throw e;
      }
    }
    return data;
  },

  checkFileExists: function (fileLocation, callback) {
    Fs.exists(fileLocation, function (exists) {
      if (exists) {
        Log.debug(fileLocation + ' exists!!');
      } else {
        Log.warn(fileLocation + ' does not exists!!!');
      }
      callback(exists);
    });
  },

  setMockId: function (mockId) {
    Log.debug('Setting Mock Id to: ' + mockId);
    this.mockId = mockId;
  },

  getMockId: function () {
    Log.debug('Current Mock Id to: ' + this.mockId);
    return this.mockId;
  },

  resetMockId: function () {
    Log.debug('Re-Setting Mock Id and urlCalls Count');
    this.mockId = undefined;
  },

  resetURLCount: function () {
    Log.debug('Re-Setting URL Counts');
    this.urlCalls = {};
  },

  getURLCount: function () {
    Log.debug('Getting URL Counts: ' + this.urlCalls);
    return this.urlCalls;
  }
};

function _substitueAllElementsForAstric(object, valueToSubstitute) {
  var found = false;
  do {
    found = false;
    Log.debug('Substituting * for all array elements');
    var valuesToInsert = {};
    var valuesToRemove = [];
    for (var prop in valueToSubstitute) {
      if (valueToSubstitute.hasOwnProperty(prop)) {
        var indexOfAstric = prop.indexOf('*');
        // Check if prop contains *
        if (indexOfAstric > -1) {
          Log.debug('prop with star: ' + prop + ' at index of: ' + indexOfAstric);
          valuesToRemove.push(prop);

          var arrayObjectStringWithAstric = prop.substr(0, indexOfAstric - 1);
          Log.debug('arrayObjectStringWithAstric: ' + arrayObjectStringWithAstric);

          var restOfString = prop.substr(indexOfAstric + 1);
          Log.debug('restOfString: ' + restOfString);

          var arrayObjectWithAstric = _.get(object, arrayObjectStringWithAstric, 'default');

          if (arrayObjectWithAstric != 'default') {
            if (_.isArray(arrayObjectWithAstric)) {
              var arrayObjectlength = arrayObjectWithAstric.length;
              Log.debug('length of array object with * to transpose: ' + arrayObjectlength);

              for (var i = 0; i < arrayObjectlength; i++) {
                var newSubstitueValue = arrayObjectStringWithAstric + '[' + i + restOfString;
                valuesToInsert[newSubstitueValue] = valueToSubstitute[prop];
              }
            } else {
              Log.error('Transpose Data failure >> Not an array >> ' + arrayObjectStringWithAstric);
            }
          }
        }
      }
    }

    Log.debug('Before: ' + JSON.stringify(valueToSubstitute, null, 4));

    // Add new vals
    for (var item in valuesToInsert) {
      if (valuesToInsert.hasOwnProperty(item)) {
        Log.debug('Adding: ' + item + ':' + valuesToInsert[item]);
        valueToSubstitute[item] = valuesToInsert[item];
      }
    }

    // Remove old values
    for (var i = 0; i < valuesToRemove.length; i++) {
      found = true;
      Log.debug('Removing: ' + valuesToRemove[i]);
      delete valueToSubstitute[valuesToRemove[i]];
    }

    Log.debug('After: ' + JSON.stringify(valueToSubstitute, null, 4));
  } while (found);
}

