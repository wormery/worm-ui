<template>
  <div
    :style="wtsc.add.position('relative').add.height(PE(100)).add.width(PE(100)).add.borderRadius(px(10)).add.backgroundColor(rgb(200, 200, 200, .5)).out()"
  >
    <WButton @click="() => { onXxxXxx?.() }">{{ s }}</WButton>
    <div :style="style"></div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { wtsc } from '../..';
import { PE, rgb, px } from '@wormery/wtsc';
import WButton from '../../Button/index';

const props = defineProps<{ s: string, onXxxXxx?: () => void }>()


const { s, onXxxXxx } = toRefs(props)

const style = computed(() => {
  return wtsc
    .add.position('absolute')
    .add.top(px(0))
    .add.height(PE(100))
    .add.width(PE(100))
    .add.zIndex('-1')
    .add.backgroundImage(`url("/assets/logo.png")`)
    .add.backgroundPosition("center")
    .add.backgroundSize('cover')
    .out()
})

</script>
<style lang="">
  
</style>