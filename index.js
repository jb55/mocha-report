
var JsonTest = require('./lib/test')
var EventEmitter = require('events').EventEmitter;

// json-stream sink
module.exports = function(stream, Reporter) {
  var runner = new EventEmitter();
  var reporter;
  stream.on('data', function(obj){
    var event = obj[0];
    var data = obj[1];

    switch (event) {
      case 'start':
        runner.total = data.total;
        reporter = new Reporter(runner)
        runner.emit('start', data)
        break;
      case 'pass':
        runner.emit('pass', new JsonTest(data))
        break;
      case 'fail':
        var err = { message: "mocha-report: errors not yet implemented" }
        runner.emit('fail', new JsonTest(data), err)
        break;
      case 'end':
        reporter.stats = data
        runner.emit('end', data)
        break;
      default:
        runner.emit(event, data)
    }
  });
}

