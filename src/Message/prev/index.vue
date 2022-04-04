<template >
  <div>
    <!-- <button @click="message('33')">点我发送消息</button> -->
    <WButton :onclick="() => message('这是一条测试消息')">默认消息</WButton>
    <WButton type="primary" :onclick="() => message('这是一条primary消息', 'primary')">primary</WButton>
    <WButton type="success" :onclick="() => message('这是一条成功消息', 'success')">success</WButton>
    <WButton type="info" :onclick="() => message('这是一条消息', 'info')">info</WButton>
    <WButton type="warning" :onclick="() => message('这是一条警告消息', 'warning')">warning</WButton>
    <WButton type="error" :onclick="() => message('这是一条错误消息', 'error')">error</WButton>
  </div>
</template>
<script setup lang="ts">
import { message } from '../index'
import { WButton } from '../../index';
setTimeout(() => {

  message('欢迎使用messages')
})
</script>
<style lang="">
  
</style>