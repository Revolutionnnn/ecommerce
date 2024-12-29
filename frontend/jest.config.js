// jest.config.js

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "store/features/cartSlice.ts",
    "store/store.ts",
  ],

  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  coverageDirectory: "coverage",
};

module.exports = createJestConfig(customJestConfig);
