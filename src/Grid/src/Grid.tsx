import { defineComponent, ref, computed } from "vue";
import { defCom } from "../../utils/vue/defineComponents";
import { useScopedWtsc } from "../../wtsc/utils/useWTSC";
import { maybeInjectkeyProps, useProps } from "./Row";
const name = "WGrid";

export const WGrid = defCom({
  name,
  props: { ...maybeInjectkeyProps },
  setup(props, { slots }) {
    const w = useScopedWtsc(name);

    const { cols } = useProps(["cols", "space", "xSpace", "ySpace"]);

    return () => {
      return <>{slots.default?.()}</>;
    };
  },
});
