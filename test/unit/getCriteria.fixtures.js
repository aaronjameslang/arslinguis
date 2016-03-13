module.exports = exports = [];

exports.push({
  input: {
    url: '/user',
  },
  output: {
    collection: true,
    criteria: {
      type: 'user',
    },
  },
});

exports.push({
  input: {
    url: '/user/oOvzKAxzTyKJMOATwX08Kg',
  },
  output: {
    collection: false,
    criteria: {
      id: 'oOvzKAxzTyKJMOATwX08Kg',
    },
  },
});

exports.push({
  input: {
    url: '/user/oOvzKAxzTyKJMOATwX08Kg/language',
  },
  output: {
    collection: true,
    criteria: {
      type: 'language',
      userId: 'oOvzKAxzTyKJMOATwX08Kg',
    },
  },
});

exports.push({
  input: {
    url: '/user/oOvzKAxzTyKJMOATwX08Kg/language/Edo_qdoITyeOrRKFIuX1-w',
  },
  output: {
    collection: false,
    criteria: {
      id: 'Edo_qdoITyeOrRKFIuX1-w',
    },
  },
});

exports.push({
  input: {
    url: '/language/Edo_qdoITyeOrRKFIuX1-w',
  },
  output: {
    collection: false,
    criteria: {
      id: 'Edo_qdoITyeOrRKFIuX1-w',
    },
  },
});
