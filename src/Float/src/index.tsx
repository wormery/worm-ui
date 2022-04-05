import { defineComponent } from "vue";
import {
  createApp,
  Teleport,
  Ref,
  computed,
  ref,
  markRaw,
  reactive,
} from "vue";

const floatList = reactive([] as any[]);

let isMounted = false;
const to = Symbol("");
export function useFloat(component: any, teleport?: Ref<string>) {
  component[to] = teleport;
  floatList.push(markRaw(component));

  if (isMounted) {
    return;
  }
  isMounted = true;

  MountFloat();
}

const Float = defineComponent({
  setup() {
    return () => {
      return (
        <>
          {floatList.map((Component) => {
            return (
              <Teleport to={Component[to]?.value ?? "body"}>
                <Component></Component>
              </Teleport>
            );
          })}
        </>
      );
    };
  },
});

function MountFloat() {
  const FloatApp = document.createElement("div");

  FloatApp.id = "WFloat";
  document.body.appendChild(FloatApp);

  createApp(Float).mount(FloatApp);
}
