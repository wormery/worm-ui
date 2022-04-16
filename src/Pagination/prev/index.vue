<script lang="ts" setup>
import { ref } from "vue";
import { WPagination } from "../";
import WInput from "../../Input/index";
const value1 = ref(3);
</script>

<template>
  <div>
    <WPagination v-model:page="value1" :total="10" :pageSlot="0"></WPagination>
    {{ value1 }}
    <WPagination :total="10" :pageSlot="1"></WPagination>
    <WPagination :total="10" :pageSlot="2"></WPagination>
    <WPagination :total="10" :pageSlot="5"></WPagination>
  </div>
</template>

<style></style>
