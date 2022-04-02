<template >
  <div>
    <WButton>button</WButton>
    <WButton type="primary" :onClick="click">primary</WButton>
    <WButton type="success">info</WButton>
    <WButton type="info">info</WButton>
    <WButton type="warning">warning</WButton>
    <WButton type="error">error</WButton>
  </div>
</template>
<script setup lang="ts">
import { WButton } from '..';
const click = () => {
  console.log('click');
}

</script>
<style >
</style>