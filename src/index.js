'use strict'

// imports
const server = require('./core/server/server');
const router = require('./route/router');
const EH = require('./core/middleware/error_handler');

var DB_CONF = {
    "host": "localhost",
    "user": "root",
    "password": "password",
    "database": "dhra",
    "port": 3306,
    "ssl": false,
    "connectTimeout": 30000
}
const DBC = require('./database/db_client');
var DBClient = new DBC(DB_CONF);

DBClient.query('select * from user')
.then(s => console.log(s))
.then(_=>{

    // routing
    router.handle(server);
    
    // error handling
    server.on('NotFound', EH.notFound);
    server.on('InternalServer', EH.internalServer);
    
})
