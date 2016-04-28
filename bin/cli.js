#! /usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var ItakoTextReaderSimplayer = require('../lib/index');
var Promise = require('bluebird');

var itako = new ItakoTextReaderSimplayer('text');

var token = {
  value: process.argv.slice(2).join().toString()
};

var token = {};
if (process.argv.length == 2) {
  var rl = require('readline').createInterface(
    process.stdin, process.stdout
  );

  var promises = [];
  rl.on('line', (line) => {
    token = { value: line };
    promises.push(itako.read(token));
  });
  Promise.race(promises).then(() => {});

} else {
  token = {
    value: process.argv.slice(2).join().toString()
  };
  itako.read(token).then(() => {});
}

