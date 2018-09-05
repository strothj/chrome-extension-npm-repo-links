/* tslint:disable:no-object-literal-type-assertion */
type Chrome = typeof chrome;

// This is a setup for "content-script.ts".
global.chrome = {} as Chrome;
global.chrome.extension = {} as Chrome["extension"];
global.chrome.extension.getURL = (path: string) => path;

// This is here to force this to be a module so that we can augment the global
// scope.
export default "";

declare global {
  const global: { chrome: Chrome };
}
