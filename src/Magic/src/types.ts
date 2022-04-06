import { Ref } from "vue";
import { eventListenerKey, modeKey } from "./keys";

export interface magicEl extends HTMLDivElement {
  [modeKey]: Ref<Mode>;
  [eventListenerKey]: {
    mouseenter: (e: any) => void;
    mouseleave: (e: any) => void;
  };
}

export type Mode = undefined | "loading" | "disabled" | "selection";
