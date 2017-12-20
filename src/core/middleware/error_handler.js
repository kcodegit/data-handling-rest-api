'use strict';

// imports

exports = module.exports = {
    badRequest : (req, res, err, cb) => {
        console.log('Bad Request error test!')
        return cb();
    },
    notFound : (req, res, err, cb) => {
        console.log('not found error test!')
        return cb();
    },
    internalServer : (req, res, err, cb) => {
        console.log('internal server error test!');
        return cb()
    }
}
