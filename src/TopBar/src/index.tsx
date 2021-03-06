import { ms, PE, px } from "@wormery/wtsc";
import { defineComponent, ref, computed, nextTick } from "vue";
import { cCenter, clearFloat, the, themeName, wtsc } from "../../wtsc";
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

      const themeOptions: Array<WDropdownOption> = Object.keys(
        wtsc.themeList
      ).map((name) => {
        return {
          key: Math.random(),
          label: name,
        };
      });
      const __selected__ = themeName.value.__selected__;

      const colorOptions: Array<WDropdownOption> = Object.keys(
        wtsc.themeList[__selected__]
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
              options={themeOptions}
              onSelect={(e, v) => {
                themeName.value.__selected__ = v;
              }}
            >
              <WButton level={"quaternary"}>主题</WButton>
            </WDropDown>
          </div>
          <div>
            <WDropDown
              trigger={"manual"}
              options={colorOptions}
              onSelect={(e, v) => {
                const __selected__ = themeName.value.__selected__;
                themeName.value[__selected__] = v;
              }}
            >
              <WButton level={"quaternary"}>色彩</WButton>
            </WDropDown>
          </div>
        </div>
      );
    };
  },
});
