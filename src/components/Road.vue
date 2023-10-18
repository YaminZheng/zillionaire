<script lang="ts">
export type RoadMap = Array<Array<number | null>>;
export type El = HTMLDivElement & { l: string; t: string; site: number };

const sleep = (time: number = 1500): Promise<void> => {
  return new Promise((resolve) => globalThis.setTimeout(() => resolve(), time));
};
</script>

<script setup lang="ts">
import { onMounted, ref, shallowRef, computed } from "vue";
import Pointer from "./Pointer.vue";
import Sifter from "./Sifter.vue";

interface Props {
  roadMap: RoadMap;
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
});
const maxSite = computed(() =>
  Math.max(...(props.roadMap.flat().filter(Boolean) as Array<number>))
);

const computeWidth = (colNum: number) => 100 / colNum;
const computeHeight = (rowNum: number) => 100 / rowNum;

const createHolder = (
  colNum: number,
  rowNum: number,
  colIndex: number,
  rowIndex: number
) => {
  const el = document.createElement("div") as El;
  const _width = computeWidth(colNum);
  const _height = computeHeight(rowNum);
  el.style.width = `${_width}%`;
  el.style.height = `${_height}%`;
  el.l = `${_width * colIndex}%`;
  el.t = `${_height * rowIndex}%`;
  el.style.left = el.l;
  el.style.top = el.t;
  el.classList.add("road-holder");
  el.site = 0;
  return el;
};

const getRoadColNum = (roadMap: RoadMap) => roadMap[0]?.length || 3;
const getRoadRowNum = (roadMap: RoadMap) => roadMap.length || 3;

const generateRoad = (roadMap: RoadMap) => {
  isFinished.value = false;
  const elList = [] as Array<El>;
  roadMap.forEach((cols, rowIndex) => {
    cols.forEach((row, colIndex) => {
      if (row !== null) {
        const el = createHolder(
          getRoadColNum(roadMap),
          getRoadRowNum(roadMap),
          colIndex,
          rowIndex
        );
        el.site = row;
        elList.push(el);
      }
    });
  });
  return elList;
};

const pointerMap = shallowRef<Record<string, El>>({});
const currentPointer = shallowRef<El>();
const roadBoxRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
  const pointerList = generateRoad(props.roadMap);
  pointerMap.value = pointerList.reduce((map, pointer) => {
    map[pointer.site] = pointer;
    return map;
  }, {} as Record<string, El>);

  const _roadBoxRef = roadBoxRef.value!;
  pointerList.forEach((el) => {
    _roadBoxRef.appendChild(el);
  });

  currentPointer.value = pointerList[0];
});

const isFinished = ref(false);
const finish = () => {
  isFinished.value = true;
  // some thing
  console.log("success");
};

let isLooping = ref(false);
const loopPointer = async (step: number) => {
  isLooping.value = true;
  for (let i = 0; i < step; i++) {
    const currentSite = currentPointer.value!.site;
    currentPointer.value =
      pointerMap.value[currentSite + 1] || Object.values(pointerMap.value)[0];
    await sleep(props.jumpInterval);
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

const transition = computed(
  () => `left ${props.jumpInterval}ms ease, top ${props.jumpInterval}ms ease`
);
</script>

<template>
  <div ref="roadBoxRef" class="road-box">
    <Pointer
      class="pointer-container"
      :interval="jumpInterval"
      :pointer="currentPointer"
    />
    <Sifter
      class="sifter-container"
      :minCount="minSifter"
      :maxCount="maxSifter"
      :disabled="isLooping || isFinished"
      @plusStep="plusStep"
    />
  </div>
</template>

<style lang="scss">
.road-box {
  width: 100vw;
  height: 100vh;
  position: relative;

  .road-holder {
    position: absolute;
    border: 1px solid;
  }

  .pointer-container {
    background-color: red;
    position: absolute;
    transition: v-bind(transition);
  }

  .sifter-container {
    z-index: 9;
    position: absolute;
    right: 50%;
    top: 50%;
  }
}
</style>
