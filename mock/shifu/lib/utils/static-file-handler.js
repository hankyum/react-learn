var Path = require('path');
var MimeTypes = require('mime-types');
var Utils = require('./common-utils');
var NOT_FOUND = 404;
var Log = require('./log-utils');
var _ = require('lodash');

var fileExtensionOrder = ['.json', '.html', '.txt'];

module.exports = function (base) {
  return function (data) {
    var reply = data.reply;
    data.urlCalls = data.urlCalls || {};
    getFilePath(data, function (filePath) {
      Log.debug('Filepath is : ' + filePath);
      var code = data.options.code || 200;
      var mimeType = MimeTypes.lookup(filePath);
      var fileExtension = Path.extname(filePath);
      Log.debug('File extension is ' + fileExtension);

      if (_.includes(fileExtensionOrder, fileExtension)) {
        Utils.readFile(filePath, function (err, fileData) {

          var response;
          // Create Response
          if (err) {
            Log.error(err);

            if (data.options.code !== undefined) {
              response = reply().code(data.options.code).hold();
              return setHeadersAndCookies(response, data.options, sendResponse);
            } else {
              response = reply(err).code(NOT_FOUND).hold();
              return setHeadersAndCookies(response, data.options, sendResponse);
            }

          } else if (mimeType && _.includes(mimeType, 'json') && data.options.transpose !== undefined) {
            fileData = JSON.parse(fileData);
            fileData = Utils.transposeData(fileData, data.options.transpose);
          }
          response = reply(fileData).type(mimeType).code(code).hold();
          return setHeadersAndCookies(response, data.options, sendResponse);
        });
      } else {
        return reply.file(filePath);
      }
    });
  };

  function sendResponse(response) {
    response.send();
  }

  function setHeadersAndCookies(response, options, callback) {
    setHeaders(response, options.headers, function (responseHeaders) {
      setCookies(responseHeaders, options.cookies, function (responseCookies) {
        callback(responseCookies);
      });
    });
  }

  function setHeaders(response, headers, callback) {
    if (headers !== undefined) {
      for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
          Log.debug('Setting header: ' + key + ' to: ' + headers[key]);
          response = response.header(key, headers[key]);
        }
      }
    }
    callback(response);
  }

  function setCookies(response, cookies, callback) {
    if (cookies !== undefined) {
      cookies.forEach(function (cookie) {
        Log.debug('Setting Cookie: ' + cookie.name + ' to: ' + cookie.value);
        if (cookie.options !== undefined) {
          response = response.state(cookie.name, cookie.value, cookie.options);
        } else {
          response = response.state(cookie.name, cookie.value);
        }
      });
    }
    callback(response);
  }

  function getFilePath(data, callback) {

    var defaultFileName = getDefaultFileName(data);
    var nextValue = getNextValue(data, defaultFileName);

    if (data.mockId !== undefined) {
      Log.debug('Creating file path based on mockId');

      // Now check if the file exists with new value otherwise set the file
      // name to default file
      var directory = Path.join(base, data.mockId);
      var fileNameByURLCount = defaultFileName + '-' + nextValue;
      var fileNameByURLCountAndCode = new RegExp(defaultFileName + '-' + nextValue + '-code-\\d+', 'i');

      Log.debug('>>>>> Trying to find code specific file');
      selectFileFromDirectory(directory, fileNameByURLCountAndCode, function (filePath) {
        // check if file exists or switch to default file
        Utils.checkFileExists(filePath, function (exists) {
          if (exists) {
            handleCodeFile('count specific', filePath, data, callback);
          } else {
            Log.debug('>>>>> Trying to find count specific file');
            selectFileFromDirectory(directory, fileNameByURLCount, function (filePath) {
              // check if file exists or switch to default file
              Utils.checkFileExists(filePath, function (exists) {
                if (exists) {
                  Log.info('Found count specific file without code and returning that as response: ' + filePath);
                  callback(filePath);
                } else {
                  Log.debug('>>>>> Returning default file');
                  var defaultFileNameWithCode = new RegExp(defaultFileName + '-code-\\d+', 'i');
                  Log.info('Count specific file NOT found. Looking for default file response with ' +
                    'code: ' + defaultFileNameWithCode);
                  selectFileFromDirectory(directory, defaultFileNameWithCode, function (filePath) {
                    // check if file exists or switch to default file
                    Utils.checkFileExists(filePath, function (exists) {
                      if (exists) {
                        handleCodeFile('default', filePath, data, callback);
                      } else {
                        Log.info('Code specific default file NOT found. Returning default file ' +
                          'response: ' + defaultFileName);
                        selectFileFromDirectory(directory, defaultFileName, callback);
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });

    } else if (data.options.filePath) {
      Log.debug('Creating file path based on custom file location');
      callback(Path.join(base, data.options.filePath));
    } else {
      Log.debug('Creating file path based on URL');
      createFilePath(data, callback);
    }
  }

  function getDefaultFileName(data) {
    // Get the filename for the url to respond
    var fileFromPath = getPath(data).replace(/\//g, '-');
    var defaultFileName = fileFromPath.indexOf('-') === 0 ? fileFromPath.substring(1) : fileFromPath;
    defaultFileName = defaultFileName + '-' + getRouteMethod(data);
    Log.debug('Default file name: ' + defaultFileName);
    return defaultFileName;
  }

  function getNextValue(data, defaultFileName) {
    // Pick file based on the number of times the URL is called
    // for ex: If URL is called for second time than pick urlPath-2.json.
    // If urlPath-2.json is not present than return urlPath.json
    Log.debug('Url Call Count: ' + JSON.stringify(data.urlCalls));
    var nextValue = 1;
    if (data.urlCalls[defaultFileName] !== undefined) {
      var curVal = data.urlCalls[defaultFileName];
      nextValue = curVal + 1;
    }
    data.urlCalls[defaultFileName] = nextValue;
    Log.debug(getPath(data) + ' is called for the count: ' + nextValue);
    Log.debug('Url Call Count NOW: ' + JSON.stringify(data.urlCalls));
    return nextValue;
  }

  function createFilePath(data, callback) {
    var routeMethod = getRouteMethod(data);
    var path = getPath(data);
    var variant = data.variant;
    selectFileFromDirectory(Path.join(base, path, routeMethod), variant.id(), callback);
  }

  function getPath(data) {
    var path = data.route.path().replace(/[{}}]\.*/g, '');
    return path;
  }

  function getRouteMethod(data) {
    return data.route.method();
  }

  function getCodeFromFilePath(filePath) {
    var code = filePath.split('.');
    code = code[0].split('-');
    return parseInt(code[code.length - 1]);
  }

  function handleCodeFile(fileType, filePath, data, callback) {
    Log.info('Found ' + fileType + ' file with code and returning that as response: ' + filePath);
    data.options.code = getCodeFromFilePath(filePath);
    Log.debug('code: ' + data.options.code);
    callback(filePath);
  }

  function selectFileFromDirectory(directory, fileName, callback) {
    Utils.readAndFilterDirectory(directory, fileName, function (files) {
      // This is done to remove regex from file name for code specific files
      var filePath;
      Log.debug('files found: ' + files);
      if (files.length === 0) {
        if (fileName instanceof RegExp) {
          fileName = 'DummyFileName';
        }

        filePath = Path.join(directory, fileName);
        Log.warn('No response files found at: ' + filePath);
        Log.debug('Setting default extension to .json and file not exists will be handled later');
        filePath = filePath + '.json';
      } else if (files.length == 1) {
        filePath = Path.join(directory, files[0]);
      } else {
        for (var index in fileExtensionOrder) {
          if (files.indexOf(fileName + fileExtensionOrder[index]) > -1) {
            filePath = Path.join(directory, fileName + fileExtensionOrder[index]);
            break;
          }
        }
      }
      callback(filePath);
    });
  }
};
