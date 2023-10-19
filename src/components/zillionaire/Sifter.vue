<script setup lang="ts">
import { ref } from "vue";

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

const getSifterCount = async () => {
  // fetch from backend
  return Math.floor(
    Math.random() * (props.maxCount - props.minCount + 1) + props.minCount
  );
};

const count = ref<number>(1);
const randomCount = async () => {
  if (props.disabled) return;
  count.value = await getSifterCount();
  return emit("plusStep", count.value);
};
</script>

<template>
  <div class="sifter-box" @click="randomCount()">{{ count }}</div>
</template>

<style lang="scss">
.sifter-box {
  width: 100px;
  height: 100px;
  background-color: orange;
  cursor: pointer;
}
</style>
