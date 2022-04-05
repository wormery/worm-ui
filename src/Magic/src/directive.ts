import { DirectiveArguments, DirectiveHook, ObjectDirective } from "vue";
import { bindMagic } from "..";
import { wtsc } from "../..";

export const magic: ObjectDirective = {
  beforeMount(el, bindings) {
    bindMagic(el, bindings.value);
  },
};
