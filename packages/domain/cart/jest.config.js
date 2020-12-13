const base = require('../../../jest.config')

module.exports = {
  ...base,
  testMatch: [
    '<rootDir>/__tests__/**/*.spec.ts'
  ],
}
