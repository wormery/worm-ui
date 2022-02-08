import Home from "../Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { WCard } from "../prev";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
  { path: "/", name: "Home", icon: "home-outline", component: Home },
  { path: "/card", name: "card", icon: "card-outline", component: WCard },
];
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
