
var assert = require('assert')
var spawn = require('child_process').spawn;
var reduce = require('stream-reduce');
var parse = require('JSONStream').parse.bind(null, false);

var array = function() {
  return reduce(function(acc, obj){
    acc.push(obj);
    return acc;
  }, []);
}

describe('mocha-report', function(){
  it('outputs identical json-stream report', function(done){
    var bin = spawn('./bin.js', ['json-stream'])
    var data = [
      ["start", {total: 1}],
      ["pass", {
        title: "it should work",
        fullTitle: " it should work",
        duration: 0
      }],
      ["end", {
        tests: 0,
        suites: 0,
        passes: 1,
        pending: 0,
        failures: 0,
      }],
    ]

    data.forEach(function(obj){
      bin.stdin.write(JSON.stringify(obj) + "\n");
    });
    bin.stdin.end()

    bin.stderr
    .pipe(reduce(function(acc, str){
      acc += str.toString('utf8');
      return acc;
    }, ""))
    .on('data', function(out, out2){
      if (!out) return;
      done(new Error(out))
    });

    bin.stdout
    .pipe(parse())
    .pipe(array())
    .on('data', function(parsedData){
      assert.deepEqual(data[0], parsedData[0]);
      assert.deepEqual(data[1], parsedData[1]);
      done();
    });
  });
});
