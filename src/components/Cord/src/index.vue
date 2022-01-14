<script lang="ts" setup>
const prop = withDefaults(defineProps<{
  title?: string | undefined,
  coverImg?: string | undefined,
  borderRadius?: string,
  width?: string,
  height?: string,
}>(), {
  title: undefined,
  coverImg: undefined,
  borderRadius: "10px",
  width: "300px",
  height: "auto",
})
const { width, height, borderRadius, coverImg, title } = toRefs(prop)

const cordRef: Ref<any> = ref(null);

const { bgColor } = toRefs({ bgColor: "#ededef" })

import { isNumber, isString, isNotUndef } from "@wormery/utils";
import { computed, Ref, ref, StyleValue, toRef, toRefs } from "vue";
import { getUnit, toNumber, toPX } from "../../../utils/utils";
import { wtsc } from "../../../utils/wtsc";
import module from "./style/index.module.less"

const cordStyle = computed(() => {
  return wtsc
    .add.width(width.value)
    .add.height(toPX(height.value))
    .add.backgroundColor(bgColor.value)
    .add.borderRadius(borderRadius.value)
    .add.boxShadow("0px 1px 2px #000000aa")
    .add.overflow("hidden")
    .return() as StyleValue;
})
const contentStyle = computed(() => {
  return wtsc.add.margin("1rem")
    .add.fontSize("1rem")
    .return() as StyleValue

})

const coverImgStyle = computed(() => {
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
  if (isNotUndef(coverImg.value) && (height.value == "auto" || width.value.endsWith("%"))) {
    const cordWidth = cordRef?.value?.offsetWidth;


    if (isNumber(cordWidth)) {
      wtsc
        .add.height(toPX(cordWidth * 0.618))
        .add.width(width.value)
    }
  }
  return wtsc.return() as StyleValue;

})


const titleStyle = computed(() => {
  return wtsc
    .add.margin("20px 1rem")
    .add.fontSize("1.3em")
    .return() as StyleValue
})


</script>

<template>
  <div class="w-cord" ref="cordRef" :class="module.cord" :style="cordStyle">
    <div class="cover" :style="coverStyle">
      <slot name="cover">
        <div v-if="isNotUndef(coverImg)" :style="coverImgStyle" class="coverImg"></div>
      </slot>
    </div>
    <div class="title">
      <h4
        class="titleh1"
        :class="module.title"
        :style="titleStyle"
        v-if="isString(title)"
      >{{ title }}</h4>
    </div>
    <div class="content">
      <div class="content-slot" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.w-cord {
  display: flex;
  flex-direction: column;
  .cover {
    flex-grow: 1;
  }
  .title {
    background-color: #fefefeaa;
    flex-grow: 0;
  }
  .content {
    background-color: #fefefeaa;
    flex-grow: 0;
  }
}
</style>