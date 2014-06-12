
var Test = require('mocha').Test;
var inherits = require('util').inherits;

module.exports = JsonTest;

function JsonTest(test) {
  Test.call(this, test.title)
  this.duration = test.duration;
  this.jsontest = test;
  this.parent = { fullTitle: function(){ return ""; } }
}

JsonTest.prototype.fullTitle = function() {
  return this.jsontest.fullTitle;
}

inherits(JsonTest, Test)
