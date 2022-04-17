import { defineComponent } from "vue";
import { WTip } from "..";
import WButton from "../../Button";
export const Tip = defineComponent({
  name: "Tip",
  setup() {
    return () => (
      <div>
        <WTip tip="这是提示消息">
          <WButton></WButton>
        </WTip>
      </div>
    );
  },
});
