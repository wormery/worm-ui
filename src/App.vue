<script setup lang="ts">
import { computed } from "vue";
import Cord from "./components/Cord/src/index.vue"
const imgStyle = computed(() => {
  return {
    height: "300px"
  }
})
</script>



<template>
  <div class="app">
    <div class="cord">
      <Cord height="100%" width="100%" title="标题">
        内容
        <template #cover>
          <img src="./assets/194619.jpg" :style="imgStyle" />
        </template>
      </Cord>
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
