import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vitePluginMd2Vue from "./plunins/vitePluginMd2Vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vitePluginMd2Vue()
  ],
  root: "../docs",
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "wtsc-ui",
    },
  },
});
