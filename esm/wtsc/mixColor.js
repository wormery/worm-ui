import { mixColor, rgb, saturation } from "@wormery/wtsc";
export function createHoverColor(color, overlayAlpha = 0.15) {
    return mixColor(color, rgb(255, 255, 255, overlayAlpha));
}
export function createPressedColor(color, overlayAlpha = 0.3) {
    return mixColor(color, rgb(0, 0, 0, overlayAlpha));
}
export function createDisabledColor(color, sat = 0.3) {
    return saturation(mixColor(color, rgb(255, 255, 255, 1 - sat)), sat);
}
export function createTextColor(color, brightColor = rgb(255, 255, 255), darkColor = rgb(0, 0, 0), dividingLine = 0.5) {
    const cn = color.toNumbers();
    if ((cn.r + cn.g + cn.b) / 765 > dividingLine) {
        return darkColor;
    }
    return brightColor;
}
//# sourceMappingURL=mixColor.js.map