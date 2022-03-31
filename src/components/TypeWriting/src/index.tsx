import { defineComponent, onBeforeUnmount, reactive, PropType } from "vue";
import {
  computed,
  HTMLAttributes,
  onMounted,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import {
  defaul,
  defaults,
  getDOMCor,
  withDefaultsOfToRefs,
} from "../../../utils/utils";
import anime from "animejs";
import { isNumber } from "@wormery/utils";
import { keyframes, px, rem } from "@wormery/wtsc";
import { wtsc } from "../../../wtsc";
import { createRouter } from "vue-router";
import { nextTick } from "process";
import { s } from "@wormery/wtsc/src/CSSValue/time";

const w = wtsc.scoped();

export default defineComponent({
  props: {
    str: String,
    curserStyleType: String as PropType<"line" | "block">,
  },
  setup(props) {
    const { str, curserStyleType } = withDefaultsOfToRefs(
      props as { str: string; curserStyleType?: "line" | "block" },
      {
        str: "",
        curserStyleType: "line",
      }
    );

    /**
     * 光标闪烁
     */
    const enableBlink = ref(true);

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
          ret.push(w.add.display("").out());
        } else {
          ret.push(w.add.display("none").out());
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

    const $ = computed(() => ({
      typeWritingStyle: {
        style: w.add.position("relative").add.lineHeight("1.231").out(),
        cursor: {
          style: (() => {
            w.add
              .position("absolute")
              .add.height(rem(1))
              .add.width(px(0))
              .add.opacity("1")
              .add.background("black");

            if (enableBlink.value) {
              w.add
                .animation([s(1.5), "infinite", "linear"].join(" "))
                .add.animationName(
                  keyframes(
                    "blink",
                    (a, w) => {
                      a("0%, 35%", w.add.opacity("1"));
                      a("50%, 35%", w.add.opacity("0"));
                    },
                    w
                  )
                );
            } else {
              w.add.animation("none");
            }

            w.add.backgroundColor(cor.value);

            return w.out();
          })(),
        },
        word: {
          style: w.add
            .display("flex")
            .add.alignItems("center")
            .add.justifyContent("center")
            .add.minWidth(rem(0.5))
            .add.float("left")
            .add.minHeight(rem(1.1))
            .add.transition("all 0.5s")
            .out(),
        },
      },
      clear: w.add.clear("both").out(),
    }));

    w.add.width(px(20)).class("33333").out();
    return () => (
      <div
        ref={(el) => {
          typeWritingDOM.value = el as any;
        }}
        class="type-writing clean"
        style={[$.value.typeWritingStyle.style, $.value.clear]}
      >
        <div
          class="cursor"
          ref={(el) => (cursorDOM.value = el as any)}
          style={[$.value.typeWritingStyle.cursor.style]}
        ></div>
        {words.value.map((word, index) => (
          <div
            class="word"
            style={[
              $.value.typeWritingStyle.word.style,
              index === cursorPosition.value ? w.add.opacity("0").out() : {},
              index <= cursorPosition.value ? {} : w.add.display("none").out(),
            ]}
            ref={(el) => {
              (wordDOMs.value[index] as any) = el;
            }}
            key={index}
          >
            <div style={wordStyle.value} v-text={word}></div>
          </div>
        ))}
        <br class="clear" style={[$.value.clear]} />
      </div>
    );
  },
});
