/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  testEnvironment: "@happy-dom/jest-environment"
};