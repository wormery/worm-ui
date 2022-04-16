import { ms, px } from "@wormery/wtsc";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { center, clearFloat, the } from "../../wtsc";
import { magic } from "../../Magic/src/directive";
import { computed, watch } from "vue";
import { w } from "./wtsc";
import {
  pageItemButtonClass,
  pageItemButtonTextClass,
} from "./style/page-item";
import { genUpdateProps } from "../../utils";
const hasUpdateProps = genUpdateProps({
  page: {
    type: Number,
    default: 1,
  },
});

export default defineComponent({
  name: "WPagination",
  props: {
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
    ...hasUpdateProps.props,
  },
  directives: { magic },
  setup(props) {
    const update = hasUpdateProps.useUpdate(props);

    const { duration, total, page, pageSlot } = toRefs(props);
    const active = ref(0);
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

    watch(page, () => {
      active.value = page.value;
    });
    /** config*/
    let minPage = 1;
    let maxPage = computed(() => total.value);

    //init pags
    let pages: Array<number> = [];

    //初始化pages
    for (let i = 1; i <= total.value; i++) {
      pages.push(i);
    }

    //响应化
    pages = reactive(pages);

    const size = 50;
    const blockStyle = computed(() =>
      w.add
        .position("relative")
        .add.float("left")

        .add.height(px(size))
        .add.width(px(size))

        .out()
    );

    const slidingWindowLeft = ref(active.value);
    const slidingWindowRight = computed(
      () => slidingWindowLeft.value + _pageSlot.value - 1
    );

    watch(active, (n, o, onInvalidate) => {
      if (n < 0) {
        active.value = o;
        return;
      }
      if (n > maxPage.value - 1) {
        active.value = o;
        return true;
      }

      const _a = n;

      update("page", _a);

      const _slidingWindowLeft = slidingWindowLeft.value;
      const _disPlayNumber = _pageSlot.value;
      if (_a < _slidingWindowLeft) {
        slidingWindowLeft.value = _a;
      } else if (_a > slidingWindowRight.value) {
        slidingWindowLeft.value += _a - slidingWindowRight.value;
      }
    });

    const circleLeft = computed(() => active.value * size);

    const handelClick = (e: MouseEvent, v: number) => {
      const _a = v - 1;

      active.value = _a;
    };

    const slidingWindowTransformStyle = computed(() => {
      return w.add
        .transform(`translateX(${px(-size * (slidingWindowLeft.value - 0.5))})`)
        .out();
    });

    return () => (
      <div
        class={clearFloat}
        style={w.add
          .position("relative")

          .add.width(px(size * (_pageSlot.value + 2)))
          .add.userSelect("none")
          .out()}
      >
        <div
          style={w.add
            .position("relative")
            .add.left(px(size / 2))
            .add.width(px(size * (_pageSlot.value + 1)))
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
            {pages.map((item) => (
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
                      item - 1 === active.value ? "active" : "",
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
  },
});
