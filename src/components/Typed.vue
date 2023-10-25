<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { sleep } from "../assets/utils";

const props = withDefaults(
  defineProps<{
    text: string;
    interval?: number;
  }>(),
  {
    interval: 50,
  }
);

const chars = computed(() => props.text.split(""));
const complate = ref("");

const startTyped = async (chars: Array<string>) => {
  complate.value = "";
  const _chars = [...chars];
  while (_chars.length) {
    complate.value += _chars.shift()!;
    await sleep(props.interval);
  }
};

watch(chars, (chars) => startTyped(chars), { immediate: true });
</script>

<template>
  <div class="_typed">{{ complate }}</div>
</template>
