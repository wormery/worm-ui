import { computed, Ref } from "vue";
import { modeKey } from "./keys";
import { magicEl, Mode } from "./types";

export function isItMode(
  element: Ref<magicEl | null>,
  mode: Mode
): Ref<boolean> {
  return computed(() => {
    if (element.value) {
      return element.value[modeKey].value === mode;
    }
    return mode === undefined;
  });
}
