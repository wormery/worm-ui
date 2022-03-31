import {
  defineComponent,
  onBeforeUnmount,
  Transition,
  provide,
  ref,
  toRefs,
  Teleport,
  watch,
  computed,
  Ref,
  useAttrs,
} from "vue";
import { toastInjectionKey } from "./toast";
import { genToastApiInjection, ToastApiInjection } from "..";
import { Show } from "../../@SlidingSwitching/src/enums";
import { Queue } from "./Queue";
import { isNotUndef, isString } from "@wormery/utils";
import { wtsc } from "../../../wtsc";
import { vh, vw, px } from "@wormery/wtsc";
import { defaults } from "../../../utils/utils";
import { PropType } from "vue";

type Props = { to?: string };
const props = { to: String as PropType<string> };
export default defineComponent({
  props,
  setup(props, { slots, attrs }) {
    const { to } = toRefs(attrs as Props);
    const w = wtsc.box;

    const msg: Ref<undefined | string> = ref("");

    const msgs = new Queue<string>();

    let isShowing = false;
    const show = () => {
      if (isShowing) {
        return;
      }
      isShowing = true;
      next();
    };
    const next = () => {
      const _msg = msgs.dequeue();
      if (isNotUndef(_msg)) {
        msg.value = _msg;
        opacity.value = true;
        new Promise((resolve, reject) => {
          setTimeout((provide) => {
            opacity.value = false;
            resolve(undefined);
          }, 2000);
        }).then(() => {
          setTimeout(next, 500);
        });
      } else {
        isShowing = false;
      }
    };

    const api: ToastApiInjection = genToastApiInjection(msgs, show);

    provide(toastInjectionKey, api);

    const opacity = ref(false);

    return () => (
      <>
        <Teleport to={to ?? "body"}>
          <Transition>
            <div
              class="w-toast"
              style={[
                w.clean.add
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
                  .if(!opacity.value, () => {
                    w.clean.add.display("none");
                  })
                  .out(),
              ]}
            >
              {msg.value}
            </div>
          </Transition>
        </Teleport>
        {slots?.default?.()}
      </>
    );
  },
});
