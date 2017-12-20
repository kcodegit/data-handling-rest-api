'use strict';

// imports
const errs = require('restify-errors');
const get_data = require('../model/response/get_data');
const post_data = require('../model/response/post_data');
const delete_data = require('../model/response/delete_data');

/**
 * 
 * @param { RestifyServer } server 
 */
exports.handle = server => {
    server.use((req, res, next) => { console.log('HIT!'); return next(); })

    server.get('data', get_data.validate, get_data.handle);
    server.post('data', post_data.validate, post_data.handle);
    server.del('data', delete_data.validate, delete_data.handle);
    
    server.get('/500test',(req, res, next) => { return next(new errs.InternalServerError('Internal Server error test!!!'))});
    server.get('/400test',(req, res, next) => { return next(new errs.BadRequestError('Bad Request error test!!!'))});
}