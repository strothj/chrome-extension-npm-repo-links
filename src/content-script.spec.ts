import "./content-script";

it("creates script tag import", () => {
  const script = document.head.querySelector("script")!;
  expect(script).toBeTruthy();

  // test-setup.ts mirrors the parameter to "chrome.extension.getURL" back as
  // its return value. "content-script" uses it to retrieve the url from the
  // extension.
  expect(script.src.includes("js/content-script-module.js")).toBeTruthy();

  expect(script.type).toBe("module");
});
