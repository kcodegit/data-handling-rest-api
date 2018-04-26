'use strict';

// imports

exports.setUp = function(server){
  server.on('BadRequest', _handler.badRequest);
  server.on('NotFound', _handler.notFound);
  server.on('InternalServer', _handler.internalServer);
}

var _handler = {
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
