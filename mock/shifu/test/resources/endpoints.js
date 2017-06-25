var shifu = require('../../index');
shifu.id('example');

shifu.route({
  id: 'message',
  label: 'Hello message',
  path: '/message',

  variantLabel: 'hello world',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply, {code: 202});
  }
})

  .variant({
    id: 'filepath',
    label: 'file path',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply, {filePath: './message/GET/variant.json', code: 302});
    }
  })

  .variant({
    id: 'universe',
    label: 'hello universe',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply, {filePath: './message/GET/default.json', code: 202});
    }
  })

  .variant({
    id: 'transpose',
    label: 'Transpose To World',
    handler: function (req, reply) {
      var dataToChange = {
        'collection.sectionOne.type': 'Hello',
        'collection.sectionOne.newData': 'Universe'
      };
      shifu.util.respondWithFile(this, reply, {transpose: dataToChange, code: 300});
    }
  })

  .variant({
    id: 'fileDoesNotExists',
    label: 'File Does Not Exists',
    handler: function (req, reply) {
      var dataToChange = {
        'collection.sectionOne.type': 'World'
      };
      shifu.util.respondWithFile(this, reply, {transpose: dataToChange, code: 202});
    }
  })

  .variant({
    id: 'fileDoesNotExists2',
    label: 'File Does Not Exists',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply);
    }
  });

shifu.route({
  id: 'getCollection',
  label: 'Get Collection',
  path: '/product/grouping/api/collection/{collectionId}',

  variantLabel: 'default'
}).respondWithFile()

  .variant({
    id: 'discount',
    label: 'Get Discount Collection',
    handler: function (req, reply) {
      reply({message: 'hello pre-order'});
    }
  }).respondWithFile();

shifu.route({
  id: 'wish',
  label: 'Wish Happy Birthday',
  path: '/wish',
  method: 'GET',

  input: {
    person: {
      label: 'Name',
      type: 'text',
      defaultValue: 'Daniel'
    },
    hobby: {
      label: 'Do you like sports',
      type: 'boolean',
      defaultValue: 'true'
    }
  },

  handler: function (req, reply) {
    // routes can have a default handler but do not have to
    if (this.input('hobby')) {
      reply({message: 'Happy Birthday ' + this.input('person') + '. I got you tickets to a Football game.'});
    } else {
      reply({message: 'Happy Birthday ' + this.input('person') + '. I got you Macy\'s gift card.'});
    }
  }
});

shifu.route({
  id: 'test-setMockId',
  label: 'Set Mock Id',
  path: '/api/setMockId',

  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});

shifu.route({
  id: 'test-setMockId-1',
  label: 'Set Mock Id 1',
  path: '/api/setMockId1',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});

shifu.route({
  id: 'test-setMockId-code',
  label: 'Set Mock Id Code',
  path: '/api/setMockIdCode',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});

shifu.route({
  id: 'file-extension',
  label: 'File Extension',
  path: '/extension',
  variantLabel: 'JSON FILE',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})
  .variant({
    id: 'HTML',
    label: 'HTML file type - UTIL',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply);
    }
  })

  .variant({
    id: 'TXT',
    label: 'Txt file type - util',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply);
    }
  })

  .variant({
    id: 'Unknown',
    label: 'Unknown file type - util',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply);
    }
  })

  .variant({
    id: 'json-respondWithFile',
    label: 'HTML file type - UTIL'
  }).respondWithFile()

  .variant({
    id: 'HTML-respondWithFile',
    label: 'HTML file type - UTIL'
  }).respondWithFile()

  .variant({
    id: 'TXT-respondWithFile',
    label: 'Txt file type - util'
  }).respondWithFile()

  .variant({
    id: 'Unknown-respondWithFile',
    label: 'Unknown file type - util'
  }).respondWithFile();

shifu.route({
  id: 'url-with-dash',
  label: 'URL With Dash',
  path: '/api/checkout-customer/{cid}/shipping-address',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});

shifu.route({
  id: 'header',
  label: 'Test Headers',
  path: '/api/testHeaders',
  handler: function (req, reply) {
    var headers = {
      header1: 'test1',
      header2: 'test2',
      header3: true
    };

    shifu.util.respondWithFile(this, reply, {headers: headers});
  }
});

shifu.route({
  id: 'cookie',
  label: 'Test Cookies',
  path: '/api/testCookies',
  handler: function (req, reply) {
    var cookies = [
      {name: 'com.wm.customer', value: 'vz7.0b5c56'},
      {name: 'CID', value: 'SmockedCID', options: {domain: 'domain', path: '/'}},
      {name: 'anotherCookie', value: 'cookieValue'}
    ];

    shifu.util.respondWithFile(this, reply, {cookies: cookies});
  }
});

shifu.route({
  id: 'images',
  label: 'Test Images',
  path: '/api/testImage',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})

  .variant({
    id: 'image-respondWithFile',
    label: 'RespondWithFile-Image',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply);
    }
  })

  .variant({
    id: 'image-filepath',
    label: 'Image-Filepath',
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply, {filePath: './api/testImage/filePath-image-test.jpeg'});
    }
  });
