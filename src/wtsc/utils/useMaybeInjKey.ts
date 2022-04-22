import { InjectKey, isInjectKey, WTSC } from "@wormery/wtsc";
import { useParentWtsc, useCurrentWtsc } from "./useWTSC";
import { VueProps, GetPropsType } from "../../utils/vue/props";
import {
  getCurrentInstance,
  PropType,
  Ref,
  computed,
  ComputedRef,
  watchEffect,
} from "vue";
import { isArray } from "@wormery/utils";
import { notFoundCurrentInstanceOfWarn } from "../../utils/vue/defSyncProps";

export type ValueType<
  IsAssertionExisted extends boolean,
  Value
> = IsAssertionExisted extends true ? Value : Value | undefined;
export type MaybeInjKey<T, P extends boolean = false> = T | InjectKey<T, P>;

export function maybeInjKey<T, P extends boolean>(
  mik: MaybeInjKey<T, P>,
  defalt: T,
  w?: WTSC<any, any>
): T;

export function maybeInjKey<T, P extends boolean>(
  mik: MaybeInjKey<T, P>
): ValueType<P, T>;

export function maybeInjKey<T, P extends boolean>(
  mik: MaybeInjKey<T, P>,
  defalt?: T,
  w: WTSC<any, any> = useParentWtsc()
): any {
  if (isInjectKey(mik)) {
    return mik.out(w);
  }
  return mik ?? defalt;
}
export function defineMaybeInjkeyProps<
  Props extends VueProps & {
    [k in string]: { injectKey: InjectKey<any, boolean> };
  },
  IsAssertionExisted extends boolean = false
>(
  props: Props,
  isAssertionExisted?: IsAssertionExisted
): {
  maybeInjectkeyProps: Props;
  useProps: <PropNames extends Array<keyof Props>>(
    propNames: PropNames
  ) => {
    [k in PropNames[number]]: Props[k] extends {
      injectKey: InjectKey<infer T, infer P>;
      injectDefault?: infer D;
    }
      ? D extends T
        ? ComputedRef<T>
        : P extends true
        ? ComputedRef<T>
        : ComputedRef<T | undefined>
      : never;
  };
} {
  return {
    maybeInjectkeyProps: props,
    useProps,
  } as any;
}
function useProps(propNames: Array<string>) {
  const instance = getCurrentInstance();
  if (instance === null) {
    notFoundCurrentInstanceOfWarn();
    return () => {
      notFoundCurrentInstanceOfWarn();
    };
  }

  const props = instance.props;
  const typeProps = instance.type.props;
  const _props: any = {};
  const parentWtsc = useParentWtsc();
  const currentWtsc = useCurrentWtsc();

  propNames.forEach((k) => {
    _props[k] = computed(() => {
      const prop = props[k] as any;
      const typeProp = typeProps[k];
      const injKey = typeProp.injectKey;
      if (prop) {
        currentWtsc?.provide(prop, injKey);
        return prop;
      }
      return parentWtsc.inject(injKey) ?? typeProp.injectDefault;
    });
    _props[k].value;
  });

  return _props;
}
