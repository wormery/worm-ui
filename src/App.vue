<script setup lang="ts">
import { ref, toRef } from "vue";
import { WMenu } from ".";
import { routes } from "./router";

const routers = ref(routes as any)
</script>



<template>
  <div class="container">
    <div class="left">
      <WMenu :routers="routers"></WMenu>
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
    flex-wrap: 0;
  }
  .right {
    flex-wrap: 1;
    position: relative;
  }
}
</style>
