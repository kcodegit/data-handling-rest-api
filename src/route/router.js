'use strict';

// imports and vars
var errs = require('restify-errors'),
  get_data = require('../core/middleware/response/get_data'),
  post_data = require('../core/middleware/response/post_data'),
  delete_data = require('../core/middleware/response/delete_data'),
  p = console.log;

/**
 * routes setup
 * @param { Server } server 
 */
exports.setUp = function(server){
    server.get('healthCheck', (req, res, next) => res.send(200, { msg: 'I am healthy.' }))

    server.get('data', get_data.validate, get_data.handle);
    server.post('data', post_data.validate, post_data.handle);
    server.del('data', delete_data.validate, delete_data.handle);

}