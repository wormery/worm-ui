import { call, isFunction, isNotUndef, isNull } from "@wormery/utils";
import Toast from "./index.vue";
import Vue, { inject, InjectionKey, Ref } from "vue";
import { Queue } from "./Queue";
export type ToastApiInjection = (_msg: string) => void;
export const genToastApiInjection = (
  msgs: Queue<string>,
  callBack?: Function
): ToastApiInjection => {
  return (_msg) => {
    msgs.enqueue(_msg);
    isFunction(callBack) && callBack();
  };
};
export const toastInjectionKey: InjectionKey<ToastApiInjection> =
  Symbol("toastApi");
export function useToast() {
  const api = inject(toastInjectionKey, null);
  if (isNull(api)) {
    throw Error("您必须使用<WToast></WToast>包裹");
  }
  return api;
}
