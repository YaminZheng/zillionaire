<script setup lang="ts">
import Pointer from "./components/Pointer.vue";
import Road, { RoadMap } from "./components/Road.vue";
import Sifter from "./components/Sifter.vue";

// 四方格，长宽对齐，数字为地，null为空，根据数字顺序走动
const roadMap: RoadMap = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [32, null, null, null, null, null, null, null, null, 11],
  [31, null, null, null, null, null, null, null, null, 12],
  [30, null, 24, 23, 22, null, null, null, null, 13],
  [29, null, 25, null, 21, null, null, null, null, 14],
  [28, 27, 26, null, 20, 19, 18, 17, 16, 15],
];
</script>

<template>
  <Road :roadMap=roadMap>
    <template #pointer="{ pointer, pointerMap }">
      <Pointer :el="pointer" :pointerMap="pointerMap" />
    </template>
    <template #sifter="{ plusStep }">
      <Sifter @plusStep="plusStep" />
    </template>
  </Road>
</template>
