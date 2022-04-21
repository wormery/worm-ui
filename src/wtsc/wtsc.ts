import {
  defRefPackager,
  defTypeWTSC,
  ms,
  turnOffAutoImportWarning,
} from "@wormery/wtsc";
import { Ref, ref, watchEffect, reactive } from "vue";
import defTheme from "./color";
import { rgb } from "@wormery/wtsc";
import { RemovableRef, useLocalStorage } from "@vueuse/core";
import { Data } from "../utils/object";
import { timout } from "../utils";

defRefPackager(ref);

turnOffAutoImportWarning();
export const wtsc = defTypeWTSC({
  defThemeKeys: defTheme,
  themeList: {
    dark: {
      ["淡黑"]: defTheme((v) => v, {
        backgrountColor: rgb(164, 176, 190),
        color2: rgb(87, 96, 111),
        active: rgb(47, 53, 66),
      }),
      ["深黑"]: defTheme((v) => v, {
        backgrountColor: rgb(87, 96, 111),
        color2: rgb(47, 53, 66),
        active: rgb(116, 125, 140),
      }),
      ["优雅黑"]: defTheme((v) => v, {
        backgrountColor: rgb(87, 96, 111),
        color2: rgb(44, 62, 80),
        active: rgb(149, 165, 166),
      }),
      ["蓝黑"]: defTheme((v) => v, {
        backgrountColor: rgb(39, 60, 117),
        color2: rgb(25, 42, 86),
        active: rgb(48, 51, 107),
      }),
    },
    bright: {
      ["白"]: defTheme((v) => v, {
        backgrountColor: rgb(223, 228, 234),
        color2: rgb(206, 214, 224),
        active: rgb(241, 242, 246),
      }),
    },
    red: {
      ["玫瑰"]: defTheme((v) => v, {
        backgrountColor: rgb(255, 107, 129),
        color2: rgb(255, 99, 72),
        active: rgb(255, 71, 87),
      }),
      ["cherry blossoms"]: defTheme((v) => v, {
        backgrountColor: rgb(255, 107, 129),
        color2: rgb(255, 107, 129),
        active: rgb(255, 71, 87),
      }),
    },
  },
});

export const { the } = wtsc;

const duration = 300;
export const themeName: RemovableRef<
  { __selected__: string } & Data<string, string>
> = useLocalStorage("theme", { __selected__: "default" });

watchEffect(async () => {
  wtsc.add.transition("all", ms(duration), "ease").selector("*").out();
  const __selected__ = themeName.value.__selected__;
  const color = themeName.value[__selected__];

  await timout(0);
  wtsc.setTheme(__selected__, color);
  await timout(duration);
  wtsc.selector("*").out();
});
