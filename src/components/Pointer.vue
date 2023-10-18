<script setup lang="ts">
import { watch, ref, computed } from "vue";
import type { El } from "./Road.vue";

interface Props {
  el?: El;
  pointerMap: Record<string, El>;
}

const props = defineProps<Props>();

const interval = 300;
const transition = computed(
  () => `left ${interval}ms ease, top ${interval}ms ease`
);
const currentPointer = ref<El>();

const sleep = (time: number = 1500): Promise<void> => {
  return new Promise((resolve) => globalThis.setTimeout(() => resolve(), time));
};

watch(
  () => props.el,
  async (toEl) => {
    const toSite = toEl!.site;
    const fromSite = currentPointer.value?.site || 0;
    for (let i = fromSite + 1; i <= toSite; i++) {
      currentPointer.value = props.pointerMap[i];
      await sleep(interval);
    }
  }
);
</script>

<template>
  <div
    class="pointer-box"
    :style="{
      left: currentPointer?.l || 0,
      top: currentPointer?.t || 0,
      width: currentPointer?.style.width,
      height: currentPointer?.style.height,
    }"
  ></div>
</template>

<style lang="scss">
.pointer-box {
  background-color: red;
  position: absolute;
  transition: v-bind(transition);
}
</style>
