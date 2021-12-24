<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import SildingSwitchingVue from "./components/@SlidingSwitching";
import type { ControlType } from "./components/@SlidingSwitching";
import Test from "./test.vue"

let control: ControlType | null = null;

onMounted(() => {
  // console.log(control);
  setTimeout(() => {
    control?.toRight(Test);
  }, 0);
})
const outControl = function (e: ControlType) {
  control = e;
}
</script>


<template>
  <div class="app">
    <SildingSwitchingVue @control="outControl($event as ControlType)">
      <div class="img"></div>
    </SildingSwitchingVue>
  </div>
</template>

<style scoped>
.img {
  height: 100%;
  width: 100%;
  background: url(./assets/443676.jpg);
  background-position: center;
  background-size: cover;
}
.app {
  height: 100vh;
  width: 100vw;
  background-color: #eddd9e;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
