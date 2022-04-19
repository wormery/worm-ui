import { defineComponent, computed, toRefs, PropType, watch } from "vue";
import { ms, PE, px, rgb, mixColor, keyframes } from "@wormery/wtsc";
import { the, center } from "../../wtsc";
import { w } from "./wtsc";
import { defListerProps, defSyncProps } from "../../utils";
import { AutomaticGrowth, useAutomaticGrowth } from "./automaticGrowth";
import { Api } from "./api";

const { useSync: useUpdate, syncProps } = defSyncProps({
  current: {
    type: Number,
    default: 60,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  api: {
    type: Object as PropType<Api>,
  },
});

const { listerProps, useOn } = defListerProps("done");

export default defineComponent({
  name: "WProgressBar",
  props: {
    ...syncProps,
    ...listerProps,
    start: {
      type: Number,
      default: 0,
    },
    complete: {
      type: Number,
      default: 100,
    },
    completionPromptText: {
      type: String,
      default: "已完成",
    },
    automaticGrowth: {
      type: Object as PropType<AutomaticGrowth>,
      default: undefined,
    },
  },
  setup(props) {
    const { start, complete, automaticGrowth, completionPromptText } =
      toRefs(props);

    const { current, isDone, api, update } = useUpdate([
      "current",
      "isDone",
      "api",
    ]);

    // update("isDone", false);
    const on = useOn();
    on("done");

    const { runAutomaticGrowth } = useAutomaticGrowth(
      automaticGrowth,
      current,
      complete
    );
    runAutomaticGrowth();

    watch(isDone, (n) => {
      if (n) {
        on("done");
        return;
      }
      runAutomaticGrowth();
    });

    const _percentageNumber = computed(() => {
      const total = complete.value - start.value;
      const p = (current.value / total) * 100;
      if (p >= 100) {
        isDone.value = true;
        return 100;
      }

      isDone.value = false;
      return p;
    });
    api.value = {
      endNow() {
        current.value = complete.value;
      },
      startAgain() {
        current.value = start.value;
      },
    };

    return () => {
      const h = w.inject(the.commonly.rowHeight);
      const color = w.inject(the.commonly.color2);
      const otherColor = mixColor(color, rgb(255, 255, 255, 3));
      const successColor = w.inject(the.commonly.type.success.main.color);

      return (
        <div
          style={w.add
            .position("relative")
            .add.height(px(h.num / 2))
            .add.borderRadius(px(h.num / 4))
            .add.overflow("hidden")
            .add.background(
              `repeating-linear-gradient(-45deg, ${color.out()}  25%,  ${otherColor.out()} 0,  ${otherColor.out()} 50%,
                    ${color.out()} 0, ${color.out()} 75%, ${otherColor.out()} 0)`
            )
            .add.backgroundSize(px(16), px(16))
            .add.animation(
              keyframes(
                "panoramic",
                (a, w) => {
                  a("to", w.add.backgroundPosition(PE(200), 0));
                },
                w
              ),
              ms(20000),
              "linear",
              "infinite"
            )
            .add.color("transparent")
            .add.boxSizing("border-box")
            .add.border(px(3), "solid", the.commonly.type.info.main.color)
            .if(isDone.value, () => {
              w.add
                .border(px(2), "solid", successColor)
                .add.background(mixColor(successColor, rgb(255, 255, 255, 2)))
                .add.color(successColor);
            })
            .add.transition("width", ms(300), "ease")
            .add.userSelect("none")
            .out()}
        >
          <span class={center} style={w.add.fontSize(px(h.num / 3)).out()}>
            {completionPromptText.value}
          </span>
          <div
            style={w.add
              .height(PE(100))
              .add.float("right")
              .add.width(PE(100 - _percentageNumber.value))
              .add.backgroundColor(otherColor)
              .add.transition("width", ms(300), "ease")
              .out()}
          ></div>
        </div>
      );
    };
  },
});
