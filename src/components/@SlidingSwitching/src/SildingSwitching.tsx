import {
  computed,
  withDefaults,
  defineProps,
  defineComponent,
  StyleValue,
  toRefs,
  watch,
  ref,
} from "vue";
import { ControlType } from "..";
import { Direction, PlayProgress, Show } from "./enums";
import { StyleGenerate, TransformGenerate } from "../../../utils/CSSUtils";
import Clas from "./style";

const VueComponent = {
  render: () => {},
};
const props = {
  width: {
    type: String,
    default: "200px",
  },
  height: {
    type: String,
    default: "200px",
  },
  elem: {
    type: Object,
    default: null,
  },
  transitionDurition: {
    type: Number,
    default: 800,
  },
};

export default defineComponent({
  props,
  setup(props, { slots, emit }) {
    const { elem, transitionDurition } = toRefs(props as any);
    const elemt0 = ref(elem.value);
    const elemt1 = ref(null);

    const show = ref(Show.ELEM0);
    // const plss = ref(PlayProgress.STAR);
    const plss = ref(PlayProgress.STAR);
    const direction = ref(Direction.TO_RIGHT);

    const isClosedTransition = ref(true);
    const transitionStyle = computed(() => {
      StyleGenerate.newClass()
        .addTransition("transform", transitionDurition.value)
        .return();

      if (!isClosedTransition.value) {
        return StyleGenerate.newClass()
          .addTransition("transform", transitionDurition.value)
          .return();
      } else {
        return StyleGenerate.newClass().return();
      }
    });

    /** @type {value:StyleValue} */
    const sliderStyle = computed(() => {
      if (direction.value == Direction.TO_RIGHT) {
        return StyleGenerate.newClass()
          .addTransform(
            TransformGenerate.newClass().addTranslate(-50 * plss.value + "%")
          )
          .return();
      }
      return {};
    });

    const content0Style = computed(() => {
      if (direction.value == Direction.TO_RIGHT) {
        return StyleGenerate.newClass()
          .addTransform(TransformGenerate.newClass().addTranslate(0 + "%"))
          .return();
      }
      return {};
    });

    const elemt0Style = computed(() => {
      if (direction.value == Direction.TO_RIGHT) {
        return StyleGenerate.newClass()
          .addTransform(
            TransformGenerate.newClass().addTranslate(
              0 + 100 * plss.value + "%"
            )
          )
          .return();
      }
      return {};
    });

    const content1Style = computed(() => {
      if (direction.value == Direction.TO_RIGHT) {
        return StyleGenerate.newClass()
          .addTransform(TransformGenerate.newClass().addTranslate(100 + "%"))
          .return();
      }
      return {};
    });

    const elemt1Style = computed(() => {
      if (direction.value == Direction.TO_RIGHT) {
        return StyleGenerate.newClass()
          .addTransform(
            TransformGenerate.newClass().addTranslate(
              -100 + 100 * plss.value + "%"
            )
          )
          .return();
      }
      return {};
    });
    function toElem(elem: any) {
      if (show.value == Show.ELEM0) {
        show.value = Show.ELEM1;
        elemt1.value = elem;
      } else {
        show.value = Show.ELEM0;
        elemt0.value = elem;
      }
    }

    const control: ControlType = {
      toLeft() {},
      toRight(to: { render: Function }) {
        // plss.value = PlayProgress.STAR;
        // direction.value = Direction.TO_RIGHT;
        // toElem(to.render());
        // isClosedTransition.value = false;
        // plss.value = PlayProgress.END;
      },
      toButton() {},
      toUp() {},
    };

    emit("control", control);

    return () => (
      <div class={Clas.window}>
        <div
          class={Clas.slider}
          style={[sliderStyle.value, transitionStyle.value]}
        >
          <div class={Clas.content0} style={content0Style.value}>
            <div
              class={Clas.elemt0}
              style={[elemt0Style.value, transitionStyle.value]}
            >
              <component is={elemt0}></component>
            </div>
          </div>
          <div class={Clas.content1} style={content1Style.value}>
            <div
              class={Clas.elemt1}
              style={[elemt1Style.value, transitionStyle.value]}
            ></div>
          </div>
        </div>
      </div>
    );
  },
});
