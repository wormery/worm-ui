import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  onBeforeUnmount,
  computed,
  nextTick,
} from "vue";
import { useFloat } from "../../Float/src/index";
import { useElementBounding } from "@vueuse/core";
import { wtsc } from "../../wtsc/index";
import { PE, px, rgb } from "@wormery/wtsc";
import { genHash } from "../../utils/utils";

const w = wtsc.scoped();
export function useShip<T>(component: T, duration: number = 600): T {
  const options: Options<T> = {
    id: "ship-" + genHash(),
    component,
    wharfEl: ref(null as any as HTMLDivElement),
    aboard: ref(false),
    // 位置
    rect: ref(null),
    contents: ref({}),
    //这个选项的作用是在切出的时候隐藏
    isShow: true,
    to: computed(() => {
      if (options.aboard.value) {
        return "body";
      } else {
        return "#" + options.id;
      }
    }),
    duration,
  };

  let isInited = false;
  const lazyInit = () => {
    if (isInited) {
      return;
    }
    isInited = true;
    createShip(options);
  };

  return createWharf(options, lazyInit);
}

interface Options<T> {
  id: string;
  isShow: boolean;
  wharfEl: Ref<HTMLDivElement>;
  rect: any;
  aboard: any;
  duration: number;
  contents: Ref<any>;
  to: Ref<string>;
  component: T;
}

/**
 * 船组件
 * @author meke
 * @template T
 * @param {Options<T>} o
 * @return {*}
 */
function createShip<T>(o: Options<T>) {
  const { to, aboard, rect, duration, contents, component } = o;

  const shipComponent = defineComponent({
    name: "WShip",
    setup() {
      let x = 0;
      return () => {
        let style = computed(() => {
          if (aboard.value) {
            if (rect.value) {
              w.clear()
                .add.position("absolute")
                .add.left(px(rect.value.x))
                .add.top(px(rect.value.top))
                .add.height(px(rect.value.height))
                .add.width(px(rect.value.width));
              if (!o.isShow) {
                w.add.display("none");
              }
              if (x > 1) {
                w.add.transition(`all ${duration}ms ease`);
              }
              x++;
              return w.out();
            }
          } else {
            return w.add.height(PE(100)).add.width(PE(100)).out();
          }
        });

        return (
          <div style={style.value}>
            <component
              v-slots={contents.value.slots}
              {...contents.value.attrs}
            ></component>
          </div>
        );
      };
    },
  });

  // 浮动挂载
  useFloat(shipComponent, to);
}

/**
 * 码头组件
 * @author meke
 * @template T
 * @param {Options<T>} o
 * @param {() => void} createShip
 * @return {*}
 */
function createWharf<T>(o: Options<T>, createShip: () => void) {
  const { id, aboard, rect, duration, contents, wharfEl } = o;
  let timeouter: any = null;

  /**
   * 停船入港
   * @author meke
   */
  function dock() {
    clearTimeout(timeouter);

    timeouter = setTimeout(() => {
      aboard.value = false;
    }, duration);
  }

  return defineComponent({
    name: "WWharf",
    setup(props, _contents) {
      o.isShow = true;
      onMounted(() => {
        contents.value = _contents;
        createShip();
        rect.value = wharfEl.value.getBoundingClientRect();

        dock();
      });
      onBeforeUnmount(() => {
        o.isShow = false;
        aboard.value = true;
      });
      return () => {
        return (
          <div
            id={id}
            ref={($el) => {
              wharfEl.value = $el as HTMLDivElement;
            }}
            style={wtsc.add
              .height(PE(100))
              .add.width(PE(100))
              // .add.backgroundColor(rgb(200, 200, 200, 0.5))
              .out()}
          ></div>
        );
      };
    },
  }) as any as T;
}
