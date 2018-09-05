import { getSearchResults } from "./getSearchResults";
// import { ISearchResult } from "./ISearchResult";

const searchResultUrlPackageNameMap: [string, string][] = [
  ["https://www.npmjs.com/package/babel-core", "babel-core"],
  ["https://www.npmjs.com/package/@babel/core/v/7.0.0-beta.5", "@babel/core"],
];

const generatePageContents = (searchResultUrls: string[]) => {
  const html = `
    <div id="search">
      <div class="srg">
        ${searchResultUrls.map(
          searchResult => `
            <div class="g">
              <div class="rc">
                <h3 class="r">
                  <a href="${searchResult}">Search Result Description</a>
                </h3>
                <div class="s">
                  <div class="f"></div>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;

  document.body.innerHTML = html;
};

const getContainer = () => document.querySelector("#search .srg .g");
const getAnchor = () => document.querySelector("a");

beforeEach(() => {
  generatePageContents([searchResultUrlPackageNameMap[0][0]]);
});

it("returns no result if search result container doesn't exist", () => {
  let container = getContainer();
  expect(container).toBeTruthy();

  container!.remove();
  container = getContainer();
  expect(container).toBeNull();

  const results = getSearchResults();
  expect(results).toHaveLength(0);
});

it("returns no result if anchor element doesn't exist", () => {
  let anchor = getAnchor();
  expect(anchor).toBeTruthy();

  anchor!.remove();
  anchor = getAnchor();
  expect(anchor).toBeNull();

  const results = getSearchResults();
  expect(results).toHaveLength(0);
});

it('returns no result if anchor has no "href" attribute', () => {
  const anchor = getAnchor()!;
  expect(anchor.href).toBe(searchResultUrlPackageNameMap[0][0]);

  anchor.removeAttribute("href");
  expect(anchor.href).toBe("");

  const results = getSearchResults();
  expect(results).toHaveLength(0);
});

it("returns no result if link address does not point to package on npmjs.com", () => {
  generatePageContents(["https://www.google.com/"]);

  const results = getSearchResults();
  expect(results).toHaveLength(0);
});

it("returns expected package names from search results", () => {
  generatePageContents(searchResultUrlPackageNameMap.map(([url]) => url));

  const results = getSearchResults();
  expect(results).toHaveLength(searchResultUrlPackageNameMap.length);

  searchResultUrlPackageNameMap.forEach((searchResult, index) => {
    const result = results[index];
    expect(result.container).toBeTruthy();
    expect(result.toolContainer).toBeTruthy();
    expect(result.packageName).toBe(searchResult[1 /* packageName */]);
  });
});
