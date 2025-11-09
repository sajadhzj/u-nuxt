import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addVitePlugin,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "u-nuxt",
    configKey: "u-nuxt",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));

    nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
  },
});
