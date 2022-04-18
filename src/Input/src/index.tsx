import { PE, px, rgb } from "@wormery/wtsc";
import { defineComponent, ref, toRef, watch } from "vue";
import { the, wtsc } from "../..";
import { defSyncProps } from "../../utils/eventListener";

export const { syncProps: props, useUpdate } = defSyncProps({
  value: {
    type: [String],
    default: "",
  },
});

export default defineComponent({
  name: "WInput",
  props: {
    ...props,
  },
  setup(props, { emit }) {
    const { value } = useUpdate(["value"]);
    const w = wtsc.box;
    const height = w.inject(the.commonly.rowHeight, px(38));
    const backgroundColor = rgb(255, 255, 255);

    const className = w.add
      .height(height)
      .add.position("relative")
      .add.padding("0px 20px")
      .add.margin(px(3))
      .add.backgroundColor(backgroundColor)
      .add.borderColor(rgb(189, 195, 199))
      .add.borderStyle("solid")
      .add.borderWidth(px(3))
      .add.borderRadius(px(height.num / 2))
      .add.transition("border-color .3s ease")
      .class("input")
      .add.borderColor(the.commonly.color2)
      .pseudo(":hover")
      // .add.content("''")
      // .add.position("absolute")
      // .add.top(px(-5))
      // .add.right(px(-5))
      // .add.bottom(px(-5))
      // .add.left(px(-5))
      // .add.zIndex("0")
      // .add.borderRadius(px(height.num / 2))
      // .add.backgroundColor(rgb(85, 239, 196, 0.5))
      // .pseudo(":before")
      .out();

    const handleInput = (e: InputEvent | CompositionEvent | Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      value.value = targetValue;
      emit("input", e);
    };
    const isActive = ref(false);
    return () => {
      return (
        <div style={w.add.position("relative").out()}>
          <div
            style={w.add
              .position("absolute")
              .add.top(px(0))
              .add.right(px(0))
              .add.bottom(px(0))
              .add.left(px(0))
              .add.borderRadius(px(height.num / 2))
              .add.transition("all .5s ease")
              .if(isActive.value, () => {
                w.add
                  .backgroundColor(rgb(85, 239, 196, 0.5))
                  .add.top(px(-3))
                  .add.right(px(-0.5))
                  .add.bottom(px(-3))
                  .add.left(px(-0.5));
              })
              .out()}
          ></div>
          <div class={className}>
            <input
              type="text"
              style={w.add
                .display("block")
                .add.height(PE(100))
                .add.width(PE(100))
                .add.outline("none")
                .add.border("none")
                .out()}
              onFocus={(e) => {
                isActive.value = true;
                emit("focus", e);
              }}
              onBlur={(e) => {
                isActive.value = false;
                emit("blur", e);
              }}
              onChange={(e) => {
                emit("change", e);
              }}
              onInput={handleInput}
              value={value.value}
            />
          </div>
        </div>
      );
    };
  },
});
