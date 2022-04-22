import { ms, PE, px } from "@wormery/wtsc";
import { defineComponent, ref, computed, toRefs, inject, warn, Ref } from "vue";
import { wtsc } from "../../wtsc";
import { useScopedWtsc } from "../../wtsc/utils/useWTSC";
import { numOfColKey, occupyKey, spaceKey, unitKey, spacesKey } from "./Row";
const name = "WCol";
const sw = wtsc.scoped(name);

export const WCol = defineComponent({
  name,
  props: {
    span: {
      type: Number,
      default: 1,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    const w = useScopedWtsc(name);
    const { span, offset } = toRefs(props);

    return () => {
      return (
        <>
          {offset.value > 0 ? block(w, offset, undefined) : undefined}
          {block(w, span, slots.default?.())}
        </>
      );
    };
  },
});

const block = (w: typeof wtsc, span: Ref<number>, content?: any) => {
  const space = computed(() => {
    return w.inject(spacesKey);
  });

  return (
    <div
      style={w.add
        .width(
          `calc(${w.inject(unitKey, 0) * span.value}% - ${space.value.x * 2}px)`
        )
        .add.padding(px(space.value.y), px(space.value.x))
        .add.transition("all", ms(300), "ease")
        .out()}
    >
      {content}
    </div>
  );
};
