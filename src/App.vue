<script setup lang="ts">
import { computed } from "vue";
import Card from "./components/Card/src/index.vue"
const imgStyle = computed(() => {
  return {
    height: "300px"
  }
})
</script>



<template>
  <div class="app">
    <div class="cord">
      <Card height="100%" :cover-img="'/src/assets/logo.png'" width="100%" title="标题" content="内容"></Card>
    </div>
  </div>
</template>

<style scoped>
.cord {
  width: 300px;
}
.img {
  height: 100%;
  width: 100%;
  background: url(./assets/logo.png);
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
