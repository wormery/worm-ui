import { useWindowSize } from "@vueuse/core";
import { Data } from "../object";
import { computed, ComputedRef } from "vue";
import { searchRight } from "../utils";

const { width, height } = useWindowSize();
const windowSize = useWindowSize();
console.log(windowSize);

type BreakpointsOptions = Data<string, number>;
const options = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 2048,
  xxxxl: 2560,
};
export type BreakpointsOptionsType = keyof typeof options;
export const breakpoints = useBreakpoints(options);

export function useBreakpoints(options: BreakpointsOptions): {
  current: ComputedRef<BreakpointsOptionsType>;
  useCurrent<O extends { [k in BreakpointsOptionsType]?: any }>(
    o: O
  ): ComputedRef<O[any]>;
} {
  let keys = Object.keys(options);

  keys = keys.sort((k: any, b: any) => {
    return options[k] - options[b];
  });
  const data: number[] = [];
  const memory: Data<number, string> = {};

  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const e = keys[i];
    const n = options[e];
    data.push(n);
    memory[n] = e;
  }

  return {
    useCurrent(o) {
      const nums: number[] = [];
      const m: Data<number, any> = {};

      data.forEach((size) => {
        const name = memory[size];
        const value = (o as any)[name];
        if (value) {
          nums.push(size);
          m[size] = value;
        }
      });

      return computed(() => {
        return m[nums[searchRight(nums, width.value)]];
      });
    },
    current: computed(() => {
      return memory[data[searchRight(data, width.value)]] as any;
    }),
  };
}
