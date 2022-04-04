<template>
  <div>
    <mavonEditor
      v-model="value"
      :boxShadowStyle="false"
      :toolbarsFlag="false"
      :subfield="false"
      :defaultOpen="'preview'"
      :editable="false"
    ></mavonEditor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

let { mavonEditor } = MavonEditor

const value = ref('Loading...')

fetch('../README.md')
  .then(res =>
    res.text().then(text => {
      value.value = text;
    })
  );
</script>
<style >
</style>