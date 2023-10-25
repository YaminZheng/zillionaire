import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueMacros from "unplugin-vue-macros/vite";
import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    UnoCSS(),
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    Components({
      dirs: ["src/components/base"],
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
});
