<template >
  <div :style="style">
    <ImageShip :s="'这里是foo的传参'" @xxx-xxx="() => {
      log('这是foo组件的事件监听')
    }"></ImageShip>
  </div>
  <div :style="wtsc.add.height(px(100)).out()">这里是foo的内容</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { ImageShip } from "./com";
import { wtsc } from '../..';
import { PE, px, s } from '@wormery/wtsc';

const style = computed(() => wtsc.add.height(px(300)).add.width(px(300)).out())

const log = console.log.bind(console)

</script>
<style lang="">
  
</style>