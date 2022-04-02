<script setup lang="ts">
import { computed } from "vue";
import { WMenu } from ".";
import { routes } from "./router";
import "ionicons";
import { WMagic } from './components'
const routers = computed(() => {
  return routes as any;
});
</script>

<template>
  <WMagic></WMagic>
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
    flex-grow: 0;
  }
  .right {
    flex-grow: 1;
    position: relative;
    overflow-y: auto;
  }
}
</style>
