String.prototype.toPlural = function() {
	if (this.isPlural()) return this;
	return this + 's' ;
};

String.prototype.toSingular = function() {
	if (!this.isPlural()) return this;
	return this.slice(0, -1);
};

String.prototype.isPlural = function() {
	return this[this.length - 1] === 's';
};

