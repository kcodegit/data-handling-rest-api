'use strict';

// imports

exports.handle = server => {
    server.on('NotFound', (req, res, err, cb) => {
        console.log('not found error test!')
        return cb();
    });
    server.on('InternalServer', (req, res, err, cb) => {
        console.log('internal server error test!');
        return cb()
    });
}