import {
  computed,
  withDefaults,
  defineProps,
  defineComponent,
  StyleValue,
  toRefs,
  watch,
  ref,
} from "vue";
import { ControlType } from "..";
import { DisplayLocation } from "./enums";

import style from "./style";

const props = {
  width: {
    type: String,
    default: "200px",
  },
  height: {
    type: String,
    default: "200px",
  },
  transitionDurition: {
    type: Number,
    default: 800,
  },
  displayLocation: {
    type: Number,
    default: DisplayLocation.LEFT,
  },
};

export default defineComponent({
  props: props,
  setup(props, { slots, emit }) {
    const MainSlot = ref(slots.default ? slots.default() : null);
    const ToSlot = ref(null as any);
    const isCloseTransition = ref(false);

    /** 参数 */
    const displayLocation = ref(DisplayLocation.LEFT);
    let { width, height, transitionDurition } = toRefs(props);

    /** 动画样式 */
    const transitionStyle = computed(() => {
      if (!isCloseTransition.value) {
        return {
          transition: `transform ${transitionDurition.value}ms,opacity ${transitionDurition.value}ms`,
        };
      } else {
        return {
          transition: ``,
        };
      }
    });

    /** 控制窗口内显示位置样式 */
    const bySlidingStyle = computed(() => {
      console.log("windowStyle");

      return {
        transform: `translate(${-displayLocation.value * 0.5}%)`,
      };
    });

    /** 控制窗口内显示位置样式 */
    const leftContainer = computed(() => {
      return {
        transform: `translate(${displayLocation.value}%)`,
      };
    });

    /** 控制窗口内显示位置样式 */
    const rightContainer = computed(() => {
      console.log("rightContainer");

      return {
        transform: `translate(${-50 + displayLocation.value * 0.5}%)`,
      };
    });
    const initStart = function () {
      console.log("动画播放完毕");
      isCloseTransition.value = false;
      MainSlot.value = ToSlot.value;
      ToSlot.value = null;
      displayLocation.value = DisplayLocation.LEFT;
      isCloseTransition.value = true;
    };

    /**  */
    const control: ControlType = {
      toLeft() {},
      toRight(to: JSX.Element) {
        displayLocation.value = DisplayLocation.RIGHT;

        ToSlot.value = to.render && to.render();

        setTimeout(initStart, transitionDurition.value);

        console.log("toRight");

        console.log(to);
      },
      toButton() {},
      toUp() {},
    };

    emit("control", control);

    return () => (
      <div class={style.window}>
        <div
          class={style.bySliding}
          style={[bySlidingStyle.value, transitionStyle.value]}
        >
          <div class={style.left}>
            <div
              class={style.sliding}
              style={[leftContainer.value, transitionStyle.value]}
            >
              {MainSlot.value}
            </div>
          </div>
          <div class={style.right}>
            <div
              class={style.sliding}
              style={[rightContainer.value, transitionStyle.value]}
            >
              {ToSlot.value}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
