<template >
  <WButton @click="f = !f">点击以切换</WButton>
  <div v-if="f">
    我是主
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="wtsc.add.height(px(100)).out()">这里是主组件的内容</div>
    <div :style="style">
      <ImageShip :s="'这里是主组件的传参'" @xxx-xxx="() => { log('这里是主组件的事件监听') }"></ImageShip>
    </div>
  </div>
  <div v-else>
    <Foo></Foo>
  </div>
</template>
<script setup lang="ts">import { computed, ref } from 'vue';
import { wtsc } from '../..';
import { ImageShip } from "./com";
import { px } from '@wormery/wtsc';
import WButton from '../../Button/index';
import Foo from './Foo.vue'
const f = ref(true)
const log = console.log.bind(console)

const style = computed(() => wtsc.add.height(px(200)).add.width(px(200)).out())

</script>
  