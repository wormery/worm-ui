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
      primary: createColorLevel(rgb(79, 178, 51)),
      info: createColorLevel(rgb(51, 95, 255)),
      success: createColorLevel(rgb(79, 178, 51)),
      error: createColorLevel(rgb(217, 33, 73)),
      warning: createColorLevel(rgb(255, 172, 38)),
    },
    backgroundColour: p("#ffffff"),
    fontSize: p(px(16)),
    fontSizeMedium: p(px(16)),
    fontWeightStrong: p(700),
    borderRadius: p(px(16)),
    boxShadow: p(
      "0 2px 16px 0 rgba(0,0,0,0.1), 0 0 16px -2px rgba(0,0,0,0.06)"
    ),
    borderColor: p(rgb(153, 153, 153)),
    actionColor: p(rgb(235, 237, 240)),
    hoverColor: p(""),
  };

  return {
    commonly,
    menu: {
      backgroundColor: p(rgb(232, 139, 0)),
    },
  };
}
