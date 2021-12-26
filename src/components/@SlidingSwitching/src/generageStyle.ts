import type { Ref } from "vue";
import { StyleGenerate, TransformGenerate } from "../../../utils/CSSUtils";
import { PlayProgress } from "./enums";

export function generageLeftStyle(plss: Ref<PlayProgress>) {
  let sliderStyle;
  let content0Style;
  let elemt0Style;
  let content1Style;
  let elemt1Style;

  /** 滑动的窗体 */
  sliderStyle = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(-50 * plss.value + "%")
    )
    .return();

  /** 第一个显示窗格 */
  content0Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(0 + "%"))
    .return();

  /** 生成第一个显示的组件窗口样式信息，存储了位置等参数 */
  elemt0Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(0 + 100 * plss.value + "%")
    )
    .return();

  content1Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(100 + "%"))
    .return();

  elemt1Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(-100 + 100 * plss.value + "%")
    )
    .return();

  return {
    sliderStyle: sliderStyle,
    content0Style: content0Style,
    elemt0Style: elemt0Style,
    content1Style: content1Style,
    elemt1Style: elemt1Style,
  };
}
export function generageRightShow0Style(plss: Ref<PlayProgress>) {
  let sliderStyle;
  let content0Style;
  let elemt0Style;
  let content1Style;
  let elemt1Style;
  console.log(plss.value);

  /** 滑动的窗体 */
  sliderStyle = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(0 + -50 * plss.value + "%")
    )
    .return();

  /** 第一个窗口 */
  content0Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(100 + "%"))
    .return();

  /** 第二个窗口 */
  content1Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(0 + "%"))
    .return();

  elemt0Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(-100 + 100 * plss.value + "%")
    )
    .return();

  elemt1Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(0 + 100 * plss.value + "%")
    )
    .return();

  return {
    sliderStyle: sliderStyle,
    content0Style: content0Style,
    elemt0Style: elemt0Style,
    content1Style: content1Style,
    elemt1Style: elemt1Style,
  };
}

export function generageRightShow1Style(plss: Ref<PlayProgress>) {
  let sliderStyle;
  let content0Style;
  let elemt0Style;
  let content1Style;
  let elemt1Style;
  /** 滑动的窗体 */
  sliderStyle = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(0 + -50 * plss.value + "%")
    )
    .return();

  /** 第一个窗口 */
  content0Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(0 + "%"))
    .return();

  /** 第二个窗口 */
  content1Style = StyleGenerate.newClass()
    .addTransform(TransformGenerate.newClass().addTranslate(100 + "%"))
    .return();

  elemt0Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(0 + 100 * plss.value + "%")
    )
    .return();

  elemt1Style = StyleGenerate.newClass()
    .addTransform(
      TransformGenerate.newClass().addTranslate(-100 + 100 * plss.value + "%")
    )
    .return();

  return {
    sliderStyle: sliderStyle,
    content0Style: content0Style,
    elemt0Style: elemt0Style,
    content1Style: content1Style,
    elemt1Style: elemt1Style,
  };
}
