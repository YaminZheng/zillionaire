<template>
  <div class="page-turning-box" relative w-full>
    <Transition name="move">
      <slot />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.move-enter-active,
.move-leave-active {
  transition: all 0.5s linear;
}

.move-enter-from {
  transform: translateX(20px) translateY(20px);
  opacity: 0;
}
.move-enter {
  transform: translateX(0) translateY(0);
  opacity: 0;
}

.move-leave {
  transform: translateX(0) translateY(0);
  opacity: 0;
}
.move-leave-to {
  transform: translateX(-20px) translateY(20px);
  opacity: 0;
}

.page-turning-box {
  > * {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
