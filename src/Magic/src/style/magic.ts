import { px } from "@wormery/wtsc";
import { AddRest } from "@wormery/wtsc/dist/core/WTSC/types";
import { computed } from "vue";
import {
  duration,
  element,
  enableTransition,
  height,
  isSelection,
  isShow,
  left,
  top,
  width,
} from "../status";
import w from "../wtsc";

const magicStyle = computed(() => {
  const _transition: string[] = [];

  w.clean.add.position("absolute");

  if (!isShow.value) {
    w.add.opacity("0");
    _transition.push(`opacity ${duration}ms ${duration}ms ease`);
  }

  w.if(enableTransition.value, () => {
    _transition.push(`top ${duration}ms cubic-bezier(0, 0.6, 0, 0.6)`);
    _transition.push(`left ${duration}ms cubic-bezier(0, 0.6, 0, 0.6)`);
    _transition.push(`width ${duration}ms cubic-bezier(0, 0.5, 0, 0.5)`);
    _transition.push(`height ${duration}ms cubic-bezier(0, 0.5, 0, 0.5)`);
  });

  const el = element.value;
  let _useAbsolutePositioning = true;

  if (el) {
    if (isSelection.value) {
      _useAbsolutePositioning = false;

      const rect = el.getBoundingClientRect();
      w.add
        .top(px(rect.top))
        .add.left(px(rect.left))
        .add.height(px(rect.height))
        .add.width(px(el.offsetWidth));
    }
  }

  if (_useAbsolutePositioning) {
    w.add
      .top(px(top.value - height.value / 2))
      .add.left(px(left.value - width.value / 2))
      .add.height(px(height.value))
      .add.width(px(width.value));
  }

  //禁止点击
  w.add.pointerEvents("none");
  //最顶层
  w.add.zIndex("65536");
  //所有动画样式
  w.add("transition", _transition.join(","));

  return w.out();
});
export default magicStyle;
