import { ms, PE, px, rgb } from "@wormery/wtsc";
import { nextTick, defineComponent, ref, toRefs, watch, computed } from "vue";
import { currentLimiting, syncProps } from "../../utils";
import { cCenter, center, the } from "../../wtsc";
import { w } from "./wtsc";
import { rCenter } from "../../wtsc/style";

const { useUpdate, props } = syncProps({
  display: {
    type: Boolean,
    default: false,
  },
});

export default defineComponent({
  name: "WTip",
  props: {
    ...props,
    duration: {
      type: Number,
      default: 300,
    },
    tip: {
      type: String,
      default: "这是一个提示",
    },
  },
  setup(props, { slots }) {
    const update = useUpdate(props);
    const { tip, display, duration } = toRefs(props);

    const _show = ref(display.value);
    const _display = ref(display.value);

    watch(display, () => {
      _display.value = display.value;
    });

    watch(_display, (n) => {
      update("display", n);
    });

    const closeDisplay = currentLimiting(() => {
      _display.value = false;
    }, duration.value);

    watch(
      _show,
      (n) => {
        if (!n) {
          closeDisplay.restrictor();
          return;
        }
        closeDisplay.clear();
        _display.value = true;
      },
      { flush: "sync" }
    );

    const style = computed(() => {
      w.add
        .width("max-content")
        .add.padding("5px")
        .add.borderRadius(the.commonly.borderRadius)
        .add.background(the.commonly.color2)
        .add.transition("opacity", ms(duration.value), "ease");
      if (!_show.value) {
        w.add.opacity(0);
      }

      return w.out();
    });
    const handleClick = (e: MouseEvent) => {
      _show.value = !_show.value;
    };

    return () => {
      return (
        <div
          onMouseleave={() => (_show.value = false)}
          onMouseenter={() => (_show.value = true)}
          onClick={handleClick}
          style={w.add.position("relative").add.width("fit-content").out()}
        >
          {slots.default?.()}
          <div
            style={w.add
              .position("absolute")
              .if(!_display.value, () => {
                w.add.pointerEvents("none");
              })
              .out()}
          >
            <div style={style.value}>
              <div
                class={rCenter}
                style={w.add
                  .position("absolute")
                  .add.top(px(-10))
                  .add.left(PE(50))
                  .add.height(px(0))
                  .add.width(px(0))
                  .add.border(px(5), "solid", "transparent")
                  .add.borderBottom(px(5), "solid", the.commonly.color2)
                  .out()}
              ></div>
              {tip.value}
            </div>
          </div>
        </div>
      );
    };
  },
});
