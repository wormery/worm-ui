<template>
  <div>
    <WButton>button</WButton>

    <div class="block">
      <WButton type="primary" :onClick="click">primary</WButton>
      <WButton type="success" :onClick="click">success</WButton>
      <WButton type="info" :onClick="click">info</WButton>
      <WButton type="warning" :onClick="click">warning</WButton>
      <WButton type="error" :onClick="click">error</WButton>
    </div>

    <div class="block">
      <WButton level="secondary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton level="secondary" type="success" :onClick="click"
        >success</WButton
      >
      <WButton level="secondary" type="info" :onClick="click">info</WButton>
      <WButton level="secondary" type="warning" :onClick="click"
        >warning</WButton
      >
      <WButton level="secondary" type="error" :onClick="click">error</WButton>
    </div>

    <div class="block">
      <WButton level="tertiary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton level="tertiary" type="success">success</WButton>
      <WButton level="tertiary" type="info">info</WButton>
      <WButton level="tertiary" type="warning">warning</WButton>
      <WButton level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton level="quaternary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton level="quaternary" type="success">success</WButton>
      <WButton level="quaternary" type="info">info</WButton>
      <WButton level="quaternary" type="warning">warning</WButton>
      <WButton level="quaternary" type="error">error</WButton>
    </div>
    <p>disabled</p>
    <div class="block">
      <WButton disabled type="primary" :onClick="click">primary</WButton>
      <WButton disabled type="success">success</WButton>
      <WButton disabled type="info">info</WButton>
      <WButton disabled type="warning">warning</WButton>
      <WButton disabled type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="secondary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton disabled level="secondary" type="success">success</WButton>
      <WButton disabled level="secondary" type="info">info</WButton>
      <WButton disabled level="secondary" type="warning">warning</WButton>
      <WButton disabled level="secondary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="tertiary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton disabled level="tertiary" type="success">success</WButton>
      <WButton disabled level="tertiary" type="info">info</WButton>
      <WButton disabled level="tertiary" type="warning">warning</WButton>
      <WButton disabled level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton disabled level="quaternary" type="primary" :onClick="click"
        >primary</WButton
      >
      <WButton disabled level="quaternary" type="success">success</WButton>
      <WButton disabled level="quaternary" type="info">info</WButton>
      <WButton disabled level="quaternary" type="warning">warning</WButton>
      <WButton disabled level="quaternary" type="error">error</WButton>
    </div>
    <p>loading</p>
    <div class="block">
      <WButton :loading="loading" type="primary" :onClick="handleLoading"
        >primary</WButton
      >
      <WButton :loading="loading" type="success" :onClick="handleLoading"
        >success</WButton
      >
      <WButton :loading="loading" type="info" :onClick="handleLoading"
        >info</WButton
      >
      <WButton :loading="loading" type="warning" :onClick="handleLoading"
        >warning</WButton
      >
      <WButton :loading="loading" type="error" :onClick="handleLoading"
        >error</WButton
      >
    </div>

    <div class="block">
      <WButton
        :loading="loading"
        level="secondary"
        type="primary"
        :onClick="handleLoading"
        >primary</WButton
      >
      <WButton :loading="loading" level="secondary" type="success"
        >success</WButton
      >
      <WButton :loading="loading" level="secondary" type="info">info</WButton>
      <WButton :loading="loading" level="secondary" type="warning"
        >warning</WButton
      >
      <WButton :loading="loading" level="secondary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton
        :loading="loading"
        level="tertiary"
        type="primary"
        :onClick="handleLoading"
        >primary</WButton
      >
      <WButton :loading="loading" level="tertiary" type="success"
        >success</WButton
      >
      <WButton :loading="loading" level="tertiary" type="info">info</WButton>
      <WButton :loading="loading" level="tertiary" type="warning"
        >warning</WButton
      >
      <WButton :loading="loading" level="tertiary" type="error">error</WButton>
    </div>

    <div class="block">
      <WButton
        :loading="loading"
        level="quaternary"
        type="primary"
        :onClick="handleLoading"
        >primary</WButton
      >
      <WButton :loading="loading" level="quaternary" type="success"
        >success</WButton
      >
      <WButton :loading="loading" level="quaternary" type="info">info</WButton>
      <WButton :loading="loading" level="quaternary" type="warning"
        >warning</WButton
      >
      <WButton :loading="loading" level="quaternary" type="error"
        >error</WButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { WButton } from "..";
import { message } from "../..";
import { HTMLAttributes, ref } from "vue";
import { isString } from "@wormery/utils";
const ret = /^<span>.*<\/span>$/;
const loading = ref(false);
const handleLoading = (e) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, Math.random() * 3000 + 500);
  click(e);
};
const click = (e) => {
  try {
    const msg = e.target.innerHTML;

    if (isString(msg) && ret.test(msg)) {
      message("您点击了按钮", /^<span>(.*)<\/span>$/.exec(msg)[1]);
    }

    if (/.*<.*|.*>.*/.test(msg)) {
      return;
    }

    message("您点击了按钮", msg);
  } catch {}
};
</script>
<style scoped>
.block {
  display: flex;
}
</style>
