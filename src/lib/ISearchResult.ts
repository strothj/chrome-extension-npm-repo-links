export interface ISearchResult {
  /**
   * The NPM package name.
   */
  packageName: string;

  /**
   * The search result containing div.
   */
  container: Element;

  /**
   * The search result tool div.
   */
  toolContainer: Element;
}
