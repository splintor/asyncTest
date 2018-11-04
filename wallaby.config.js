module.exports = () => ({
  files: [
    'src/*.ts'
  ],

  tests: [
    'test/*.ts'
  ],

  env: {
    type: 'node',
    runner: 'node'
  },

  reportUnhandledPromises: false,
  testFramework: 'jest'
});