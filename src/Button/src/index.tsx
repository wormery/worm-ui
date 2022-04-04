import { mixColor, px, rgb, RGBColor, version } from "@wormery/wtsc";
import {
  defineComponent,
  onUnmounted,
  onBeforeUnmount,
  PropType,
  toRefs,
} from "vue";
import { defaul } from "../../utils/utils";
import { wtsc, the } from "../../wtsc";
import { call, EventListener } from "../../utils";
import { createHoverColor, createPressedColor } from "../../wtsc/mixColor";
import { magic } from "../../Magic/src/directive";

const w = wtsc.scoped();
export default defineComponent({
  name: "WButton",
  props: {
    type: {
      type: String as PropType<
        "defaul" | "info" | "success" | "warning" | "error" | "primary"
      >,
      default: "defaul",
    },
    level: {
      type: String as PropType<
        "default" | "secondary" | "tertiary" | "quaternary"
      >,
      default: "default",
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    onClick: [Function, Array] as PropType<
      EventListener<(e: MouseEvent) => void>
    >,
    onBlur: [Function, Array] as PropType<EventListener<() => {}>>,
  },
  emits: ["click"],
  directives: {
    magic,
  },
  setup(props, { slots, emit }) {
    const { type, level } = toRefs(props);
    const types = wtsc.the.commonly.type;
    return () => {
      w.add
        .display("flex")
        .add.justifyContent("center")
        .add.alignItems("center")
        .add.padding("0px 15px")
        .add.margin("10px")
        .add.height(the.commonly.rowHeight)
        .add.fontSize(the.commonly.fontSize)
        .add.width("fit-content")
        .add.borderRadius(px(5))
        .add.userSelect("none")
        .add.border("none");
      if (level.value === "secondary") {
        const color = w.inject(types[type.value].main.color) as RGBColor;
        const cn = color.toNumbers();
        const nColor = mixColor(color, rgb(255, 255, 255, 3));
        w.add.color(color).add.backgroundColor(nColor);
        w.class(`button-${level.value}-${type.value}`)
          .add.backgroundColor(mixColor(color, rgb(255, 255, 255, 1.5)))
          .pseudo(":hover")
          .add.backgroundColor(mixColor(color, rgb(255, 255, 255, 1)))
          .pseudo(":active");
      } else if (level.value === "tertiary") {
        const color = rgb(240, 240, 240);
        w.add
          .color(types[type.value].main.color)
          .add.backgroundColor(color)
          .class(`button-${level.value}-${type.value}`)
          .add.backgroundColor(createHoverColor(color))
          .pseudo(":hover")
          .add.backgroundColor(createPressedColor(color))
          .pseudo(":active");
      } else if (level.value === "quaternary") {
        const color = rgb(230, 230, 230);
        w.add
          .color(types[type.value].main.color)
          .add.backgroundColor(w.the.commonly.backgroundColour)
          .class(`button-${level.value}-${type.value}`)
          .add.backgroundColor(createHoverColor(color))
          .pseudo(":hover")
          .add.backgroundColor(createPressedColor(color))
          .pseudo(":active");
      } else {
        w.add
          .color(types[type.value].main.text)
          .add.backgroundColor(types[type.value].main.color);
        w.class("button-" + type.value)
          .add.backgroundColor(types[type.value].hover.color)
          .pseudo(":hover")
          .add.backgroundColor(types[type.value].pressed.color)
          .pseudo(":active");
      }

      const className = w.out();
      const { onClick, onBlur } = props;

      return (
        <button
          v-magic={"selection"}
          class={className}
          onClick={(e: MouseEvent) => call(onClick, e)}
          onBlur={(e) => call(onBlur, e)}
        >
          <span>{slots.default?.()}</span>
        </button>
      );
    };
  },
});
