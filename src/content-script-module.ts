import { getSearchResults } from "./lib/getSearchResults.js";
import { ISearchResult } from "./lib/ISearchResult";

const log = (...message: any[]) => {
  // tslint:disable-next-line:no-console
  console.log("NPM to Github Search Results", ...message);
};

const addLink = (packageName: string, href: string, toolContainer: Element) => {
  const anchor = document.createElement("a");
  anchor.href = href;

  const strong = document.createElement("strong");
  strong.innerText = "[REPO] ";

  const text = document.createTextNode(packageName);

  anchor.appendChild(strong);
  anchor.appendChild(text);

  toolContainer.appendChild(anchor);
};

// Lookups to perform.
const lookups: Record<string, ISearchResult[]> = {};

const results = getSearchResults();

// Use each result to create a lookup request if it doesn't already exist for
// its package name. If a lookup already exists, append it to the array of
// search results to be processed after the lookup is complete.
results.forEach(result => {
  if (!lookups[result.packageName]) {
    lookups[result.packageName] = [];
  }

  lookups[result.packageName].push(result);
});

// Perform a single repository link lookup per package name.
// Add link buttons for each search result matching the finished repository
// lookup.
Object.keys(lookups).forEach(async key => {
  const query = lookups[key][0];

  try {
    const packageJsonRequest = await fetch(
      `https://unpkg.com/${query.packageName}/package.json`,
    );
    if (!packageJsonRequest.ok) {
      log("Request failed", query, packageJsonRequest.statusText);
    }

    const packageJson: { repository?: string | { url?: string } } = JSON.parse(
      await packageJsonRequest.text(),
    );

    let href: string;
    if (!packageJson.repository) return;

    if (typeof packageJson.repository === "string") {
      href = packageJson.repository;
    } else {
      if (!packageJson.repository.url) return;
      href = packageJson.repository.url;
    }

    if (!/https?:\/\//.test(href)) href = `https://github.com/${href}`;

    lookups[key].forEach(result => {
      addLink(result.packageName, href!, result.toolContainer);
    });
  } catch (e) {
    log("e", e);
  }
});
