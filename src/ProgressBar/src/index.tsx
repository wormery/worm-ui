import {
  defineComponent,
  ref,
  computed,
  toRefs,
  provide,
  PropType,
  watch,
} from "vue";
import {
  ms,
  PE,
  px,
  rgb,
  mixColor,
  keyframes,
  Percentage,
} from "@wormery/wtsc";
import { the } from "../../wtsc";
import { w } from "./wtsc";
import { width, duration } from "../../Magic/src/status";
import { isNumber } from "@wormery/utils";
import { defListerProps, syncProps } from "../../utils";
import { onBeforeUnmount } from "vue";
import { useModifiable } from "../../utils/vue/modifiable";
import { toast } from "../../Toast/src/index";
import { defaul } from "../../utils/utils";
import { AutomaticGrowth, useAutomaticGrowth } from "./automaticGrowth";
import { Api } from "./api";

const { useUpdate, props } = syncProps({
  current: {
    type: Number,
    default: 60,
  },
  api: {
    type: Object as PropType<Api>,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const { listerProps, useOn } = defListerProps("done")();
export default defineComponent({
  name: "WProgressBar",
  props: {
    ...props,
    ...listerProps,
    start: {
      type: Number,
      default: 0,
    },
    complete: {
      type: Number,
      default: 100,
    },
    automaticGrowth: {
      type: Object as PropType<AutomaticGrowth>,
      default: undefined,
    },
  },
  setup(props) {
    const { start, complete, automaticGrowth } = toRefs(props);

    const { update, current, isDone, api } = useUpdate([
      "current",
      "isDone",
      "api",
    ]);

    const on = useOn();

    const { runAutomaticGrowth } = useAutomaticGrowth(
      automaticGrowth,
      current,
      complete
    );
    runAutomaticGrowth();

    watch(current, (n) => {
      update("current", n);
    });
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
      return (
        <div
          style={w.add
            .height(px(h.num / 2))
            .add.backgroundColor(otherColor)
            .add.borderRadius(the.commonly.borderRadius9)
            .add.overflow("hidden")
            .out()}
        >
          <div
            style={w.add
              .height(PE(100))
              .add.width(PE(_percentageNumber.value))
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
              .add.transition("width", ms(300), "ease")
              .out()}
          ></div>
        </div>
      );
    };
  },
});
