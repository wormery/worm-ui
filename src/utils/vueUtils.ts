import { computed, Ref } from "vue";

export function isItRef<T extends Ref<any>, P extends T["value"]>(
  value: T,
  target: P
): Ref<boolean> {
  return computed(() => {
    return value.value === target;
  });
}
