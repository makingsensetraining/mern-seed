module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(css|less|scss)$": "<rootDir>/tools/assetsTransformer.js"
  },
  setupFiles: [
    "raf/polyfill",
    "./tests/enzymeTestAdapterSetup.js",
    "jest-localstorage-mock",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/"
  ],
  notify: true,
  globals: {
    API_BASE_URL: 'http://localhost:3000/api'
  }
};
