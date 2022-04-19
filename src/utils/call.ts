import { isUndef } from "@wormery/utils";
import { EventListener } from "./eventListener";
import { Data } from "./object";
export function calls<REST extends Array<any>, Props extends Data>(
  props: Props,
  keys: string[],
  rest: REST
) {
  keys.forEach((item) => {
    call((props as any)[item] as any, ...rest);
  });
}
export function call<REST extends Array<any>>(
  handle?: EventListener<(...rest: REST) => void>,
  ...rest: REST
) {
  if (isUndef(handle)) {
    return;
  }
  if (Array.isArray(handle)) {
    handle.forEach((item) => {
      item(...rest);
    });
    return;
  }
  handle(...rest);
}
