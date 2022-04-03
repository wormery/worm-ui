<template >
  <div>
    <WInput v-model:value="value"></WInput>
    <span>新的value:{{ value }}</span>
  </div>
</template>
<script setup lang="ts">
import { WInput } from "../";
import { ref, watch } from 'vue';
const value = ref("hello");
watch(value, () => {
  console.log('value发生了更改');

})
</script>
<style lang="">
  
</style>