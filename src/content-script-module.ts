import { getSearchResults } from "./lib/getSearchResults.js";
import { RepositoryResolver } from "./lib/RepositoryResolver.js";

const addLink = (packageName: string, href: string, toolContainer: Element) => {
  const anchor = document.createElement("a");
  anchor.href = href;

  const strong = document.createElement("strong");
  strong.innerText = "[repo] ";

  const text = document.createTextNode(packageName);

  anchor.appendChild(strong);
  anchor.appendChild(text);

  toolContainer.appendChild(anchor);
};

const results = getSearchResults();

const resolver = new RepositoryResolver(
  results.map(result => result.packageName),
);

results.forEach(result => {
  resolver.addSuccessHandler(result.packageName, repositoryUrl => {
    addLink(result.packageName, repositoryUrl, result.toolContainer);
  });
});

resolver.start();
