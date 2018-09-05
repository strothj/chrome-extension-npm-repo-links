module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    // Remove ".js" file extension from relative imports. This is required
    // because we import modules with a trailing ".js" extension to support
    // working with ECMAScript modules in the browser.
    // This regex checks for import paths with a single or double leading ".".
    //
    // import { trimPackageName } from "./trimPackageName.js";
    // ->
    // import { trimPackageName } from "./trimPackageName";
    "(\\.+\\/)(.*)\\.js$": "$1$2",
  },
  setupFiles: ["<rootDir>/src/test-setup.ts"],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.test.json",
    },
  },
};
