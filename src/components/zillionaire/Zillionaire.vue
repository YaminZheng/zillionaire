<script lang="ts">
import type { El } from "./Road.vue";
import type { RoadItem, RoadMap } from "./Road.vue";
export { El, RoadItem, RoadMap };
</script>

<script setup lang="ts">
import { computed, onMounted, shallowRef, watch, ref } from "vue";
import { waitAnimationEnd, useLoadingEvent } from "./utils";
import Road from "./Road.vue";
import Pointer from "./Pointer.vue";
import Sifter from "./Sifter.vue";

export interface Props {
  roadMap: RoadMap;
  jumpInterval?: number;
}
const props = withDefaults(defineProps<Props>(), {
  jumpInterval: 300,
});

const { modelValue } = defineModels<{
  modelValue: number;
}>();

const maxSerialId = computed(() => props.roadMap.length - 1);

const isFinished = ref(false);
const finish = () => {
  isFinished.value = true;
  // some thing
  console.log("success");
};

const increase = async (step: number) => {
  const getPointerFromSite = roadRef.value!.getPointerFromSite;
  const _pointer = pointerRef.value!.$el;
  for (let i = 0; i < step; i++) {
    const stepSerialId = stepPointer.value!.serialId;
    stepPointer.value = getPointerFromSite(Math.min(stepSerialId + 1, maxSerialId.value));
    await waitAnimationEnd(_pointer);
  }
};

const decrease = async (step: number) => {
  const getPointerFromSite = roadRef.value!.getPointerFromSite;
  const _pointer = pointerRef.value!.$el;
  for (let i = 0; i > step; i--) {
    const stepSerialId = stepPointer.value!.serialId;
    stepPointer.value = getPointerFromSite(Math.max(stepSerialId - 1, 0));
    await waitAnimationEnd(_pointer);
  }
};

const pointerRef = ref<InstanceType<typeof Pointer>>();
const [loopPointer, isLooping] = useLoadingEvent(async (step: number) => {
  step > 0 ? await increase(step) : await decrease(step);
  modelValue.value = stepPointer.value!.serialId;
});

const plusStep = (step: number) => {
  if (isFinished.value || isLooping.value) return;
  const nextSite = Math.min(modelValue.value + step, maxSerialId.value);
  loopPointer(nextSite - modelValue.value);
  if (nextSite === maxSerialId.value) finish();
};

const roadRef = ref<InstanceType<typeof Road>>();
const stepPointer = shallowRef<El>();
watch(modelValue, (serialId) => plusStep(serialId - stepPointer.value!.serialId));

const sifterRef = ref<InstanceType<typeof Sifter>>();

const isInitialized = ref(false);
const [initZillinaire] = useLoadingEvent(async () => {
  if (isInitialized.value) return;
  await Promise.all([roadRef.value?.initRoad(), pointerRef.value?.initPointer(), sifterRef.value?.initSifter()]);
  isInitialized.value = true;
});

onMounted(() => {
  initZillinaire();
  const getPointerFromSite = roadRef.value!.getPointerFromSite;
  stepPointer.value = getPointerFromSite(modelValue.value);
  isFinished.value = false;
});

const getPointerSite = () => {
  return (pointerRef.value?.$el as HTMLElement).getBoundingClientRect();
};
defineExpose({ getPointerSite, isInitialized });
</script>

<template>
  <div class="zillionaire-box">
    <Road ref="roadRef" :roadMap="roadMap">
      <template #pointer>
        <Pointer
          ref="pointerRef"
          class="pointer-container"
          :pointer="stepPointer"
          :nextPointer="roadRef?.getPointerFromSite(modelValue + 1)"
          :interval="jumpInterval"
          :isRunning="isLooping"
        />
      </template>
    </Road>
    <Sifter ref="sifterRef" class="sifter-container" :disabled="isLooping || isFinished" @plusStep="plusStep" />
  </div>
</template>

<style lang="scss" scoped>
.zillionaire-box {
  width: 100%;
  aspect-ratio: 2000/1080;
  overflow: hidden;
  background-image: url(./background.jpg);
  background-size: 100% auto;
  background-position: center;
  position: absolute;
}

.sifter-container {
  z-index: 9;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-100%);
}
</style>
