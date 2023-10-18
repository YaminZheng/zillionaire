<script setup lang="ts">
import { onMounted, ref, shallowRef, computed } from "vue";

export type RoadMap = Array<Array<number | null>>;
export type El = HTMLDivElement & {
  l: string;
  t: string;
  isHolder: boolean;
  site: number;
};

interface Props {
  roadMap: RoadMap;
}

const props = defineProps<Props>();
const maxSite = computed(() =>
  Math.max(...(props.roadMap.flat().filter(Boolean) as Array<number>))
);

let isFinished = false;
const finish = () => {
  isFinished = true;
  // some thing
  console.log("success");
};

const createEl = (
  width: number,
  height: number,
  colIndex: number,
  rowIndex: number
): El => {
  const el = document.createElement("div") as El;
  el.style.width = `${100 / width}%`;
  el.style.height = `${100 / height}%`;
  el.l = `${(100 / width) * colIndex}%`;
  el.t = `${(100 / height) * rowIndex}%`;
  el.style.left = el.l;
  el.style.top = el.t;
  return el;
};
const createHolder = (
  width: number,
  height: number,
  colIndex: number,
  rowIndex: number
) => {
  const el = createEl(width, height, colIndex, rowIndex);
  el.isHolder = true;
  el.classList.add("road-holder");
  el.site = 0;
  return el;
};

const getRoadWidth = (roadMap: RoadMap) => roadMap[1]?.length || 10;
const getRoadHeight = (roadMap: RoadMap) => roadMap.length || 5;

const generateRoad = (roadMap: RoadMap) => {
  isFinished = false;
  const elList = [] as Array<El>;
  const width = getRoadWidth(roadMap);
  const height = getRoadHeight(roadMap);
  roadMap.forEach((cols, rowIndex) => {
    cols.forEach((row, colIndex) => {
      if (row !== null) {
        const el = createHolder(width, height, colIndex, rowIndex);
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

const plusStep = (step: number) => {
  if (isFinished) return;
  const nextSite = Math.min(currentPointer.value!.site + step, maxSite.value);
  currentPointer.value = pointerMap.value[nextSite];
  if (nextSite === maxSite.value) {
    finish();
  }
};
</script>

<template>
  <div ref="roadBoxRef" class="road-box">
    <slot name="pointer" :pointer="currentPointer" :pointerMap="pointerMap" />
    <div class="sifter-container">
      <slot name="sifter" :plusStep="plusStep" />
    </div>
  </div>
</template>

<style lang="scss">
.road-box {
  width: 100vw;
  height: 100vh;
  position: relative;

  .road-holder,
  .road-null {
    position: absolute;
  }

  .road-holder {
    border: 1px solid;
  }

  .sifter-container {
    z-index: 9;
    position: absolute;
    right: 10%;
    top: 20%;
  }
}
</style>
