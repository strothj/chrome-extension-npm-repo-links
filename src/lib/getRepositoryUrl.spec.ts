import { getRepositoryUrl } from "./getRepositoryUrl";

const tests = [
  ["npm/npm", "https://github.com/npm/npm"],
  ["github:user/repo", "https://github.com/user/repo"],
  [
    "git+https://github.com/mengxiong10/vue2-datepicker.git",
    "https://github.com/mengxiong10/vue2-datepicker",
  ],
];

it("returns expected repository urls", () => {
  tests.forEach(([url, expected]) => {
    let result = getRepositoryUrl({ repository: url });
    expect(result).toBe(expected);

    result = getRepositoryUrl({ repository: { url } });
    expect(result).toBe(expected);
  });
});
