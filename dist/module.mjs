import { createJiti } from "file:///C:/Users/slonz/Desktop/codes/unibas/package-u-nuxt/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "my-module": "C:/Users/slonz/Desktop/codes/unibas/package-u-nuxt"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/slonz/Desktop/codes/unibas/package-u-nuxt/src/module.js")} */
const _module = await jiti.import("C:/Users/slonz/Desktop/codes/unibas/package-u-nuxt/src/module.ts");

export default _module?.default ?? _module;