<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { WMenu, WTopBar, wtsc, the } from "../src";
import { routes, router } from "./router";
import "ionicons";
import { height, backgrountColor } from "../src/Magic/src/status";

const routers = computed(() => {
  return routes as any;
});

watchEffect(() => {
  const w = wtsc.add
    .backgroundColor(the.commonly.backgroundColor)
    .selector("body")
    .out();
});
</script>

<template>
  <div class="container">
    <div class="bar">
      <WTopBar></WTopBar>
    </div>
    <div class="body">
      <div class="left">
        <WMenu
          :routers="routers"
          @menu-click="
            (e) => {
              router.push(e.path);
            }
          "
        ></WMenu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .bar {
    z-index: 10;
    flex-grow: 0;
  }
  .body {
    position: relative;
    display: flex;
    height: 100%;
    flex-grow: 1;

    .left {
      flex-grow: 0;
      height: 100%;
    }
    .right {
      flex-grow: 1;
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>
