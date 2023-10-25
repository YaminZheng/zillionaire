<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  pages: Array<string>;
}
const props = defineProps<Props>();
const currentPage = computed(() => props.pages[0]);
const nextPage = computed(() => props.pages[1]);

const isShow1 = ref(true);
</script>

<template>
  <div class="page-turning-box" relative w-300px h-400px ml-10 @click="isShow1 = !isShow1">
    <Transition name="move">
      <div v-if="isShow1" w-full h-full absolute top-0 left-0 bg-green>
        <!-- <div class="current-content">{{ 1 }}</div> -->
      </div>
      <div v-else w-full h-full absolute top-0 left-0 bg-pink>
        <!-- <div class="next-content">{{ 2 }}</div> -->
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.move-enter-active,
.move-leave-active {
  transition: all 0.5s ease-out;
}

.move-enter-from,
.move-leave-to {
  transform: translateX(-30px) translateY(-30px);
  opacity: 0;
}
</style>
