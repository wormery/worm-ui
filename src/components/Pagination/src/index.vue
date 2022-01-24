<template>
  <div class="container">
    <div class="previous-page block" @click="prevPage" :style="pageStyle">
      <span>&lt;</span>
    </div>
    <div class="sliding-window" :style="slidingWindowStyle">
      <div class="pages" :style="pagesStyle">
        <div class="slider" :style="sliderStyle"></div>
        <div
          class="page block"
          v-for="(item, index) in pages"
          :ref="(el) => { item.el = el as HTMLAttributes | undefined }"
          :class="active.value == item.value ? 'active' : ''"
          :style="pageStyle"
          key="index"
          @click="pageClick($event, item, index)"
        >
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="next-page block" @click="nextPage" :style="pageStyle">
      <span>&gt;</span>
    </div>
  </div>
</template>
<script lang="ts" setup>import { Style } from 'util';
import { onMounted, reactive, StyleHTMLAttributes, StyleValue } from 'vue';
import type { HTMLAttributes } from 'vue';

/** config*/
let minPage = 1;
let maxPage = 20;
//点击的那个按钮正方形的边长
const pageSize = 50;
//点击的页按钮间的距离
const maginSize = 5;


//显示的页按钮数量
let maxShowNumber = 4;
let showNum = maxShowNumber;
if (maxPage - minPage + 1 < maxShowNumber) {
  showNum = maxPage - minPage + 1;
}

/** style*/
/** 选中的滑块 */
const sliderStyle: StyleValue = reactive({ left: "-100px" });
console.log(sliderStyle);


//处理显示多少个按钮
let slidingWindowStyle = reactive({
  width: ""
});
slidingWindowStyle.width = `${(maginSize * 2 + pageSize) * showNum}px`

let pagesStyle: any = reactive({});
//页按钮的一些尺寸
let pageStyle = {
  height: `${pageSize}px`,
  width: `${pageSize}px`,
  margin: `${maginSize}px`,
};


/** _data*/
type Active = { index: number, value: number, target: any | null }
//选中
let active: Active = reactive({ value: -1, index: 0, target: null });

type Page = { value: number, style: StyleValue, el?: HTMLAttributes }
//init pags
let pages: Page[] = [];

//窗口位置
let slidingWindowleft = 0;


//初始化pages
for (let i = minPage; i <= maxPage; i++) {
  pages.push({ value: i, style: pageStyle });
}


//响应化
pages = (reactive(pages)) as unknown as Page[];




/** 更新显示区域数据 */
const update = function () {
  pagesStyle.left = `${(maginSize * 2 + pageSize) * -slidingWindowleft}px`
}

update();

/** 移动滑块动画 */
const sliderFocus = function (e) {
  console.log("sliderFocus");
  console.log(sliderStyle);

  sliderStyle.top = e.offsetTop + "px";
  sliderStyle.left = e.offsetLeft + "px";
  sliderStyle.height = e.offsetHeight + "px";
  sliderStyle.width = e.offsetWidth + "px";
}

//event
/** 上一页 */
const prevPage = function () {
  if (active.value > minPage) {
    active.index -= 1;
    active.target = pages[active.index];
    active.value = active.target.value;
    sliderFocus(active.target.el);
    //检查是否在显示区域
    let posin = active.value - minPage;
    if (posin < slidingWindowleft) {
      slidingWindowleft = posin;
      update();
    }
  }
}

/** 下一页 */
const nextPage = function () {
  if (active.value < maxPage) {
    active.index += 1;
    active.target = pages[active.index];
    active.value = active.target.value;
    sliderFocus(active.target.el);
    //检查是否在显示区域
    let slidingWindowRight = slidingWindowleft + showNum - 1;
    let posin = active.value - minPage;
    if (posin > slidingWindowRight) {
      slidingWindowRight = posin;
      slidingWindowleft = slidingWindowRight - showNum + 1;
      update();
    }
  }
}




/** 点击对应页面按钮产生的事件 */
const pageClick = function (e: MouseEvent, page: Page, index: number) {
  active.index = index;
  active.target = page;
  active.value = active.target.value;
  sliderFocus(e.currentTarget);
}

onMounted(() => {
  //初始化active
  if (pages.length > 0) {
    active.index = 0;
    active.value = pages[0].value;
    active.target = pages[0];
    setTimeout(() => {
      sliderFocus(active.target.el);
    }, 1);
  }
})
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  background-color: #3c374a;
  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
}

.container {
  display: flex;
}

.container .sliding-window {
  position: relative;
  width: 0px;
  overflow: hidden;
}

.container .pages {
  position: relative;
  display: flex;

  transition: all 0.5s;
}

.container .slider {
  position: absolute;

  background-color: #18ba9a;
  border-radius: 5px;

  transition: all 1s;
}

.container .block {
  --size: 50px;

  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #283144;
  border-radius: 5px;
  box-shadow: 0px 2px 3px #000000aa;
}

.container .block:hover {
  background-color: #e88b00;
  transition: all 0.5s;
}

.container .block span {
  z-index: 2;
  font-size: 1.5em;
  color: #dab710;
}

.container .block:hover span {
  color: #283144;
  transition: all 0.5s;
}

.container .page:hover,
.container .page.active {
  text-shadow: 1px 1px 10px #eddd9e, -1px -1px 10px #eddd9e;
  transition: all 0.5s;
}
</style>