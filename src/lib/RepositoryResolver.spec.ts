// import { ISearchResult } from "./ISearchResult";
import { RepositoryResolver } from "./RepositoryResolver";

let mockFetch: jest.Mock<{}>;

const tests: { packageName: string }[] = [{ packageName: "babel-core" }];

const createResolver = () => {
  const resolver = new RepositoryResolver(tests.map(test => test.packageName));
  return {
    start: () => resolver.start(mockFetch),
  };
};

beforeEach(() => {
  let call = -1;

  mockFetch = jest.fn().mockImplementation(() => {
    call += 1;

    return Promise.resolve({
      ok: true,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            repository: `https://www.github.com/${tests[call].packageName}`,
          }),
        ),
    });
  });
});

it("calls fetch for each result", async () => {
  const resolver = createResolver();
  await resolver.start();

  expect(mockFetch).toHaveBeenCalledTimes(tests.length);
});

// TODO: Add test for calling success handler.
