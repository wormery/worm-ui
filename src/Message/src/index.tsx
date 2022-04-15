import { defineComponent, Ref, ref, TransitionGroup, reactive } from "vue";
import { wtsc } from "../..";
import { vh, vw, rgb, px, mixColor, ms, PE } from "@wormery/wtsc";
import { useFloat, WCurtain } from "../..";
import { remove } from "@wormery/utils";
type Type = "defaul" | "info" | "success" | "warning" | "error" | "primary";
type Msg = {
  msg: string;
  type: Type;
  key: number;
  display: boolean;
  close(): void;
};

const msgPrototype = {
  close(this: Msg) {
    this.display = false;
  },
};
let isInited = false;
let msgs: Ref<Array<Msg>> | undefined;
export const message = function (msg: string, type: Type = "defaul"): Msg {
  if (!msgs) {
    msgs = createMessage();
  }

  isInited = true;
  const msgobj = Object.setPrototypeOf(
    reactive({ msg, type, key: Math.random(), display: true }),
    msgPrototype
  );
  msgs.value.unshift(msgobj);
  setTimeout(() => msgobj.close(), 5000);
  return msgobj;
};

function createMessage() {
  const msgs: Ref<Array<Msg>> = ref([]);

  const Message = defineComponent({
    name: "w-message",
    setup() {
      return () => {
        return (
          <div
            style={wtsc
              .clear()
              .add.position("absolute")
              .add.left(PE(50))
              .add.top(px(0))
              .add.transform(`translateX(${-50}%)`)
              .if(msgs.value.length === 0, () => {
                wtsc.add.display("none");
              })
              .add.width(px(400))
              .add.zIndex("10")
              .add.pointerEvents("none")
              .out()}
          >
            {msgs.value.map((msg) => {
              const c = wtsc.the.commonly.type[msg.type].main.color;
              const color = mixColor(
                wtsc.inject(c) ?? rgb(255, 255, 255, 0),
                rgb(255, 255, 255, 1)
              );

              return (
                <WCurtain
                  key={msg.key}
                  display={msg.display}
                  onHide={() => {
                    remove(msgs.value, msg);
                  }}
                >
                  <div
                    onClick={() => {
                      msg.close();
                    }}
                    style={wtsc.add
                      .minHeight(px(20))
                      .add.width(PE(100))
                      .add.margin(px(8), px(0))
                      .add.padding(px(20))
                      .add.backgroundColor(color)
                      .add.borderRadius(px(5))
                      .add.boxShadow(px(1), px(2), px(10), rgb(0, 0, 0, 0.5))
                      .add.pointerEvents("auto")
                      .out()}
                  >
                    {msg.msg}
                  </div>
                </WCurtain>
              );
            })}
          </div>
        );
      };
    },
  });

  useFloat(Message);

  return msgs;
}
