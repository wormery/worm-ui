import { ms, px } from "@wormery/wtsc";
import { title } from "process";
import { defineComponent, ref, toRefs } from "vue";
import { WCurtain } from "../../";
import { the, wtsc } from "../../wtsc";
import { magic } from "../../Magic/src/directive";
import { duration } from "../../Magic/src/status";
const w = wtsc.scoped();
export default defineComponent({
  name: "WFold",
  props: {
    title: { type: String, default: "" },
    duration: { type: Number, default: 500 },
  },
  directives: {
    magic,
  },
  setup(props, { slots }) {
    const { title, duration } = toRefs(props);
    const disPlay = ref(false);
    return () => (
      <>
        <div
          style={w
            .clear()
            .add.padding(px(0), px(5))

            .add.border(px(1), "solid", "#00000044")
            .add.background(the.commonly.backgroundColour)
            .add.borderRadius(the.commonly.borderRadius)
            .out()}
        >
          <div
            onClick={() => (disPlay.value = !disPlay.value)}
            style={w
              .clear()
              .add.lineHeight(the.commonly.rowHeight)
              .add.borderBottom(px(1), "solid", "#00000000")
              .if(disPlay.value, () => {
                w.add.borderBottom(px(1), "solid", "#00000044");
              })
              .add.fontSize(the.commonly.fontSizeMedium)
              .add.userSelect("none")
              .add.transition("border-bottom", ms(duration.value), "ease")
              .out()}
          >
            <div
              style={w
                .clear()
                .if(disPlay.value, () => {
                  w.add.transform("rotate(90deg)");
                })
                .add.float("left")
                .add.display("block")
                .add.margin(px(0), px(5))
                .add.transition("transform", ms(duration.value))
                .add.fontWeight("1000")
                .out()}
            >
              {">"}
            </div>
            <span>{title.value}</span>
          </div>
          <WCurtain display={disPlay.value}>
            <div style={w.add.margin(px(10), px(0)).out()}>
              {slots.default?.()}
            </div>
          </WCurtain>
        </div>
      </>
    );
  },
});
