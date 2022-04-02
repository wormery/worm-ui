import { createApp } from "vue";
import App from "./App.vue";
import { magic } from "./components/Magic/src/directive";
import { router } from "./router";

const app = createApp(App);
app.directive("magic", magic);
app.use(router);
app.mount("#app");
