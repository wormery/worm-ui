<template>
  <div class="container" :class="isNarrow ? 'narrow' : ''">
    <div class="btn-background"></div>
    <div class="btn" @click="narrowClick" :style="transitionStyle">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
    <div class="bar" :class="isNarrow ? 'narrow' : ''">
      <div class="header">
        <div class="logo" :style="transitionStyle">
          <span>WORM</span>
        </div>
      </div>

      <div class="slider" :style="[sliderStyle, transitionStyle]"></div>

      <div
        class="item"
        v-for="(item, index) in items"
        :ref="(el) => item.el = el as HTMLAttributes"
        @click="menuItem(item, index)"
        :style="transitionStyle"
      >
        <div class="icon">
          <ion-icon :name="item.icon"></ion-icon>
        </div>
        <div class="title" :style="transitionStyle">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//config

import { isNotUndef, isNull } from '@wormery/utils';
import { reactive, Ref, ref, watchEffect } from 'vue';
import type { HTMLAttributes } from 'vue';

//过度时长单位毫秒
const transitionDuration = 100;
//对于一部分打断动画的反映延迟等
//具体我也说不明白
const interval = 20;

type Item = { title: string, icon: string, el?: HTMLAttributes }
//data
//栏目列表
let items: Ref<Item[]> = ref([
  { title: "home", icon: "home-outline" },
  { title: "User", icon: "person-outline" },
  { title: "settings", icon: "settings-outline" },
  { title: "User", icon: "share-social-outline" },
  {
    title: "about", icon: "information-circle-outline"
  }
]) as Ref<Item[]>

type Active = { item: Item, index: number }
//选中的项目
let active: Ref<Active> = ref({ item: items.value[0], index: 0 }) as Ref<Active>;

//是否缩小侧边栏
let isNarrow = ref(false);
//用来检查当前线程范围内是否更新了"isNarrow"
let oldIsNarrow: boolean | null = null;
// 滑块的一些属性
let sliderStyle = reactive({
  left: "0px",
  top: "-400px",
  height: "0px",
  width: "0px"
});

//让vue管理动画的播放时间，否则很难清楚的确定过度什么时候结束
const transitionStyle = {
  transition: `all ${transitionDuration}ms`
}

/** 隐藏缩小侧边栏的按钮*/
const narrowClick = function () {
  oldIsNarrow = isNarrow.value;
  isNarrow.value = !isNarrow.value;
}
/** menu中的按钮单击事件 */
const menuItem = function (item: Item, index: number) {
  oldIsNarrow = isNarrow.value;
  active.value = { item, index };
}

//更新滑块
//这里是函数闭包
const updataSliderStyle = (function () {
  /** 
   * 这里更新了滑块的样式
  */
  const startUpdata = function (el) {
    sliderStyle.top = el.offsetTop + "px";
    sliderStyle.left = el.offsetLeft + "px";
    sliderStyle.height = el.offsetHeight + "px";
    sliderStyle.width = el.offsetWidth + "px";
  }
  let timeouter: NodeJS.Timeout | null = null;

  /** 
  * 这端代码的作用我也说不明白，具体解决的问题就是，
  * 上面offsetWidth获取的是实时位置属性，
  * 但我过度过程中获取到的位置不是我们要的最终位置，
  * 我们也不知道最终位置在哪(为了最大的自适应，和改变最少的值改变组件)
  */
  const animationUpdataRec = function (i: number, el: HTMLAttributes) {
    i -= 1;
    console.log("update");
    startUpdata(el)
    if (i > 0) {
      timeouter = setTimeout(() => {
        animationUpdataRec(i, el)
      }, interval);
    }

  }
  return function (active: Active, isChangeNarrow) {
    if (active?.item?.el) {
      if (isChangeNarrow) {
        //这里的作用是由于有动画获取到的位置并不是实时位置
        //，只是当前位置,所以多次执行来确保更新到位
        //存在上一个计时器就关闭它
        if (!isNull(timeouter))
          clearTimeout(timeouter);

        animationUpdataRec(transitionDuration / interval, active.item.el)
      } else {
        //存在上一个计时器就关闭它
        if (!isNull(timeouter))
          clearTimeout(timeouter);
        startUpdata(active.item.el)
      }
    }
  }
})()


watchEffect(() => {
  //更新滑块
  updataSliderStyle(active.value, !oldIsNarrow == isNarrow.value)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  width: 100vw;
  background-color: #6f847d;
}

.container {
  --background-color: #e88b00;
  position: absolute;
  left: 5px;
  bottom: 5px;
  top: 5px;
}

.container .btn {
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 30px;

  z-index: 2;

  border-radius: 50%;
  font-size: 1.3em;
}

.container.narrow .btn {
  right: -15px;
  background-color: var(--background-color);
  transform: rotate(540deg);
}

.container .btn-background {
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 30px;

  border-radius: 50%;
  background-color: var(--background-color);
  box-shadow: 1px 2px 3px #00000077;
}

.container.narrow .btn-background {
  right: -15px;
  z-index: -1;
}

.container .bar {
  position: relative;

  height: 100%;

  user-select: none;

  overflow-x: hidden;
  border-radius: 15px;
  background-color: var(--background-color);
  box-shadow: 0 2px 3px #00000077;
}

.container .bar::-webkit-scrollbar {
  display: none;
}

.container .bar .header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2em;
}

.container.narrow .bar .header .logo {
  opacity: 0;
  overflow: hidden;
}

.container .bar .slider {
  position: absolute;
  background-color: #777bce;
  border-radius: 20px;
  box-shadow: 0 2px 3px #00000077;
}

.container .bar .item {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 15px;
  padding: 15px;

  border-radius: 20px;
  font-size: 2em;
}

.container.narrow .bar .item {
  margin: 5px 10px;
  padding: 5px 5px;
}

.container .bar .item:hover {
  background-color: #6f847d;
}

.container .bar .item div {
  display: flex;
  align-items: center;
}

.container .bar .item div.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  font-size: 1.3em;
}

.container.narrow .bar .item div.icon {
  margin: 0 3px;
}

.container .bar .item div.icon ion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .bar .item div.title {
  width: 200px;
  z-index: 1;
  overflow: hidden;
}

.container.narrow .bar .item div.title {
  width: 0px;
  opacity: 0;
}
</style>