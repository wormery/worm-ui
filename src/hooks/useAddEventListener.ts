import { onBeforeUnmount } from "vue";

export default function useAddEventListener<
  T extends { addEventListener: F; removeEventListener: R },
  F extends (...rest: any) => any,
  R extends (...rest: any) => any
>(target: T): T["addEventListener"] {
  return ((...rest: any[]) => {
    target.addEventListener(...rest);

    onBeforeUnmount(() => {
      target.removeEventListener(...rest);
    });
  }) as any;
}
