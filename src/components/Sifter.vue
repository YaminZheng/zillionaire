<script setup lang="ts">
import { ref } from "vue";

type Count = 1 | 2 | 3 | 4 | 5 | 6;

interface Emits {
  (e: "plusStep", step: number): void;
}

const emit = defineEmits<Emits>();

const getSifterCount = async () => {
  // fetch from backend
  return Math.ceil(Math.random() * 6) as Count;
};

const count = ref<Count>(1);
const randomCount = async () => {
  count.value = await getSifterCount();
  return emit("plusStep", count.value);
};
</script>

<template>
  <div class="sifter-box" @click="randomCount()">{{ count }}</div>
</template>

<style lang="scss">
.sifter-box {
  width: 50px;
  height: 50px;
  background-color: orange;
  cursor: pointer;
}
</style>
