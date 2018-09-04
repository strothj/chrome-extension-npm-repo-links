(() => {
  // Add a script tag to load our code from an ECMAScript module.
  const script = document.createElement("script");
  script.src = chrome.extension.getURL("js/content-script-module.js");
  script.type = "module";
  document.head.appendChild(script);
})();
