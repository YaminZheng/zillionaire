<script lang="ts">
export type El = HTMLDivElement & { site: number };
</script>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import type { RoadMap, RoadFormat } from "./Zillionaire.vue";

interface Props {
  roadMap: RoadMap;
  roadMapFormat: { [K: number]: RoadFormat };
}
const props = defineProps<Props>();

const computeWidth = (colNum: number) => 100 / colNum;
const computeHeight = (rowNum: number) => 100 / rowNum;

const getCreateHolder = (colNum: number, rowNum: number) => {
  const width = computeWidth(colNum);
  const height = computeHeight(rowNum);
  return (colIndex: number, rowIndex: number) => {
    const el = document.createElement("div") as El;
    el.style.width = `${width}%`;
    el.style.height = `${height}%`;
    el.style.left = `${width * colIndex}%`;
    el.style.top = `${height * rowIndex}%`;
    return el;
  };
};

const injectStyle = (el: El, formatFn?: RoadFormat) => {
  el.classList.add("road-holder");
  if (!formatFn) return;
  formatFn(el);
};

const getRoadColNum = (roadMap: RoadMap) => roadMap[0]?.length || 3;
const getRoadRowNum = (roadMap: RoadMap) => roadMap.length || 3;

const generateRoad = (roadMap: RoadMap) => {
  const elList = [] as Array<El>;
  const createHolder = getCreateHolder(getRoadColNum(roadMap), getRoadRowNum(roadMap));
  roadMap.forEach((cols, rowIndex) => {
    cols.forEach((row, colIndex) => {
      if (row !== null) {
        const el = createHolder(colIndex, rowIndex);
        el.site = row;
        injectStyle(el, props.roadMapFormat[row]);
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
  background-image: url(./WechatIMG40.jpg);
  background-size: 100% 100%;

  .road-holder {
    position: absolute;
  }
}
</style>
