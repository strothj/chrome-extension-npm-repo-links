import { getRepositoryUrl } from "./getRepositoryUrl.js";

export class RepositoryResolver {
  private subscriptions: Record<
    string,
    {
      successHandlers: ((repositoryUrl: string) => void)[];
    }
  > = {};

  constructor(packageNames: string[]) {
    const subscriptions = this.subscriptions;

    packageNames.forEach(packageName => {
      if (!subscriptions[packageName]) {
        subscriptions[packageName] = {
          successHandlers: [],
        };
      }
    });
  }

  public start = (fetch = window.fetch) => {
    const packageNames = Object.keys(this.subscriptions);

    return Promise.all(
      packageNames.map(async packageName => {
        try {
          const request = await fetch(
            `https://unpkg.com/${packageName}/package.json`,
          );
          if (!request.ok) {
            throw new Error(request.statusText);
          }

          const packageJson: unknown = JSON.parse(await request.text());

          const href = getRepositoryUrl(packageJson);
          if (href === null) return;

          this.subscriptions[packageName].successHandlers.forEach(handler => {
            handler(href);
          });
        } catch {
          //
        }
      }),
    );
  };

  public addSuccessHandler = (
    packageName: string,
    handler: (repositoryUrl: string) => void,
  ) => {
    this.subscriptions[packageName].successHandlers.push(handler);
  };
}
