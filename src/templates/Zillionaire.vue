<script setup lang="ts">
import { ref, computed } from "vue";
import Zillionaire, { RoadMap } from "../components/zillionaire/Zillionaire.vue";

const { modelValue } = defineModels<{
  modelValue: number;
}>();

const getComputeSite = (rowCount: number, colCount: number, space = 0) => {
  const widthP = (100 - (colCount + 1) * space) / colCount;
  const heightP = (100 - (rowCount + 1) * space) / rowCount;
  const hw = widthP / 2;
  const hh = heightP / 2;
  const hp = space / 2;
  return (rowIndex: number, colIndex: number) => {
    const l = colIndex * (widthP + space) + hw + hp;
    const t = rowIndex * (heightP + space) + hh + hp;
    return { width: `${widthP}%`, height: `${heightP}%`, left: `${l}%`, top: `${t}%` };
  };
};
const computeSite = getComputeSite(18, 15, 0.6);

const roadMap: RoadMap = (
  [
    [6, 3],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [6, 6],
    [5, 6],
    [4, 6],
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 8],
    [5, 8],
    [6, 8],
    [7, 8],
    [7, 9],
    [7, 10],
    [6, 10],
    [6, 11],
    [6, 12],
    [7, 12],
    [8, 12],
    [8, 13],
    [8, 14],
    [9, 14],
    [10, 14],
    [10, 13],
    [10, 12],
    [10, 11],
    [10, 10],
    [9, 10],
    [9, 9],
    [9, 8],
    [9, 7],
    [9, 6],
    [10, 6],
    [11, 6],
    [11, 7],
    [11, 8],
    [12, 8],
    [13, 8],
    [13, 9],
    [13, 10],
    [12, 10],
    [12, 11],
  ] as Array<[number, number]>
).map((args) => computeSite(...args));

const pointerIndex = computed({
  get: () => modelValue.value,
  set: (_v) => (modelValue.value = _v),
});

const zillionaireRef = ref<InstanceType<typeof Zillionaire>>();
const onClickOrigin = () => zillionaireRef.value?.scrollToPoint();
</script>

<template>
  <div class="box">
    <Zillionaire ref="zillionaireRef" v-model="pointerIndex" :roadMap="roadMap" :jumpInterval="300" />
    <button class="origin" @click="onClickOrigin">回到原点</button>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;

  .origin {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 999;
  }
}
</style>
