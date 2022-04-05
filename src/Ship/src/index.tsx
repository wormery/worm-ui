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
import { log } from "console";

export function useShip<T>(component: T, transitionDuration: number = 600): T {
  const id = "ship-" + genHash();

  const shipEl = ref(null as any as HTMLDivElement);

  const w = wtsc.scoped();

  let isInited = false;
  const aboard = ref(false);
  const isChange = ref(false);

  const bounding: Ref<any> = ref(null);
  const attrs = ref({});

  const tr = computed(() => {
    if (aboard.value) {
      return "body";
    } else {
      return "#" + id;
    }
  });
  const oChange = { x: 0, y: 0, height: 0, width: 0 };

  const container = (att: object) => {
    attrs.value = att;

    if (isInited) return;
    isInited = true;
    useFloat(
      {
        setup() {
          let x = 0;

          return () => {
            let style = computed(() => {
              if (aboard.value) {
                if (bounding.value) {
                  w.clear()
                    .add.position("absolute")
                    .add.left(px(bounding.value.x))
                    .add.top(px(bounding.value.top))
                    .add.height(px(bounding.value.height))
                    .add.width(px(bounding.value.width));
                  if (x > 1) {
                    w.add.transition(`all ${transitionDuration}ms ease`);
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
                <component {...attrs.value}></component>
              </div>
            );
          };
        },
      },
      tr
    );
  };

  let timeouter: any = null;
  return defineComponent({
    setup(props, contents) {
      onMounted(() => {
        clearTimeout(timeouter);
        container(contents.attrs);
        bounding.value = shipEl.value.getBoundingClientRect();
        timeouter = setTimeout(() => {
          aboard.value = false;
        }, transitionDuration);
      });
      onBeforeUnmount(() => {
        isChange.value = true;

        aboard.value = true;
      });
      return () => {
        return (
          <div
            id={id}
            ref={($el) => {
              shipEl.value = $el as HTMLDivElement;
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
