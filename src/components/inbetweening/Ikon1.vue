<script setup lang="ts">
import Typed from "../Typed.vue";
import { injectFontSize } from "../../assets/utils";
import { ref } from "vue";
import { onMounted } from "vue";
import { onUnmounted } from "vue";
import Through from "../Through.vue";

const text =
  "今年是2043年，我是一个刚刚入学的大一新生，今天即将迎来我的第一节必修课一一区块链基础课程令我没有想到的是，今天将是极其不平凡的一天。";

const boxRef = ref<HTMLDivElement>();
onMounted(() => {
  const unwatch = injectFontSize(boxRef.value!);
  onUnmounted(unwatch);
});
</script>

<template>
  <div ref="boxRef" class="w-full relative">
    <img src="./1.jpg" w-full />
    <Typed
      class="text-box absolute bottom-1/14 right-4/17 bg-white rounded-md border-2 border-solid border-black font-bold tracking-wide"
      :text="text"
    />
  </div>
</template>

<style lang="scss" scoped>
.text-box {
  width: 32.76%;
  aspect-ratio: 190/134;
  line-height: 1.3;
  font-size: 2.4em;
  padding: 2.4%;

  &::before {
    content: "";
    position: absolute;
    left: 100%;
    top: 14%;
    border: 1em solid transparent;
    border-top-width: 0.5em;
    border-bottom-width: 0.5em;
    border-left-color: white;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 12.5%;
    border: 1.15em solid transparent;
    border-top-width: 0.7em;
    border-bottom-width: 0.7em;
    border-left-color: black;
  }
}
</style>
