module.exports = {
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@Curio/(.*)$': '<rootDir>/../packages/$1/src'
  },
  collectCoverageFrom: [
    "packages/**/src/**/*"
  ],
  rootDir: '../'
}