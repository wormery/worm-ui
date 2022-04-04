import { defineComponent, PropType } from "vue";

import { isNull } from "@wormery/utils";
import { reactive, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import { RouteLocationRaw } from "vue-router";
import { wtsc } from "../../wtsc";
import { vh, px, PE, em, rgb } from "@wormery/wtsc";
import { condStyleByRef, withDefaultsOfToRefs } from "../../utils/utils";
import { createHoverColor, createPressedColor } from "../../wtsc/mixColor";
import { magic } from "../../Magic/src/directive";

type Routers = { name: string; icon: string; path: RouteLocationRaw };
const props = {
  routers: Object as PropType<Routers[]>,
};
export default defineComponent({
  name: "WMenu",
  props,
  directives: { magic },
  setup(props, { emit }) {
    //config
    const w = wtsc.scoped();

    type _Routers = Routers & { el: any };

    const refProps = withDefaultsOfToRefs(props, { routers: [] });

    const routers = refProps.routers as unknown as Ref<_Routers[]>;

    //过度时长单位毫秒
    const transitionDuration = 100;
    //对于一部分打断动画的反映延迟等
    //具体我也说不明白
    const interval = 20;

    //data
    //栏目列表

    type Active = { item: Routers | any; index: number };
    //选中的项目
    let active: Ref<Active>;
    if (routers.value.length > 0) {
      active = ref({ item: routers.value[0], index: 0 }) as Ref<Active>;
    } else {
      active = ref({ item: {}, index: 0 }) as Ref<Active>;
    }

    //是否缩小侧边栏
    let isNarrow = ref(false);
    //用来检查当前线程范围内是否更新了"isNarrow"
    let oldIsNarrow: boolean | null = null;
    // 滑块的一些属性
    let sliderStyle = reactive({
      left: "0px",
      top: "-400px",
      height: "0px",
      width: "0px",
    });

    //让vue管理动画的播放时间，否则很难清楚的确定过度什么时候结束
    const transitionStyle = {
      transition: `all ${transitionDuration}ms`,
    };

    /** 隐藏缩小侧边栏的按钮*/
    const narrowClick = function () {
      oldIsNarrow = isNarrow.value;
      isNarrow.value = !isNarrow.value;
    };
    /** menu中的按钮单击事件 */
    const menuItemClick = function (item: Routers, index: number) {
      emit("menu-click", item);
      oldIsNarrow = isNarrow.value;
      active.value = { item, index };
    };

    //更新滑块
    //这里是函数闭包
    const updataSliderStyle = (function () {
      /**
       * 这里更新了滑块的样式
       */
      const startUpdata = function (el: any) {
        sliderStyle.top = el.offsetTop + "px";
        sliderStyle.left = el.offsetLeft + "px";
        sliderStyle.height = el.offsetHeight + "px";
        sliderStyle.width = el.offsetWidth + "px";
      };
      let timeouter: NodeJS.Timeout | null = null;

      /**
       * 这端代码的作用我也说不明白，具体解决的问题就是，
       * 上面offsetWidth获取的是实时位置属性，
       * 但我过度过程中获取到的位置不是我们要的最终位置，
       * 我们也不知道最终位置在哪(为了最大的自适应，和改变最少的值改变组件)
       */
      const animationUpdataRec = function (i: number, el: any) {
        i -= 1;
        startUpdata(el);
        if (i > 0) {
          timeouter = setTimeout(() => {
            animationUpdataRec(i, el);
          }, interval);
        }
      };
      return function (active: Active, isChangeNarrow: boolean) {
        if (active?.item?.el) {
          if (isChangeNarrow) {
            //这里的作用是由于有动画获取到的位置并不是实时位置
            //，只是当前位置,所以多次执行来确保更新到位
            //存在上一个计时器就关闭它
            if (!isNull(timeouter)) clearTimeout(timeouter);

            animationUpdataRec(transitionDuration / interval, active.item.el);
          } else {
            //存在上一个计时器就关闭它
            if (!isNull(timeouter)) clearTimeout(timeouter);

            startUpdata((active.item as any).el);
          }
        }
      };
    })();

    watchEffect(() => {
      //更新滑块
      updataSliderStyle(active.value, !oldIsNarrow == isNarrow.value);
    });

    return () => (
      <div
        class={["container", isNarrow.value ? "narrow" : ""].join(" ")}
        style={[w.add.position("relative").add.height(vh(100)).out()]}
      >
        <div
          class="btn-background"
          style={[
            w.add
              .position("absolute")
              .add.right(px(10))
              .add.top(PE(50))
              .add.display("flex")
              .add.justifyContent("center")
              .add.alignItems("center")
              .add.height(px(30))
              .add.width(px(30))
              .add.borderRadius(PE(50))
              .add.backgroundColor(w.the.menu.backgroundColor)
              .add.boxShadow("1px 2px 3px #00000077")
              .out(),
            condStyleByRef(
              isNarrow,
              w.add.right(px(-15)).add.zIndex("-1").out()
            ),
          ]}
        ></div>
        <div
          class="btn"
          onClick={narrowClick}
          style={[
            w.add
              .position("absolute")
              .add.right(px(10))
              .add.top(PE(50))
              .add.display("flex")
              .add.justifyContent("center")
              .add.alignItems("center")
              .add.height(px(30))
              .add.width(px(30))
              .add.zIndex("2")
              .add.borderRadius(PE(50))
              .add.fontSize(w.the.commonly.fontSize)
              .if(isNarrow.value, () => {
                w.add
                  .right(px(-15))
                  .add.backgroundColor(w.the.menu.backgroundColor)
                  .add.transform("rotate(540deg)")
                  .out();
              })
              .out(),
            transitionStyle,
          ]}
        >
          <div
            // @ts-ignore
            name="chevron-back-outline"
          ></div>
        </div>
        <div
          // v-magic={"selection"}
          class={[
            wtsc.clean
              .class("bar")
              .add.display("none")
              .pseudo("::-webkit-scrollbar" as any)
              .out(),
          ].join(" ")}
          style={[
            w.shandbox(() =>
              w.add
                .position("relative")
                .add.height(PE(100))
                .add.userSelect("none")
                .add.overflowX("hidden")
                .add.borderRadius(px(15))
                .add.backgroundColor(w.the.menu.backgroundColor)
                .add.boxShadow("0 2px 3px #00000077")
                .out()
            ),
          ]}
        >
          <div
            class="header"
            style={[
              w.shandbox(() =>
                w.add
                  .position("relative")
                  .add.display("flex")
                  .add.justifyContent("center")
                  .add.alignItems("center")
                  .add.fontSize(em(2))
                  .out()
              ),
            ]}
          >
            <div
              class="logo"
              style={[
                condStyleByRef(
                  isNarrow,
                  w.shandbox(() =>
                    w.add.opacity("0").add.overflow("hidden").out()
                  )
                ),
                transitionStyle,
              ]}
            >
              <span>WORM</span>
            </div>
          </div>

          <div
            class="slider"
            style={[
              w.shandbox(() =>
                w.add
                  .position("absolute")
                  .add.backgroundColor(rgb(119, 123, 206))
                  .add.borderRadius(px(20))
                  .add.boxShadow("0 2px 3px #00000077")
                  .out()
              ),
              sliderStyle,
              transitionStyle,
            ]}
          ></div>

          {routers.value.map((item, index) => (
            <div
              v-magic={"selection"}
              class={w.clean
                .class("bar-item")
                .add.backgroundColor(
                  createHoverColor(w.inject(w.the.menu.backgroundColor) as any)
                )
                .pseudo(":hover")
                .add.backgroundColor(
                  createPressedColor(
                    w.inject(w.the.menu.backgroundColor) as any
                  )
                )
                .pseudo(":active")
                .out()}
              ref={(el) => (item.el = el)}
              onClick={() => menuItemClick(item, index)}
              style={[
                w.shandbox(() =>
                  w.add
                    .display("flex")
                    .add.alignItems("center")
                    .add.justifyContent("center")

                    .add.margin(px(0), px(15))
                    .add.padding(px(15))

                    .add.borderRadius(w.the.commonly.borderRadius)
                    .add.fontSize(em(2))
                    .out()
                ),

                condStyleByRef(
                  isNarrow,
                  w.shandbox(() =>
                    w.add.margin(px(5), px(10)).add.padding("5px 5px").out()
                  )
                ),
                transitionStyle,
              ]}
            >
              {(() => {
                const style = w.shandbox(() =>
                  w.add.display("flex").add.alignItems("center").out()
                );
                return (
                  <>
                    <div
                      class="icon"
                      style={[
                        style,
                        w.shandbox(() =>
                          w.add
                            .display("flex")
                            .add.alignItems("center")
                            .add.justifyContent("center")
                            .add.margin(px(0), px(10))
                            .add.fontSize(em(1.3))
                            .out()
                        ),
                        condStyleByRef(
                          isNarrow,
                          w.shandbox(() => w.add.margin(px(0), px(3))).out()
                        ),
                      ]}
                    >
                      <div
                        // @ts-ignore
                        name={item.icon}
                        style={[
                          w.shandbox(() =>
                            w.add
                              .display("flex")
                              .add.alignItems("center")
                              .add.justifyContent("center")
                              .out()
                          ),
                        ]}
                      ></div>
                    </div>
                    <div
                      class="title"
                      style={[
                        w.shandbox(() =>
                          w.add
                            .width(px(200))
                            .add.zIndex("1")
                            .add.overflow("hidden")
                            .out()
                        ),
                        condStyleByRef(
                          isNarrow,
                          w.shandbox(() =>
                            w.add.width(px(0)).add.opacity("0").out()
                          )
                        ),
                        style,
                        transitionStyle,
                      ]}
                    >
                      <span>{item.name}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
