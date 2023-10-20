<script setup lang="ts">
import Zillionaire from "./pages/Zillionaire.vue";
import BlindBox from "./pages/BlindBox.vue";
</script>

<template>
  <!-- 大富翁 -->
  <Zillionaire />
  
  <!-- 盲盒 -->
  <BlindBox />
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
}
</style>
