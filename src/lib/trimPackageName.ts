/**
 * Trim the result package name. The raw package name may contain extraneous
 * URL segments or query strings.
 *
 * Ex:
 * yalc/v/1.0.0-pre.22 -> yalc
 * yalc/v/1.0.0-pre.22?activeTab=versions -> yalc
 * @babel/core/v/7.0.0?activeTab=versions -> @babel/core
 *
 * @param rawPackageName Package name captured from anchor element without
 * leading "https://www.npmjs.com/package/".
 */
export const trimPackageName = (rawPackageName: string): string => {
  const queryIndex = rawPackageName.indexOf("?");
  let packageName = rawPackageName.slice(
    0,
    queryIndex > -1 ? queryIndex : undefined,
  );

  const segments = packageName.split("/");
  packageName = segments
    .slice(0, segments[0].charAt(0) === "@" ? 2 : 1)
    .join("/");

  return packageName;
};
