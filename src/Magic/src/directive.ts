import {
  DirectiveArguments,
  DirectiveHook,
  markRaw,
  ObjectDirective,
  ref,
} from "vue";
import { duration, element, enableTransition } from "./status";
import { eventListenerKey, modeKey } from "./keys";
import { magicEl } from "./types";

type type = "selection" | "disabled";
export const magic: ObjectDirective<any, type> = {
  beforeMount(el, bindings) {
    bindMagic(el, bindings.value);
  },
  beforeUnmount(el) {
    unBindMagic(el);
  },
  beforeUpdate(el, bindings) {
    el[modeKey].value = bindings.value;
  },
};

const mouseenter = (el: magicEl) => {
  const v = element.value;
  if (v !== el) {
    enableTransition.value = true;
    element.value = el as any;
  }
};

let timeouter: NodeJS.Timeout | null = null;

const mouseleave = (el: magicEl) => {
  el.style.transform = `translate(0px,0px)`;

  element.value = null as any as any;
  enableTransition.value = true;
  timeouter && clearTimeout(timeouter);
  timeouter = setTimeout(() => {
    enableTransition.value = false;
  }, duration);
};

export function bindMagic(el: HTMLDivElement, _mode: string) {
  markRaw(el);

  (el as any)[modeKey] = ref(_mode);

  el.addEventListener("mouseenter", () => mouseenter(el as any));

  el.addEventListener("mouseleave", () => mouseleave(el as any));

  (el as any)[eventListenerKey] = { mouseenter, mouseleave };
}

export function unBindMagic(el: HTMLDivElement) {
  const l = el as magicEl;
  const eventListener = l[eventListenerKey];
  Object.keys(eventListener).forEach((item) =>
    l.removeEventListener(item, (eventListener as any)[item])
  );
}
