<template>
  <Teleport :to="to ?? 'body'">
    <transition>
      <div v-show="opacity" class="w-toast">{{ msg }}</div>
    </transition>
  </Teleport>

  <slot></slot>
</template>
<script lang="ts" setup>
import { provide, ref, toRefs, Teleport, watch, computed, Ref } from "vue";
import { toastInjectionKey } from "./toast";
import { genToastApiInjection, ToastApiInjection } from "..";
import { wtsc } from "../../../utils/wtsc";
import { Show } from "../../@SlidingSwitching/src/enums";
import { Queue } from "./Queue";
import { isNotUndef, isString } from "@wormery/utils";
const prop = defineProps<{ to?: string }>();
const { to } = toRefs(prop);

const msg: Ref<undefined | string> = ref("");
const msgs = new Queue<string>();

let isShowing = false;
const show = () => {
  if (isShowing) {
    return;
  }
  isShowing = true;
  next();
};
const next = () => {
  const _msg = msgs.dequeue();
  if (isNotUndef(_msg)) {
    msg.value = _msg;
    opacity.value = true;
    new Promise((resolve, reject) => {
      setTimeout((provide) => {
        opacity.value = false;
        resolve(undefined);
      }, 2000);
    }).then(() => {
      setTimeout(next, 500);
    });
  } else {
    isShowing = false;
  }
};

const api: ToastApiInjection = genToastApiInjection(msgs, show);

provide(toastInjectionKey, api);

const opacity = ref(false);
</script>

<style lang="scss" scoped>
.w-toast {
  // center
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);

  padding: 10px;
  z-index: 65536;

  border-radius: 8px;

  color: aliceblue;
  background-color: #00000077;

  user-select: none;
  pointer-events: none;
}

.v-enter-active,
.v-enter,
.v-leave-active,
.v-enter-to {
  transition: opacity 0.5s;
}
.v-enter-active,
.v-enter {
  opacity: 0;
}
.v-leave-active,
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>
