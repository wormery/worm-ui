import { Transition, ref, Teleport, Ref, computed, h } from "vue";
import { Queue } from "./Queue";
import { isNotUndef, lazyFun, isString } from "@wormery/utils";
import { wtsc } from "../../";
import { vh, vw, px } from "@wormery/wtsc";
import { createApp } from "vue";

export const toast = lazyFun(() => {
  const divDom = document.createElement("div");
  document.body.append(divDom);
  const w = wtsc.box;

  const msg: Ref<undefined | string> = ref("");

  const msgs = new Queue<string>();

  let isShowing = false;

  let autoDisplayNoneTimeouter: NodeJS.Timeout | null = null;

  const show = () => {
    // 检测是否是执行状态
    if (isShowing) {
      return;
    }

    // 进入执行状态
    isShowing = true;

    // 取消隐藏
    autoDisplayNoneTimeouter && clearTimeout(autoDisplayNoneTimeouter);
    isDisplayNone.value = false;

    // 开始执行
    next();
  };

  // 动画时间
  const duration = 300;

  // 显示时间
  const displayTime = 1000;

  // 间隔时间
  const intervalTime = 1000;

  const next = () => {
    const _msg = msgs.dequeue();

    if (isString(_msg)) {
      msg.value = _msg;

      opacity.value = true;
      autoDisplayNoneTimeouter = setTimeout(() => {
        next();
      }, duration + displayTime + intervalTime);
    } else {
      isShowing = false;

      setTimeout(() => {
        isDisplayNone.value = true;
      }, duration + displayTime);
    }
  };
  const isDisplayNone = ref(false);
  const style = computed(() => {
    // 超时隐藏
    setTimeout(() => {
      opacity.value = false;
    }, displayTime);

    w.clean;
    if (isDisplayNone.value) {
      return w.add.display("none").out();
    }
    w.add
      .position("absolute")
      .add.left(vw(50))
      .add.top(vh(50))
      .add.transform("translateX(-50%) translateY(-50%)")

      .add.padding(px(10))
      .add.zIndex("65536")
      .add.borderRadius(px(8))

      .add.color("aliceblue")
      .add.backgroundColor("#00000077")

      .add.userSelect("none")
      .add.pointerEvents("none")
      .add.transition(`opacity ${duration}ms ease`);

    // 超时透明
    if (!opacity.value) {
      w.add.opacity("0");
    }

    return w.out();
  });

  const opacity = ref(false);
  createApp({
    render() {
      return (
        <>
          <Teleport to={"body"}>
            <div class="w-toast" style={style.value}>
              {msg.value}
            </div>
          </Teleport>
        </>
      );
    },
  }).mount(divDom);
  return (msg: string) => {
    msgs.enqueue(msg);
    show();
  };
});
