import { defineComponent, ref, computed } from "vue";
import WProgressBar from "..";
import { wtsc } from "../../wtsc";
import { ms, PE, px, rgb } from "@wormery/wtsc";
import WButton from "../../Button";
import { Api } from "../src/api";
import { message } from "../../Message/src/index";

export const w = wtsc.scoped();

export const ProgressBar = defineComponent({
  name: "ProgressBar",
  setup() {
    return () => {
      const api = ref(undefined as undefined | Api);
      return (
        <div class={"ProgressBar"} style={w.add.padding(px(20)).out()}>
          <WButton
            onClick={() => {
              api.value?.endNow();
            }}
          >
            立刻完成
          </WButton>
          <WButton
            onClick={() => {
              api.value?.startAgain();
            }}
          >
            从新开始
          </WButton>
          <WProgressBar
            current={0}
            automaticGrowth={{ increment: 3, interval: 1000 }}
            onUpdateApi={(e) => (api.value = e)}
            onDone={() => {
              message("已完成");
            }}
          ></WProgressBar>
        </div>
      );
    };
  },
});
