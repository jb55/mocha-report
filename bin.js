#!/usr/bin/env node

var parse = require('JSONStream').parse.bind(null, false);
var Mocha = require('mocha');
var mocha = new Mocha
var report = require('./');

var argv = process.env;
var reporter = process.argv[2];

if (!reporter) return usage();

var Reporter = mocha.reporter(reporter)._reporter;
var stream = process.stdin.pipe(parse())
report(stream, Reporter);

function usage() {
  console.log("usage: mocha-report <reporter>");
  console.log("");
  console.log("examples");
  console.log("");
  console.log("Simple run");
  console.log("    mocha -R json-stream | mocha-report spec");
  console.log("");
  console.log("Run multiple");
  console.log("    mocha -R json-stream > run; <run mocha-report htmlcov > cov.html; \\");
  console.log("                                <run mocha-report spec");
}
