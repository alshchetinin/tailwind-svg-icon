import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";

export interface ModuleOptions {
  // dir: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-tailwind-svg-icon",
    configKey: "nuxtTailwindSvgIcon",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addComponent({
      name: "tailwind-svg-icon",
      global: true,
      filePath: resolve("./runtime/components/tailwind-svg-icon.vue"),
    });
  },
});
