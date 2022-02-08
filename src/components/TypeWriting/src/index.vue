<template>
  <div class="type-writing">
    {{ str }}
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";

const prop = withDefaults(defineProps<{ str: string }>(), {
  str: "",
});
const { str } = toRefs(prop);
</script>
<style lang="scss" scoped>
.type-writing {
}
</style>
