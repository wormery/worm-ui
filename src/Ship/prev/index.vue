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
      <ImageShip :s="'这里是主组件的传参'" @xxx-xxx="handle">
        <span>这是一个主内容的插槽</span>
      </ImageShip>
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
import { message } from '../..';
const f = ref(true)
const handle = () => {
  message('这是index的事件监听', 'primary')
}

const style = computed(() => wtsc.add.height(px(200)).add.width(px(200)).out())

</script>
  