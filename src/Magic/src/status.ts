import { rgb, RGBAColor } from "@wormery/wtsc";
import { Ref, ref, shallowRef } from "vue";
import { magicEl } from "./types";
import { isItMode } from "./utils";

export const element = shallowRef(null as any as magicEl | null);

export const isLoading = isItMode(element, "loading");
export const isDisabled = isItMode(element, "disabled");
export const isSelection = isItMode(element, "selection");
export const isDefault = isItMode(element, undefined);

export const duration = 200;
export const enableTransition = ref(false);
export const left = shallowRef(0);
export const top = shallowRef(0);

export const isClicked = ref(false);

export const backgrountColor: Ref<RGBAColor> = shallowRef(
  rgb(255, 255, 255, 0.1)
);
export const currentColor = shallowRef(rgb(255, 255, 255, 0.1));

export let size = 18;
export const height = shallowRef(size);
export const width = shallowRef(size);

export const isShow = ref(true);