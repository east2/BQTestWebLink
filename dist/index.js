"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const defaultId = document.getElementById("default-id");
    if (defaultId) {
      defaultId.onclick = function() {
        const fn = document.getElementById("field-name-notsure");
        if (fn) {
          fn.value = "a new test";
          try {
            alert("in try.");
            throw new Error("too dumb");
          } catch (error) {
            alert(error.stack);
          }
        }
      };
    }
  });
})();
//# sourceMappingURL=index.js.map
