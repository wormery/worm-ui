import { cubicBezier, ms, PE, rgb, s } from "@wormery/wtsc";

import { AddRest } from "@wormery/wtsc/dist/core/WTSC/types";
import { computed, Transition } from "vue";
import {
  enableTransition,
  backgrountColor,
  duration,
  element,
  isClicked,
  isDefault,
  isDisabled,
  isLoading,
  isSelection,
} from "../status";
import { rgbStrToRGB } from "../../../utils";
import w from "../wtsc";
import { lodingAnmaiton } from "./animation";
const signStyle = computed(() => {
  let _isCircle = isDefault.value;
  let _useClick = true;
  let _useAutoColor = isDefault.value;
  const _transition: AddRest[] = [];

  w.add.height(PE(100)).add.width(PE(100));

  _transition.push(["background-color", ms(duration * 15), "ease"]);

  if (enableTransition.value) {
    _transition.push([
      "border-radius",
      ms(duration),
      cubicBezier(0, 0.5, 0, 0.5),
    ]);
    _transition.push([`background-color`, `${duration}ms`, `ease`]);
  }

  // 禁用的
  if (isDisabled.value) {
    _useClick = false;

    _transition.push([`border`, `${duration * 4}ms`, `ease`]);

    w.add
      .border("5px solid")
      .add.borderColor(rgb(255, 0, 0, 0.8))
      .add.boxSizing("border-box");

    w.add.backgroundColor(rgb(0, 0, 0, 0));

    _isCircle = true;
  }

  //选择模式
  if (isSelection.value) {
    _transition.push([`background-color`, `${duration}ms`, `ease`]);
    const el = element.value;
    if (el) {
      const c = window.getComputedStyle(el, null)["backgroundColor"];
      w.add.borderRadius(el.style.borderRadius).add.background(rgbStrToRGB(c));
    }
  }

  // 加载模式动画
  if (isLoading.value) {
    _isCircle = true;
    _useAutoColor = true;
    _useClick = false;
    w.add
      .boxSizing("border-box")
      .add.animation(lodingAnmaiton, s(1), "infinite", "ease");
    _transition.push(["animation", `${duration}ms`, "ease"]);
  }

  // 默认颜色
  if (_useAutoColor) {
    w.add.backgroundColor(backgrountColor.value);
  }

  // 使用圆
  if (_isCircle) {
    w.add.borderRadius(PE(50));
  }

  // 使用单击动画
  if (_useClick) {
    _transition.push([
      `transform`,
      `${duration}ms`,
      `cubic-bezier(0, .5, 0, .5)`,
    ]);

    if (isClicked.value) {
      w.add.transform("scale(0.4)");
    }
  }

  // Object.setPrototypeOf(_transition, null);
  w.add("transition", ..._transition);
  const v = w.out();
  return v;
});

export default signStyle;
