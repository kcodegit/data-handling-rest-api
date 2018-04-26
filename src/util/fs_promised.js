'use strict';

// imports
var Promise = require('bluebird'),
  FS = require('fs'),
  iconv = require('iconv-lite');
// variables
var _PR = e => Promise.resolve(e);

/**
 * checks if the file exists
 * @param { string } path
 * @return { Promise<boolean> } 
 */
exports.exists = path => new Promise((res, rej) => 
  FS.access(path, err => {
    if(err && (err.code === 'ENOENT')) {
      return res(false)
    }
    if(err) {
      return rej(err);
    }
    return res(true)
  }));

/**
 * deletes the file
 * @param { string } path
 * @returns { Promise }
 */
exports.deleteFile = path => new Promise((res,rej) => 
  FS.unlink(path, err =>  err ? rej(err) : res())
)

/**
 * opens the file
 * @param { string } path
 * @param { string } encoding
 * @returns { Promise<*> } opened file
 */
var open = (path, encoding='utf8') => new Promise((res, rej) => 
  FS.readFile(path, encoding, (err, data) => err ? rej(err) : res(data))
);
exports.open = open;

/**
 * opens the file and decode it to SJIS
 * @param { string } path
 * @returns { Promise<*> } 
 */
var openSjis = path => new Promise((res, rej) => 
  FS.readFile(path, (err, data) => {
    if(err) return rej(err);
    var sjis_data = iconv.decode(new Buffer(data, 'binary'), 'Shift_JIS');
    return res(sjis_data);
  })
);
exports.openSjis = openSjis;

/**
 * writes
 * @param { string } path
 * @param { string } data
 * @returns { Promise } 
 */
var write = (path, data) => new Promise((res, rej) => 
  FS.appendFile(path, data, err => err ? rej(err) : res())
);
exports.write = write;

/**
 * writes in SJIS
 * @param { string } path 
 * @param { string } data
 * @returns { Promise } 
 */
var writeSjis = (path, data) => new Promise((res, rej) => {
  var sjis_data = iconv.encode(data, 'Shift_JIS');
  return FS.appendFile(path, sjis_data, err => err ? rej(err) : res())
});
exports.writeSjis = writeSjis;

/**
 * overwrites 
 * @param { string } path
 * @param { string } data
 * @returns { Promise } 
 */
var overWrite = (path, data) => new Promise((res, rej) => 
  FS.writeFile(path, data, err => err ? rej(err) : res())
);
exports.overWrite = overWrite;

/**
 * gets all the file names from the directory
 * pass a callback function that takes one string argument and returns boolean
 * e.g. s => s.indexOf(0) != '.'
 * @param { string } path
 * @param { function } func
 * @returns { Promise<Array<string>> } 
 */
var getFileNames = (path, func) => new Promise((res, rej) => 
  FS.readdir(path, (err, files) => err ? rej(err) : res(files.filter(func)))
);
exports.getFileNames = getFileNames;