import { createApp, Ref, ref, watchEffect } from "vue";
import { lazyFun } from "@wormery/utils";
import { wtsc } from "../../..";
import { vh, vw, rgb, px } from "@wormery/wtsc";
type Type = "defaul" | "info" | "success" | "warning" | "error" | "primary";
type Msg = {
  msg: string;
  type: Type;
};

export const message = lazyFun(() => {
  const mountEl = document.createElement("div");
  mountEl.setAttribute(
    "style",
    wtsc.add.position("absolute").add.top(px(0)).add.left(px(0)).out()
  );
  document.body.appendChild(mountEl);

  const msgs: Ref<Array<Msg>> = ref([]);

  const dialog = createApp({
    name: "w-message",
    setup() {
      return {};
    },
    render() {
      return (
        <div
          style={wtsc.add
            .position("absolute")
            .add.display("flex")
            // .add.justifyContent("center")
            .add.alignItems("center")
            .add.flexFlow("column")

            .if(msgs.value.length === 0, () => {
              wtsc.add.display("none");
            })

            .add.height(vh(100))
            .add.width(vw(100))
            .add.zIndex("65536")
            .add.pointerEvents("none")
            .out()}
        >
          {msgs.value.map((msg) => {
            const c = wtsc.the.commonly.type[msg.type].main.color;
            return (
              <div
                style={wtsc.add
                  .height(px(20))
                  .add.width(px(400))
                  .add.margin(px(20))
                  .add.padding(px(20))
                  .add.backgroundColor(c)
                  .add.borderRadius(px(5))
                  .add.boxShadow(px(1), px(2), px(10), rgb(0, 0, 0, 0.5))
                  .out()}
              >
                {msg.msg}
              </div>
            );
          })}
        </div>
      );
    },
  });

  dialog.mount(mountEl);

  return function (msg: string, type: Type = "defaul"): void {
    const msgobj = { msg, type };
    msgs.value.push(msgobj);
    setTimeout(() => {
      const ms = msgs.value;
      const i = ms.indexOf(msgobj);

      if (typeof i === "number") {
        ms.splice(i, 1);
      }
    }, 5000);
  };
});
