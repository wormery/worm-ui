import { createApp } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import wui from "../src";
import { router } from "./router/index";

const app = createApp(App);
app.use(wui);
app.use(router);
app.mount("#app");
