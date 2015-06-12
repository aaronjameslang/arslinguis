module.exports = exports = [];

exports.push({
	input: {
		url: '/users'
	},
	output: {
		collection: true,
		criteria: {
			type: 'user',
		}
	}
});

exports.push({
	input: {
		url: '/users/oOvzKAxzTyKJMOATwX08Kg'
	},
	output: {
		collection: false,
		criteria: {
			id: 'oOvzKAxzTyKJMOATwX08Kg'
		}
	}
});

exports.push({
	input: {
		url: '/users/oOvzKAxzTyKJMOATwX08Kg/languages'
	},
	output: {
		collection: true,
		criteria: {
			type: 'language',
			userId: 'oOvzKAxzTyKJMOATwX08Kg'
		}
	}
});

exports.push({
	input: {
		url: '/users/oOvzKAxzTyKJMOATwX08Kg/languages/Edo_qdoITyeOrRKFIuX1-w'
	},
	output: {
		collection: false,
		criteria: {
			id: 'Edo_qdoITyeOrRKFIuX1-w'
		}
	}
});

exports.push({
	input: {
		url: '/languages/Edo_qdoITyeOrRKFIuX1-w'
	},
	output: {
		collection: false,
		criteria: {
			id: 'Edo_qdoITyeOrRKFIuX1-w'
		}
	}
});
