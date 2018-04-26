'use strict'

/**
 * Restify Server Setup
 */

// args options
const options = [
  { name: ['s', 'server'], description: 'Server type. http or https.', defaultValue: 'http'},
  { name: ['c', 'cluster'], description: 'cluster or not.', defaultValue: false }
]

// imports and vars
var restify = require('restify'),
  cluster = require('cluster'),
  Promise = require('bluebird'),
  app = require('../../index'),
  SERVER_CONF = require('config').server,
  ENV = process.env.NODE_ENV,
  cpus = require('os').cpus().length,
  fs_promised = require('../../util/fs_promised'),
  args = require('args').options(options).parse(process.argv),
  p = console.log;


/**
 * validates the arguments
 */
function validateArgs(){
  var _throw = s => { throw new Error('Invalid Arguments. ' + s) }
  if(typeof args.cluster !== 'boolean') _throw('--cluster needs to be true/false.');
  if(!['http', 'https'].some(e => args.server)) _throw('--server needs to be http or https.');
}

/**
 * creates a http server
 * @returns { Promise<Server> }
 */
function http(){
  return Promise.resolve(restify.createServer());
}

/**
 * creates a https server
 * @returns { Promise<Server> }
 */
function https(){
  return Promise.all([
    fs_promised.open(SERVER_CONF.KEY_PATH),
    fs_promised.open(SERVER_CONF.CERT_PATH)
  ])
  .then(([k,c]) => restify.createServer({ key: k, certificate: c }));
}

/**
 * takes args option for server
 * @param { string } option 
 * @returns { Promise<Server> }
 */
function makeServer(option){
  return option === 'https' ? https() : http()
}

/**
 * sets plugins to the server
 * @param { Server } sv
 * @returns { Server } 
 */
function setPlugins(sv){
  sv.use(restify.plugins.jsonBodyParser());
  return sv;
}

/**
 * starts listening
 * @param { Server } sv
 * @returns { Server }
 */
function listen(sv){
  sv.listen(SERVER_CONF.PORT, SERVER_CONF.BASE_URI, () => {
    p('server listening at', sv.url);
  });
  return sv;
}

/**
 * launches a server
 */
function launch(){
  makeServer(args.server)
    .then(sv => setPlugins(sv))
    .then(sv => app.setUp(sv))
    .then(sv => listen(sv))
    .catch(e => {
      p('Error while launching the server.', e)
      process.exit(1);
    })
}

/**
 * forks a bunch of workers
 */
function crusterItUp(){
  if(cluster.isMaster){
    for(let i = 0; i < cpus; i++){
      p('Forking...');
      cluster.fork();
    }
    cluster.on('online', (worker) => { p('Worker ' + worker.process.pid + ' is now online.') });
    cluster.on('exit', (worker, code, sig) => {
      p('Worker ' + worker.process.pid + 'is gone. Code:' + code + ' Signal:' + sig);
      p('Forking...');
      cluster.fork();
    })
  }
  else launch();
}

/**
 * entrance point
 */
(function(){
  validateArgs();
  args.cluster ? crusterItUp() : launch();
})();
