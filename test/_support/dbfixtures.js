var execSync = require('child_process').execSync;
var fs = require('fs');
var sys = require('sys');

module.exports = {
  drop: drop,
  load: load,
  set: set,
};

var filepaths;
var dirpath = __dirname + '/../_data';

function set() {
  if (!arguments.length) {
    reset();
  }

  filepaths = [];
  Array.prototype.forEach.call(arguments, function(filename) {
    var filepath = dirpath + '/' + filename + '.mongo';
    filepaths.push(filepath);
  });
}

function reset() {
  filepaths = [];
  fs.readdirSync(dirpath).forEach(function(filename) {
    var filepath = dirpath + '/' + filename;
    filepaths.push(filepath);
  });
}

function drop() {
  var command =
      'mongoimport --host=127.0.0.1 --db arslinguis ' +
      '--collection main --drop /dev/null';

  execSync(command);
}

function load() {
  if (arguments.length) {
    set.apply(null, arguments);
  }

  drop();

  if (!filepaths) {
    reset();
  }
  filepaths.forEach(loadFixtureFile);
}

function loadFixtureFile(filepath) {
  var command =
    'mongoimport --host=127.0.0.1 --db arslinguis --collection main ' +
    filepath ;

  execSync(command);
}
