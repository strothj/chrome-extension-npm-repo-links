export const getRepositoryUrl = (packageJson: unknown): string | null => {
  let url: string | null = null;
  if (isRepositoryString(packageJson)) url = packageJson.repository;
  if (isRepositoryObject(packageJson)) url = packageJson.repository.url;
  if (!url) return null;

  url = url.replace(/^git\+/, "");
  url = url.replace(/\.git$/, "");

  const githubShorthand = /^([\w\d]+)\/([\w\d]+)$/.exec(url);
  if (githubShorthand) {
    return `https://github.com/${githubShorthand[1]}/${githubShorthand[2]}`;
  }

  const github = /^github:([\w\d]+)\/([\w\d]+)$/.exec(url);
  if (github) {
    return `https://github.com/${github[1]}/${github[2]}`;
  }

  // TODO: Add the following:
  // https://docs.npmjs.com/files/package.json#repository
  // "repository": "gist:11081aaa281"
  // "repository": "bitbucket:user/repo"
  // "repository": "gitlab:user/repo

  return url;
};

const isRepositoryString = (
  packageJson: any,
): packageJson is { repository: string } => {
  if (typeof packageJson !== "object") return false;
  return typeof packageJson.repository === "string";
};

const isRepositoryObject = (
  packageJson: any,
): packageJson is { repository: { url: string } } => {
  if (typeof packageJson !== "object") return false;
  if (typeof packageJson.repository !== "object") return false;
  return typeof packageJson.repository.url === "string";
};
