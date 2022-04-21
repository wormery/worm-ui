import { defineComponent, PropType, toRef, ref, watch, computed } from "vue";
import { the, wtsc } from "../../wtsc";
import { call, EventListener } from "../../utils";
import { ms, px, rgb } from "@wormery/wtsc";
import { createDisabledColor } from "../../wtsc/mixColor";
import useAddEventListener from "../../hooks/useAddEventListener";
import { magic } from "../../Magic/src/directive";
import { clearFloat, rCenter } from "../../wtsc/style";

let zIndex = 0;
const w = wtsc.box;

export interface WDropdownOption {
  label: string;
  key: string | number | symbol;
  disabled?: Boolean;
}

const dropdownOptionClass = computed(() => {
  return w
    .clear()
    .add.display("flex")
    .add.alignItems("center")
    .add.height(the.commonly.rowHeight)
    .add.padding("0px 15px")
    .add.transition("all", ms(500), "ease")
    .add.backgroundColor(the.commonly.type.defaul.main.color)
    .class("dropdown-option")
    .out();
});

const dropdownOptionHoverClass = computed(() => {
  return w
    .class("dropdown-option-hover")
    .add.backgroundColor(the.commonly.actionColor)
    .pseudo(":hover")
    .out();
});

export default defineComponent({
  name: "WDropdown",
  directives: { magic },
  props: {
    trigger: {
      type: String as PropType<"hover" | "click" | "manual">,
      default: "hover",
    },
    options: {
      type: Array as PropType<Array<WDropdownOption>>,
      default: [],
    },

    onSelect: [Function, Array] as PropType<
      EventListener<(key: string | number | symbol, label: string) => void>
    >,
  },
  setup(props, context) {
    const { slots } = context;
    const { trigger } = props;

    const isShow = ref(false);
    watch(isShow, () => {
      zIndex++;
    });

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (isShow.value) {
        isShow.value = false;

        return;
      }

      isShow.value = true;
    };

    if (trigger === "click") {
      useAddEventListener(document)("click", (e) => {
        isShow.value = false;
      });
    }

    const handleMouseenter = () => {
      if (trigger === "hover") {
        isShow.value = true;
      }
    };

    const handleMouseleave = () => {
      if (trigger === "hover") {
        isShow.value = false;
      }
    };

    const options = toRef(props, "options");

    return () => {
      const { onSelect } = props;
      return (
        <>
          <div
            onClick={handleClick}
            onMouseenter={handleMouseenter}
            onMouseleave={handleMouseleave}
            style={w
              .clear()
              .add.position("relative")
              .add.display("flex")
              .add.alignItems("center")
              .add.width("fit-content")
              .add.flexFlow("column")
              .out()}
          >
            {slots.default?.()}
            <div
              style={w.add // .add.justifyContent("center") // .add.display("flex")
                .height(px(0))
                // .add.width(px(0))
                .add.position("relative")
                .out()}
            >
              <div
                class={[
                  w
                    .clear()
                    .add.position("absolute")
                    .add.boxShadow("1px 2px 10px rgb(0,0,0,.3)")
                    .add.width("fit-content")
                    // .add.height("auto")
                    .add.padding("8px 0px")
                    .add.minWidth(px(100))
                    .add.backgroundColor(the.commonly.color2)
                    .add.borderRadius(px(7))
                    .class("worm-dropdown")
                    .out(),
                  rCenter,
                ]}
                style={w
                  .clear()
                  .add.zIndex((100 + zIndex).toString())
                  .if(!isShow.value, () => {
                    w.add.display("none");
                  })
                  .out()}
              >
                {options.value.map((item) => (
                  <div
                    v-magic={item.disabled ? "disabled" : ""}
                    class={[
                      dropdownOptionClass.value,
                      {
                        [dropdownOptionHoverClass.value]: !item.disabled,
                      },
                      clearFloat,
                    ]}
                    style={w
                      .clear()
                      .if(!!item.disabled, () => {
                        w.add.color(createDisabledColor(rgb(0, 0, 0)));
                      })
                      .out()}
                    onClick={() => {
                      if (item.disabled) {
                        return;
                      }
                      call(onSelect, item.key, item.label);
                    }}
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    };
  },
});
