import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["u-nuxt", "@pinia/nuxt"],
  devtools: { enabled: true },
  compatibilityDate: "latest",
  app: {
    head: {
      htmlAttrs: {
        class: "bg-[#e1e1e1]",
      },
    },
  },
  uNuxt: {},
  css: [`~/assets/css/main.css`],
  vite: {
    plugins: [tailwindcss()],
  },
});
