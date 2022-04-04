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
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

let { mavonEditor } = MavonEditor

const value = __README_MD__
</script>
<style >
</style>