import { defRefPackager, defWTSC } from "@wormery/wtsc";
import { ref } from "vue";
import defThemeKeys from "./color";

defRefPackager(ref);

export const wtsc = defWTSC({
  defThemeKeys,
});
