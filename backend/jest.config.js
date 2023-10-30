module.exports = {
  verbose: true,
  rootDir: __dirname,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@contexts/(.*)$': '<rootDir>/src/contexts/$1'
  },
  testEnvironment: "jest-environment-jsdom"
};