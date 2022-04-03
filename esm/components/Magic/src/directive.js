import { wtsc } from "../../..";
import { magicStyleKey } from "./index";
export const magic = {
    beforeMount(el, bindings) {
        wtsc.inject(magicStyleKey)(el, bindings.value);
    },
};
//# sourceMappingURL=directive.js.map