// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    preset: "@shelf/jest-mongodb",
    testEnvironment: "node",
    coveragePathIgnorePatterns: [
      "/node_modules/"
    ]
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      verbose: true,
    };
  };