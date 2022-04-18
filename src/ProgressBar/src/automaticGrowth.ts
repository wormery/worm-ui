import { onBeforeUnmount, Ref, onUnmounted } from "vue";

export type AutomaticGrowth = {
  interval: number;
  increment: number;
};

export function useAutomaticGrowth(
  automaticGrowth: Ref<AutomaticGrowth | undefined>,
  current: Ref<number>,
  complete: Ref<number>
) {
  let intervaler: any = undefined;
  onUnmounted(() => {
    clearInterval(intervaler);
  });
  return {
    runAutomaticGrowth() {
      clearInterval(intervaler);
      if (automaticGrowth.value) {
        const { interval, increment } = automaticGrowth.value;
        intervaler = setInterval(() => {
          if (automaticGrowth.value) {
            current.value += increment;
            if (current.value >= complete.value) {
              clearInterval(intervaler);
            }
            return;
          }
          clearInterval(intervaler);
        }, interval);
      }
    },
  };
}
