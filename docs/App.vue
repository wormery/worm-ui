<script setup lang="ts">
import { computed } from "vue";
import { WMenu } from "../src";
import { routes, router } from "./router";
import "ionicons";

const routers = computed(() => {
  return routes as any;
});
const log = console.log.bind(console)
</script>

<template>
  <div class="container">
    <div class="left">
      <WMenu :routers="routers" @menu-click="(e) => {
        router.push(e.path)
      }"></WMenu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;

  .left {
    flex-grow: 0;
  }
  .right {
    flex-grow: 1;
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>
