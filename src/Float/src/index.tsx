import { shallowRef, createApp, Teleport } from "vue";
const floatList = shallowRef([] as any[]);

let isMounted = false;
export function useFloat(component: any) {
  floatList.value.push(component);

  if (isMounted) {
    return;
  }
  isMounted = true;

  createFloat();
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
              <Teleport to="body">
                <Component></Component>
              </Teleport>
            );
          })}
        </>
      );
    },
  }).mount(FloatApp);
}
