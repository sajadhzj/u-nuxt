import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "u-nuxt",
    configKey: "uNuxt",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    _nuxt.options.css.push(
      resolver.resolve("./runtime/assets/styles/main.css"),
    );
    _nuxt.hook("vite:extend", async ({ config }) => {
      console.log("in vite");
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin());
    });

    _nuxt.hook("nitro:config", async (nitro: any) => {
      nitro.publicAssets.push({
        dir: resolver.resolve("./runtime/assets"),
      });
    });

    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      prefix: "U",
    });
    addImportsDir(resolver.resolve("./runtime/composables"));
    addImportsDir(resolver.resolve("./runtime/stores"));
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
