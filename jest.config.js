const algorithm = process.env.QUIXBUGS_ALGORITHM;
const variant = process.env.QUIXBUGS_VARIANT || 'correct';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverage: process.env.QUIXBUGS_COVERAGE === '1',
  collectCoverageFrom: algorithm ? [`src/functions/${algorithm}.ts`] : [],
  coverageDirectory: process.env.QUIXBUGS_COVERAGE_DIR || 'coverage',
  coverageReporters: ['json'],
  moduleNameMapper: variant === 'buggy'
    ? {
        ...(algorithm ? { [`^\\.\\./functions/${algorithm}$`]: `<rootDir>/src/functions-buggy/${algorithm}.ts` } : {}),
        '^\\.\\./funcoes$': '<rootDir>/src/funcoes.buggy.ts',
      }
    : {},
};
