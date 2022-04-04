<template >
  <WDropDown :options="options" @Select="(handleSelect as any)">
    <WButton>hover触发</WButton>
  </WDropDown>

  <WDropDown trigger="click" :options="options" @Select="(handleSelect as any)">
    <WButton>点击触发</WButton>
  </WDropDown>

  <WDropDown trigger="manual" :options="options" @Select="(handleSelect as any)">
    <WButton>手动模式</WButton>
  </WDropDown>
</template>
<script setup lang="ts">
import { WDropDown } from '../'
import { message, WInput } from '../..';

const handleSelect = (key: string, label: string) => {

  message(`您点击了"${label}"按钮，它的key是"${key}"`, "success")

}
const options = [
  {
    label: "java",
    key: "java",
    disabled: true,
  },
  {
    label: "javascript",
    key: "javascript"
  }, {
    label: "c",
    key: "c"

  }
]
</script>
<style lang="">
  
</style>