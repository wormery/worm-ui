<template>
  <div class="type-writing">
    {{str}}
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

const { str } = toRefs(defineProps<{ str: string }>())

</script>
<style lang="scss">
.type-writing {
  
}
</style>