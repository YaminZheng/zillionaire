<template>
  <div class="through-box relative w-full h-full bg-black overflow-hidden">
    <div class="content preserve-3d absolute w-100px h-100px">
      <div class="item absolute w-full h-full translate-x-50px rotate-y-90"></div>
      <div class="item absolute w-full h-full -translate-x-50px -rotate-y-90"></div>
      <div class="item absolute w-full h-full -translate-y-50px -rotate-x-90"></div>
      <div class="item absolute w-full h-full translate-y-50px rotate-x-90"></div>
      <div
        class="middle absolute w-0 h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-1/2 rotate-x-180 -translate-z-50px"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@function randomColor() {
  @return rgb(0, random(50), random(200));
}

@function randomSize() {
  @return random(3);
}

@function generateDot($count) {
  $shadow: none;

  @for $i from 1 through $count {
    $x: #{calc(random(10000) / 10000) * 100%};
    $y: #{calc(random(10000) / 10000) * 100%};

    $shadow: $shadow,
      radial-gradient(circle at #{$x} #{$y}, white 0.5px, rgb(48, 45, 141, 0.5) 3px, rgba(0, 0, 255, 0) 1px);
  }

  @return $shadow;
}

@keyframes move {
  0% {
    transform: translateZ(-50px) rotate(0deg);
  }
  100% {
    transform: translateZ(35px) rotate(0deg);
  }
}

.through-box {
  perspective: 4px;
  background: radial-gradient(white 0px, #232156 0.5px, black);
  .content {
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    animation: move 2s linear forwards;
  }
}

.item {
  background: generateDot(100);
}

.middle {
  box-shadow: 0 0 100px 50px white;
}
</style>
