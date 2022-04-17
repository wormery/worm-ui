import { mixColor, px, rgb, RGBColor, defInjKey } from "@wormery/wtsc";
import {
  defineComponent,
  PropType,
  toRefs,
  computed,
  watchEffect,
  watch,
} from "vue";
import { wtsc, the } from "../../wtsc";
import { call, EventListener } from "../../utils";
import { createHoverColor, createPressedColor } from "../../wtsc/mixColor";
import { magic } from "../../Magic/src/directive";
import { genHash } from "../../utils/utils";

const w = wtsc.scoped();
export default defineComponent({
  name: "WButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
    onBlur: [Function, Array] as PropType<
      EventListener<(e: FocusEvent) => void>
    >,
    onFocus: [Function, Array] as PropType<
      EventListener<(e: FocusEvent) => void>
    >,
  },
  emits: ["click"],
  directives: {
    magic,
  },
  setup(props, { slots, emit }) {
    const { type, level, disabled, loading } = toRefs(props);

    return () => {
      const types = wtsc.the.commonly.type;
      const isNotDisabled = !(disabled.value || loading.value);
      const status = !isNotDisabled ? "disabled" : "main";

      function addClass() {
        w.class(`button-${level.value}-${type.value ?? "defaul"}-${status}`);
      }

      const className = computed(() => {
        w.clear()
          .add.display("flex")
          .add.justifyContent("center")
          .add.alignItems("center")
          .add.padding("0px 15px")
          .add.margin(px(10))
          .add.height(the.commonly.rowHeight as any)
          .add.fontSize(the.commonly.fontSize)
          .add.width("fit-content")
          .add.borderRadius(px(5))
          .add.userSelect("none")
          .add.border("none")
          .add.cursor("none");

        if (level.value === "secondary") {
          const color = w.inject(types[type.value][status].color) as RGBColor;
          const cn = color.toNumbers();
          const nColor = mixColor(color, rgb(255, 255, 255, 3));
          w.add.color(color).add.backgroundColor(nColor);

          addClass();

          if (isNotDisabled) {
            w.add.backgroundColor(createHoverColor(nColor));
            w.pseudo(":hover")
              .add.backgroundColor(mixColor(nColor, rgb(255, 255, 255, 1)))
              .pseudo(":active");
          }
        } else if (level.value === "tertiary") {
          const color = rgb(240, 240, 240);
          w.add
            .color(types[type.value][status].color)
            .add.backgroundColor(color);

          addClass();

          if (isNotDisabled) {
            w.add
              .backgroundColor(createHoverColor(color))
              .pseudo(":hover")
              .add.backgroundColor(createPressedColor(color))
              .pseudo(":active");
          }
        } else if (level.value === "quaternary") {
          const color = rgb(230, 230, 230);
          w.add
            .color(types[type.value][status].color)
            .add.backgroundColor(w.the.commonly.backgroundColour);

          addClass();

          if (isNotDisabled) {
            w.add
              .backgroundColor(createHoverColor(color))
              .pseudo(":hover")
              .add.backgroundColor(createPressedColor(color))
              .pseudo(":active");
          }
        } else {
          w.add
            .color(types[type.value][status].text)
            .add.backgroundColor(types[type.value][status].color);

          addClass();

          if (isNotDisabled) {
            w.add
              .backgroundColor(types[type.value].hover.color)
              .pseudo(":hover")
              .add.backgroundColor(types[type.value].pressed.color)
              .pseudo(":active");
          }
        }

        return w.out();
      });
      const { onClick, onBlur, onFocus } = props;
      return (
        <button
          v-magic={
            loading.value
              ? "loading"
              : disabled.value
              ? "disabled"
              : "selection"
          }
          class={className.value}
          onClick={(e: MouseEvent) => {
            if (loading.value || disabled.value) {
              return;
            }
            call(onClick, e);
          }}
          onBlur={(e) => call(onBlur, e)}
          onFocus={(e) => call(onFocus, e)}
        >
          <span>{slots.default?.() ?? "按钮"}</span>
        </button>
      );
    };
  },
});
