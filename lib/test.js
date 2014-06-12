
var Test = require('mocha').Test;
var inherits = require('util').inherits;

module.exports = JsonTest;

function JsonTest(test) {
  this.err = {
    name: "NotImplementedError",
    message: "mocha-report: not yet implemented"
  }
  Test.call(this, test.title)
  this.err = {
    name: "NotImplementedError",
    message: "mocha-report: not yet implemented"
  }
  this.duration = test.duration;
  this.jsontest = test;
  this.parent = { fullTitle: function(){ return ""; } }
}

JsonTest.prototype.fullTitle = function() {
  return this.jsontest.fullTitle;
}

inherits(JsonTest, Test)
