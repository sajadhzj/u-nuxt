import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  addComponent,
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

    nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};

    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsDir(resolver.resolve("./runtime/composables"));

    addComponent({
      name: "UCard",
      filePath: resolver.resolve("./runtime/components/Card"),
    });
    addComponent({
      name: "UIcon",
      filePath: resolver.resolve("./runtime/components/Icon"),
    });
    addComponent({
      name: "ULoading",
      filePath: resolver.resolve("./runtime/components/Loading"),
    });
    addComponent({
      name: "UButton",
      filePath: resolver.resolve("./runtime/components/Button"),
    });
    addComponent({
      name: "UInput",
      filePath: resolver.resolve("./runtime/components/Input"),
    });
  },
});
