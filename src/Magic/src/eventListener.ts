import { px, rgb } from "@wormery/wtsc";
import {
  backgrountColor,
  currentColor,
  element,
  isClicked,
  isDefault,
  isDisabled,
  isLoading,
  isShow,
  left,
  top,
} from "./status";
import { rgbStrToRGB } from "../../utils";
import { modeKey } from "./keys";

let isRuned = true;
export const onMousemove = (e: MouseEvent) => {
  // 限流
  if (isRuned) {
    left.value = e.clientX;
    top.value = e.clientY;

    const el = element.value;

    let useAutoColor = true;
    if (el && el[modeKey].value === "loading") {
      useAutoColor = false;
    }
    //颜色处理
    if (useAutoColor) {
      const target: HTMLDivElement | null = e.target as any;
      if (target) {
        const s = window.getComputedStyle(target, null)["backgroundColor"];

        const v = rgbStrToRGB(s);
        currentColor.value = v;
        const nv = v.toNumbers();
        const c = nv.r + nv.g + nv.b;
        if ((c / 255) * 3 > 0.5) {
          backgrountColor.value = rgb(255, 255, 255, 0.5);
        } else {
          backgrountColor.value = rgb(0, 0, 0, 0.5);
        }
      }
    }

    isShow.value = true;

    if (!el) {
      return;
    }
    let useJellyAnimation = true;
    if (isDefault.value || isLoading.value || isDisabled.value) {
      useJellyAnimation = false;
    }

    if (useJellyAnimation) {
      // 果冻效果
      const rect = el.getBoundingClientRect();
      const l = rect.left;
      const T = rect.top;

      const style = el.style;

      style.transition = `all .1s ease`;

      const xo = (left.value - l - el.offsetWidth / 2) / 10;
      const yo = (top.value - T - el.offsetHeight / 2) / 10;

      style.transform = `rotateY(${xo * 2}deg) rotateX(${
        yo * 2
      }deg)   scale(1.05) translate(${px(xo).toString()}, ${px(
        yo
      ).toString()})`;
    }

    isRuned = false;
    setTimeout(() => {
      isRuned = true;
    }, 20);
  }
};
export const windowBlur = () => {
  isShow.value = false;
};
export const windowMousedown = () => {
  isClicked.value = true;
};
export const windowMouseup = () => {
  isClicked.value = false;
};
