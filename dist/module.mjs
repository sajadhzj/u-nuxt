import { defineNuxtModule, createResolver, addPlugin, addImportsDir } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "u-nuxt",
    configKey: "u-nuxt"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsDir(resolver.resolve("./runtime/composables"));
    nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
  }
});

export { module as default };
