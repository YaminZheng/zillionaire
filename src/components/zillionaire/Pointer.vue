<script lang="ts">
import type { El } from "./Road.vue";

export type Orientation = "right-bottom" | "right-top" | "left-bottom" | "left-top";
</script>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { loadImage } from "./utils";

interface Props {
  pointer?: El;
  nextPointer?: El;
  interval: number;
  isRunning: boolean;
}
const props = defineProps<Props>();

const interval = computed(() => `${props.interval}ms`);
const transition = computed(() => `all ${props.interval}ms linear`);

const getOrientation = (newPointer: El, oldPointer: El): Orientation => {
  const newRow = newPointer.rowIndex;
  const newCol = newPointer.colIndex;
  const oldRow = oldPointer.rowIndex;
  const oldCol = oldPointer.colIndex;
  if (newRow === oldRow) {
    return newCol > oldCol ? "right-top" : "left-bottom";
  }
  if (newCol === oldCol) {
    return newRow > oldRow ? "right-bottom" : "left-top";
  }
  return "right-bottom";
};

const animateName = ref<string>();
watch(
  () => props.pointer,
  (pointer, oldPointer) => {
    if (!oldPointer || !pointer) return;
    const orientation = getOrientation(pointer, oldPointer);
    animateName.value = `run-${orientation}`;
  }
);

const finishOrientation = computed(() =>
  props.isRunning ? void 0 : props.pointer && props.nextPointer && getOrientation(props.nextPointer, props.pointer)
);

const init = async () => {
  await Promise.all([
    loadImage((await import("./person/left-top-1.png")).default),
    loadImage((await import("./person/left-top-2.png")).default),
    loadImage((await import("./person/left-top-3.png")).default),
    loadImage((await import("./person/left-bottom-1.png")).default),
    loadImage((await import("./person/left-bottom-2.png")).default),
    loadImage((await import("./person/left-bottom-3.png")).default),
    loadImage((await import("./person/right-top-3.png")).default),
    loadImage((await import("./person/right-top-3.png")).default),
    loadImage((await import("./person/right-top-3.png")).default),
    loadImage((await import("./person/right-bottom-3.png")).default),
    loadImage((await import("./person/right-bottom-3.png")).default),
    loadImage((await import("./person/right-bottom-3.png")).default),
  ]);
};
defineExpose({ initPointer: init });
</script>

<template>
  <div
    class="pointer-box"
    :style="{
      left: pointer?.style.left || 0,
      top: pointer?.style.top || 0,
      width: pointer?.style.width,
      height: pointer?.style.height,
    }"
    :class="[animateName, finishOrientation]"
  >
    <!-- img xxx  -->
  </div>
</template>

<style lang="scss">
@keyframes run-left-top {
  0% {
    background-image: url(./person/left-top-1.png);
  }
  33% {
    background-image: url(./person/left-top-2.png);
  }
  66% {
    background-image: url(./person/left-top-3.png);
  }
  100% {
    background-image: url(./person/left-top-1.png);
  }
}
@keyframes run-left-bottom {
  0% {
    background-image: url(./person/left-bottom-1.png);
  }
  33% {
    background-image: url(./person/left-bottom-2.png);
  }
  66% {
    background-image: url(./person/left-bottom-3.png);
  }
  100% {
    background-image: url(./person/left-bottom-1.png);
  }
}
@keyframes run-right-top {
  0% {
    background-image: url(./person/right-top-1.png);
  }
  33% {
    background-image: url(./person/right-top-2.png);
  }
  66% {
    background-image: url(./person/right-top-3.png);
  }
  100% {
    background-image: url(./person/right-top-1.png);
  }
}
@keyframes run-right-bottom {
  0% {
    background-image: url(./person/right-bottom-1.png);
  }
  33% {
    background-image: url(./person/right-bottom-2.png);
  }
  66% {
    background-image: url(./person/right-bottom-3.png);
  }
  100% {
    background-image: url(./person/right-bottom-1.png);
  }
}

.pointer-box {
  position: absolute;
  transform-origin: bottom;
  transform: translate(-64%, -90%) rotateX(-50deg) rotateY(-9deg) rotateZ(25deg);
  transition: v-bind(transition);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &.run-left-top {
    animation: run-left-top v-bind(interval) ease infinite;
  }
  &.run-left-bottom {
    animation: run-left-bottom v-bind(interval) ease infinite;
  }
  &.run-right-top {
    animation: run-right-top v-bind(interval) ease infinite;
  }
  &.run-right-bottom {
    animation: run-right-bottom v-bind(interval) ease infinite;
  }
  &.left-top {
    background-image: url(./person/left-top-1.png);
    animation: none;
  }
  &.left-bottom {
    background-image: url(./person/left-bottom-1.png);
    animation: none;
  }
  &.right-top {
    background-image: url(./person/right-top-1.png);
    animation: none;
  }
  &.right-bottom {
    background-image: url(./person/right-bottom-1.png);
    animation: none;
  }
}
</style>
