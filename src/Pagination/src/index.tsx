import { ms, px } from "@wormery/wtsc";
import { defineComponent, ref, toRefs } from "vue";
import { center, clearFloat, the } from "../../wtsc";
import { magic } from "../../Magic/src/directive";
import { computed, watch } from "vue";
import { w } from "./wtsc";
import {
  pageItemButtonClass,
  pageItemButtonTextClass,
} from "./style/page-item";
import { syncProps } from "../../utils";

const hasUpdateProps = syncProps({
  page: {
    type: Number,
    default: 1,
  },
});

export default defineComponent({
  name: "WPagination",
  props: {
    ...hasUpdateProps.props,
    duration: {
      type: Number,
      default: 500,
    },
    total: {
      type: Number,
      default: 1,
    },
    pageSlot: {
      type: Number,
      default: 5,
    },
    start: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
  directives: { magic },
  setup(props) {
    const update = hasUpdateProps.useUpdate(props);

    const { duration, total, page, pageSlot, start, size } = toRefs(props);

    const a = ref(start.value);

    const slidingWindowLeft = ref(a.value);

    const slidingWindowRight = computed(
      () => slidingWindowLeft.value + _pageSlot.value - 1
    );

    const _pageSlot = computed(() => {
      const n = pageSlot.value;
      if (n < 1) {
        return 1;
      }
      if (n > total.value) {
        return total.value;
      }
      return n;
    });

    const active = computed({
      get() {
        return a.value;
      },
      set(n: number) {
        if (n < start.value) {
          return;
        }
        if (n > total.value) {
          return;
        }

        a.value = n;

        update("page", n);

        const _slidingWindowLeft = slidingWindowLeft.value;
        const _disPlayNumber = _pageSlot.value;
        if (n < _slidingWindowLeft) {
          slidingWindowLeft.value = n;
        } else if (n > slidingWindowRight.value) {
          slidingWindowLeft.value += n - slidingWindowRight.value;
        }
      },
    });

    const circleLeft = computed(() => (active.value - 1) * size.value);

    const pages = computed(() => {
      const _start = start.value;
      return Array.from({ length: total.value }, (_, i) => i + _start);
    });

    // style
    const slidingWindowTransformStyle = computed(() => {
      return w.add
        .transform(
          `translateX(${px(-size.value * (slidingWindowLeft.value - 1.5))})`
        )
        .out();
    });

    const blockStyle = computed(() =>
      w.add
        .position("relative")
        .add.float("left")

        .add.height(px(size.value))
        .add.width(px(size.value))

        .out()
    );

    watch(
      page,
      () => {
        active.value = page.value;
      },
      { immediate: true }
    );

    watch(
      start,
      () => {
        const _start = start.value;
        const _a = a.value;

        const _slidingWindowLeft = slidingWindowLeft.value;
        if (_start <= _slidingWindowLeft) {
          return;
        }
        slidingWindowLeft.value = _slidingWindowLeft;

        if (_start >= _a) {
          return;
        }
        a.value = _start;
      },
      { immediate: true }
    );

    //click
    const handelClick = (e: MouseEvent, v: number) => {
      const _a = v;

      active.value = _a;
    };

    return () => {
      const _size = size.value;
      return (
        <div
          class={clearFloat}
          style={w.add
            .position("relative")

            .add.width(px(_size * (_pageSlot.value + 2)))
            .add.userSelect("none")
            .out()}
        >
          <div
            style={w.add
              .position("relative")
              .add.left(px(_size / 2))
              .add.width(px(_size * (_pageSlot.value + 1)))
              .add.overflow("hidden")
              .out()}
          >
            <div
              class={["slider", clearFloat]}
              style={[
                w.add
                  .position("relative")
                  .add.width("99999px")
                  .add.transition("transform", ms(duration.value), "ease")
                  .out(),
                slidingWindowTransformStyle.value,
              ]}
            >
              <div
                class={"circle"}
                style={[
                  blockStyle.value,
                  w.add
                    .position("absolute")
                    .add.left(px(0))
                    .add.transform(`translateX(${px(circleLeft.value)})`)
                    .add.transition("transform", ms(duration.value))
                    .add.backgroundColor(the.commonly.actionColor)
                    .add.borderRadius(the.commonly.borderRadius9)
                    .out(),
                ]}
              ></div>
              {pages.value.map((item) => (
                <div style={blockStyle.value}>
                  <div
                    v-magic={"selection"}
                    onClick={(e) => handelClick(e, item)}
                    class={pageItemButtonClass}
                  >
                    <span
                      class={[
                        center,
                        pageItemButtonTextClass,
                        item === active.value ? "active" : "",
                      ]}
                    >
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            v-magic={"selection"}
            onClick={() => {
              active.value -= 1;
            }}
            class={["prev-page"]}
            style={[
              blockStyle.value,
              w
                .clear()
                .add.position("absolute")
                .add.top(px(0))
                .add.left(px(0))
                .out(),
            ]}
          >
            <div class={[pageItemButtonClass]}>
              <span class={center}>{"<"}</span>
            </div>
          </div>
          <div
            v-magic={"selection"}
            onClick={() => {
              active.value += 1;
            }}
            class={["next-page"]}
            style={[
              blockStyle.value,
              w
                .clear()
                .add.position("absolute")
                .add.top(px(0))
                .add.right(px(0))
                .out(),
            ]}
          >
            <div class={[pageItemButtonClass]}>
              <span class={center}>{">"}</span>
            </div>
          </div>
        </div>
      );
    };
  },
});
