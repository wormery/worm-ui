<script lang="ts" setup>
const prop = withDefaults(defineProps<{
  title?: string | undefined,
  content: string | undefined,
  coverImg?: string | undefined,
  borderRadius?: string,
  width?: string,
  height?: string,
}>(), {
  title: undefined,
  content: undefined,
  coverImg: undefined,
  borderRadius: "10px",
  width: "300px",
  height: "auto",
})
const { width, height, borderRadius, coverImg, title } = toRefs(prop)
const cardRef: Ref<any> = ref(null);

const { bgColor } = toRefs({ bgColor: "#ededef" })

const slots = toRefs(useSlots());

import { isNumber, isString, isNotUndef, isTure } from "@wormery/utils";

import { computed, Ref, ref, StyleValue, toRef, toRefs, useSlots } from "vue";

import { filterUrl, getUnit, toNumber, toPX } from "../../../utils/utils";

import { wtsc } from "../../../utils/wtsc";

import module from "./style/index.module.less"

const cardStyle = computed(() => {
  wtsc.clear()

  wtsc
    .add.display("flex")
    .add.flexDirection("column")
    .add.width(width.value)
    .add.height(toPX(height.value))
    .add.backgroundColor(bgColor.value)
    .add.borderRadius(borderRadius.value)
    .add.boxShadow("0px 1px 2px #000000aa")
    .add.overflow("hidden")

  return wtsc.return() as StyleValue;
})

const contentPlopStyle = computed(() => {
  wtsc.clear()

  wtsc.add.margin("1rem")
    .add.fontSize("1rem")
    .add.flexGrow("0")

  return wtsc.return() as StyleValue
})

const coverImgStyle = computed(() => {
  wtsc.clear()

  wtsc
    .add.height("100%")
    .add.width("100%")
    .add.backgroundImage(`url(${coverImg.value})`)
    .add.backgroundPosition("center")
    .add.backgroundSize("cover")
    .add.backgroundRepeat("no-repeat")

  return wtsc.return() as StyleValue;
})

const coverStyle = computed(() => {
  wtsc.clear()
  wtsc.add.flexGrow("1")

  if (isNotUndef(coverImg.value) && (height.value == "auto" || width.value.endsWith("%"))) {
    const cordWidth = cardRef?.value?.offsetWidth;
    if (isNumber(cordWidth)) {
      wtsc
        .add.height(toPX(cordWidth * 0.618))
        .add.width(width.value)
    }
  }

  return wtsc.return() as StyleValue;
})


const titleHStyle = computed(() => {
  wtsc.clear()

  wtsc
    .add.fontSize("1.3em")

  return wtsc.return() as StyleValue
})

const titleStyle = computed(() => {
  wtsc.clear();

  wtsc.add.flexGrow("0")
    .add.margin("0px 1rem")

  return wtsc.return() as StyleValue;
})
</script>

<template>
  <div class="w-card" ref="cardRef" :class="module.card" :style="cardStyle">
    <div v-if="isTure(slots.cover) || isString(coverImg)" class="cover" :style="coverStyle">
      <slot name="cover">
        <div v-if="isNotUndef(coverImg)" :style="coverImgStyle" class="coverImg"></div>
      </slot>
    </div>
    <div v-if="!!slots.title || isString(title)" class="title" :style="titleStyle">
      <slot name="title">
        <h4
          class="titleh1"
          :class="module.title"
          :style="titleHStyle"
          v-if="isString(title)"
        >{{ title }}</h4>
      </slot>
    </div>
    <div v-if="!!slots.default || isString(content)" class="content" :style="contentPlopStyle">
      <slot>
        <div v-if="isString(content)" class="content-slot">{{ content }}</div>
      </slot>
    </div>
  </div>
</template>