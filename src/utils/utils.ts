import { isNumber, isString, lazyFun, selectCached } from "@wormery/utils";

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
