<script setup lang="ts">
import { computed } from "vue";
import type { El } from "./Road.vue";

interface Props {
  interval?: number;
  pointer?: El;
}

const props = withDefaults(defineProps<Props>(), { interval: 300 });

const transition = computed(
  () => `left ${props.interval}ms ease, top ${props.interval}ms ease`
);
</script>

<template>
  <div
    class="pointer-box"
    :style="{
      left: pointer?.l || 0,
      top: pointer?.t || 0,
      width: pointer?.style.width,
      height: pointer?.style.height,
    }"
  >
    <!-- img xxx  -->
  </div>
</template>

<style lang="scss">
.pointer-box {
  background-color: red;
  position: absolute;
  transition: v-bind(transition);
}
</style>
