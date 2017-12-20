'use strict';

// imports
const DB_Client = require('../../database/index');

exports.validate = (req, res, next) => {
    console.log(req.path(), 'its valid! Yoo Hoo!');
    return next();
}

exports.handle = (req, res, next) => {

    res.send(200, {
        msg: 'delete_data sent this',
        foo: 'come again'
    });
    return next();
}