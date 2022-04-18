import { VueProps } from "./props";
import { capitalize, customRef, watch, toRef, ref, Ref } from "vue";
import { call } from "../call";
import { eventNames } from "process";

export function useModifiable<Props extends object, Name extends keyof Props>(
  props: Props,
  name: Name,
  eventNameList: string[] = [
    `onUpdate${capitalize(name as string)}`,
    `onUpdate:${name}`,
  ]
): Ref<Props[Name]> {
  const propValue = toRef(props, name);

  let value: any = propValue.value;
  return customRef((track, trigger) => {
    watch(propValue, (n) => {
      value = n;
      trigger();
    });
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (value === newValue) {
          return;
        }
        value = newValue;

        eventNameList.forEach((item) => {
          call((props as any)[item] as any, value);
        });

        trigger();
      },
    };
  });
}

export function useDebouncedRef<T>(value: T, delay = 200): Ref<T> {
  let timeout: any;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

export function refX<T>(value: T, delay = 200): Ref<T> {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        console.log("get");
        return value;
      },
      set(newValue) {
        console.log("修改");

        value = newValue;
        trigger();
      },
    };
  });
}
