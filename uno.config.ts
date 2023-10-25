import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    presetIcons(),
    // ...custom presets
  ],
});
