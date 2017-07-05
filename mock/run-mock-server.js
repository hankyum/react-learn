// very easy way to start the mock server

// load our example endpoint
require('./smocks');

require('smocks/hapi').start({
  port: 8000,
  host: 'localhost'
}, function () {
  console.log('Mock server started on port 8000');
});
