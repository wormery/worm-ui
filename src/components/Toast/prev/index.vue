<template>
  <WButton :onClick="() => toast('这是你的第' + ++count + '个toast')">已点击{{ count }}次</WButton>
</template>
<script lang="ts" setup>

import { toast } from "../index";
import { WButton } from '../../';
import { ref } from 'vue';
const count = ref(0)

toast('hello')

</script>
<style lang=""></style>
