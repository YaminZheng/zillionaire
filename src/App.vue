<script setup lang="ts">
import Road, { RoadMap } from "./components/Road.vue";

// 是否可以循环跳
const IS_CAN_LOOP = false;

// 随机数的最大最小值
const SIFTER_MIN = 1;
const SIFTER_MAX = 6;

// 动画移动的速度
const JUMP_INTERVAL = 300; // ms

// 四方格，长宽对齐，数字为地，null为空，根据数字顺序走动
const ROAD_MAP: RoadMap = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [22, null, null, null, null, null, null, null, null, 11],
  [21, 20, 19, 18, 17, 16, 15, 14, 13, 12],
];

/**
  # 默认是大富翁样式
  
  # 老虎机可以按照下边参数调整
  IS_CAN_LOOP = true
  JUMP_INTERVAL = 30
  SIFTER_MIN = 60
  SIFTER_MAX = 60
  ROAD_MAP = [
    [1,2,3],
    [8,null,4],
    [7,6,5]
  ]
 */
</script>

<template>
  <Road
    :roadMap="ROAD_MAP"
    :isCanLoop="IS_CAN_LOOP"
    :minSifter="SIFTER_MIN"
    :maxSifter="SIFTER_MAX"
    :jumpInterval="JUMP_INTERVAL"
  />
</template>
