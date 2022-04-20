import { ms, PE, px } from "@wormery/wtsc";
import { defineComponent, ref, computed, nextTick } from "vue";
import { cCenter, clearFloat, the, wtsc } from "../../wtsc";
import { w } from "./wtsc";
import { WDropDown, WButton, WDropdownOption } from "../../";

export default defineComponent({
  name: "WTopBar",
  props: {
    themeButton: { type: Boolean, default: true },
  },
  setup() {
    return () => {
      const h = w.inject(the.commonly.rowHeight);

      const colorOptions: Array<WDropdownOption> = Object.keys(
        wtsc.themeList
      ).map((name) => {
        return {
          key: Math.random(),
          label: name,
        };
      });

      return (
        <div
          style={w.add
            // .position("relative")
            .display("flex")
            .add.justifyContent("space-between")
            .add.alignItems("center")
            // .add.width(PE(100))
            .add.height(px(h.num * 1.4))
            .add.background(the.commonly.color2)
            .out()}
        >
          <div>WTSC</div>
          <div>
            <WDropDown
              trigger={"manual"}
              options={colorOptions}
              onSelect={(e, v) => {
                const duration = 500;
                w.add
                  .transition("all", ms(duration), "ease")
                  .selector("*")
                  .out();

                setTimeout(() => {
                  wtsc.setTheme(v as any);
                  setTimeout(() => {
                    w.selector("*").out();
                  }, duration);
                });
              }}
            >
              <WButton level={"quaternary"}>主题</WButton>
            </WDropDown>
          </div>
        </div>
      );
    };
  },
});
