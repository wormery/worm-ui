<script lang="ts" setup>import { computed, ref, toRefs, watch } from 'vue';
import { module } from "./style";
import { ControlType } from '..';
import { StyleGenerate, TransformGenerate } from '../../../utils/CSSUtils';
import { Direction, PlayProgress, Show } from './enums';
import { Control } from './types';
import { generageLeftStyle, generageRightShow0Style, generageRightShow1Style, generageRightStyle } from './generageStyle';

/** 定义自定意事件 */
const emits = defineEmits<{
  (e: 'control', control: Control): void
  (e: 'xxdfd', control: string): void
}>()


/** 定义prop */
const props = withDefaults(
  defineProps<{
    width?: number | string,
    height?: number | string,
    transitionDurition?: number,
    elem: any
  }>()
  , {
    transitionDurition: 1000,
    width: 300,
    height: 300
  }
)

const { elem, transitionDurition } = toRefs(props as any);

const elemt0 = ref(elem.value);
const elemt1 = ref(null);

const show = ref(Show.ELEM0);

const plss = ref(PlayProgress.END);
const direction = ref(Direction.TO_RIGHT);



const isClosedTransition = ref(true);
const transitionStyle = computed(() => {
  StyleGenerate.newClass()
    .addTransition("transform", transitionDurition.value)
    .return();

  if (!isClosedTransition.value) {
    return StyleGenerate.newClass()
      .addTransition("transform", transitionDurition.value)
      .return();
  } else {
    return StyleGenerate.newClass().return();
  }
});



/** @type {value:StyleValue} */
const sliderStyle = ref({});
/** 第一个显示窗格 */
const content0Style = ref({});

const elemt0Style = ref({});

const content1Style = ref({});

const elemt1Style = ref({});

const updatestyle = function () {
  if (direction.value == Direction.TO_RIGHT) {

    // if (show.value == Show.ELEM0) {

    /** 检测当前实现的是否正确来确定返回值是否相反 */
    console.log(show.value);

    if (show.value == Show.ELEM0) {
      //ELEM0
      const rightStyles = generageRightShow0Style(plss)
      new Error

      sliderStyle.value = rightStyles.sliderStyle;

      content0Style.value = rightStyles.content0Style;
      content1Style.value = rightStyles.content1Style;

      elemt0Style.value = rightStyles.elemt0Style;
      elemt1Style.value = rightStyles.elemt1Style;

    } else {
      //ELEM1
      const rightStyles = generageRightShow1Style(plss)

      sliderStyle.value = rightStyles.sliderStyle;


      content0Style.value = rightStyles.content0Style;
      content1Style.value = rightStyles.content1Style;

      elemt0Style.value = rightStyles.elemt0Style;
      elemt1Style.value = rightStyles.elemt1Style;
    }
  } else if (
    direction.value == Direction.TO_LEFT
  ) {
    const leftStyles = generageLeftStyle(plss)
  }

}
updatestyle();
watch([direction, show, plss], () => {
  updatestyle();
})



function showElem(elem: any) {
  if (show.value == Show.ELEM0) {
    show.value = Show.ELEM1;
    elemt1.value = elem;
  } else {
    show.value = Show.ELEM0;
    elemt0.value = elem;
  }
}

const control: Control = {
  toLeft(to: { render: Function }) {

    plss.value = PlayProgress.STAR;
    direction.value = Direction.TO_LEFT;
    showElem(to.render());

    // isClosedTransition.value = false;
    // plss.value = PlayProgress.END;


  },
  toRight(to: { render: Function }) {
    plss.value = PlayProgress.STAR;
    direction.value = Direction.TO_RIGHT;

    console.log("showElem");
    showElem(to.render());


    setTimeout(() => {
      isClosedTransition.value = false;
      plss.value = PlayProgress.END;

      setTimeout(() => {
        isClosedTransition.value = true;

      }, transitionDurition.value)
    }, 0)


  },
  toButton() { },
  toUp() { },
};


/** 将控制方法抛出去 */
emits('control', control);
</script>

<template >
  <div :class="module.window">
    <slot name="falder"></slot>
  </div>
</template>

<style lang="">
  
</style>