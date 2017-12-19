'use strict'

// imports
const restify = require('restify');

var server = restify.createServer();

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;