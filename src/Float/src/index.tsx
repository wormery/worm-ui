import { shallowRef, createApp, Teleport, Ref } from "vue";
import { log } from "console";
const floatList = shallowRef([] as any[]);

let isMounted = false;
const to = Symbol("");
export function useFloat(component: any, teleport?: Ref<string>) {
  component[to] = teleport;
  floatList.value.push(component);

  if (isMounted) {
    return;
  }
  isMounted = true;

  createFloat();
  return;
}

function createFloat() {
  const FloatApp = document.createElement("div");

  FloatApp.id = "FloatApp";
  document.body.appendChild(FloatApp);
  createApp({
    render() {
      return (
        <>
          {floatList.value.map((Component) => {
            return (
              <Teleport to={Component[to]?.value ?? "body"}>
                <Component></Component>
              </Teleport>
            );
          })}
        </>
      );
    },
  }).mount(FloatApp);
}
