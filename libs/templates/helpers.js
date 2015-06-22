var Handlebars = require('handlebars');

Handlebars.registerHelper('name', function() {
	if (this.name) return this.name;

	return this.names[0];
});

Handlebars.registerHelper('description', function() {
	if (this.description) return this.description;

	return this.descriptions[0];
});
