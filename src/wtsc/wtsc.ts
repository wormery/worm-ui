import {
  defRefPackager,
  defTypeWTSC,
  turnOffAutoImportWarning,
} from "@wormery/wtsc";
import { ref } from "vue";
import defTheme from "./color";
import { rgb } from "@wormery/wtsc";

defRefPackager(ref);

turnOffAutoImportWarning();
export const wtsc = defTypeWTSC({
  defThemeKeys: defTheme,
  themeList: {
    dark: {
      dark: defTheme((v) => v, {
        backgrountColor: rgb(87, 96, 111),
        color2: rgb(87, 96, 111),
      }),
    },
    bright: {},
  },
});

export const { the } = wtsc;
