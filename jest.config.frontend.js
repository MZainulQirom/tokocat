const { createDefaultPreset } = require("ts-jest");

const tsJest = createDefaultPreset();

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom",

  transform: {
    ...tsJest.transform,
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  testMatch: ["<rootDir>/app/page/**/*.test.tsx"],
};