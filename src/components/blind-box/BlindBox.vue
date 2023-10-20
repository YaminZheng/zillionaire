<script lang="ts">
const useThrottle = <Args extends any[], R extends any>(fn: (...args: Args) => Promise<R>, interval = 2000) => {
  return (...args: Args) => {
    return new Promise<R>(async (resolve) => {
      const callTime = Date.now();
      let result = await fn(...args);
      setTimeout(() => {
        resolve(result);
      }, interval + callTime - Date.now());
    });
  };
};
</script>

<script setup lang="ts">
import { ref } from "vue";

interface Emits {
  (e: "close"): void;
}
const emit = defineEmits<Emits>();

const displayPrize = useThrottle(async (prize: number) => {
  // fetch from backend
  isShowPrize.value = true;
  console.log(prize);
});

const isLoading = ref(false);
const isShowPrize = ref(false);
const open = async (prize: number) => {
  if (isLoading.value) return;
  isLoading.value = true;
  await displayPrize(prize);
  isLoading.value = false;
};

const close = () => {
  isShowPrize.value = false;
  emit("close");
};

defineExpose({ open });
</script>

<template>
  <div class="sifter-box">
    <ul class="rotate">
      <li class="left">？</li>
      <li class="right">？</li>
      <li class="front">？</li>
      <li class="behind">？</li>
      <li class="top">？</li>
      <li class="bottom">？</li>
    </ul>
  </div>

  <div v-if="isShowPrize" class="model" @click="close">x</div>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotateX(-10deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(-10deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(-10deg) rotateY(360deg);
  }
}

.sifter-box {
  cursor: pointer;
  padding: 20px;

  > ul {
    $width: 60px;
    width: $width;
    height: $width;
    position: relative;
    margin: 0;
    transform-style: preserve-3d;

    &.rotate {
      animation: rotate 2s linear infinite reverse;
    }

    > li {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: black;
      color: white;
      list-style: none;
      text-align: center;
      line-height: $width;
      box-shadow: 0 0 4px 1px white inset;
      font-size: 20px;
      font-weight: bold;
      user-select: none;
    }

    .left {
      transform-origin: left;
      transform: rotateY(-90deg) translateX(calc(#{$width} / -2));
    }
    .right {
      transform-origin: right;
      transform: rotateY(90deg) translateX(calc(#{$width} / 2));
    }
    .top {
      transform-origin: top;
      transform: rotateX(90deg) translateY(calc(#{$width} / -2));
    }
    .bottom {
      transform-origin: bottom;
      transform: rotateX(-90deg) translateY(calc(#{$width} / 2));
    }
    .front {
      transform: translateZ(calc(#{$width} / 2));
    }
    .behind {
      transform: translateZ(calc(#{$width} / -2)) rotateY(180deg);
    }
  }
}
</style>
