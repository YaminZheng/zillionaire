<script setup lang="ts">
import Zillionaire, { RoadMap, RoadFormat, El } from "./components/zillionaire/Zillionaire.vue";

// 是否可以循环跳
const IS_CAN_LOOP = false;

// 随机数的最大最小值
const SIFTER_MIN = 1;
const SIFTER_MAX = 6;

// 动画移动的速度
const JUMP_INTERVAL = 300; // ms

const _____ = null;
const _ = <T>(x: T) => x;
const __ = <T>(x: T) => x;

// 四方格，长宽对齐，数字为地，null为空，根据数字顺序走动
const ROAD_MAP: RoadMap = [
  [_____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, __(5), __(6), __(7), _____, _____, _____, _____, _____, _(33), _(34), _(35), _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, __(4), _____, __(8), _____, _____, _____, _____, _____, _(32), _____, _(36), _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, __(3), _____, __(9), _____, _____, _____, _____, _____, _(31), _____, _(37), _____, _____, _____, _____, _____],
  [_____, _____, __(0), __(1), __(2), _____, _(10), _____, _(20), _(21), _(22), _____, _(30), _____, _(38), _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _(11), _____, _(19), _____, _(23), _____, _(29), _____, _(39), _(40), _(41), _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _(12), _____, _(18), _____, _(24), _____, _(28), _____, _____, _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _(13), _____, _(17), _____, _(25), _(26), _(27), _____, _____, _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _(14), _(15), _(16), _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____],
  [_____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____, _____],
];

const _7 = (el: El) => (el.style.transform = "translate(20%, 60%)");
const _10 = (el: El) => {
  el.style.height = "8.8%";
  el.style.transform = "translate(20%, 55%)";
};
const _12 = (el: El) => {
  el.style.height = "8.5%";
  el.style.transform = "translate(20%, 44%)";
};
const _14 = (el: El) => (el.style.transform = "translate(40%, 20%)");
const _16 = (el: El) => (el.style.transform = "translate(-20%, -50%)");
const _28 = (el: El) => (el.style.transform = "translate(34%, 40%)");
const roadMapFormat: { [K: string]: RoadFormat } = {
  0: (el: El) => (el.style.transform = "translate(30%, 90%)"),
  1: (el: El) => (el.style.transform = "translate(40%, 80%)"),
  5: (el: El) => (el.style.transform = "translate(50%, 30%)"),
  6: (el: El) => (el.style.transform = "translate(40%, 10%)"),
  7: _7,
  8: _7,
  9: _7,
  10: _10,
  11: _10,
  12: _12,
  13: _12,
  14: _14,
  15: _14,
  16: _16,
  17: _16,
  18: (el: El) => (el.style.transform = "translate(-20%, -40%)"),
  19: (el: El) => (el.style.transform = "translate(-20%, -34%)"),
  20: (el: El) => (el.style.transform = "translate(-10%, -30%)"),
  21: (el: El) => (el.style.transform = "translate(-30%, -60%)"),
  22: (el: El) => (el.style.transform = "translate(-30%, -40%)"),
  23: _16,
  24: _16,
  25: (el: El) => (el.style.transform = "translate(0%, -50%)"),
  26: (el: El) => (el.style.transform = "translate(-25%, -10%)"),
  27: (el: El) => (el.style.transform = "translate(-25%, -10%)"),
  28: _28,
  29: _28,
  30: _28,
  31: _28,
  32: _28,
  33: _28,
  40: (el: El) => (el.style.transform = "translate(5%, 50%)"),
};

/**
  # 默认是大富翁样式

  # 九宫格可以按照下边参数调整
  IS_CAN_LOOP = true
  JUMP_INTERVAL = 30
  SIFTER_MIN = 60
  SIFTER_MAX = 60
  ROAD_MAP = [
    [__(0), __(1), __(2)],
    [__(7), _____, __(3)],
    [__(6), __(5), __(4)]
  ]
 */
</script>

<template>
  <div class="box">
    <Zillionaire
      :roadMap="ROAD_MAP"
      :roadMapFormat="roadMapFormat"
      :isCanLoop="IS_CAN_LOOP"
      :minSifter="SIFTER_MIN"
      :maxSifter="SIFTER_MAX"
      :jumpInterval="JUMP_INTERVAL"
    />
  </div>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
}
</style>
