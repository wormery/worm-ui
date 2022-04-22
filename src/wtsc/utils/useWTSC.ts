import { WTSC } from "@wormery/wtsc";
import {
  inject,
  onUnmounted,
  onBeforeUnmount,
  InjectionKey,
  provide,
} from "vue";
import { wtsc } from "..";
import { genHash, defaul, getInstance } from "../../utils/utils";

export const parentWtscVueKey = Symbol() as InjectionKey<typeof wtsc>;

const currentWtsc: WeakMap<object, typeof wtsc> = new WeakMap();
export function useScopedWtsc(
  name: string = genHash(),
  defaul?: WTSC<any, any>
) {
  const upperLevel = useParentWtsc(defaul);
  const nwtsc = upperLevel.scoped(`${upperLevel.name}$${name}`);
  onBeforeUnmount(() => {
    nwtsc.unmount();
  });
  provide(parentWtscVueKey, nwtsc);
  const instance = getInstance();
  currentWtsc.set(instance, nwtsc);
  return nwtsc;
}

export function useParentWtsc(defaul = wtsc) {
  return inject(parentWtscVueKey, defaul);
}

export function useCurrentWtsc() {
  return currentWtsc.get(getInstance());
}
