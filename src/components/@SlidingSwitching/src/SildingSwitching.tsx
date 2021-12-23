import { computed,withDefaults,defineProps, defineComponent, StyleValue, toRefs } from "vue";

import style from "./style"
export default defineComponent({
  setup(prop, { slots, emit }) {
    const enum DisplayLocation {
      /**最左边 */
      LEFT = 0,
      /**四分之一 */
      QUARTER = 25,
      /**显示中间 */
      MIDDLE = 50,
      /**THREE_QUARTERS_OF */
      THREE_QUARTERS_OF = 75,
      /** 显示右边 */
      RIGHT = 100,
    }
    /** 页面切换的传参类型 */
    interface Props {
      width?: string;
      height?: string;
      transitionDurition?: number;
      displayLocation?: DisplayLocation | number;
    }

    /** 参数 */
    const props = withDefaults(defineProps<Props>(), {
      width: "200px",
      height: "300px",
      transitionDurition: 2000,
      displayLocation: 0,
    });

    const { width, height, transitionDurition, displayLocation } =
      toRefs(props);

    /** 动画样式 */
    const transitionStyle = computed(() => {
      transition: `transform ${transitionDurition}ms,opacity ${transitionDurition}ms`;
    }) as StyleValue;

    /** 控制窗口内显示位置样式 */
    const windowStyle = computed(() => {
      transform: `translate(${displayLocation.value * 0.5}%)`;
    }) as StyleValue;

    /** 控制窗口内显示位置样式 */
    const leftContainer = computed(() => {
      transform: `translate(${displayLocation.value}%)`;
    }) as StyleValue;

    /** 控制窗口内显示位置样式 */
    const rightContainer = computed(() => {
      transform: `translate(100 - ${displayLocation.value}%)`;
    }) as StyleValue;

    return () => (

      <div className={'345343'} v-model="" style={[windowStyle,transitionStyle]}>
           
      <div></div>
        <div class="by-sliding">
          <div class="left">
            <div class="sliding" style={[leftContainer,transitionStyle]}></div>
          </div>
          <div class="right">
            <div class="sliding" style={[rightContainer,transitionStyle]}></div>
          </div>
        </div>
      </div>
    );
  },
});
