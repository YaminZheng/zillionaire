<script setup lang="ts">
import type { El } from "./Road.vue";

interface Props {
  pointer?: El;
}
defineProps<Props>();
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
}
</style>
