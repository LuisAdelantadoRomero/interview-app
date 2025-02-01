module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['./setup.jest.js'],
  globals: {
    Uint8Array: Uint8Array,
  },
  transformIgnorePatterns: [],
};