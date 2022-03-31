import { mixColor, rgb, RGBAColor, RGBColor, saturation } from "@wormery/wtsc";

export function createHoverColor(
  color: RGBColor,
  overlayAlpha: number = 0.15
): RGBColor {
  return mixColor(color, rgb(255, 255, 255, overlayAlpha));
}

export function createPressedColor(
  color: RGBColor,
  overlayAlpha: number = 0.3
): RGBColor {
  return mixColor(color, rgb(0, 0, 0, overlayAlpha));
}

export function createDisabledColor(
  color: RGBColor,
  sat: number = 0.3
): RGBColor {
  return saturation(mixColor(color, rgb(255, 255, 255, 1 - sat)), sat);
}

export function createTextColor(
  color: RGBColor,
  brightColor: RGBColor = rgb(255, 255, 255),
  darkColor: RGBAColor = rgb(0, 0, 0),
  dividingLine: number = 0.5
) {
  const cn = color.toNumbers();
  if ((cn.r + cn.g + cn.b) / 765 > dividingLine) {
    return darkColor;
  }
  return brightColor;
}
