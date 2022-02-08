<template>
  <WMenu :routers="routers"></WMenu>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { WMenu } from '..';
const routers = ref([{ name: 'home', path: '', icon: '' }])


</script>