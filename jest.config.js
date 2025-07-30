
module.exports = {
  // Use ts-jest preset for TypeScript transformation
  preset: "ts-jest",
  // Specify the test environment
  testEnvironment: "node",
  // Define where Jest should look for test files
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  // Define file extensions Jest should process
  moduleFileExtensions: ["ts", "js", "json", "node"],
  // Explicitly tell Jest to transform .ts files using ts-jest
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // Ignore node_modules for transformation, except if specific modules need it
  transformIgnorePatterns: ["/node_modules/"],
  // Module name mapper for resolving paths (useful for aliases, though not strictly needed here)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Example alias if you were using them
  },
};
