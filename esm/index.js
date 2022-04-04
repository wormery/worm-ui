export * from "./com";
import * as com from "./com";
export * from "./wtsc";
const install = (app) => {
    console.group("已注册的");
    for (const key in com) {
        const element = com[key];
        if ("install" in element) {
            console.log(key);
            app.use(element);
        }
    }
    console.groupEnd();
};
export default { install };
//# sourceMappingURL=index.js.map