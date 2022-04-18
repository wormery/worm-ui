import { defineComponent, ref, watch } from "vue";
import WProgressBar from "..";
import { wtsc } from "../../wtsc";
import { px } from "@wormery/wtsc";
import WButton from "../../Button";
import { Api } from "../src/api";
import { message } from "../../Message/src/index";
import { WInput } from "../../";
const w = wtsc.scoped();

export const ProgressBar = defineComponent({
  name: "ProgressBar",
  setup() {
    const api = ref(undefined as undefined | Api);

    const isone = ref(false);
    const c = ref(2);
    return () => {
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
          <WInput
            value={c.value.toString()}
            onUpdateValue={(v) => (c.value = parseInt(v))}
          ></WInput>
          <WProgressBar
            current={c.value}
            onUpdate:current={(v) => {
              c.value = v;
            }}
            isDone={isone.value}
            onUpdateIsDone={(v) => (isone.value = v)}
            automaticGrowth={{ increment: 3, interval: 1000 }}
            onUpdateApi={(e) => {
              api.value = e;
            }}
            onDone={() => {
              message("已完成");
            }}
          ></WProgressBar>
          {isone.value ? "已完成" : "未完成"}
        </div>
      );
    };
  },
});
