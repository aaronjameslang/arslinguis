exports.toPlural = function(string) {
  if (exports.isPlural(string)) return string;
  return string + 's' ;
};

exports.toSingular = function(string) {
  if (!exports.isPlural(string)) return string;
  return string.slice(0, -1);
};

exports.isPlural = function(string) {
  return string[string.length - 1] === 's';
};
