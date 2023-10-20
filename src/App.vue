<script setup lang="ts">
import Zillionaire from "./pages/Zillionaire.vue";
import BlindBox from "./pages/BlindBox.vue";
import { ref, watch } from "vue";

const featchPrize = async () => {
  return "谢谢参与";
};

const showPrize = (prize: any) => {
  alert(prize);
};

const currentSite = ref(1);
watch(currentSite, async (site) => {
  console.log(site);
  const prize = await featchPrize();
  showPrize(prize);
});
</script>

<template>
  <!-- 大富翁 -->
  <Zillionaire v-model="currentSite" />

  <!-- 盲盒 -->
  <BlindBox />
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
}
</style>
