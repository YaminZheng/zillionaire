<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: number | "small" | "default" | "large";
}

const props = defineProps<Props>();

const size = computed(() => props.size ?? "default");
const sizeMap = { small: 26, default: 30, large: 34 };

const widthPx = computed(() => {
  if (typeof size.value === "number") {
    return `${size.value}px`;
  }

  return `${sizeMap[size.value] ?? sizeMap.small}px`;
});
</script>

<template>
  <svg class="__loading" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx="12" cy="2" r="0" fill="currentColor">
      <animate
        attributeName="r"
        begin="0"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
      <animate
        attributeName="r"
        begin="0.125s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
      <animate
        attributeName="r"
        begin="0.25s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
      <animate
        attributeName="r"
        begin="0.375s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
      <animate
        attributeName="r"
        begin="0.5s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
      <animate
        attributeName="r"
        begin="0.625s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
      <animate
        attributeName="r"
        begin="0.75s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
      <animate
        attributeName="r"
        begin="0.875s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      ></animate>
    </circle>
  </svg>
</template>

<style lang="scss" scoped>
.__loading {
  width: v-bind(widthPx);
  height: v-bind(widthPx);
}
</style>
