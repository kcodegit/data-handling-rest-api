'use strict';

// imports
p = console.log;

exports.setUp = function(server){
  server.on('BadRequest', _handler.badRequest);
  server.on('NotFound', _handler.notFound);
  server.on('InternalServer', _handler.internalServer);
}

var _handler = {
    badRequest : (req, res, err, cb) => {
        p('Bad Request error!')
        return cb();
    },
    notFound : (req, res, err, cb) => {
        p('not found error!')
        return cb();
    },
    internalServer : (req, res, err, cb) => {
        p('internal server error!');
        return cb()
    }
}
