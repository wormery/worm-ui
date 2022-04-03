import { defRefPackager, defWTSC } from "@wormery/wtsc";
import { ref } from "vue";
import defThemeKeys from "./color";
defRefPackager(ref);
console.log("这里是def");
export const wtsc = defWTSC({
    defThemeKeys,
});
export const { the } = wtsc;
//# sourceMappingURL=index.js.map