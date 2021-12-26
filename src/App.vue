<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import type { DefineComponent } from "vue";
import SildingSwitchingVue from "./components/@SlidingSwitching";
import type { ControlType } from "./components/@SlidingSwitching";
import Test1 from "./test1.vue";
import Test from "./test.vue";

const Test3 = ref(Test);

let control: ControlType | null = null;

// onMounted(() => {
//   setTimeout(() => {
//     // Test3.value = Test1;
//     /
//   }, 3000);
// })
let xxx = false;
const clickright = function () {
  if (xxx) {
    xxx = !xxx;
    console.log("Test1");
    control?.toRight(Test);

  } else {
    xxx = !xxx;
    console.log("Test");
    control?.toRight(Test1);
  }

}
const clickleft = function () {
  control?.toLeft(Test1);
}

const outControl = function (e: ControlType) {
  control = e;
}

</script>



<template>
  <div class="app">
    <button @click="clickright">clickright</button>
    <SildingSwitchingVue :elem="Test" @control="outControl($event as ControlType)"></SildingSwitchingVue>
    <button @click="clickleft">clickleft</button>
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
