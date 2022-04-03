import {
  isNumber,
  isString,
  isUndef,
  lazyFun,
  selectCached,
} from "@wormery/utils";
import path from "path";
import {
  toRef,
  toRefs,
  ref,
  ToRefs,
  StyleValue,
  Slot,
  VNodeArrayChildren,
  VNodeChild,
  isVNode,
  Fragment,
} from "vue";
import { Ref, computed } from "vue";
import { RGBAColor, PE, rgb } from "@wormery/wtsc";

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

export function getDOMCor(x: any) {
  return (window.getComputedStyle(x, null) as any)["color"];
}

type noUndef<T extends object> = {
  [k in keyof T]: T[k] extends infer P
    ? P extends undefined
      ? never
      : P
    : never;
};

export function defaults<T extends object>(
  obj: T,
  defaults: noUndef<T>
): noUndef<T> {
  const _obj = obj as any;
  for (const key in defaults) {
    defaults[key] = _obj[key] ?? defaults[key];
  }
  return defaults as any;
}

export type genTuple<
  n extends number,
  Arr extends Array<number> = [],
  nArr extends Array<number> = push<Arr>
> = Arr["length"] extends n ? Arr : genTuple<n, nArr>;

export type IntRange<
  Start extends number,
  End extends number,
  i extends Array<number> = genTuple<Start>,
  Arr extends Array<number> = [],
  Narr extends Array<number> = push<Arr, i["length"]>
> = i["length"] extends End
  ? Narr[number]
  : IntRange<Start, End, push<i>, Narr>;

export type UnionType<T> = T extends (infer P)[] ? P : never;

export type push<A extends Array<any>, X = 0> = [...A, X];

export type byte = IntRange<0, 255>;

/**
 * 找出所有unknown和undefined的类型
 */
export type FilterOptional<T extends object> = {
  [k in keyof T extends infer K
    ? unknown extends K
      ? never
      : K extends keyof T
      ? undefined extends T[K]
        ? K
        : never
      : never
    : never]: T[k];
};
export function withDefaultsOfToRefs<
  T extends object,
  D extends Partial<FilterOptional<T>> &
    Partial<Exclude<T, keyof FilterOptional<T>>>
>(obj: T, defaults: D): ToRefs<noUndef<D> & T> {
  const refObj: any = toRefs(obj);
  for (const key in defaults) {
    const k = key;
    if (isUndef(refObj[k])) {
      refObj[k] = ref(defaults[k]);
      continue;
    }
    if (isUndef(refObj[k].value)) {
      refObj[k] = computed(() => {
        if (isUndef(refObj[k].value)) {
          return defaults[k];
        }
        return refObj[k].value;
      });
    }
  }
  return refObj;
}

export function defaul<T>(
  p: T,
  defaul: T extends infer P ? (P extends undefined ? never : P) : never
): T extends infer P ? (P extends undefined ? never : P) : never {
  return p ?? (defaul as any);
}
export function condStyle<T extends StyleValue>(
  boolean: boolean,
  style: T
): T | {} {
  return boolean ? style : {};
}
export function condStyleByRef<T extends StyleValue>(
  boolean: Ref<boolean>,
  style: T
): T | {} {
  return condStyle(boolean.value, style);
}

/**
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlot(
  slot: Slot | undefined,
  wrapper: (children: VNodeArrayChildren | null) => VNodeChild
): VNodeChild {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}

function ensureValidVNode(
  vnodes: VNodeArrayChildren
): VNodeArrayChildren | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    ) {
      return false;
    }
    return true;
  })
    ? vnodes
    : null;
}

/**
 * 当输入一个false时返回undefined
 * @author meke
 * @template T
 * @param {false} condition
 * @param {T} vlaue
 * @return {*}  {undefined}
 */
export function ifReturn<T>(condition: false, vlaue: T): undefined;

/**
 * 当输入一个true时返回第二个参数
 * @author meke
 * @template T
 * @param {true} condition
 * @param {T} vlaue
 * @return {*}  {T}
 */
export function ifReturn<T>(condition: true, vlaue: T): T;
export function ifReturn<T>(condition: boolean, vlaue: T): T | undefined;
export function ifReturn<T>(condition: boolean, vlaue: T): T | undefined {
  return condition ? vlaue : undefined;
}

const reg =
  /^rgba?\((?<r> ?[0-9]{0,3}),(?<g> ?[0-9]{0,3}),(?<b> ?[0-9]{0,3})(,(?<a> ?0?\.?[0-9]{0,3})|)\)$/;
export function rgbStrToRGB(c: string): RGBAColor {
  const ret = reg.exec(c);

  const obj: any = {
    r: ret?.groups?.r ?? "0",
    g: ret?.groups?.g ?? "0",
    b: ret?.groups?.b ?? "0",
    a: ret?.groups?.a ?? "1",
  };

  Object.keys(obj).forEach((key) => {
    const value = obj[key] as string;
    if (obj[key].endsWith("%")) {
      const n = parseInt(value.slice(0, value.length - 1), 10);
      obj[key] = PE(isNaN(n) ? 0 : n);
    } else {
      const n = parseInt(value, 10);
      obj[key] = PE(isNaN(n) ? 0 : n);
    }
  });
  return rgb(obj.r, obj.g, obj.b, obj.a);
}

export function defEmitUpdate<T extends object>(
  emit: (event: string, ...args: any[]) => void,
  props: T
): <K extends keyof T>(valueName: K, value: T[K]) => void {
  return (valueName, value) => {
    emit("update:" + valueName, value);
  };
}
