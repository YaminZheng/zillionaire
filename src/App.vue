<script setup lang="ts">
import Zillionaire from "./templates/Zillionaire.vue";
import BlindBox from "./components/blind-box/BlindBox.vue";
import { ref, watch } from "vue";
import Typed from "./components/Typed.vue";
import PageTurning from "./components/pageTurning/PageTurning.vue";
import Through from "./components/Through.vue";

const featchPrize = async (index: number) => {
  console.log(index);
  return Math.floor(Math.random() * 2);
};

const showPrize = (prize: any) => {
  if (prize === 0) return console.log("未中奖");
  // blindBoxRef.value?.open(prize);
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
  <!-- through -->
  <Through />

  <!-- page turning -->
  <PageTurning :pages="['1', '2', '3']" />

  <!-- typed -->
  <Typed text="我是一只粉刷匠，粉刷本领强，我有一头小毛驴我从来也不骑，有一天我心血来潮骑它去赶集！" :interval="50" />

  <!-- 大富翁 -->
  <Zillionaire ref="zillionaireRef" v-model="currentIndex" />

  <!-- 盲盒 -->
  <BlindBox ref="blindBoxRef" />
</template>
