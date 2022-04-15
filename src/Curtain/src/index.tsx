import { ms, PE, px, s } from "@wormery/wtsc";
import {
  defineComponent,
  ref,
  onMounted,
  Transition,
  PropType,
  toRef,
  watch,
  watchEffect,
  computed,
} from "vue";
import { w } from "./wtsc";
import { call, EventListener } from "../../utils";
import { toRefs } from "vue";

export default defineComponent({
  name: "WCurtain",
  props: {
    display: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    onHide: {
      type: [Function, Array] as PropType<EventListener<() => void>>,
    },
  },
  setup(props, { slots }) {
    const { display, onHide } = toRefs(props);

    const isOpened = ref(true),
      duration = ref(300),
      el = ref(null as HTMLDivElement | null),
      height = ref(0),
      width = ref(0),
      isShow = ref(false);

    onMounted(() => {
      const rect = el.value?.getBoundingClientRect();
      height.value = rect?.height ?? 0;
      width.value = rect?.width ?? 0;

      setTimeout(() => {
        isShow.value = true;
      }, duration.value / 2);
    });

    watchEffect(() => {
      const _display = display.value;
      isShow.value = _display;
      setTimeout(() => {
        isOpened.value = _display;

        if (!_display) {
          setTimeout(() => {
            call(onHide.value);
          }, duration.value);
        }
      }, duration.value / 2);
    });
    const style = computed(() => {
      const _display = isOpened.value;
      w.clear().add.overflow("hidden");
      if (_display) {
        w.add
          .height(px(height.value))
          .add.width(PE(100))
          .add.transition("height", ms(duration.value), "ease");
      } else {
        w.add
          .height(px(0))
          .add.width(px(width.value))
          .add.transition("height", ms(duration.value), "ease");
      }

      return w.out();
    });
    return () => (
      <div style={style.value}>
        <div
          ref={(e) => (el.value = e as any)}
          style={w
            .clear()
            .add.width(PE(100))
            .add.transition("all", ms(duration.value), "ease")
            .add.opacity(isShow.value ? 1 : 0)
            .add.display("inline-block")
            .out()}
        >
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
