import {
  defineComponent,
  onBeforeUnmount,
  PropType,
  toRefs,
  Teleport,
} from "vue";
import useAddEventListener from "../../hooks/useAddEventListener";
import {
  onMousemove,
  windowBlur,
  windowMousedown,
  windowMouseup,
} from "./eventListener";
import magicStyle from "./style/magic";
import signStyle from "./style/sign";

export default defineComponent({
  name: "WMagic",
  props: {
    cursor: {
      type: String as PropType<"none" | "show" | "noly">,
      default: "noly",
    },
  },
  setup(props) {
    const { cursor } = toRefs(props);

    if (cursor.value === "none") {
      // size = 0;暂时先写该功能
    } else if (cursor.value === "noly") {
      document.body.style["cursor"] = "none";
    }

    onBeforeUnmount(() => {
      document.body.style["cursor"] = "";
    });

    useAddEventListener(document)("mousemove", onMousemove);
    useAddEventListener(window)("blur", windowBlur);
    useAddEventListener(window)("mousedown", windowMousedown);
    useAddEventListener(window)("mouseup", windowMouseup);

    return () => (
      <Teleport to={"body"}>
        <div style={magicStyle.value}>
          <div style={signStyle.value}></div>
        </div>
      </Teleport>
    );
  },
});
