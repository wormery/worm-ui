<template >
  <div :style="style">
    <ImageShip :s="'这里是foo的传参'" @xxx-xxx="() => {
      message('这是foo的事件监听', 'success')
    }">
      <span>这是foo的插槽</span>
    </ImageShip>
  </div>
  <div :style="wtsc.add.height(px(100)).out()">这里是foo的内容</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { ImageShip } from "./com";
import { wtsc } from '../..';
import { PE, px, s } from '@wormery/wtsc';
import { message } from '../..';

const style = computed(() => wtsc.add.height(px(300)).add.width(px(300)).out())
</script>
<style lang="">
  
</style>