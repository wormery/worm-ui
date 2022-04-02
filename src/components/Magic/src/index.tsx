import { defInjKey, PE, px, rgb, RGBAColor, vmin } from "@wormery/wtsc";
import {
  defineComponent,
  Teleport,
  onUnmounted,
  onBeforeUnmount,
  computed,
  HTMLAttributes,
  Ref,
  shallowRef,
} from "vue";
import { wtsc } from "../../../wtsc/index";
import { ref, StyleValue, PropType, toRefs } from "vue";
import vue from "@vitejs/plugin-vue";
import { ms, s } from "@wormery/wtsc/src/CSSValue/time";
import { nextTick } from "process";
import { rgbStrToRGB } from "../../../utils";
import { createHoverColor } from "../../../wtsc/mixColor";
const props = {};

const mode = shallowRef("");
const element = shallowRef(null as any as HTMLDivElement);

const duration = 200;
let enableTransition = false;
const left = shallowRef(0);
const top = shallowRef(0);
let timeouter: NodeJS.Timeout | null = null;
export const magicStyleKey = wtsc.provide(function (el: any, _mode: string) {
  el.addEventListener(
    "mouseover",
    (_el: any) => {
      const v = element.value;
      if (v !== el) {
        enableTransition = true;
        mode.value = _mode;
        element.value = el;
      }
    },
    false
  );
}, defInjKey<(el: any, mode: string) => void, true>());

export default defineComponent({
  props: {
    cursor: {
      type: String as PropType<"none" | "show" | "noly">,
      default: "noly",
    },
  },
  setup(props) {
    const { cursor } = toRefs(props);
    let size = 18;
    const w = wtsc.scoped("magic");
    if (cursor.value === "none") {
      size = 0;
    }
    const height = shallowRef(size);
    const width = shallowRef(size);
    const backgrountColor: Ref<RGBAColor> = shallowRef(rgb(255, 255, 255, 0.1));
    const currentColor = shallowRef(rgb(255, 255, 255, 0.1));

    const magicStyle = computed(() => {
      const magicStyle = w.inject(magicStyleKey);
      w.clean.add.position("absolute");
      // .add.transitionDuration(ms(duration))
      // .add.transitionTimingFunction("ease-out")
      w.add
        .transition(`background-color ${duration * 3}ms ease`)
        .if(enableTransition, () => {
          w.add.transition(
            `top ${duration}ms cubic-bezier(0, 0.5, 0, 0.5),
          left ${duration}ms cubic-bezier(0, 0.5, 0, 0.5),
          width ${duration}ms cubic-bezier(0, 0.5, 0, 0.5),
          height ${duration}ms cubic-bezier(0, 0.5, 0, 0.5),
          border-radius ${duration}ms cubic-bezier(0, 0.5, 0, 0.5),
          background-color ${duration}ms ease`
          );
          // w.add.transition("all").add.transitionDuration(ms(duration));
        });
      if (mode.value === "selection") {
        const c = window.getComputedStyle(element.value, null)[
          "backgroundColor"
        ];

        return w.add
          .top(px(element.value.getBoundingClientRect().top))
          .add.left(px(element.value.getBoundingClientRect().left))
          .add.height(px(element.value.offsetHeight))
          .add.width(px(element.value.offsetWidth))
          .add.borderRadius(element.value.style.borderRadius)
          .add.background(rgbStrToRGB(c))
          .add.zIndex("65536")
          .add.pointerEvents("none")
          .add.cursor("none")
          .out();
      }
      return (
        w.add
          .top(px(top.value - height.value / 2))
          .add.left(px(left.value - width.value / 2))
          .add.height(px(height.value))
          .add.width(px(width.value))
          .add.zIndex("65536")
          .add.borderRadius(PE(50))
          .add.backgroundColor(backgrountColor.value)
          .add.pointerEvents("none")
          .add.cursor("none")
          // .add.border("1px solid")
          // .add.borderColor(rgb(0, 0, 0, 0.5))
          .out()
      );
    });

    // document.body.className += w.add.cursor("none").class("body").out();

    let isRuned = true;
    const onMousemove = (e: MouseEvent) => {
      if (isRuned) {
        const el = element.value;
        if (el) {
          const l = el.getBoundingClientRect().left;
          const T = el.getBoundingClientRect().top;
          if (
            left.value < l ||
            top.value < T ||
            left.value > l + el.offsetWidth ||
            top.value > T + el.offsetHeight
          ) {
            element.value.style.transform = `translate(0px,0px)`;
            element.value = null as any as any;
            mode.value = "";
            enableTransition = true;
            timeouter && clearTimeout(timeouter);
            timeouter = setTimeout(() => {
              enableTransition = false;
            }, duration);
          } else {
            el.style.transition = `all .1s ease`;
            const xo = (left.value - l - el.offsetWidth / 2) / 10;
            const yo = (top.value - T - el.offsetHeight / 2) / 10;
            el.style.transform = `rotateY(${xo * 2}deg) rotateX(${
              yo * 2
            }deg)   scale(1.05) translate(${px(xo).toString()}, ${px(
              yo
            ).toString()})`;
          }
        }

        const target: HTMLDivElement | null = e.target as any;
        if (target) {
          const s = window.getComputedStyle(target, null)["backgroundColor"];

          const v = rgbStrToRGB(s);
          currentColor.value = v;
          const nv = v.toNumbers();
          const c = nv.r + nv.g + nv.b;
          if ((c / 255) * 3 > 0.5) {
            backgrountColor.value = rgb(255, 255, 255, 0.5);
          } else {
            backgrountColor.value = rgb(0, 0, 0, 0.5);
          }
        }

        left.value = e.clientX;
        top.value = e.clientY;

        isRuned = false;
        setTimeout(() => {
          isRuned = true;
        }, 20);
      }
    };

    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", onMousemove);
      document.body.style["cursor"] = "";
    });

    document.addEventListener("mousemove", onMousemove);

    if (cursor.value === "noly") {
      document.body.style["cursor"] = "none";
    }

    return () => (
      <Teleport to={"body"}>
        <div style={magicStyle.value}></div>
      </Teleport>
    );
  },
});
