import { defineComponent, PropType, toRef, ref, watch, watchEffect } from "vue";
import { defaul } from "../../utils/utils";
import { the, wtsc } from "../../wtsc";
import { call, EventListener, MaybeArray } from "../../utils";
import { px, rgb } from "@wormery/wtsc";
import { log } from "console";
import { lazyFun } from "@wormery/utils";
import { createDisabledColor } from "../../wtsc/mixColor";
import useAddEventListener from "../../hooks/useAddEventListener";

let zIndex = 0;
const w = wtsc.box;

interface Option {
  label: string;
  key: string | number | symbol;
  disabled?: Boolean;
}

const dropdownOptionClass = w
  .clear()
  .add.display("flex")
  .add.alignItems("center")
  .add.height(the.commonly.rowHeight)
  .add.padding("0px 15px")
  .add.transition("all .5s ease")
  .add.backgroundColor(the.commonly.backgroundColour)
  .class("dropdown-option")
  .out();

const dropdownOptionHoverClass = w
  .class("dropdown-option-hover")
  .add.backgroundColor(rgb(223, 228, 234))
  .pseudo(":hover")
  .out();

export default defineComponent({
  name: "WDropdown",
  props: {
    trigger: {
      type: String as PropType<"hover" | "click" | "manual">,
      default: "hover",
    },
    options: {
      type: Array as PropType<Array<Option>>,
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
      console.log("handleClick");
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
              .add.backgroundColor(rgb(255, 255, 255))
              .add.alignItems("center")
              .add.width("fit-content")
              .add.flexFlow("column")
              .out()}
          >
            {slots.default?.()}
            <div style={w.add.height(px(0)).out()}>
              <div
                class={w
                  .clear()
                  .add.position("relative")
                  .add.boxShadow("1px 2px 10px rgb(0,0,0,.3)")
                  .add.width("fit-content")
                  .add.padding("8px 0px")
                  .add.minWidth(px(100))
                  .add.backgroundColor(rgb(255, 255, 255))
                  .add.borderRadius(px(7))
                  .class("worm-dropdown")
                  .out()}
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
                    class={[
                      dropdownOptionClass,
                      {
                        [dropdownOptionHoverClass]: !item.disabled,
                      },
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