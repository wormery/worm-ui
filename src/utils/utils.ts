import { isNumber, isString, lazyFun, selectCached } from "@wormery/utils";
import path from "path";

export function toPX(width: any): string {
  if (isNumber(width)) {
    return width + "px";
  }
  if (isString(width)) {
    return width;
  }
  return "";
}
export function toNumber(num: string): number {
  return parseInt(num);
}
export const getUnit = lazyFun(
  selectCached,
  (() => {
    const unit = /[a-zA-Z]+/;

    return (str: string, isCached: boolean = true) => {
      return str.slice(str.search(unit));
    };
  })()
);

export function getUrlPre() {
  return window.location.href;
}

export function filterUrl(url: string) {
  if (url.startsWith("./")) {
    url = path.normalize(url);
    console.log(url);

    return `${getUrlPre()}${url.slice(2)}`;
  }
  return url;
}
