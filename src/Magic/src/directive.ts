import { DirectiveArguments, DirectiveHook, ObjectDirective } from "vue";
import { wtsc } from "../..";
import { magicStyleKey } from "./index";

export const magic: ObjectDirective = {
  beforeMount(el, bindings) {
    wtsc.inject(magicStyleKey)(el, bindings.value);
  },
};
