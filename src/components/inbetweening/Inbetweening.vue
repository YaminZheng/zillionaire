<script setup lang="ts">
import { ref } from "vue";
import PageTurning from "../pageTurning/PageTurning.vue";
import Ikon1 from "./Ikon1.vue";
import Ikon2 from "./Ikon2.vue";
import Ikon3 from "./Ikon3.vue";
import Ikon4 from "./Ikon4.vue";
import Ikon5 from "./Ikon5.vue";
import Ikon6 from "./Ikon6.vue";

const currentPage = ref(1);
</script>

<template>
  <PageTurning class="inbetweening-box w-full cursor-pointer" @click="currentPage += 1">
    <Ikon1 v-if="currentPage === 1" />
    <Ikon2 v-else-if="currentPage === 2" />
    <Ikon3 v-else-if="currentPage === 3" />
    <Ikon4 v-else-if="currentPage === 4" />
    <Ikon5 v-else-if="currentPage === 5" />
    <Ikon6 v-else-if="currentPage === 6" />
  </PageTurning>
</template>

<style lang="scss" scoped>
.inbetweening-box {
  width: 100%;
  aspect-ratio: 1920/1080;
}
</style>
