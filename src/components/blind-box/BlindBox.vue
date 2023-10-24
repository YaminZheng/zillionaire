<script lang="ts">
const useDelay = <Args extends any[], R extends any>(fn: (...args: Args) => Promise<R>, interval = 2000) => {
  return (...args: Args) => {
    return new Promise<R>(async (resolve) => {
      setTimeout(async () => {
        resolve(await fn(...args));
      }, interval);
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

const displayPrize = useDelay(async (prize: number) => {
  // fetch from backend
  isShowPrize.value = true;
  console.log(prize);
});

const isShowBlindBox = ref(false);
const isLoading = ref(false);
const isShowPrize = ref(false);
const open = async (prize: number) => {
  if (isLoading.value) return;
  isLoading.value = true;
  isShowBlindBox.value = true;
  await displayPrize(prize);
  isShowBlindBox.value = false;
  isLoading.value = false;
};

const close = () => {
  isShowPrize.value = false;
  emit("close");
};

defineExpose({ open });
</script>

<template>
  <div v-if="isShowBlindBox" class="sifter-box" @click="open(1)">
    <ul>
      <li class="left">？</li>
      <li class="right">？</li>
      <li class="front">？</li>
      <li class="behind">？</li>
      <li class="top">？</li>
      <li class="bottom">？</li>
    </ul>
  </div>

  <div v-if="isShowPrize" class="prize-modal">
    <h5>恭喜获得奖品</h5>
    <button @click="close">关闭</button>
  </div>
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
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 50%;
  box-shadow: 0 0 200px 20px yellow;
  background-color: #ffff0078;

  > ul {
    $width: 100px;
    width: $width;
    height: $width;
    position: relative;
    margin: 0;
    transform-style: preserve-3d;
    animation: rotate 2s linear infinite reverse;

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

.prize-modal {
  width: 100px;
  height: 100px;
  color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: orangered;
  transform: translate(-50%, -50%);
}
</style>
