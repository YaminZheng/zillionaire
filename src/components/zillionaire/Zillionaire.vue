<script lang="ts">
import type { El } from "./Road.vue";
export type RoadMap = Array<Array<number | null>>;
export type RoadFormat = (el: El) => any;
export { El };

const sleep = (el: HTMLElement) => {
  return new Promise<void>((resove) => {
    const transitionend = () => {
      resove();
      el.removeEventListener("transitionend", transitionend);
      el.removeEventListener("transitionstart", transitionstart);
    };
    const transitioncancel = () => {
      resove();
      el.removeEventListener("transitioncancel", transitioncancel);
      el.removeEventListener("transitionstart", transitionstart);
    };
    const transitionstart = () => {
      el.addEventListener("transitionend", transitionend);
      el.addEventListener("transitioncancel", transitioncancel);
    };

    el.addEventListener("transitionstart", transitionstart);
  });
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from "vue";
import Road from "./Road.vue";
import Pointer from "./Pointer.vue";
import Sifter from "./Sifter.vue";

interface Props {
  roadMap: RoadMap;
  roadMapFormat?: { [K: number]: RoadFormat };
  isCanLoop?: boolean;
  minSifter?: number;
  maxSifter?: number;
  jumpInterval?: number;
}
const props = withDefaults(defineProps<Props>(), {
  isCanLoop: false,
  minSifter: 1,
  maxSifter: 6,
  jumpInterval: 300,
  roadMapFormat: () => ({}),
});

const { site } = defineModels<{
  site: number;
}>();

const maxSite = computed(() => Math.max(...(props.roadMap.flat().filter((n) => n !== null) as Array<number>)));
const minSite = computed(() => Math.min(...(props.roadMap.flat().filter((n) => n !== null) as Array<number>)));
const transition = computed(() => `all ${props.jumpInterval}ms ease`);

const isFinished = ref(false);
const finish = () => {
  isFinished.value = true;
  // some thing
  console.log("success");
};

const pointerRef = ref<InstanceType<typeof Pointer>>();
const isLooping = ref(false);
const loopPointer = async (step: number) => {
  isLooping.value = true;
  const getPointerFromSite = roadRef.value!.getPointerFromSite;
  for (let i = 0; i < step; i++) {
    const stepSite = stepPointer.value!.site;
    stepPointer.value = getPointerFromSite(stepSite + 1) || getPointerFromSite(minSite.value);
    await sleep(pointerRef.value!.$el);
  }
  currentPointer.value = stepPointer.value;
  isLooping.value = false;
};

const plusStep = (step: number) => {
  if (isFinished.value || isLooping.value) return;
  if (props.isCanLoop) {
    loopPointer(step);
    finish();
  } else {
    const nextSite = Math.min(currentPointer.value!.site + step, maxSite.value);
    loopPointer(nextSite - currentPointer.value!.site);
    if (nextSite === maxSite.value) finish();
  }
};

const roadRef = ref<InstanceType<typeof Road>>();
const currentPointer = computed({
  get: () => roadRef.value?.getPointerFromSite(site.value),
  set: (_v) => (site.value = _v?.site || 0),
});
const stepPointer = shallowRef(currentPointer.value);
onMounted(() => {
  roadRef.value?.initRoad();
  currentPointer.value = roadRef.value?.getPointerFromSite(minSite.value);
  stepPointer.value = currentPointer.value;
  isFinished.value = false;
});
</script>

<template>
  <Road ref="roadRef" :roadMap="roadMap" :roadMapFormat="roadMapFormat" :initSite="minSite">
    <template #pointer>
      <Pointer ref="pointerRef" class="pointer-container" :pointer="stepPointer" />
    </template>
    <template #sifter>
      <Sifter
        class="sifter-container"
        :minCount="minSifter"
        :maxCount="maxSifter"
        :disabled="isLooping || isFinished"
        @plusStep="plusStep"
      />
    </template>
  </Road>
</template>

<style lang="scss" scoped>
.pointer-container {
  background-color: red;
  position: absolute;
  transition: v-bind(transition);
}

.sifter-container {
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-100%);
}
</style>
