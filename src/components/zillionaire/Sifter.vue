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
import { computed, ref } from "vue";

interface Props {
  disabled?: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "plusStep", step: number): void;
}
const emit = defineEmits<Emits>();

const isRotate = ref(false);
const getSifterCount = useThrottle(async () => {
  isRotate.value = true;
  // fetch from backend
  return Math.floor(Math.random() * 6 + 1);
});

const count = ref<number>(1);
const isLoading = ref(false);
const randomCount = async () => {
  if (props.disabled || isLoading.value) return;
  isLoading.value = true;
  count.value = await getSifterCount();
  isRotate.value = false;
  isLoading.value = false;
  return emit("plusStep", count.value);
};

const styleMap: { [K: number]: string } = {
  1: "transform: rotate3d(0,0,0,90deg)",
  2: "transform: rotate3d(0,1,0,90deg)",
  3: "transform: rotate3d(0,1,0,-90deg)",
  4: "transform: rotate3d(0,1,0,180deg)",
  5: "transform: rotate3d(1,0,0,-90deg)",
  6: "transform: rotate3d(1,0,0,90deg)",
};
const finalStyle = computed(() => (isRotate.value ? void 0 : styleMap[count.value]));
</script>

<template>
  <div class="sifter-box" @click="randomCount()">
    <ul :class="{ rotate: isRotate }" :style="finalStyle">
      <li class="left" value="2"></li>
      <li class="right" value="3"></li>
      <li class="front" value="1"></li>
      <li class="behind" value="4"></li>
      <li class="top" value="5"></li>
      <li class="bottom" value="6"></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  25% {
    transform: rotate3d(0.1, 0.5, 0.3, -90deg);
  }
  50% {
    transform: rotate3d(1, 1, 0.6, -180deg);
  }
  75% {
    transform: rotate3d(0.7, 0.5, 0.9, -270deg);
  }
  100% {
    transform: rotate3d(1, 0, 1, -360deg);
  }
}

.sifter-box {
  padding: 30px;
  cursor: pointer;
  transform-style: preserve-3d;

  > ul {
    $width: 50px;
    width: $width;
    height: $width;
    position: relative;
    margin: 0;
    transform-style: preserve-3d;

    &.rotate {
      animation: rotate 0.6s linear infinite reverse;
    }

    > li {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 0;
      color: white;
      list-style: none;
      text-align: center;
      line-height: $width;
      font-size: 20px;
      font-weight: bold;
      user-select: none;
      background-size: 100%;

      &[value="1"] {
        background-image: url(./sifter/1.png);
      }
      &[value="2"] {
        background-image: url(./sifter/2.png);
      }
      &[value="3"] {
        background-image: url(./sifter/3.png);
      }
      &[value="4"] {
        background-image: url(./sifter/4.png);
      }
      &[value="5"] {
        background-image: url(./sifter/5.png);
      }
      &[value="6"] {
        background-image: url(./sifter/6.png);
      }
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
