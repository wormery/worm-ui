<script lang="ts" setup>
import {WPagination}  from '../'
</script>

<template>
  <div>
   <WPagination :total='10' :pageSlot="0" ></WPagination> 
   <WPagination :total='10' :pageSlot="1" ></WPagination> 
   <WPagination :total='10' :pageSlot="2" ></WPagination> 
   <WPagination :total='10' :pageSlot="5" ></WPagination> 
  </div>
</template>

<style>
  
</style>