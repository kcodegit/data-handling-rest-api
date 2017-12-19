'use strict'

// imports
const server = require('./core/server/server');
const router = require('./route/router');

router.handle(server);