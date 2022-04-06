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
    <p>disabled</p>
    <div class="block">
      <WButton disabled type="primary" :onClick="click">primary</WButton>
      <WButton disabled type="success">success</WButton>
      <WButton disabled type="info">info</WButton>
      <WButton disabled type="warning">warning</WButton>
      <WButton disabled type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="secondary" type="primary" :onClick="click">primary</WButton>
      <WButton disabled level="secondary" type="success">success</WButton>
      <WButton disabled level="secondary" type="info">info</WButton>
      <WButton disabled level="secondary" type="warning">warning</WButton>
      <WButton disabled level="secondary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="tertiary" type="primary" :onClick="click">primary</WButton>
      <WButton disabled level="tertiary" type="success">success</WButton>
      <WButton disabled level="tertiary" type="info">info</WButton>
      <WButton disabled level="tertiary" type="warning">warning</WButton>
      <WButton disabled level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="quaternary" type="primary" :onClick="click">primary</WButton>
      <WButton disabled level="quaternary" type="success">success</WButton>
      <WButton disabled level="quaternary" type="info">info</WButton>
      <WButton disabled level="quaternary" type="warning">warning</WButton>
      <WButton disabled level="quaternary" type="error">error</WButton>
    </div>
    <p>loading</p>
    <div class="block">
      <WButton loading type="primary" :onClick="click">primary</WButton>
      <WButton loading type="success">success</WButton>
      <WButton loading type="info">info</WButton>
      <WButton loading type="warning">warning</WButton>
      <WButton loading type="error">error</WButton>
    </div>

    <div class="block">
      <WButton loading level="secondary" type="primary" :onClick="click">primary</WButton>
      <WButton loading level="secondary" type="success">success</WButton>
      <WButton loading level="secondary" type="info">info</WButton>
      <WButton loading level="secondary" type="warning">warning</WButton>
      <WButton loading level="secondary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton loading level="tertiary" type="primary" :onClick="click">primary</WButton>
      <WButton loading level="tertiary" type="success">success</WButton>
      <WButton loading level="tertiary" type="info">info</WButton>
      <WButton loading level="tertiary" type="warning">warning</WButton>
      <WButton loading level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton loading level="quaternary" type="primary" :onClick="click">primary</WButton>
      <WButton loading level="quaternary" type="success">success</WButton>
      <WButton loading level="quaternary" type="info">info</WButton>
      <WButton loading level="quaternary" type="warning">warning</WButton>
      <WButton loading level="quaternary" type="error">error</WButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WButton } from '..';
import { message } from '../..';
const click = () => {
  message('click')
}

</script>
<style scoped>
.block {
  display: flex;
}
</style>