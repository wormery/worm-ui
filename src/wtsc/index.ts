import {
  defRefPackager,
  defTypeWTSC,
  turnOffAutoImportWarning,
} from "@wormery/wtsc";
import { ref } from "vue";
import defThemeKeys from "./color";

defRefPackager(ref);

turnOffAutoImportWarning();
export const wtsc = defTypeWTSC({
  defThemeKeys,
});

export const { the } = wtsc;
