import { DefineComponent, defineComponent } from "vue";
import { useInstall } from "../install";

export const defCom: typeof defineComponent = function (options: any) {
  const com = defineComponent(options);
  useInstall(com);
  return com;
} as any;
