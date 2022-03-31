<template>
  <div class="div">
    <test></test>
    <div class="image"></div>
  </div>
  <test1></test1>
</template>
<script lang="ts" setup>
import test1 from './testTsx'
</script>
<style scoped>
.div {
  height: 100%;
  min-width: 300px;
  width: 100%;
  min-height: 300px;
}
.image {
  height: 100%;
  min-width: 300px;
  width: 100%;
  min-height: 300px;
  background: url(./assets/194619.jpg);
  background-position: center;
  background-size: cover;
}
</style>
