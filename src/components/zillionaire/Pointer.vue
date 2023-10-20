<script lang="ts">
import type { El } from "./Road.vue";

export interface Props {
  pointer?: El;
}
</script>

<script setup lang="ts">
defineProps<Props>();
</script>

<template>
  <div
    class="pointer-box"
    :style="{
      left: pointer?.style.left || 0,
      top: pointer?.style.top || 0,
      width: pointer?.style.width,
      height: pointer?.style.height,
      transform: pointer?.style.transform,
    }"
  >
    <!-- img xxx  -->
  </div>
</template>

<style lang="scss">
.pointer-box {
  background-color: red;
  position: absolute;
}
</style>
