<template>
  <div ref="typeWritingDOM" class="type-writing clean">
    <div class="cursor" ref="cursorDOM" :style="cursorStyle"></div>
    <div
      class="word"
      v-for="(word, index) in words"
      v-show="index <= cursorPosition"
      :style="[index === cursorPosition ? { opacity: 0 } : {}]"
      :ref="
        (el) => {
          (wordDOMs[index] as any) = el;
        }
      "
      :key="index"
    >
      <div :style="wordStyle" v-text="word"></div>
    </div>
    <br class="clear" />
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  HTMLAttributes,
  onMounted,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import { getDOMCor } from "../../../utils/utils";
import { wtsc } from "../../../utils/wtsc";
import anime from "animejs";
import { isNumber } from "@wormery/utils";
const enableBlink = ref(true);

/**
 * 定义传参
 */
const prop = withDefaults(
  defineProps<{ str: string; curserStyleType: "line" | "block" }>(),
  {
    str: "",
    curserStyleType: "line",
  }
);

/**
 * 文字
 */
const { str, curserStyleType } = toRefs(prop);

/**
 * 字体颜色和光标颜色
 */
const cor = ref("rgb(0,0,0)");

/**
 * 光标所处的位置
 */
const cursorPosition = ref(-1);

/**
 * 字的数组
 */
const words = computed(() => {
  return [...str.value, "#"];
});

/**
 * 字DOM数组
 */
const wordDOMs: Ref<HTMLDivElement[]> = ref([]);

/**
 * 样式
 */
const wordStyles = computed(() => {
  const ret = [];
  for (let i = 0; i < words.value.length; i++) {
    const word = words.value[i];
    if (cursorPosition.value > i) {
      ret.push(wtsc.add.display("").return());
    } else {
      ret.push(wtsc.add.display("none").return());
    }
  }
  return ret;
});
const wordStyle = ref({});

/**
 * typeWritingDOM
 */
const typeWritingDOM = ref(null) as unknown as Ref<HTMLAttributes>;

const cursorDOM = ref(null);

const cursorAnime = anime({ target: "cursor" });
const cursorStyle = computed(() => {
  return {
    animation: (() => {
      if (enableBlink.value) {
        return undefined;
      }
      return "none";
    })(),
    backgroundColor: cor.value,
  };
});

/**
 * 临时禁用光标闪烁
 *
 */
const tempDisabledBlink = (() => {
  let timouter = setTimeout(() => {
    enableBlink.value = true;
  }, 500);
  return () => {
    clearTimeout(timouter);
    enableBlink.value = false;
    timouter = setTimeout(() => {
      enableBlink.value = true;
    }, 500);
  };
})();
watch(cursorPosition, () => {
  tempDisabledBlink();
  setTimeout(() => {
    const i = cursorPosition.value;

    if (i < 0 || i >= words.value.length) {
      return;
    }

    anime({
      targets: cursorDOM.value,
      duration: 600,
      easing: "easeOutCirc",
      translateX: anime.get(wordDOMs.value[i], "offsetLeft"),
      translateY: anime.get(wordDOMs.value[i], "offsetTop"),
      height: anime.get(wordDOMs.value[i], "height"),
      width: (() => {
        if (curserStyleType.value === "line") {
          return "2px";
        }
        return anime.get(wordDOMs.value[i], "width");
      })(),
    });
  }),
    0;
});

/**
 * 播放打字动画
 */
let initPlay = function () {
  let maxh = -1;
  const add = () => {
    setTimeout(() => {
      if (cursorPosition.value < wordDOMs.value.length - 1) {
        let h = -1;
        if (cursorPosition.value >= 0) {
          h = wordDOMs.value[cursorPosition.value].offsetHeight;
        }
        if (isNumber(h) && h > maxh) {
          maxh = h;

          (wordStyle.value as any).minHeight = maxh + "px";
        }
        cursorPosition.value += 1;

        add();
      }
    }, 100);
  };
  add();
};
onMounted(() => {
  cor.value = getDOMCor(typeWritingDOM.value);
  initPlay();
});
</script>
<style lang="scss" scoped>
.type-writing {
  position: relative;

  line-height: 1.231;
  .word {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 0.5rem;

    float: left;

    min-height: 1.1rem;

    transition: all 0.5s;
  }
  .cursor {
    position: absolute;
    // background-color: black;
    height: 1rem;
    width: 0px;
    opacity: 1;

    background-color: black;

    animation: 1.5s blink infinite linear;
  }
  .clear {
    clear: both;
  }
  @keyframes blink {
    0%,
    35% {
      opacity: 1;
    }
    50%,
    35% {
      opacity: 0;
    }
  }
}
</style>
