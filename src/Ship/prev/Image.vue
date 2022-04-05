<template lang="">
<WButton @click="()=>{onXxxXxx?.() }">{{s}}</WButton>
  <div :style="style">
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { wtsc } from '../..';
import { PE } from '@wormery/wtsc';
import WButton from '../../Button/index';

const props = defineProps<{ s: string, onXxxXxx?: () => void }>()


const { s, onXxxXxx } = toRefs(props)

console.log(props);

const style = computed(() => {
  return wtsc
    .add.height(PE(100))
    .add.width(PE(100))
    .add.backgroundImage(`url("/assets/logo.png")`)
    .add.backgroundPosition("center")
    .add.backgroundSize('cover')
    .out()
})

</script>
<style lang="">
  
</style>