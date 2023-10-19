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
import { ref, shallowRef, computed, onMounted } from "vue";
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
    const currentSite = currentPointer.value!.site;
    currentPointer.value = getPointerFromSite(currentSite + 1) || getPointerFromSite(minSite.value);
    await sleep(pointerRef.value!.$el);
  }
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
const currentPointer = shallowRef<El>();
onMounted(() => {
  roadRef.value?.initRoad();
  currentPointer.value = roadRef.value?.getPointerFromSite(minSite.value);
  isFinished.value = false;
});
</script>

<template>
  <Road ref="roadRef" :roadMap="roadMap" :roadMapFormat="roadMapFormat" :initSite="minSite">
    <template #pointer>
      <Pointer ref="pointerRef" class="pointer-container" :pointer="currentPointer" />
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
