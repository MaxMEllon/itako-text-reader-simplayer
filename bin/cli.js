#! /usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var join = require('path').join;
var ItakoTextReaderSimplayer = require('../lib/index');

var itako = new ItakoTextReaderSimplayer('text');

var token = {
  value: process.argv.slice(2).join().toString()
};

var token = {};
if (process.argv.length == 2) {
  var rl = require('readline').createInterface(
    process.stdin, process.stdout
  );

  rl.on('line', (line) => {
    token = { value: line };
    itako.read(token);
  })

} else {
  token = {
    value: process.argv.slice(2).join().toString()
  };
  itako.read(token);
}

