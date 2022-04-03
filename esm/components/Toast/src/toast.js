import { isFunction, isNull } from "@wormery/utils";
import { inject } from "vue";
export const genToastApiInjection = (msgs, callBack) => {
    return (_msg) => {
        msgs.enqueue(_msg);
        isFunction(callBack) && callBack();
    };
};
export const toastInjectionKey = Symbol("toastApi");
export function useToast() {
    const api = inject(toastInjectionKey, null);
    if (isNull(api)) {
        throw Error("您必须使用<WToast></WToast>包裹");
    }
    return api;
}
//# sourceMappingURL=toast.js.map