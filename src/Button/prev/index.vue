<template >
  <div>
    <WButton>button</WButton>

    <div class="block">
      <WButton type="primary" :onClick="click">primary</WButton>
      <WButton type="success">success</WButton>
      <WButton type="info">info</WButton>
      <WButton type="warning">warning</WButton>
      <WButton type="error">error</WButton>
    </div>

    <div class="block">
      <WButton level="secondary" type="primary" :onClick="click">primary</WButton>
      <WButton level="secondary" type="success">success</WButton>
      <WButton level="secondary" type="info">info</WButton>
      <WButton level="secondary" type="warning">warning</WButton>
      <WButton level="secondary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton level="tertiary" type="primary" :onClick="click">primary</WButton>
      <WButton level="tertiary" type="success">success</WButton>
      <WButton level="tertiary" type="info">info</WButton>
      <WButton level="tertiary" type="warning">warning</WButton>
      <WButton level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton level="quaternary" type="primary" :onClick="click">primary</WButton>
      <WButton level="quaternary" type="success">success</WButton>
      <WButton level="quaternary" type="info">info</WButton>
      <WButton level="quaternary" type="warning">warning</WButton>
      <WButton level="quaternary" type="error">error</WButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WButton } from '..';
const click = () => {
  console.log('click');
}

</script>
<style scoped>
.block {
  display: flex;
}
</style>