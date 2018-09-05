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

          const packageJson: {
            repository?: string | { url?: string };
          } = JSON.parse(await request.text());

          let href: string;
          if (!packageJson.repository) return;

          if (typeof packageJson.repository === "string") {
            href = packageJson.repository;
          } else {
            if (!packageJson.repository.url) return;
            href = packageJson.repository.url;
          }

          if (!/https?:\/\//.test(href)) href = `https://github.com/${href}`;

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
