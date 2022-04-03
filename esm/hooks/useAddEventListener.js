import { onBeforeUnmount } from "vue";
export default function useAddEventListener(target) {
    return ((...rest) => {
        target.addEventListener(...rest);
        onBeforeUnmount(() => {
            target.removeEventListener(...rest);
        });
    });
}
//# sourceMappingURL=useAddEventListener.js.map