import { isUndef } from "@wormery/utils";
import { EventListener } from "./eventListener";

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
