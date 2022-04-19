import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vitePluginMd2Vue from "./plunins/vitePluginMd2Vue";
import fs from "fs";
import path from "path";

var res = fs.readFileSync(path.resolve(__dirname, "../README.md"));

let content = "`\n";
content += res.toString();
content += "`";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vitePluginMd2Vue()],
  root: "../docs",
  define: {
    __README_MD__: JSON.stringify(content),
    __DEV__: "true",
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "wtsc-ui",
    },
  },
});
