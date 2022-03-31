<template>
  <input type="button" @click="() => toast('This is Toast' + count++)" value="点我" />
  {{ count }}
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useToast } from "..";
console.log('进入UseToast');
const count = ref(0);
const toast = useToast();

toast("你好啊");
</script>
<style lang=""></style>
