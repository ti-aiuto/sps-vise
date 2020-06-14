module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig_jest.json"
    }
  },
};
