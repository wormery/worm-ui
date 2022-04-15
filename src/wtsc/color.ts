import { Inject, rgb, px, RGBColor } from "@wormery/wtsc";
import { defaul } from "../utils/utils";
import { provide } from "vue";
import {
  createHoverColor,
  createPressedColor,
  createDisabledColor,
  createTextColor,
} from "./mixColor";

export default function defThemeKeys(p: Inject["provide"]) {
  const createColorLevel = (color: RGBColor) => {
    const textColor = createTextColor(color);
    const text = p(textColor);
    return {
      main: {
        color: p(color),
        text,
      },
      hover: {
        color: p(createHoverColor(color)),
        text,
      },
      pressed: {
        color: p(createPressedColor(color)),
        text,
      },
      disabled: {
        color: p(createDisabledColor(color)),
        text: p(createDisabledColor(textColor)),
      },
    };
  };
  const commonly = {
    type: {
      defaul: createColorLevel(rgb(233, 233, 233)),
      primary: createColorLevel(rgb(30, 144, 255)),
      info: createColorLevel(rgb(164, 176, 190)),
      success: createColorLevel(rgb(46, 213, 115)),
      error: createColorLevel(rgb(255, 71, 87)),
      warning: createColorLevel(rgb(249, 202, 36)),
    },
    backgroundColour: p("#ffffff" as const),
    color2: p(rgb(232, 139, 0)),
    fontSize: p(px(16)),
    fontSizeMedium: p(px(20)),
    fontWeightStrong: p(700),
    borderRadius: p(px(5)),
    borderRadius7: p(px(7)),
    borderRadius9: p(px(9)),
    boxShadow: p(
      "0 2px 16px 0 rgba(0,0,0,0.1), 0 0 16px -2px rgba(0,0,0,0.06)"
    ),
    borderColor: p(rgb(153, 153, 153)),
    actionColor: p(rgb(235, 237, 240)),
    hoverColor: p(""),
    rowHeight: p(px(38)),
  };

  return {
    commonly,
    menu: {
      backgroundColor: p(rgb(232, 139, 0)),
    },
  };
}
