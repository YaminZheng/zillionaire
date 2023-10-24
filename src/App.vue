<script setup lang="ts">
import Zillionaire from "./templates/Zillionaire.vue";
import BlindBox from "./components/blind-box/BlindBox.vue";
import { ref, watch } from "vue";

const featchPrize = async (index: number) => {
  console.log(index);
  return Math.floor(Math.random() * 2);
};

const showPrize = (prize: any) => {
  if (prize === 0) return console.log("未中奖");
  blindBoxRef.value?.open(prize);
};

const currentIndex = ref(0);
watch(currentIndex, async (index) => {
  if (!index) return;
  const prize = await featchPrize(index);
  showPrize(prize);
});

const blindBoxRef = ref<InstanceType<typeof BlindBox>>();
</script>

<template>
  <!-- 大富翁 -->
  <Zillionaire ref="zillionaireRef" v-model="currentIndex" />

  <!-- 盲盒 -->
  <BlindBox ref="blindBoxRef" />

  <button v-if="currentIndex" @click="currentIndex -= 3">minus 3</button>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
}
</style>
