module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverage: true,
  coverageReporters: ['text'],
};
