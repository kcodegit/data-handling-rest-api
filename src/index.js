'use strict'

// imports
var router = require('./route/router'),
  eh = require('./core/middleware/error_handler'),
  p = console.log;

/**
 * set up the app
 * @param { Server } server 
 * @returns { Server }
 */
exports.setUp = function(server){
  // routing
  router.setUp(server);
  // error handling
  eh.setUp(server);
  return server;
}
