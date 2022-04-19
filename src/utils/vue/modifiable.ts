import { customRef, watch, toRef, Ref } from "vue";
import { calls } from "../call";
import { genOnUpdateKeys } from "..";
import { FilterString } from "../string";

export function useModifiable<
  Props extends object,
  Name extends FilterString<keyof Props>
>(
  props: Props,
  name: Name,
  eventNameList: string[] = genOnUpdateKeys(name)
): Ref<Props[Name]> {
  const propValue = toRef(props, name);

  return customRef((track, trigger) => {
    let value: any = propValue.value;
    watch(propValue, (n, o) => {
      if (value === n) {
        return;
      }
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

        calls(props, eventNameList, [value]);

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
