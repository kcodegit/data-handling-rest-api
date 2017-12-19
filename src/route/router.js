'use strict';

// imports
const errs = require('restify-errors');
const get_data = require('../model/response/get_data');
const post_data = require('../model/response/post_data');
const delete_data = require('../model/response/delete_data');

/**
 * 
 * @param {*} server 
 */
exports.handle = server => {
    server.use((req, res, next) => { console.log('HIT!'); return next(); })
    server.get('/home/hoge',(req, res, next) => { return next(new errs.InternalServerError('hoge internal server error test!!!'))});
    server.get('/home/fuga',(req, res, next) => {
        res.send(200, {
            fuga:true,
            foo:'come again'
        });
        return next();
    });

    server.get('data', get_data.validate, get_data.handle);
    server.post('data', get_data.validate, get_data.handle);


}