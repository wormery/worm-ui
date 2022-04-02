import { px, version } from "@wormery/wtsc";
import {
  defineComponent,
  onUnmounted,
  onBeforeUnmount,
  PropType,
  toRefs,
} from "vue";
import { defaul } from "../../../utils/utils";
import { wtsc } from "../../../wtsc/index";
import { magic } from "../../Magic/src/directive";
import { call, MaybeArray } from "../../../utils/call";

const w = wtsc.scoped();
export default defineComponent({
  props: {
    type: {
      type: String as PropType<
        "defaul" | "info" | "success" | "warning" | "error" | "primary"
      >,
      default: "defaul",
    },
    onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const { type } = toRefs(props);
    return () => {
      w.add
        .display("flex")
        .add.justifyContent("center")
        .add.alignItems("center")
        .add.padding("0px 15px")
        .add.margin("15px")
        .add.height(px(38))
        .add.width("fit-content")
        .add.borderRadius(px(5))
        .add.userSelect("none")
        .add.backgroundColor(wtsc.the.commonly.level[type.value].main.color);
      w.class("button-" + type.value)
        .add.backgroundColor(wtsc.the.commonly.level[type.value].hover.color)
        .pseudo(":hover")
        .add.backgroundColor(wtsc.the.commonly.level[type.value].pressed.color)
        .pseudo(":active");

      const className = w.out();
      const { onClick } = props;

      return (
        <div
          v-magic={"selection"}
          class={className}
          onClick={(e: MouseEvent) => {
            onClick && call(onClick, e);
          }}
        >
          <span>{slots.default?.()}</span>
        </div>
      );
    };
  },
});
