'use strict'

// imports
const server = require('./core/server/server');
const router = require('./route/router');
const EH = require('./core/middleware/error_handler');

// routing
router.handle(server);
    
// error handling
server.on('BadRequest', EH.badRequest);
server.on('NotFound', EH.notFound);
server.on('InternalServer', EH.internalServer);
