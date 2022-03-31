import { defineComponent, PropType, onMounted, onUnmounted } from "vue";

import {
  isNumber,
  isString,
  isNotUndef,
  isTure,
  isUndef,
} from "@wormery/utils";
import { computed, Ref, ref, StyleValue, toRefs } from "vue";
import { toPX, ifReturn } from "../../../utils/utils";
import { wtsc } from "../../../wtsc";
import { resolveWrappedSlot, withDefaultsOfToRefs } from "../../../utils/utils";
import { PE } from "@wormery/wtsc";
const props = {
  title: String as PropType<string | undefined>,
  content: String as PropType<string | undefined>,
  coverImg: String as PropType<string | undefined>,
  borderRadius: String as PropType<string>,
  width: String as PropType<string>,
  height: String as PropType<string>,
};
export default defineComponent({
  props,
  setup(props, { slots }) {
    const { title, content, coverImg, borderRadius, width, height } =
      withDefaultsOfToRefs(props, {
        borderRadius: "10px",
        width: "300px",
        height: "auto",
      });

    const w = wtsc.scoped();

    onUnmounted(() => {
      w.unmount();
    });

    const cardRef: Ref<any> = ref(null);

    const { bgColor } = toRefs({ bgColor: "#ededef" });

    const cardStyle = computed(() =>
      w.clean.add
        .display("flex")
        .add.flexDirection("column")
        .add.width(width.value)
        .add.height(toPX(height.value))
        .add.backgroundColor(bgColor.value)
        .add.borderRadius(borderRadius.value)
        .add.boxShadow("0px 1px 2px #000000aa")
        .add.overflow("hidden")
        .out()
    );

    const contentPlopStyle = computed(() =>
      w.clean.add.margin("1rem").add.fontSize("1rem").add.flexGrow("0").out()
    );

    const coverImgStyle = computed(() => {
      w.clean.add
        .height(PE(100))
        .add.width(PE(100))
        .add.backgroundImage(`url(${coverImg.value})`)
        .add.backgroundPosition("center")
        .add.backgroundSize("cover")
        .add.backgroundRepeat("no-repeat");

      return w.out();
    });

    const coverStyle = computed(() => {
      w.clean.add
        .flexGrow("1")
        .if(
          isNotUndef(coverImg.value) &&
            (height.value == "auto" || width.value.endsWith("%")),
          () => {
            const cordWidth = cardRef?.value?.offsetWidth;
            if (isNumber(cordWidth)) {
              w.add.height(toPX(cordWidth * 0.618)).add.width(width.value);
            }
          }
        );

      return w.out();
    });

    const titleHStyle = computed(() => {
      w.clean.add.fontSize("1.3em");

      return w.out();
    });

    const titleStyle = computed(() => {
      w.clean.add.flexGrow("0").add.margin("0px 1rem");

      return w.out();
    });
    return () => (
      <>
        <div
          ref={($el) => (cardRef.value = $el)}
          class={["w-card"]}
          style={cardStyle.value}
        >
          {ifReturn(
            isTure(slots.cover) || isString(coverImg.value),
            <div class="cover" style={[coverStyle.value]}>
              {resolveWrappedSlot(slots.cover, () =>
                ifReturn(
                  isNotUndef(coverImg.value),
                  <div style={[coverImgStyle.value]} class="coverImg"></div>
                )
              )}
            </div>
          )}
          {ifReturn(
            !!slots.title || isString(title.value),
            <div class="title" style={titleStyle.value}>
              {resolveWrappedSlot(slots.title, () =>
                ifReturn(
                  isString(title.value),
                  <h4 class={["titleh1"]} style={titleHStyle.value}>
                    {title.value}
                  </h4>
                )
              )}
            </div>
          )}
          {ifReturn(
            !!slots.default || isString(content.value),
            <div class="content" style={contentPlopStyle.value}>
              {resolveWrappedSlot(slots.default, () =>
                ifReturn(
                  isString(content.value),
                  <div class="content-slot">{content.value}</div>
                )
              )}
            </div>
          )}
        </div>
      </>
    );
  },
});
