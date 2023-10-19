<script lang="ts">
export type El = HTMLDivElement & { l: string; t: string; site: number };
</script>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import type { RoadMap } from "./Zillionaire.vue";

interface Props {
  roadMap: RoadMap;
}
const props = defineProps<Props>();

const computeWidth = (colNum: number) => 100 / colNum;
const computeHeight = (rowNum: number) => 100 / rowNum;

const createHolder = (colNum: number, rowNum: number, colIndex: number, rowIndex: number) => {
  const el = document.createElement("div") as El;
  const _width = computeWidth(colNum);
  const _height = computeHeight(rowNum);
  el.style.width = `${_width}%`;
  el.style.height = `${_height}%`;
  el.l = `${_width * colIndex}%`;
  el.t = `${_height * rowIndex}%`;
  el.style.left = el.l;
  el.style.top = el.t;
  return el;
};

const getRoadColNum = (roadMap: RoadMap) => roadMap[0]?.length || 3;
const getRoadRowNum = (roadMap: RoadMap) => roadMap.length || 3;

const generateRoad = (roadMap: RoadMap) => {
  const elList = [] as Array<El>;
  roadMap.forEach((cols, rowIndex) => {
    cols.forEach((row, colIndex) => {
      if (row !== null) {
        const el = createHolder(getRoadColNum(roadMap), getRoadRowNum(roadMap), colIndex, rowIndex);
        el.site = row;
        el.innerText = `${row}`;
        el.classList.add("road-holder");
        elList.push(el);
      }
    });
  });
  return elList;
};

const roadBoxRef = ref<HTMLDivElement | null>(null);
const pointerMap = shallowRef<Record<string, El>>({});
const init = () => {
  const pointerList = generateRoad(props.roadMap);
  pointerMap.value = pointerList.reduce((map, pointer) => {
    map[pointer.site] = pointer;
    return map;
  }, {} as Record<string, El>);

  const _roadBoxRef = roadBoxRef.value!;
  pointerList.forEach((el) => _roadBoxRef.appendChild(el));
};

const getPointerFromSite = (site: number) => pointerMap.value[site];
defineExpose({ getPointerFromSite, initRoad: init });
</script>

<template>
  <div ref="roadBoxRef" class="road-box">
    <slot name="pointer" />
    <slot name="sifter" />
  </div>
</template>

<style lang="scss">
.road-box {
  width: 100%;
  height: 100%;
  position: relative;

  .road-holder {
    position: absolute;
    border: 1px solid;
  }
}
</style>
