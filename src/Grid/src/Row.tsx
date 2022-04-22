import { defInjKey, fr, InjectKey, PE } from "@wormery/wtsc";
import {
  defineComponent,
  ref,
  computed,
  toRefs,
  provide,
  InjectionKey,
  inject,
  Ref,
  PropType,
} from "vue";
import { wtsc } from "../../wtsc";
import { push } from "../../utils/utils";
import { useScopedWtsc, useParentWtsc } from "../../wtsc/utils/useWTSC";
import { defCom } from "../../utils/vue/defineComponents";
import { watchEffect } from "vue";
import {
  MaybeInjKey,
  defineMaybeInjkeyProps,
} from "../../wtsc/utils/useMaybeInjKey";

const name = "WRow";
const ww = wtsc.scoped(name);

export const occupyKey = defInjKey<Ref<number>>();
export const numOfColKey = Symbol() as InjectionKey<Ref<number>>;
export const unitKey = defInjKey<number>();
export const spacesKey = ww.provide({ x: 0, y: 0 }) as InjectKey<
  { x: number; y: number },
  true
>;
import { breakpointsTailwind, useWindowSize } from "@vueuse/core";
import {
  breakpoints,
  BreakpointsOptionsType,
  useBreakpoints,
} from "../../utils/screen/useBreakpoints";

type ColsaType =
  | (Partial<{ [k in BreakpointsOptionsType]: number }> & {
      default: number;
    })
  | number;

export const colsKey = ww.provide<false, ColsaType>(0);
export const spaceKey = ww.provide(0);
export const xSpaceKey = defInjKey<number>();
export const ySpaceKey = defInjKey<number>();

export const { maybeInjectkeyProps, useProps } = defineMaybeInjkeyProps(
  {
    cols: {
      type: Number as PropType<ColsaType>,
      injectKey: colsKey,
      injectDefault: 12,
    },
    space: {
      type: Number,
      injectKey: spaceKey,
      injectDefault: 0,
    },
    xSpace: {
      type: Number,
      injectKey: xSpaceKey,
    },
    ySpace: {
      type: Number,
      injectKey: ySpaceKey,
    },
  },
  true
);

export const WRow = defCom({
  name,
  props: {
    ...maybeInjectkeyProps,
  },
  setup(props, { slots }) {
    const w = useScopedWtsc(name, ww);

    console.log(w.name);
    const { cols, space, xSpace, ySpace } = useProps([
      "cols",
      "space",
      "xSpace",
      "ySpace",
    ]);

    watchEffect(() => {
      let v: number;
      const _cols = cols.value;
      if (typeof _cols === "number") {
        v = _cols;
      } else {
        const k = breakpoints.useCurrent(_cols).value;
        console.log(k);

        if (k) {
          v = k;
        } else {
          v = _cols.default;
        }
      }
      console.log(v);

      w.provide(100 / v, unitKey);
    });

    watchEffect(() => {
      w.provide(
        {
          x: xSpace.value ?? space.value,
          y: ySpace.value ?? space.value,
        },
        spacesKey
      );
    });

    return () => {
      const defaulSlots = slots.default?.() ?? [];
      // const n = cols.value - defaulSlots.length;

      defaulSlots.push(<div style={w.add.flexGrow(1).out()}></div>);

      return (
        <div
          style={w.add
            .display("flex")
            .add.width(PE(100))
            .add.flexWrap("wrap")
            .add.justifyContent("start")
            .out()}
        >
          {defaulSlots}
        </div>
      );
    };
  },
});
