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
  minCount?: number;
  maxCount?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { minCount: 1, maxCount: 6 });

interface Emits {
  (e: "plusStep", step: number): void;
}

const emit = defineEmits<Emits>();

const isRotate = ref(false);
const getSifterCount = useThrottle(async () => {
  isRotate.value = true;
  // fetch from backend
  return Math.floor(Math.random() * (props.maxCount - props.minCount + 1) + props.minCount);
});

const count = ref<number>(1);
const randomCount = async () => {
  if (props.disabled) return;
  count.value = await getSifterCount();
  isRotate.value = false;
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
      <li class="left">2</li>
      <li class="right">3</li>
      <li class="front">1</li>
      <li class="behind">4</li>
      <li class="top">5</li>
      <li class="bottom">6</li>
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

  > ul {
    $width: 80px;
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
      background-color: black;
      color: white;
      list-style: none;
      text-align: center;
      line-height: $width;
      box-shadow: 0 0 4px 1px white inset;
      font-size: 20px;
      font-weight: bold;
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
