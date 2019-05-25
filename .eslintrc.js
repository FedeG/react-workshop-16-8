module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  globals: {
    document: true
  },
  env: {
    browser: true
  },
  overrides: [{
    files: [
      "**/*.test.js",
      "**/*.test.jsx"
    ],
    globals: {
      document: true
    },
    env: {
      jest: true,
      browser: true
    },
    plugins: ["jest"],
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }]
}
