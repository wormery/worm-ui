import {
  defRefPackager,
  defTypeWTSC,
  ms,
  turnOffAutoImportWarning,
} from "@wormery/wtsc";
import { Ref, ref, watchEffect } from "vue";
import defTheme from "./color";
import { rgb } from "@wormery/wtsc";
import { useLocalStorage } from "@vueuse/core";

defRefPackager(ref);

turnOffAutoImportWarning();
export const wtsc = defTypeWTSC({
  defThemeKeys: defTheme,
  themeList: {
    dark: {
      dark: defTheme((v) => v, {
        backgrountColor: rgb(87, 96, 111),
        color2: rgb(44, 62, 80),
      }),
    },
    bright: {},
  },
});

export const { the } = wtsc;

export const themeName: Ref<string> = useLocalStorage("theme", "default");
watchEffect(() => {
  const duration = 500;
  wtsc.add.transition("all", ms(duration), "ease").selector("*").out();

  setTimeout(() => {
    wtsc.setTheme(themeName.value);

    setTimeout(() => {
      wtsc.selector("*").out();
    }, duration);
  });
  wtsc.setTheme(themeName.value);
});
