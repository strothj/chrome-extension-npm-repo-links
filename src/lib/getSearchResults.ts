import { ISearchResult } from "./ISearchResult";
import { trimPackageName } from "./trimPackageName.js";

/**
 * Scan the Google search results for results linking to npmjs.com packages.
 * Returns the found package names.
 */
export const getSearchResults = (): ISearchResult[] => {
  const results: ISearchResult[] = [];

  Array.from(document.querySelectorAll("#search .srg .g")).forEach(
    container => {
      const anchor = container.querySelector<HTMLAnchorElement>(".rc .r a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const match = /https:\/\/www\.npmjs\.com\/package\/(.*)/.exec(href);
      if (!match) return;

      if (match.length !== 2) return;
      const packageName = trimPackageName(match[1]);

      const toolContainer = container.querySelector(".s .f");
      if (!toolContainer) return;

      results.push({
        container,
        packageName,
        toolContainer,
      });
    },
  );

  return results;
};
