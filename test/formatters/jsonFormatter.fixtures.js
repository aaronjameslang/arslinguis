var fixtures = module.exports = [];

fixtures.mimeTypes = ['application/json'];

fixtures.push({
	mimeType: 'application/json',
	input: {},
	output: '{}'
});

fixtures.push({
	mimeType: 'application/json',
	input: {
		id: 'NxnUdW4E9fXsx3anebETRCdMkutUWpkF',
		name: 'Adam',
		age: 32
	},
	output: '{"id":"NxnUdW4E9fXsx3anebETRCdMkutUWpkF","name":"Adam","age":32}'
});
