module.exports = {
  moduleNameMapper: {
    '^react-router-dom$': require.resolve('react-router-dom'),
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
};