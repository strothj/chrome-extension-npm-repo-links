import { trimPackageName } from "./trimPackageName";

const tests: [string, string][] = [
  ["yalc/v/1.0.0-pre.22", "yalc"],
  ["yalc/v/1.0.0-pre.22?activeTab=versions", "yalc"],
  ["@babel/core/v/7.0.0?activeTab=versions", "@babel/core"],
];

it("returns the package name without trailing paths or query parameters", () => {
  tests.forEach(([url, expectedPackageName]) => {
    const packageName = trimPackageName(url);

    expect(packageName).toBe(expectedPackageName);
  });
});
