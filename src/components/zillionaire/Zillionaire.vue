<script lang="ts">
import type { El } from "./Road.vue";
import type { RoadItem, RoadMap } from "./Road.vue";
export { El, RoadItem, RoadMap };
</script>

<script setup lang="ts">
import { computed, onMounted, shallowRef, watch, ref } from "vue";
import { waitAnimationEnd, useLoadingEvent, useDelay } from "../../assets/utils";
import Road from "./Road.vue";
import Pointer from "./Pointer.vue";
import Sifter from "./Sifter.vue";
import Loading from "../Loading.vue";

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
const [initZillinaire] = useLoadingEvent(
  useDelay(async () => {
    if (isInitialized.value) return;
    await Promise.all([roadRef.value?.initRoad(), pointerRef.value?.initPointer(), sifterRef.value?.initSifter()]);
    isInitialized.value = true;
  })
);

onMounted(async () => {
  await initZillinaire();
  const getPointerFromSite = roadRef.value!.getPointerFromSite;
  stepPointer.value = getPointerFromSite(modelValue.value);
  isFinished.value = false;
});

const resetOrigin = () => {
  return (pointerRef.value?.$el as HTMLElement).scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "center",
  });
};
defineExpose({ resetOrigin, isInitialized });
</script>

<template>
  <div class="zillionaire-outbox">
    <div class="zillionaire-box">
      <div v-if="!isInitialized" class="bg-white/50 z-10 w-full h-full absolute top-0 left-0">
        <Loading class="absolute inset-1/2 -translate-1/2" />
      </div>
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
  </div>
</template>

<style lang="scss" scoped>
.zillionaire-outbox {
  height: 100%;
  aspect-ratio: 2000/1080;
  position: relative;
  overflow: hidden;
}

.zillionaire-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(./background.jpg);
  background-size: 100% auto;
  background-position: center;
}

.sifter-container {
  z-index: 9;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-100%);
}
</style>
