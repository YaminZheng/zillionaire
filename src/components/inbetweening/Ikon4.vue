<script setup lang="ts">
import { ref, onMounted } from "vue";
import Through from "../Through.vue";
import { waitAnimationEnd2 } from "../../assets/utils";

const isShowThrough = ref(true);
const throughRef = ref<InstanceType<typeof Through>>();
onMounted(async () => {
  await waitAnimationEnd2(throughRef.value!.$el);
  // isShowThrough.value = false;
});
</script>

<template>
  <div class="w-full relative">
    <Through v-if="isShowThrough" ref="throughRef" class="position-absolute" />
    <img src="./4.jpg" w-full />
  </div>
</template>

<style lang="scss" scoped>
.position-absolute {
  width: unset;
  height: unset;
  position: absolute;
  left: 3.1%;
  right: 3.1%;
  top: 3.4%;
  bottom: 5%;
}
</style>
