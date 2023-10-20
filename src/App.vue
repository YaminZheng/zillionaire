<script setup lang="ts">
import Zillionaire from "./templates/Zillionaire.vue";
import BlindBox from "./components/blind-box/BlindBox.vue";
import { ref, watch } from "vue";

const featchPrize = async () => {
  return Math.floor(Math.random() * 2);
};

const showPrize = (prize: any) => {
  if (prize === 0) return alert('未中奖');
  blindBoxRef.value?.open(prize);
};

const currentSite = ref();
watch(currentSite, async (site) => {
  if (!site) return;
  const prize = await featchPrize();
  showPrize(prize);
});

const blindBoxRef = ref<InstanceType<typeof BlindBox>>();
</script>

<template>
  <!-- 大富翁 -->
  <Zillionaire v-model="currentSite" />

  <!-- 盲盒 -->
  <BlindBox ref="blindBoxRef" />
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
}
</style>
