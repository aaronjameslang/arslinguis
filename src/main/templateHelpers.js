var Handlebars = require('handlebars');

Handlebars.registerHelper('name', function() {
	if (this.name) return this.name;

	return this.names[0];
});
