export * from "./com";
import { hasOwn } from "@wormery/utils";
import * as com from "./com";
export * from "./wtsc";
export * from "./utils";
export * from "./Ship";
export { defSyncProps as syncProps } from "./utils";

const install = (app: any) => {
  console.group("已全局注册的组件");
  for (const key in com) {
    const element = (com as any)[key];
    if ("install" in element) {
      console.log(key);
      app.use(element);
    }
  }
  console.groupEnd();
};

export default { install };
