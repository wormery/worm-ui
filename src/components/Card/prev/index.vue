<template >
  <div class="content">
    <WCard :title="'标题'" :content="'内容'" :cover-img="'./src/assets/logo.png'"></WCard>
  </div>
</template>
<script lang="ts" setup>import { WCard } from '..';


</script>
<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>