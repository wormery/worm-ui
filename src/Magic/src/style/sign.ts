import { PE, rgb } from "@wormery/wtsc";
import { computed } from "vue";
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
  const _transition: string[] = [];

  w.add.height(PE(100)).add.width(PE(100));

  _transition.push(`background-color ${duration * 15}ms ease`);

  if (enableTransition.value) {
    _transition.push(
      `border-radius ${duration}ms cubic-bezier(0, 0.5, 0, 0.5)`
    );
    _transition.push(`background-color ${duration}ms ease`);
  }

  // 禁用的
  if (isDisabled.value) {
    _useClick = false;
    w.add
      .border("5px solid")
      .add.borderColor(rgb(255, 0, 0, 0.8))
      .add.boxSizing("border-box");

    _transition.push(`border ${duration * 4}ms ease`);

    w.add.backgroundColor(rgb(0, 0, 0, 0));

    _isCircle = true;
  }

  //选择模式
  if (isSelection.value) {
    _transition.push(`background-color ${duration}ms ease`);
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
      .add.animation(`${lodingAnmaiton} 1s infinite ease`);
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
    _transition.push(`transform ${duration}ms cubic-bezier(0, .5, 0, .5)`);

    if (isClicked.value) {
      w.add.transform("scale(0.4)");
    }
  }

  w.add.transition(_transition.join(","));
  return w.out();
});

export default signStyle;
